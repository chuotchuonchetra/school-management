const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");
const db = require("../models");

const { User, Student, Parent, Class, ProfileImage } = db;

const getAllStudent = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Parent,
          as: "parent",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["firstName", "lastName"],
            },
          ],
        },

        {
          model: Class,
          as: "class",
          attributes: ["className"],
        },
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName"],
          include: [
            {
              model: ProfileImage,
              as: "profileImage",
              attributes: ["image", "userId"],
            },
          ],
        },
      ],
    });

    res.json({ message: "Students fetched successfully", data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const { classId, search, academicYear, page = 1, limit = 20 } = req.query;

    // ── Student table filters ────────────────────────────────
    const studentWhere = {};
    if (classId) studentWhere.classId = Number(classId);
    if (academicYear) studentWhere.academicYear = academicYear;

    // ── User table filters (search by name or email) ─────────
    const userWhere = {};
    if (search) {
      userWhere[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows: students, count: total } = await Student.findAndCountAll({
      where: studentWhere,
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          where: userWhere, // ← search filter applied here
          attributes: ["id", "name", "email"],
          include: [
            {
              model: ProfileImage,
              as: "profileImage",
              attributes: ["image", "userId", "id"],
            },
          ],
        },
        {
          model: Class,
          as: "class",
          attributes: ["id", "name", "gradeLevel"],
        },
        {
          model: Parent,
          as: "parent",
          required: false, // LEFT JOIN — student may have no parent
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "email"],
              include: [
                {
                  model: ProfileImage,
                  as: "profileImage",
                  attributes: ["image", "userId", "id"],
                },
              ],
            },
          ],
        },
      ],
    });

    // ── Flatten to StudentListItem shape ─────────────────────
    const data = students.map((s) => ({
      id: s.id,
      studentNumber: s.studentNumber,
      academicYear: s.academicYear,
      name: s.user.name,
      email: s.user.email,
      profileImage: s.user.profileImage.image,
      className: s.class?.name ?? "—",
      parentName: s.parent?.user?.name ?? null,
      attendanceRate: null, // computed separately if needed
      isAtRisk: false,
    }));

    res.json({
      message: "Students fetched",
      data,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
//  GET /api/students/:id
//  Full student — for edit modal
// ─────────────────────────────────────────────────────────────
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        // {
        //   model: Class,
        //   as: "class",
        //   attributes: ["id", "name", "gradeLevel"],
        // },
        {
          model: Parent,
          as: "parent",
          required: false,
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "firstName", "lastName", "email"],
              include: [
                {
                  model: ProfileImage,
                  as: "profileImage",
                  attributes: ["image", "userId", "id"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Success", data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      newPassword,
      classId,
      parentMode, // keep | edit | change | addNew | remove
      linkParentId, // mode = change
      editParent, // mode = edit
      newParent, // mode = addNew
    } = req.body;

    const student = await Student.findByPk(id, {
      include: [{ model: User, as: "user" }],
      transaction,
    });

    if (!student) {
      await transaction.rollback();
      return res.status(404).json({ message: "Student not found" });
    }

    // ── Update student user ──────────────────────────────────
    const userUpdate = {};
    if (firstName) userUpdate.firstName = firstName;
    if (firstName) userUpdate.lastName = lastName;
    if (email) userUpdate.email = email;
    if (newPassword) userUpdate.password = await bcrypt.hash(newPassword, 10);

    if (Object.keys(userUpdate).length > 0) {
      await User.update(userUpdate, {
        where: { id: student.userId },
        transaction,
      });
    }

    // ── Update student profile ───────────────────────────────
    const studentUpdate = {};
    if (classId) studentUpdate.classId = Number(classId);

    // ── Handle parent mode ───────────────────────────────────
    if (parentMode === "remove") {
      studentUpdate.parentId = null;
    }

    if (parentMode === "change" && linkParentId) {
      const parent = await Parent.findByPk(linkParentId, { transaction });
      if (!parent) {
        await transaction.rollback();
        return res.status(404).json({ message: "Parent not found" });
      }
      studentUpdate.parentId = linkParentId;
    }

    if (parentMode === "edit" && editParent) {
      const parent = await Parent.findByPk(student.parentId, { transaction });
      if (parent) {
        const parentUserUpdate = {};
        if (editParent.name) parentUserUpdate.name = editParent.name;
        if (editParent.email) parentUserUpdate.email = editParent.email;
        if (req.files?.parentProfileImage?.[0])
          parentUserUpdate.profileImage = req.files.parentProfileImage[0].path;

        await User.update(parentUserUpdate, {
          where: { id: parent.userId },
          transaction,
        });

        const parentUpdate = {};
        if (editParent.phone) parentUpdate.phone = editParent.phone;
        if (editParent.relationship)
          parentUpdate.relationship = editParent.relationship;
        await parent.update(parentUpdate, { transaction });
      }
    }

    if (parentMode === "addNew" && newParent) {
      const {
        firstName: pFirst,
        lastName: pLast,
        email: pEmail,
        password: pPassword,
        phone,
        relationship,
      } = newParent;

      const parentUser = await User.create(
        {
          name: `${pFirst} ${pLast}`.trim(),
          email: pEmail,
          password: await bcrypt.hash(pPassword, 10),
          role: "parent",
        },
        { transaction },
      );

      const parent = await Parent.create(
        { userId: parentUser.id, phone, relationship },
        { transaction },
      );

      studentUpdate.parentId = parent.id;
    }

    if (Object.keys(studentUpdate).length > 0) {
      await Student.update(studentUpdate, { where: { id }, transaction });
    }

    await transaction.commit();

    // return fresh full student
    const updated = await Student.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: Class, as: "class" },
        {
          model: Parent,
          as: "parent",
          required: false,
          include: [
            { model: User, as: "user", attributes: { exclude: ["password"] } },
          ],
        },
      ],
    });

    res.json({ message: "Student updated", data: updated });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
//  DELETE /api/students/:id
// ─────────────────────────────────────────────────────────────
const deleteStudent = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const student = await Student.findByPk(req.params.id, { transaction });

    if (!student) {
      await transaction.rollback();
      return res.status(404).json({ message: "Student not found" });
    }

    const userId = student.userId;

    // delete student profile first then user (cascade handles the rest)
    await student.destroy({ transaction });
    await User.destroy({ where: { id: userId }, transaction });

    await transaction.commit();

    res.json({ message: "Student deleted" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};
//POST /api/students
const createStudent = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const file = req.file;
    console.log(file);
    if (!req.body.data) {
      return res.status(400).json({ message: "No data provided" });
    }
    const data = JSON.parse(req.body.data);
    const {
      firstName,
      lastName,
      gender,
      email,
      password,
      phone,
      parentId,
      newParent,
      classId,
      dateOfBirth,
      academicYear,
      studentNumber,
    } = data;

    if (
      !firstName ||
      !studentNumber ||
      !lastName ||
      !email ||
      !password ||
      !gender ||
      !classId ||
      !dateOfBirth ||
      !academicYear
    ) {
      return res.json({
        message: "all field are required",
      });
    }
    const existingStudentEmail = await User.findOne({
      where: {
        email,
      },
    });
    if (existingStudentEmail) {
      await transaction.rollback();
      return res.json({
        message: "Student email already exists",
      });
    }

    if (parentId) {
      const parent = await User.findByPk(parentId);
      if (!parent) await transaction.rollback();
      return res.json({
        message: "Parent not found",
      });
    }
    let finalParentId = parentId;
    if (newParent && !parentId) {
      const { pFirstName, pLastName, pEmail, pPassword, pPhone, relationship } =
        newParent;

      if (
        !pFirstName ||
        !pLastName ||
        !pEmail ||
        !pPassword ||
        !pPhone ||
        !relationship
      ) {
        await transaction.rollback();
        return res.json({
          message: "Parent fields are required",
        });
      }

      const existingParentEmail = await User.findOne({
        where: {
          email: pEmail,
        },
      });
      if (existingParentEmail) {
        await transaction.rollback();
        return res.json({
          message: "parent email is exsting",
        });
      }
      const createParentUser = await User.create(
        {
          firstName: pFirstName,
          lastName: pLastName,
          email: pEmail,
          role: "parent",
          password: await bcrypt.hash(pPassword, 10),
        },
        { transaction },
      );
      const createParent = await Parent.create(
        {
          userId: createParentUser.id,
          relationship,
          phone: pPhone,
          isActive: true,
        },
        { transaction },
      );
      finalParentId = createParent.id;
    }

    const createStudentUser = await User.create(
      {
        firstName,
        lastName,
        phone,
        email,
        role: "student",
        password: await bcrypt.hash(password, 10),
      },
      {
        transaction,
      },
    );

    const createStudent = await Student.create(
      {
        userId: createStudentUser.id,
        gender,
        parentId: finalParentId,
        classId,
        dateOfBirth,
        studentNumber,
        academicYear,
        isActive: true,
      },
      { transaction },
    );

    if (file) {
      const imageUrl = file.path;

      var profileImage = await ProfileImage.create(
        {
          image: imageUrl,
          userId: createStudentUser.id,
          isActive: true,
        },
        { transaction },
      );
    }
    await transaction.commit();
    return res.json({
      message: "student create successfully!",
      data: createStudent,
      image: profileImage,
    });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudent,
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

const db = require("../models");
const bcrypt = require("bcrypt");

const { where } = require("sequelize");
const { Student, Parent, User } = db;

// getAllStudent with optional parent filter
const getAllStudent = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Parent,
          as: "parent",
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              as: "user",
            },
          ],
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    res.json({ message: "Students fetched successfully", data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// const createStudent = async (req, res) => {
//   const transaction = await db.sequelize.transaction();

//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       studentNumber,
//       classId,
//       academicYear,
//       profileImage,
//       parentId, // existing parent
//       newParent, // new parent object
//     } = req.body;

//     // Profile images from form-data (optional)
//     const studentProfileImage =
//       req.files?.profileImage?.[0]?.path || req.body.profileImage || null;
//     const parentProfileImage =
//       req.files?.parentProfileImage?.[0]?.path || req.body.profileImage || null;

//     // Validate required student fields
//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !password ||
//       !studentNumber ||
//       !classId
//     ) {
//       await transaction.rollback();
//       return res
//         .status(400)
//         .json({ message: "All student fields are required" });
//     }

//     // Check if student email already exists
//     const existingStudent = await User.findOne({
//       where: { email },
//       transaction,
//     });
//     if (existingStudent) {
//       await transaction.rollback();
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Resolve parentId
//     let resolvedParentId = null;

//     // ── Case A: create new parent ─────────────────────────
//     if (newParent) {
//       const {
//         firstName: pFirst,
//         lastName: pLast,
//         email: pEmail,
//         password: pPassword,
//         phone,
//         relationship,
//       } = newParent;

//       if (
//         !pFirst ||
//         !pLast ||
//         !pEmail ||
//         !pPassword ||
//         !phone ||
//         !relationship
//       ) {
//         await transaction.rollback();
//         return res
//           .status(400)
//           .json({ message: "All parent fields are required" });
//       }

//       // Check parent email
//       const parentEmailExists = await User.findOne({
//         where: { email: pEmail },
//         transaction,
//       });
//       if (parentEmailExists) {
//         await transaction.rollback();
//         return res.status(400).json({ message: "Parent email already in use" });
//       }

//       // Create parent user
//       const parentUser = await User.create(
//         {
//           firstName: pFirst,
//           lastName: pLast,
//           email: pEmail,
//           password: await bcrypt.hash(pPassword, 10),
//           role: "parent",
//           profileImage: parentProfileImage,
//         },
//         { transaction },
//       );

//       // Create parent profile
//       const parent = await Parent.create(
//         { userId: parentUser.id, phone, relationship },
//         { transaction },
//       );

//       resolvedParentId = parent.id;
//     }

//     // ── Case B: existing parent ──────────────────────────
//     if (parentId) {
//       const parent = await Parent.findByPk(parentId, { transaction });
//       if (!parent) {
//         await transaction.rollback();
//         return res.status(404).json({ message: "Parent not found" });
//       }
//       resolvedParentId = parentId;
//     }

//     // ── Case C: no parent → resolvedParentId stays null ──

//     // Create student user
//     const studentUser = await User.create(
//       {
//         firstName,
//         lastName,
//         email,
//         password: await bcrypt.hash(password, 10),
//         role: "student",
//         profileImage: studentProfileImage,
//       },
//       { transaction },
//     );

//     // Create student profile
//     const student = await Student.create(
//       {
//         userId: studentUser.id,
//         classId: Number(classId),
//         parentId: resolvedParentId,
//         studentNumber,
//         academicYear: academicYear || "2025-2026",
//         profileImage: studentProfileImage,
//       },
//       { transaction },
//     );

//     await transaction.commit();
//     res.status(201).json({ message: "Student created", data: student });
//   } catch (error) {
//     await transaction.rollback();
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
const createStudent = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    console.log("req.body  →", req.body); // ← keep until confirmed working
    console.log("req.files →", req.files);

    const {
      firstName,
      lastName,
      email,
      password,
      studentNumber,
      classId,
      academicYear,
      parentMode,
      parentId,
    } = req.body;

    // ── Rebuild newParent from flat FormData keys ──
    // FormData can't send nested objects, so we flatten on the
    // frontend ("newParent.firstName") and rebuild here
    const newParent =
      parentMode === "new" ?
        {
          firstName: req.body["newParent.firstName"],
          lastName: req.body["newParent.lastName"],
          email: req.body["newParent.email"],
          password: req.body["newParent.password"],
          phone: req.body["newParent.phone"],
          relationship: req.body["newParent.relationship"],
        }
      : null;

    // ── Images (now from req.files, not req.body) ──
    const studentProfileImage = req.files?.profileImage?.[0]?.path ?? null;
    const parentProfileImage = req.files?.parentProfileImage?.[0]?.path ?? null;

    // ── Validate required student fields ──
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !studentNumber ||
      !classId
    ) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "All student fields are required" });
    }

    // ── Check duplicate student email ──
    const existingStudent = await User.findOne({
      where: { email },
      transaction,
    });
    if (existingStudent) {
      await transaction.rollback();
      return res.status(400).json({ message: "Email already in use" });
    }

    let resolvedParentId = null;

    // ── Case A: create new parent ──
    if (newParent) {
      const {
        firstName: pFirst,
        lastName: pLast,
        email: pEmail,
        password: pPassword,
        phone,
        relationship,
      } = newParent;

      if (
        !pFirst ||
        !pLast ||
        !pEmail ||
        !pPassword ||
        !phone ||
        !relationship
      ) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ message: "All parent fields are required" });
      }

      const parentEmailExists = await User.findOne({
        where: { email: pEmail },
        transaction,
      });
      if (parentEmailExists) {
        await transaction.rollback();
        return res.status(400).json({ message: "Parent email already in use" });
      }

      const parentUser = await User.create(
        {
          firstName: pFirst,
          lastName: pLast,
          email: pEmail,
          password: await bcrypt.hash(pPassword, 10),
          role: "parent",
          profileImage: parentProfileImage,
        },
        { transaction },
      );

      const parent = await Parent.create(
        { userId: parentUser.id, phone, relationship },
        { transaction },
      );

      resolvedParentId = parent.id;
    }

    // ── Case B: existing parent ──
    if (parentMode === "existing" && parentId) {
      const parent = await Parent.findByPk(parentId, { transaction });
      if (!parent) {
        await transaction.rollback();
        return res.status(404).json({ message: "Parent not found" });
      }
      resolvedParentId = Number(parentId);
    }

    // ── Create student user ──
    const studentUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        role: "student",
        profileImage: studentProfileImage,
      },
      { transaction },
    );

    // ── Create student profile ──
    const student = await Student.create(
      {
        userId: studentUser.id,
        classId: Number(classId),
        parentId: resolvedParentId,
        studentNumber,
        academicYear: academicYear || "2025-2026",
        profileImage: studentProfileImage,
      },
      { transaction },
    );

    await transaction.commit();
    res.status(201).json({ message: "Student created", data: student });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  createStudent,
  getAllStudent,
};

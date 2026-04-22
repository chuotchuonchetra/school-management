const { Class, Teacher, Student, Subject } = require("../models");

// ─── GET ALL ────────────────────────────────────────────────────────────────
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      where: { isActive: true },
      include: [
        { model: Teacher, as: "teacher" },
        { model: Student, as: "students" },
      ],
      order: [
        ["academicYear", "DESC"],
        ["className", "ASC"],
      ],
    });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET BY ID ───────────────────────────────────────────────────────────────
const getClassById = async (req, res) => {
  try {
    const found = await Class.findByPk(req.params.id, {
      include: [
        { model: Teacher, as: "teacher", attributes: ["id", "name", "email"] },
        { model: Student, as: "students", attributes: ["id", "name"] },
        {
          model: Subject,
          as: "subjects",
          //   attributes: ["id", "subjectName", "subjectCode"],
        },
      ],
    });
    if (!found) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── CREATE ──────────────────────────────────────────────────────────────────
const createClass = async (req, res) => {
  try {
    const {
      className,
      academicYear,
      teacherId,
      section,
      capacity,
      roomNumber,
    } = req.body;

    // required fields
    if (!className || !academicYear || !teacherId) {
      return res.status(400).json({
        message: "className, academicYear, and teacherId are required",
      });
    }

    // check teacher exists
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // check duplicate
    const existing = await Class.findOne({
      where: { className, academicYear },
    });
    if (existing) {
      return res.status(409).json({
        message: `Class "${className}" already exists for ${academicYear}`,
      });
    }

    const newClass = await Class.create({
      className,
      academicYear,
      teacherId,
      section,
      capacity,
      roomNumber,
    });

    const result = await Class.findByPk(newClass.id, {
      include: [
        { model: Teacher, as: "teacher", attributes: ["id", "name", "email"] },
      ],
    });

    res.status(201).json(result);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

// ─── UPDATE ──────────────────────────────────────────────────────────────────
const updateClass = async (req, res) => {
  try {
    const found = await Class.findByPk(req.params.id);
    if (!found) {
      return res.status(404).json({ message: "Class not found" });
    }

    // if teacherId is changing, verify new teacher exists
    if (req.body.teacherId && req.body.teacherId !== found.teacherId) {
      const teacher = await Teacher.findByPk(req.body.teacherId);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
    }

    // check duplicate on className + academicYear change
    const newClassName = req.body.className || found.className;
    const newAcademicYear = req.body.academicYear || found.academicYear;

    const duplicate = await Class.findOne({
      where: { className: newClassName, academicYear: newAcademicYear },
    });
    if (duplicate && duplicate.id !== found.id) {
      return res.status(409).json({
        message: `Class "${newClassName}" already exists for ${newAcademicYear}`,
      });
    }

    await found.update(req.body);

    const result = await Class.findByPk(found.id, {
      include: [
        { model: Teacher, as: "teacher", attributes: ["id", "name", "email"] },
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

// ─── SOFT DELETE ─────────────────────────────────────────────────────────────
const deleteClass = async (req, res) => {
  try {
    const found = await Class.findByPk(req.params.id);
    if (!found) {
      return res.status(404).json({ message: "Class not found" });
    }

    await found.update({ isActive: false });
    res
      .status(200)
      .json({ message: `Class "${found.className}" deactivated successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── HARD DELETE ──────────────────────────────────────────────────────────────
const hardDeleteClass = async (req, res) => {
  try {
    const found = await Class.findByPk(req.params.id);
    if (!found) {
      return res.status(404).json({ message: "Class not found" });
    }

    await found.destroy();
    res
      .status(200)
      .json({ message: `Class "${found.className}" permanently deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── RESTORE ──────────────────────────────────────────────────────────────────
const restoreClass = async (req, res) => {
  try {
    const found = await Class.findByPk(req.params.id);
    if (!found) {
      return res.status(404).json({ message: "Class not found" });
    }
    if (found.isActive) {
      return res.status(400).json({ message: "Class is already active" });
    }

    await found.update({ isActive: true });
    res
      .status(200)
      .json({ message: `Class "${found.className}" restored successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  hardDeleteClass,
  restoreClass,
};

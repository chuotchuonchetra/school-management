const router = require("express").Router();

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
const {
  getAllStudent,
  getStudentById,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/Student.controller");
const { upload } = require("../middleware/uploads");

// GET /api/students?search=sophea&classId=1&page=1
router.get(
  "/students",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]), // teacher can also view students
  getAllStudent,
);

// GET /api/students/:id  — full student for edit modal
router.get(
  "/students/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getStudentById,
);

// POST /api/students  — uploadFields before createStudent (handles images)
router.post(
  "/students",
  authMiddleware,
  roleMiddleware(["admin"]),
  upload.single("file"),
  createStudent,
);

// PATCH /api/students/:id  — uploadFields handles profile image changes
router.patch(
  "/students/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateStudent,
);

// DELETE /api/students/:id
router.delete(
  "/students/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteStudent,
);

module.exports = router;

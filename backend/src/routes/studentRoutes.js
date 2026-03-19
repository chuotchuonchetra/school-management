const router = require("express").Router();
const {
  getAllStudent,
  createStudent,
} = require("../controllers/Student.controller");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");
router.get("/students", getAllStudent);
router.post(
  "/students",
  authMiddleware,
  roleMiddleware(["admin"]),
  createStudent,
);
module.exports = router;

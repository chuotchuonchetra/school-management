const router = require("express").Router();
const multer = require("multer"); // ← was missing
const {
  getAllStudent,
  createStudent,
} = require("../controllers/Student.controller");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });

const uploadFields = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "parentProfileImage", maxCount: 1 },
]);

router.get(
  "/students",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllStudent,
);

router.post(
  "/students",
  authMiddleware,
  roleMiddleware(["admin"]),
  uploadFields,
  createStudent,
);

module.exports = router;

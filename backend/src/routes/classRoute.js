const express = require("express");
const router = express.Router();
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  hardDeleteClass,
  restoreClass,
} = require("../controllers/Class.controller");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

router.get(
  "/classes",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getAllClasses,
);
router.get(
  "/classes/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getClassById,
);
router.post("/classes", authMiddleware, roleMiddleware(["admin"]), createClass);
router.put(
  "/classes/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateClass,
);
router.delete(
  "/classes/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteClass,
); // soft delete
router.delete(
  "/classes/:id/hard",
  authMiddleware,
  roleMiddleware(["admin"]),
  hardDeleteClass,
); // permanent
router.patch(
  "/classes/:id/restore",
  authMiddleware,
  roleMiddleware(["admin"]),
  restoreClass,
); // restore

module.exports = router;

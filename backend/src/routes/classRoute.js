const express = require("express");
const router = express.Router();
const { getAllClasses, createClass, updateClass, deleteClass } = require("../controllers/Class.controller");
const { authMiddleware,roleMiddleware } = require("../middleware/authMiddleware");

router.get("/classes",authMiddleware,roleMiddleware(['admin','teacher']), getAllClasses);
router.post("/classes",authMiddleware,roleMiddleware(['admin']), createClass);
router.put("/classes/:id",authMiddleware,roleMiddleware(['admin']), updateClass);
router.delete("/classes/:id",authMiddleware,roleMiddleware(['admin']), deleteClass);

module.exports = router;
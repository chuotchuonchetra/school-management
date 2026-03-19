const express = require("express");

const {
  login,
  getMe,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchParents,
  register,
} = require("../controllers/User.controller.js");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

// ── Public ────────────────────────────────────────────────────
router.post("/auth/login", login);

// ── Protected ─────────────────────────────────────────────────
router.get("/auth/me", authMiddleware, getMe);

router.get(
  "/users/parents/search", // ← must be before /users/:id
  authMiddleware,
  roleMiddleware(["admin"]),
  searchParents,
);

router.get("/users", authMiddleware, roleMiddleware(["admin"]), getUsers);

router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  getUserById,
);

router.patch("/users/:id", authMiddleware, updateUser);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteUser,
);
router.post(
  "/auth/register",
  authMiddleware,
  roleMiddleware(["admin"]),
  register,
);

module.exports = router;

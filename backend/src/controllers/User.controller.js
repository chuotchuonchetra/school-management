const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const db = require("../models");
const { User, Student } = db;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ─────────────────────────────────────────────────────────────
//  POST /api/auth/register
//  Only admin can register new users
// ─────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, profileImage } =
      req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        message: "firstName, lastName,email, password and role are required",
      });
    }

    // Validate role
    const validRoles = ["admin", "teacher", "student", "parent"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file?.path || profileImage || null,
    });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ─────────────────────────────────────────────────────────────
//  GET /api/auth/me
// ─────────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
//  GET /api/users
// ─────────────────────────────────────────────────────────────
const getUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;

    const where = {};

    if (role) where.role = role;

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows: users, count: total } = await User.findAndCountAll({
      where,
      attributes: { exclude: ["password"] },
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "Users fetched",
      data: users,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
//  GET /api/users/:id
// ─────────────────────────────────────────────────────────────
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
//  PATCH /api/users/:id
// ─────────────────────────────────────────────────────────────
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== Number(id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, phone, relationship, newPassword } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (relationship) updateData.relationship = relationship;

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    if (req.body.profileImage === "") {
      updateData.profileImage = null;
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    await user.update(updateData);

    const updated = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    res.json({ message: "User updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
//  DELETE /api/users/:id
// ─────────────────────────────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id === Number(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
//  SEARCH PARENTS
// ─────────────────────────────────────────────────────────────
const searchParents = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const parents = await User.findAll({
      where: {
        role: "parent",
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Student,
          as: "children",
          attributes: ["id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name"],
            },
          ],
        },
      ],
      limit: 10,
      order: [["name", "ASC"]],
    });

    const data = parents.map((p) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      phone: p.phone,
      profileImage: p.profileImage,
      linkedChildren: p.children.map((c) => c.user?.name ?? ""),
    }));

    res.json({ message: "Parents found", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  getMe,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchParents,
  register,
};

const jwt = require("jsonwebtoken");

// ─────────────────────────────────────────────────────────────
//  authMiddleware — verify JWT token
// ─────────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ─────────────────────────────────────────────────────────────
//  roleMiddleware — check allowed roles
//  Usage: roleMiddleware(["admin", "teacher"])
// ─────────────────────────────────────────────────────────────
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required: ${allowedRoles.join(" or ")}`,
      });
    }
    next();
  };
};
module.exports = {
  authMiddleware,
  roleMiddleware,
};

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const db = require("./models"); // change if your db path is different
const userRoutes = require("./routes/userRoutes"); // CommonJS route

// ── Load env variables ────────────────────────────────────────
dotenv.config({ path: "./src/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logs every request in terminal

// ── Routes ────────────────────────────────────────────────────
app.use("/api", userRoutes);
app.use("/api", require("../src/routes/studentRoutes"));
app.use("/api", require("../src/routes/parentRoute"));

// app.use("/api", studentRoutes)
// app.use("/api", teacherRoutes)
// app.use("/api", classRoutes)
// app.use("/api", subjectRoutes)
// app.use("/api", attendanceRoutes)
// app.use("/api", gradeRoutes)
// app.use("/api", announcementRoutes)

// ── Health check ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "SchoolMS API is running 🎓" });
});

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal server error",
  });
});

// ── Connect DB then start server ──────────────────────────────
const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};
console.log("PORT", process.env.PORT);
start();

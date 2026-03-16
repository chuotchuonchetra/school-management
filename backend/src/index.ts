import express from "express";
import { Sequelize } from "sequelize";

const app = express();
const port = 3000;

// Update these to match your config.json
const sequelize = new Sequelize(
  "school-management-db",
  "postgres",
  "trapostgres",
  {
    host: "127.0.0.1",
    dialect: "postgres",
  },
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

testConnection();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Student, { foreignKey: "studentId",as:"student" });
      this.belongsTo(models.Subject, { foreignKey: "subjectId",as:"subject" });
      this.belongsTo(models.Teacher, { foreignKey: "recordedBy",as:"teacher" });
      this.belongsTo(models.Class, { foreignKey: "classId",as:"class" });
    }
  }
  Attendance.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      classId: DataTypes.UUID,
      studentId: DataTypes.UUID,
      subjectId: DataTypes.UUID,
      date: DataTypes.DATEONLY,
      status: DataTypes.ENUM("present", "absent", "late", "permission"),
      recordedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Attendance",
    },
  );
  return Attendance;
};

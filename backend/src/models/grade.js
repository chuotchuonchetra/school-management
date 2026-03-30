"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Grade.belongsTo(models.Student, { foreignKey: "studentId",as:"student" });
      Grade.belongsTo(models.Subject, { foreignKey: "subjectId",as:"subject" });
      Grade.belongsTo(models.Teacher, { foreignKey: "recordedBy",as:"teacher" });
      Grade.belongsTo(models.Class, { foreignKey: "classId",as:"class" });
    }
  }
  Grade.init(
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
      score: DataTypes.DECIMAL,
      gradeType: DataTypes.ENUM("homework", "exam", "quiz", "project"),
      semester: DataTypes.INTEGER,
      academicYear: DataTypes.STRING,
      recordedBy: DataTypes.INTEGER,
      
    },
    {
      sequelize,
      modelName: "Grade",
    },
  );
  return Grade;
};

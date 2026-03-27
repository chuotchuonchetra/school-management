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
    }
  }
  Grade.init(
    {
      studentId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER,
      score: DataTypes.DECIMAL,
      gradeType: DataTypes.ENUM("homework", "exam", "quiz", "project"),
      semester: DataTypes.INTEGER,
      academicYear: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Grade",
    },
  );
  return Grade;
};

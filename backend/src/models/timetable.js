"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Teacher, {
        foreignKey: "teacherId",
        as: "teacher",
      });
      this.belongsTo(models.Class, { foreignKey: "classId", as: "class" });
      this.belongsTo(models.Subject, {
        foreignKey: "subjectId",
        as: "subject",
      });
    }
  }
  Timetable.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      teacherId: DataTypes.UUID,
      classId: DataTypes.UUID,
      subjectId: DataTypes.UUID,
      day: DataTypes.ENUM(
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ),
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      room: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Timetable",
    },
  );
  return Timetable;
};

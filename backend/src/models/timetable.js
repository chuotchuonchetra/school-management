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
    }
  }
  Timetable.init(
    {
      classId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER,
      day: DataTypes.ENUM(
        "monday",
        "tuesday",
        "wednesday",
        "thuesday",
        "friday",
        "saturday",
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

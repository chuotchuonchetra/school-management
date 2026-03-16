'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init({
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
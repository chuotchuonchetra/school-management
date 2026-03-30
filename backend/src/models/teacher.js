'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Teacher.hasMany(models.Subject, {
        foreignKey: 'teacherId',
        as: 'subjects'
      });
      Teacher.hasMany(models.Timetable, {
        foreignKey: 'teacherId',
        as: 'timetables'
      });
      Teacher.hasMany(models.Attendance, {
        foreignKey: 'recordedBy',
        as: 'recordedAttendances'
      });
      Teacher.hasMany(models.Grade, {
        foreignKey: 'gradedBy',
        as: 'gradedGrades'
      });
      Teacher.hasMany(models.Class, {
        foreignKey: 'teacherId',
        as: 'classes'
      });
    }
  }
  Teacher.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: DataTypes.UUID,
    teacherNumber: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    gender: DataTypes.ENUM("Male", "Female"),
    dateOfBirth: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};
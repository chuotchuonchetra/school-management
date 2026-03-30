'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      // Class belongs to one homeroom teacher
      Class.belongsTo(models.Teacher, {
        foreignKey: 'teacherId',
        as: 'teacher'
      });

      // Class has many students
      Class.hasMany(models.Student, {
        foreignKey: 'classId',
        as: 'students'
      });

      // Class has many subjects through ClassSubject (junction)
      Class.belongsToMany(models.Subject, {
        through: 'ClassSubjects',
        foreignKey: 'classId',
        otherKey: 'subjectId',
        as: 'subjects'
      });

      // Class has many timetable slots
      Class.hasMany(models.Timetable, {
        foreignKey: 'classId',
        as: 'timetables'
      });

      // Class has many attendance records
      Class.hasMany(models.Attendance, {
        foreignKey: 'classId',
        as: 'attendances'
      });

      // Class has many grade records
      Class.hasMany(models.Grade, {
        foreignKey: 'classId',
        as: 'grades'
      });
    }
  }

  Class.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    className: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    section: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    academicYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    roomNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Class',
    tableName: 'Classes',
  });

  return Class;
};
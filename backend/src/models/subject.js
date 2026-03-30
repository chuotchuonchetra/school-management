'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.belongsTo(models.Teacher, {
        foreignKey: 'teacherId',
        as: 'teacher'
      });
      Subject.belongsToMany(models.Class, {
        through: 'ClassSubjects',
        foreignKey: 'subjectId',
        otherKey: 'classId',
        as: 'classes'
      });
      Subject.hasMany(models.Timetable, {
        foreignKey: 'subjectId',
        as: 'timetables'
      });
      Subject.hasMany(models.Attendance, {
        foreignKey: 'subjectId',
        as: 'attendances'
      });
      Subject.hasMany(models.Grade, {
        foreignKey: 'subjectId',
        as: 'grades'
      });
    }
  }

  Subject.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Teachers', key: 'id' }
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Classes', key: 'id' }
    },
    subjectName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    subjectCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Subject',
    tableName: 'Subjects',
    underscored: true
  });

  return Subject;
};
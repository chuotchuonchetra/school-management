"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user has one teacher profile
      User.hasOne(models.Teacher, {
        foreignKey: "userId",
        as: "teacherProfile",
      });

      // user has one student profile
      User.hasOne(models.Student, {
        foreignKey: "userId",
        as: "studentProfile",
      });

      // parent user has many students (children)
      User.hasMany(models.Student, { foreignKey: "parentId", as: "children" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};

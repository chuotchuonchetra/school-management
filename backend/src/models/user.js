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
      User.hasOne(models.Parent, {
        foreignKey: "userId",
        as: "parentProfile",
      });
      User.hasOne(models.ProfileImage, {
        foreignKey: "userId",
        as: "profileImage",
      });
      // parent user has many students (children)
      User.hasMany(models.Student, { foreignKey: "parentId", as: "children" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "teacher", "student", "parent"),
     
    },
    {
      sequelize,
      modelName: "User",
      table: "Users",
    },
  );
  return User;
};

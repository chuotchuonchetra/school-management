"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileImage.belongsTo(models.User, {
        foreignKey: "userId",
        as: "profileImage",
      });
    }
  }
  ProfileImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      image: DataTypes.STRING,
      userId: DataTypes.UUID,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ProfileImage",
    },
  );
  return ProfileImage;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parent.hasMany(models.Student, { foreignKey: "parentId", as: "students" });
      Parent.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Parent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: DataTypes.UUID,
      phone: DataTypes.STRING,
      relationship: DataTypes.ENUM("Father", "Mother", "Guardian"),
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Parent",
    },
  );
  return Parent;
};

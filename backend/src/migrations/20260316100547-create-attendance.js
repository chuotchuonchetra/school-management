"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Attendances", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      studentId: {
        type: Sequelize.UUID,
      },
      subjectId: {
        type: Sequelize.UUID,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      status: {
        type: Sequelize.ENUM("present", "absent", "late", "permission"),
        defaultValue: "present",
        allowNull: false,
      },
      classId: {
        type: Sequelize.UUID,
      },
      recordedBy: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Attendances");
  },
};

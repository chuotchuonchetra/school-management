"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Grades", {
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
      score: {
        type: Sequelize.DECIMAL,
      },
      gradeType: {
        type: Sequelize.ENUM("homework", "exam", "quiz", "project"),
      },
      semester: {
        type: Sequelize.INTEGER,
      },
      academicYear: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Grades");
  },
};

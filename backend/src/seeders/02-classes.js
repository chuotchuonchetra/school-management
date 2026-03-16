"use strict"

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("classes", [
      {
        id:                  1,
        name:                "Class 10A",
        grade_level:         10,
        homeroom_teacher_id: 2,   // Sokha Lim
        created_at:          new Date(),
        updated_at:          new Date(),
      },
      {
        id:                  2,
        name:                "Class 10B",
        grade_level:         10,
        homeroom_teacher_id: 3,   // Nary Chan
        created_at:          new Date(),
        updated_at:          new Date(),
      },
      {
        id:                  3,
        name:                "Class 11A",
        grade_level:         11,
        homeroom_teacher_id: 4,   // Visal Pov
        created_at:          new Date(),
        updated_at:          new Date(),
      },
      {
        id:                  4,
        name:                "Class 11B",
        grade_level:         11,
        homeroom_teacher_id: 5,   // Bopha Keo
        created_at:          new Date(),
        updated_at:          new Date(),
      },
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("classes", null, {})
  },
}

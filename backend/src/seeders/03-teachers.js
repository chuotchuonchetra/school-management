"use strict"

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("teachers", [
      {
        id:             1,
        user_id:        2,          // Sokha Lim
        teacher_number: "TCH-001",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             2,
        user_id:        3,          // Nary Chan
        teacher_number: "TCH-002",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             3,
        user_id:        4,          // Visal Pov
        teacher_number: "TCH-003",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             4,
        user_id:        5,          // Bopha Keo
        teacher_number: "TCH-004",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("teachers", null, {})
  },
}

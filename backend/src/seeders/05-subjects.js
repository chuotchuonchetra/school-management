"use strict"

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("subjects", [

      // ── Class 10A subjects ────────────────────────────────
      { id: 1,  name: "Mathematics",        class_id: 1, teacher_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 2,  name: "English",            class_id: 1, teacher_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 3,  name: "Khmer Literature",   class_id: 1, teacher_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 4,  name: "Science",            class_id: 1, teacher_id: 4, created_at: new Date(), updated_at: new Date() },

      // ── Class 10B subjects ────────────────────────────────
      { id: 5,  name: "Mathematics",        class_id: 2, teacher_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 6,  name: "English",            class_id: 2, teacher_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 7,  name: "Khmer Literature",   class_id: 2, teacher_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 8,  name: "Science",            class_id: 2, teacher_id: 4, created_at: new Date(), updated_at: new Date() },

      // ── Class 11A subjects ────────────────────────────────
      { id: 9,  name: "Mathematics",        class_id: 3, teacher_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 10, name: "English",            class_id: 3, teacher_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 11, name: "Khmer Literature",   class_id: 3, teacher_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 12, name: "Physics",            class_id: 3, teacher_id: 4, created_at: new Date(), updated_at: new Date() },

      // ── Class 11B subjects ────────────────────────────────
      { id: 13, name: "Mathematics",        class_id: 4, teacher_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 14, name: "English",            class_id: 4, teacher_id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 15, name: "Khmer Literature",   class_id: 4, teacher_id: 3, created_at: new Date(), updated_at: new Date() },
      { id: 16, name: "Physics",            class_id: 4, teacher_id: 4, created_at: new Date(), updated_at: new Date() },

    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("subjects", null, {})
  },
}

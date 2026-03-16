"use strict"

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("students", [
      {
        id:             1,
        user_id:        11,         // Sophea Chan
        class_id:       1,          // Class 10A
        parent_id:      6,          // Chan Sopheak (Father)
        student_number: "STD-001",
        academic_year:  "2025-2026",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             2,
        user_id:        12,         // Piseth Keo
        class_id:       1,          // Class 10A
        parent_id:      7,          // Keo Bunna (Mother)
        student_number: "STD-002",
        academic_year:  "2025-2026",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             3,
        user_id:        13,         // Sreymom Ly
        class_id:       2,          // Class 10B
        parent_id:      8,          // Ly Ratha (Father)
        student_number: "STD-003",
        academic_year:  "2025-2026",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             4,
        user_id:        14,         // Dara Pov
        class_id:       2,          // Class 10B
        parent_id:      9,          // Pov Channary (Mother)
        student_number: "STD-004",
        academic_year:  "2025-2026",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             5,
        user_id:        15,         // Kimheng Meas
        class_id:       3,          // Class 11A
        parent_id:      10,         // Meas Sokha (Guardian)
        student_number: "STD-005",
        academic_year:  "2025-2026",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
      {
        id:             6,
        user_id:        16,         // Bopha Meas
        class_id:       3,          // Class 11A
        parent_id:      null,       // no parent
        student_number: "STD-006",
        academic_year:  "2025-2026",
        created_at:     new Date(),
        updated_at:     new Date(),
      },
    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("students", null, {})
  },
}

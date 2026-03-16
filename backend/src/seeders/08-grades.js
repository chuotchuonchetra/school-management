"use strict"

module.exports = {
  async up(queryInterface) {

    await queryInterface.bulkInsert("grades", [

      // ── Sophea Chan (student 1) — Class 10A ──────────────
      // Mathematics (subject 1)
      { id: 1,  student_id: 1, subject_id: 1,  score: 88.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 2,  student_id: 1, subject_id: 1,  score: 92.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 3,  student_id: 1, subject_id: 1,  score: 85.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 4,  student_id: 1, subject_id: 1,  score: 90.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      // English (subject 2)
      { id: 5,  student_id: 1, subject_id: 2,  score: 78.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 6,  student_id: 1, subject_id: 2,  score: 82.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 7,  student_id: 1, subject_id: 2,  score: 80.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 8,  student_id: 1, subject_id: 2,  score: 85.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },

      // ── Piseth Keo (student 2) — Class 10A ───────────────
      { id: 9,  student_id: 2, subject_id: 1,  score: 75.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 10, student_id: 2, subject_id: 1,  score: 70.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 11, student_id: 2, subject_id: 1,  score: 72.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 12, student_id: 2, subject_id: 1,  score: 78.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 13, student_id: 2, subject_id: 2,  score: 65.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 14, student_id: 2, subject_id: 2,  score: 68.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 15, student_id: 2, subject_id: 2,  score: 70.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 16, student_id: 2, subject_id: 2,  score: 72.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },

      // ── Sreymom Ly (student 3) — Class 10B ───────────────
      { id: 17, student_id: 3, subject_id: 5,  score: 95.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 18, student_id: 3, subject_id: 5,  score: 97.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 19, student_id: 3, subject_id: 5,  score: 93.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 20, student_id: 3, subject_id: 5,  score: 98.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 21, student_id: 3, subject_id: 6,  score: 88.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 22, student_id: 3, subject_id: 6,  score: 91.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 23, student_id: 3, subject_id: 6,  score: 89.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 24, student_id: 3, subject_id: 6,  score: 94.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },

      // ── Dara Pov (student 4) — Class 10B ─────────────────
      { id: 25, student_id: 4, subject_id: 5,  score: 60.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 26, student_id: 4, subject_id: 5,  score: 55.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 27, student_id: 4, subject_id: 5,  score: 58.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 28, student_id: 4, subject_id: 5,  score: 62.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 29, student_id: 4, subject_id: 6,  score: 50.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 30, student_id: 4, subject_id: 6,  score: 55.00, grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 31, student_id: 4, subject_id: 6,  score: 52.00, grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 32, student_id: 4, subject_id: 6,  score: 60.00, grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },

      // ── Kimheng Meas (student 5) — Class 11A ─────────────
      { id: 33, student_id: 5, subject_id: 9,  score: 100.00, grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 34, student_id: 5, subject_id: 9,  score: 98.00,  grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 35, student_id: 5, subject_id: 9,  score: 96.00,  grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 36, student_id: 5, subject_id: 9,  score: 99.00,  grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 37, student_id: 5, subject_id: 10, score: 90.00,  grade_type: "assignment", semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 38, student_id: 5, subject_id: 10, score: 93.00,  grade_type: "quiz",       semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 39, student_id: 5, subject_id: 10, score: 91.00,  grade_type: "midterm",    semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },
      { id: 40, student_id: 5, subject_id: 10, score: 95.00,  grade_type: "final",      semester: 1, academic_year: "2025-2026", created_at: new Date(), updated_at: new Date() },

    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("grades", null, {})
  },
}

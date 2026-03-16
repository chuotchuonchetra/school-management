"use strict"

module.exports = {
  async up(queryInterface) {

    // Attendance for students 1-5 across their subjects
    // 3 weeks of data: Dec 2 - Dec 13, 2024
    const records = []
    let id = 1

    // student_id → subject_ids they attend
    const studentSubjects = {
      1: [1, 2, 3, 4],    // Sophea Chan  → Class 10A subjects
      2: [1, 2, 3, 4],    // Piseth Keo   → Class 10A subjects
      3: [5, 6, 7, 8],    // Sreymom Ly   → Class 10B subjects
      4: [5, 6, 7, 8],    // Dara Pov     → Class 10B subjects
      5: [9, 10, 11, 12], // Kimheng Meas → Class 11A subjects
    }

    const dates = [
      "2024-12-02", "2024-12-03", "2024-12-04", "2024-12-05", "2024-12-06",
      "2024-12-09", "2024-12-10", "2024-12-11", "2024-12-12", "2024-12-13",
    ]

    // Predefined statuses to make data realistic
    // student 1 (Sophea) — excellent attendance 95%
    // student 2 (Piseth) — good 85%
    // student 3 (Sreymom) — good 90%
    // student 4 (Dara) — at risk 70%
    // student 5 (Kimheng) — perfect 100%

    const statusMap = {
      1: ["present","present","present","present","present","present","present","present","present","late"],
      2: ["present","present","absent","present","present","present","late","present","present","present"],
      3: ["present","present","present","present","late","present","present","present","present","present"],
      4: ["present","absent","present","absent","present","present","absent","present","late","present"],
      5: ["present","present","present","present","present","present","present","present","present","present"],
    }

    for (const [studentId, subjectIds] of Object.entries(studentSubjects)) {
      dates.forEach((date, dateIndex) => {
        subjectIds.forEach((subjectId) => {
          records.push({
            id:         id++,
            student_id: Number(studentId),
            subject_id: subjectId,
            date:       date,
            status:     statusMap[studentId][dateIndex],
            created_at: new Date(),
            updated_at: new Date(),
          })
        })
      })
    }

    await queryInterface.bulkInsert("attendances", records, {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("attendances", null, {})
  },
}

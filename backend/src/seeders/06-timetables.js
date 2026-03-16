"use strict"

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("timetables", [

      // ── Class 10A timetable ───────────────────────────────
      { id: 1,  class_id: 1, subject_id: 1,  day: "Monday",    start_time: "07:00", end_time: "08:30", room: "101", created_at: new Date(), updated_at: new Date() },
      { id: 2,  class_id: 1, subject_id: 2,  day: "Monday",    start_time: "08:30", end_time: "10:00", room: "101", created_at: new Date(), updated_at: new Date() },
      { id: 3,  class_id: 1, subject_id: 3,  day: "Tuesday",   start_time: "07:00", end_time: "08:30", room: "101", created_at: new Date(), updated_at: new Date() },
      { id: 4,  class_id: 1, subject_id: 4,  day: "Tuesday",   start_time: "08:30", end_time: "10:00", room: "Lab1", created_at: new Date(), updated_at: new Date() },
      { id: 5,  class_id: 1, subject_id: 1,  day: "Wednesday", start_time: "07:00", end_time: "08:30", room: "101", created_at: new Date(), updated_at: new Date() },
      { id: 6,  class_id: 1, subject_id: 2,  day: "Thursday",  start_time: "07:00", end_time: "08:30", room: "101", created_at: new Date(), updated_at: new Date() },
      { id: 7,  class_id: 1, subject_id: 3,  day: "Friday",    start_time: "07:00", end_time: "08:30", room: "101", created_at: new Date(), updated_at: new Date() },

      // ── Class 10B timetable ───────────────────────────────
      { id: 8,  class_id: 2, subject_id: 5,  day: "Monday",    start_time: "07:00", end_time: "08:30", room: "102", created_at: new Date(), updated_at: new Date() },
      { id: 9,  class_id: 2, subject_id: 6,  day: "Monday",    start_time: "08:30", end_time: "10:00", room: "102", created_at: new Date(), updated_at: new Date() },
      { id: 10, class_id: 2, subject_id: 7,  day: "Tuesday",   start_time: "07:00", end_time: "08:30", room: "102", created_at: new Date(), updated_at: new Date() },
      { id: 11, class_id: 2, subject_id: 8,  day: "Tuesday",   start_time: "08:30", end_time: "10:00", room: "Lab1", created_at: new Date(), updated_at: new Date() },
      { id: 12, class_id: 2, subject_id: 5,  day: "Wednesday", start_time: "07:00", end_time: "08:30", room: "102", created_at: new Date(), updated_at: new Date() },
      { id: 13, class_id: 2, subject_id: 6,  day: "Thursday",  start_time: "07:00", end_time: "08:30", room: "102", created_at: new Date(), updated_at: new Date() },
      { id: 14, class_id: 2, subject_id: 7,  day: "Friday",    start_time: "07:00", end_time: "08:30", room: "102", created_at: new Date(), updated_at: new Date() },

      // ── Class 11A timetable ───────────────────────────────
      { id: 15, class_id: 3, subject_id: 9,  day: "Monday",    start_time: "07:00", end_time: "08:30", room: "201", created_at: new Date(), updated_at: new Date() },
      { id: 16, class_id: 3, subject_id: 10, day: "Monday",    start_time: "08:30", end_time: "10:00", room: "201", created_at: new Date(), updated_at: new Date() },
      { id: 17, class_id: 3, subject_id: 11, day: "Tuesday",   start_time: "07:00", end_time: "08:30", room: "201", created_at: new Date(), updated_at: new Date() },
      { id: 18, class_id: 3, subject_id: 12, day: "Tuesday",   start_time: "08:30", end_time: "10:00", room: "Lab2", created_at: new Date(), updated_at: new Date() },
      { id: 19, class_id: 3, subject_id: 9,  day: "Wednesday", start_time: "07:00", end_time: "08:30", room: "201", created_at: new Date(), updated_at: new Date() },
      { id: 20, class_id: 3, subject_id: 10, day: "Thursday",  start_time: "07:00", end_time: "08:30", room: "201", created_at: new Date(), updated_at: new Date() },
      { id: 21, class_id: 3, subject_id: 11, day: "Friday",    start_time: "07:00", end_time: "08:30", room: "201", created_at: new Date(), updated_at: new Date() },

    ], {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("timetables", null, {})
  },
}

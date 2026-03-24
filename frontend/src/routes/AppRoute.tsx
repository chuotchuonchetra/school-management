import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { PublicRoute } from "./PublicRoute"
import { ProtectedRoute } from "./ProtectedRoute"

// ── Auth ──────────────────────────────────────────────────────
import LoginPage from "@/pages/auth/LoginPage"

// ── Admin ─────────────────────────────────────────────────────
import { AdminDashboard } from "@/pages/admin/AdminDashboard"
import { StudentsPage } from "@/pages/admin/StudentsPage"
import { TeachersPage } from "@/pages/admin/TeachersPage"
import { ClassesPage } from "@/pages/admin/ClassesPage"
import { SubjectsPage } from "@/pages/admin/SubjectsPage"

import { AnnouncementsPage } from "@/pages/admin/AnnouncementsPage"

// ── Teacher ───────────────────────────────────────────────────
import { TeacherDashboard } from "@/pages/teacher/TeacherDashboard"
import { GradesPage } from "@/pages/teacher/GradesPage"
import { TimetablePage } from "@/pages/teacher/TimetablePage"

// ── Student ───────────────────────────────────────────────────
import { StudentDashboard } from "@/pages/student/StudentDashboard"
import { MyGradesPage } from "@/pages/student/MyGradesPage"
import { MyAttendancePage } from "@/pages/student/MyAttendancePage"
import { SchedulePage } from "@/pages/student/SchedulePage"
import { ReportCardPage } from "@/pages/student/ReportCardPage"

// ── Parent ────────────────────────────────────────────────────
import { ParentDashboard } from "@/pages/parent/ParentDashboard"
import { ChildGradesPage } from "@/pages/parent/ChildGradesPage"
import { ChildAttendancePage } from "@/pages/parent/ChildAttendancePage"

import AttendancePage from "@/pages/teacher/AttendancePage"
import { ChildReportCard } from "@/pages/parent/ChildReportCard"
import ParentManager from "@/test/EditParentSection"

// ─────────────────────────────────────────────────────────────
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Default redirect ── */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ── Public — only accessible when NOT logged in ── */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* ════════════════════════════════════════════════ */}
        {/* ADMIN                                           */}
        {/* ════════════════════════════════════════════════ */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsPage />} />
            <Route path="/admin/teachers" element={<TeachersPage />} />
            <Route path="/admin/classes" element={<ClassesPage />} />
            <Route path="/admin/subjects" element={<SubjectsPage />} />
            <Route path="/admin/timetables" element={<TimetablePage />} />
            <Route
              path="/admin/announcements"
              element={<AnnouncementsPage />}
            />
          </Route>
        </Route>

        {/* ════════════════════════════════════════════════ */}
        {/* TEACHER                                         */}
        {/* ════════════════════════════════════════════════ */}
        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/attendance" element={<AttendancePage />} />
            <Route path="/teacher/grades" element={<GradesPage />} />
            <Route path="/teacher/timetable" element={<TimetablePage />} />
          </Route>
        </Route>

        {/* ════════════════════════════════════════════════ */}
        {/* STUDENT                                         */}
        {/* ════════════════════════════════════════════════ */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/grades" element={<MyGradesPage />} />
            <Route path="/student/attendance" element={<MyAttendancePage />} />
            <Route path="/student/schedule" element={<SchedulePage />} />
            <Route path="/student/report-card" element={<ReportCardPage />} />
          </Route>
        </Route>

        {/* ════════════════════════════════════════════════ */}
        {/* PARENT                                          */}
        {/* ════════════════════════════════════════════════ */}
        <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/grades" element={<ChildGradesPage />} />
            <Route
              path="/parent/attendance"
              element={<ChildAttendancePage />}
            />
            <Route path="/parent/report-card" element={<ChildReportCard />} />
          </Route>
        </Route>
        <Route path="/testingeditparent" element={<ParentManager/>}/>
        {/* ── 404 — catch all unknown routes ── */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

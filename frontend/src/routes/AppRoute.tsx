import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { LoginForm } from "@/components/login-form"
import { AdminDashboard } from "@/pages/admin/AdminDashboard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { StudentsPage } from "@/pages/admin/StudentsPage"
import { TeacherDashboard } from "@/pages/teacher/TeacherDashboard"
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm className="px-10 py-25 lg:p-25"></LoginForm>}
        />
        <Route
          path="/login"
          element={<LoginForm className="px-10 py-25 lg:p-25" />}
        />
        <Route element={<ProtectedRoute allowedRoles={"admin"} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsPage />} />
            {/* <Route path="/admin/students" element={<StudentsPage />} />
          <Route path="/admin/teachers" element={<TeachersPage />} /> */}
          </Route>
        </Route>
        {/* Teacher only */}
        <Route element={<ProtectedRoute allowedRoles={"teacher"} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/teacher" element={<TeacherDashboard />} />
            {/* <Route path="/teacher/attendance" element={<AttendancePage />} /> */}
            {/* <Route path="/teacher/grades" element={<GradesPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

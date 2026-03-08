import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { LoginForm } from "@/components/login-form"
import { AdminDashboard } from "@/pages/admin/AdminDashboard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm className="px-10 py-25 lg:p-25" />}
        />
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/admin/students" element={<StudentsPage />} />
          <Route path="/admin/teachers" element={<TeachersPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

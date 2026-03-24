import { Navigate, Outlet } from "react-router-dom"

const ROLE_HOME: Record<string, string> = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
  parent: "/parent/dashboard",
}

interface ProtectedRouteProps {
  allowedRoles: string[]
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token")
  const userRole = localStorage.getItem("role")

  if (!token || !userRole) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={ROLE_HOME[userRole] ?? "/login"} replace />
  }

  return <Outlet />
}

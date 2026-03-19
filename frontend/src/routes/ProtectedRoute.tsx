import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  allowedRoles: string
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const userRole = localStorage.getItem("role")
  if (!userRole) return <Navigate to="/login" />

  if (userRole !== allowedRoles) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

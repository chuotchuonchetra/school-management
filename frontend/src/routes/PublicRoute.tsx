import { ROLE_ROUTES, type UserRole } from "@/utils/roleRedirect"
import { Navigate, Outlet } from "react-router-dom"

export const PublicRoute = () => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role") as UserRole

  if (token && role && ROLE_ROUTES[role]) {
    return <Navigate to={ROLE_ROUTES[role]} replace />
  }

  return <Outlet />
}

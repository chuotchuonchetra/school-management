import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  allowedRoles: string
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  //   const { user } = useAuth()
  //   const userRole = localStorage.getItem("role")
  const userRole = allowedRoles
  if (!userRole) return <Navigate to="/login" />

  if (!allowedRoles.includes(userRole)) {
    console.log(allowedRoles, userRole)
    return <Navigate to={`/${userRole}`} /> // redirect to their own dashboard
  }

  return <Outlet />
}

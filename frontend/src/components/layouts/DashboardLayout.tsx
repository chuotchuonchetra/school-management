import { LayoutDashboard, User } from "lucide-react"
import { Navbar } from "../shared/Navbar"
import { Sidebar } from "../shared/Sidebar"
import { Outlet } from "react-router-dom"
interface listI {
  icon: React.ReactElement
  listLebel: string
  path: string
}
const list: listI[] = [
  {
    icon: <LayoutDashboard size={14} />,
    listLebel: "Dashboard",
    path: "/admin/dashboard",
  },
  { icon: <User size={14} />, listLebel: "Students", path: "/admin/students" },
]

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar list={list} role="admin" />
        <main className="mt-16 flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

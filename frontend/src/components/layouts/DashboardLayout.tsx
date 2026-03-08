import { LayoutDashboard, User } from "lucide-react"
import { Navbar } from "../shared/Navbar"
import { Sidebar } from "../shared/Sidebar"
import { Outlet } from "react-router-dom"
interface listI {
  icon: React.ReactElement
  listLebel: string
}
const list: listI[] = [
  { icon: <LayoutDashboard size={14} />, listLebel: "Dashboard" },
  { icon: <User size={14} />, listLebel: "Students" },
]
export const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar list={list} role="admin" />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="overflow-aut ms-50 mt-15 flex-1 bg-blue-300 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

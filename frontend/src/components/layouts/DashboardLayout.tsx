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
    path: "/admin",
  },
  { icon: <User size={14} />, listLebel: "Students", path: "/admin/students" },
]
// export const DashboardLayout = () => {
//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex flex-1 flex-col">
//         <Sidebar list={list} role="admin" />
//         <main className="mt-15 overflow-auto bg-gray-50 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }
export const DashboardLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Navbar stays at the top */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar stays on the left */}
        <Sidebar list={list} role="admin" />

        {/* Main/Outlet fills the remaining space */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

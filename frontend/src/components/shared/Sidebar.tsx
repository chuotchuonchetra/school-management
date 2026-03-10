import type { role } from "@/constants/roles"
import { Settings } from "lucide-react"
import { NavLink } from "react-router-dom"
interface list {
  icon: React.ReactElement
  listLebel: string
  path: string
}
interface SideBar {
  list: list[]
  role: role
}
export const Sidebar = (props: SideBar) => {
  // Use useLocation instead of useState for better "active" tracking
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white px-4">
      <div className="py-6 text-xs font-bold tracking-wider text-gray-400 uppercase">
        {props.role}
      </div>

      <nav className="flex-1">
        {props.list.map((l) => (
          <NavLink
            key={l.listLebel}
            to={l.path}
            // Add 'end' if the path is the base admin path
            end={l.path === "/admin"}
            className={({ isActive }) =>
              `my-2 flex items-center gap-2 rounded-lg p-2 transition-colors ${
                isActive
                  ? "bg-blue-500/10 font-medium text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-800"
              }`
            }
          >
            {l.icon} {l.listLebel}
          </NavLink>
        ))}
      </nav>

      <div className="flex cursor-pointer items-center gap-2 border-t py-4 text-gray-600 hover:text-blue-600">
        <Settings size={18} /> Settings
      </div>
    </div>
  )
}

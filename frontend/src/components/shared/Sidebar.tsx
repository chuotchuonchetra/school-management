import type { role } from "@/constants/roles"
interface list {
  icon: React.ReactElement
  listLebel: string
}
interface SideBar {
  list: list[]
  role: role
}
export const Sidebar = (props: SideBar) => {
  return (
    <div className="fixed left-0 mt-15 h-screen w-50 border-r bg-white px-4">
      <div className="pt-4 font-bold uppercase">{props.role}</div>
      {props.list.map((l) => (
        <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-blue-500/10 hover:text-blue-800">
          {l.icon} {l.listLebel}
        </div>
      ))}
    </div>
  )
}

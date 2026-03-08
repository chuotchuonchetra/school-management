import { School } from "lucide-react"

export const Navbar = () => {
  return (
    <div className="fixed top-0 flex h-15 w-screen items-center justify-between border-b bg-white px-5">
      <div className="flex items-center">
        <School size={20} /> <span className="text-lg font-bold">SchoolMS</span>
      </div>
      <div className="profile font h-10 w-10 rounded-full bg-amber-500 p-1 text-center text-2xl font-medium">
        T
      </div>
    </div>
  )
}

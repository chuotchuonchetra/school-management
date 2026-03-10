import type { StudentListItem } from "@/types/student.types"
import { Button } from "../ui/button"

// Helper function for dynamic badge colors
// const getStatusStyles = (status: string) => {
//   switch (status) {
//     case "Present":
//       return "bg-emerald-50 text-emerald-500"
//     case "Absent":
//       return "bg-rose-50 text-rose-500"
//     case "Late":
//       return "bg-orange-50 text-orange-500"
//     default:
//       return "bg-gray-50 text-gray-500"
//   }
// }
const getAttendanceColor = (rate: number): string => {
  switch (true) {
    case rate >= 90:
      return "bg-green-600" // Excellent
    case rate >= 80:
      return "bg-yellow-500" // Average
    case rate >= 70:
      return "bg-orange-500" // Warning
    default:
      return "bg-red-600" // Critical
  }
}

// Helper function for dynamic progress bar colors
// const getBarColor = (status: string) => {
//   switch (status) {
//     case "Present":
//       return "bg-emerald-500"
//     case "Absent":
//       return "bg-rose-500"
//     case "Late":
//       return "bg-blue-500"
//     default:
//       return "bg-gray-400"
//   }
// }
const recentStudents: StudentListItem[] = [
  {
    id: 1,
    studentNumber: "STU-2026-001",
    name: "Alex Thompson",
    email: "alex.t@school.edu",
    className: "10-A",
    parentName: "Sarah Thompson",
    attendanceRate: 98.5,
  },
  {
    id: 2,
    studentNumber: "STU-2026-002",
    name: "Jordan Rivera",
    email: "j.rivera@school.edu",
    className: "10-B",
    parentName: "Carlos Rivera",
    attendanceRate: 82.0,
  },
  {
    id: 3,
    studentNumber: "STU-2026-003",
    name: "Samira Khan",
    email: "s.khan@school.edu",
    className: "10-A",
    parentName: "Amina Khan",
    attendanceRate: 100.0,
  },
  {
    id: 4,
    studentNumber: "STU-2026-004",
    name: "Liam O'Connor",
    email: "liam.oc@school.edu",
    className: "12-C",
    // parentName is optional, testing the undefined case
    attendanceRate: 75.4,
  },
  {
    id: 5,
    studentNumber: "STU-2026-005",
    name: "Chloe Chen",
    email: "c.chen@school.edu",
    className: "11-B",
    parentName: "David Chen",
    attendanceRate: 92.1,
  },
]
const getColorStudentPf = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ]
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
interface DataTableHead {
  thead: string[]
  hiddenColumns?: string[]
}
export const DataTable = ({ thead, hiddenColumns }: DataTableHead) => {
  // localStorage.setItem("role", "teacher")
  // const userRole = localStorage.getItem("role")

  const visible = thead.filter((th) => !hiddenColumns?.includes(th))

  return (
    <div className="rounded-2xl p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-xs tracking-wider text-gray-400 uppercase">
              {visible.map((th, index) => (
                <th key={index} className="font-medium">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentStudents.map((student) => (
              <tr
                key={student.studentNumber}
                className="group transition-colors hover:bg-gray-50/50"
              >
                {/* Student Name & Avatar */}
                <td className="max-w-25 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${getColorStudentPf()}`}
                    >
                      {student.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {student.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 lowercase">{student.studentNumber}</td>
                {/* Class */}
                <td className="py-3 text-sm text-gray-500">
                  {student.className}
                </td>
                <td className="py-3 text-sm text-gray-500">
                  {student.parentName}
                </td>
                {/* Attendance Progress Bar */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 max-w-30 flex-1 rounded-full bg-gray-300">
                      <div
                        className={`h-1.5 rounded-full ${getAttendanceColor(student.attendanceRate)}`}
                        style={{ width: `${student.attendanceRate}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      {student.attendanceRate}%
                    </span>
                  </div>
                </td>
                {/* parent name */}

                {hiddenColumns?.length == 0 ? (
                  <>
                    <td>
                      <Button variant={"outline"}>Edit</Button>
                    </td>
                    <td>
                      <Button variant={"outline"}>Delete</Button>
                    </td>
                  </>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

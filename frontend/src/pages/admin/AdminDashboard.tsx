import { DataTable } from "@/components/shared/DataTable"
import { StatCard } from "@/components/shared/StatCard"

import type { StudentListItem } from "@/types/student.types"

interface StatCardType {
  title: string
  value: string | number
  color: string
  subText: string
}

const statCard: StatCardType[] = [
  {
    color: "red",
    subText: "12 enrolled this month",
    title: "total student",
    value: 1240,
  },
  {
    color: "bg-yellow-500",
    subText: "12 enrolled this month",
    title: "total student",
    value: 1240,
  },
  {
    color: "bg-red-400",
    subText: "12 enrolled this month",
    title: "total student",
    value: 1240,
  },
  {
    color: "bg-blue-500",
    subText: "12 enrolled this month",
    title: "total student",
    value: 1240,
  },
]
const recentStudents: StudentListItem[] = [
  {
    id: 1,
    studentNumber: "STU-2026-001",
    name: "Alex Thompson",
    email: "alex.t@school.edu",
    profileImage:
      "https://i.pinimg.com/736x/e5/de/b4/e5deb4d86e6bed2a3ae303dce1a201fe.jpg",
    className: "10-A",
    parentName: "Sarah Thompson",
    attendanceRate: 98.5,
    isAtRisk: false,
  },
  {
    id: 2,
    studentNumber: "STU-2026-002",
    name: "Jordan Rivera",
    email: "j.rivera@school.edu",
    profileImage: null,
    className: "10-B",
    parentName: "Carlos Rivera",
    attendanceRate: 82.0,
    isAtRisk: false,
  },
  {
    id: 3,
    studentNumber: "STU-2026-003",
    name: "Samira Khan",
    email: "s.khan@school.edu",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samira",
    className: "10-A",
    parentName: "Amina Khan",
    attendanceRate: 100.0,
    isAtRisk: false,
  },
  {
    id: 4,
    studentNumber: "STU-2026-004",
    name: "Liam O'Connor",
    email: "liam.oc@school.edu",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    className: "12-C",
    parentName: null,
    attendanceRate: 74.0,
    isAtRisk: true,
  },
  {
    id: 5,
    studentNumber: "STU-2026-005",
    name: "Chloe Chen",
    email: "c.chen@school.edu",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
    className: "11-B",
    parentName: "David Chen",
    attendanceRate: 92.1,
    isAtRisk: false,
  },
]
const thead: string[] = [
  "student",
  "studentid",
  "class",
  "attendence",
  "parentname",
  "status",
  "action",
]
export const AdminDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCard.map((st, index) => (
          <StatCard {...st} key={index} />
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1/5 rounded-2xl border shadow-md">
          <DataTable
            thead={thead}
            data={recentStudents}
            renderRow={(student) => (
              <>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Logic Here */}
                    <span className="text-sm font-semibold">
                      {student.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-sm">{student.studentNumber}</td>
                <td className="py-3 text-sm">{student.className}</td>
                <td className="py-3 text-sm">{student.parentName ?? "—"}</td>
              </>
            )}
          />
        </div>
        <div className="flex-1 rounded-2xl border shadow-md"></div>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
        <div className="h-40 rounded-2xl border p-4 shadow-md">
          <h1 className="font-black">Top Classes</h1>
          <div className="mt-2">
            <h1 className="text-sm"> Class 10A</h1>
            <div className="rounded-full bg-gray-300">
              <div
                style={{ width: "80%" }}
                className="h-1.5 rounded-full bg-green-500"
              ></div>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-sm"> Class 10A</h1>
            <div className="rounded-full bg-gray-300">
              <div
                style={{ width: "80%" }}
                className="h-1.5 rounded-full bg-green-500"
              ></div>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-sm"> Class 10A</h1>
            <div className="rounded-full bg-gray-300">
              <div
                style={{ width: "80%" }}
                className="h-1.5 rounded-full bg-green-500"
              ></div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border shadow-md"></div>
        <div className="rounded-2xl border shadow-md"></div>
      </div>
    </div>
  )
}

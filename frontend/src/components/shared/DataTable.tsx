import type { StudentListItem } from "@/types/student.types"
import { Button } from "../ui/button"
import { useState } from "react"
import { EditStudentForm } from "../admin/edit-student-form/EditStudentForm"

// ── Mock data ─────────────────────────────────────────────────
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

// ── Helpers ───────────────────────────────────────────────────

// Random color for avatar fallback (when profileImage is null)
const getAvatarColor = (name: string) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ]
  // Use name charCode so the same person always gets the same color
  return colors[name.charCodeAt(0) % colors.length]
}

// Progress bar color based on attendance rate
const getBarColor = (rate: number | null) => {
  if (rate === null) return "bg-gray-300"
  if (rate >= 90) return "bg-green-500"
  if (rate >= 75) return "bg-yellow-500"
  return "bg-red-500"
}

// ── Props ─────────────────────────────────────────────────────
interface DataTableHead {
  thead: string[]
  hiddenColumns?: string[]
}

// ── Component ─────────────────────────────────────────────────
export const DataTable = ({ thead, hiddenColumns }: DataTableHead) => {
  const [isEdit, setIsEdit] = useState(false)

  // ✅ Fix 1: type is StudentListItem, not StudentInfoData
  const [selectedStudent, setSelectedStudent] =
    useState<StudentListItem | null>(null)

  const visible = thead.filter((th) => !hiddenColumns?.includes(th))

  const handleEditClick = (e: React.MouseEvent, student: StudentListItem) => {
    e.stopPropagation() // prevent row click from also firing
    setSelectedStudent(student) // ✅ Fix 2: pass the whole student object
    setIsEdit(true)
  }

  return (
    <div className="rounded-2xl p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-xs font-medium tracking-wider text-gray-400 uppercase">
              {visible.map((th, index) => (
                <th key={index} className="py-2 pr-4">
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
                {/* ── Avatar + Name ── */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    {student.profileImage ? (
                      <img
                        src={student.profileImage}
                        alt={student.name}
                        className="h-8 w-8 rounded-full border object-cover"
                      />
                    ) : (
                      // ✅ Fix 3: use name-based color, not random (avoids re-render flicker)
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(student.name)}`}
                      >
                        {student.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-slate-700">
                      {student.name}
                    </span>
                  </div>
                </td>

                {/* ── Student Number ── */}
                <td className="py-3 pr-4 text-sm text-gray-500 lowercase">
                  {student.studentNumber}
                </td>

                {/* ── Class ── */}
                <td className="py-3 pr-4 text-sm text-gray-500">
                  {student.className}
                </td>

                {/* ── Parent ── */}
                <td className="py-3 pr-4 text-sm text-gray-500">
                  {student.parentName ?? "—"}
                </td>

                {/* ── Attendance bar ── */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 flex-1 rounded-full bg-gray-200">
                      <div
                        // ✅ Fix 4: use getBarColor(), not attendanceRate as className
                        className={`h-1.5 rounded-full ${getBarColor(student.attendanceRate)}`}
                        style={{ width: `${student.attendanceRate ?? 0}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${student.isAtRisk ? "text-red-500" : "text-gray-400"}`}
                    >
                      {student.attendanceRate !== null
                        ? `${student.attendanceRate}%`
                        : "—"}
                    </span>
                    {/* At risk badge */}
                    {student.isAtRisk && (
                      <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-500">
                        At Risk
                      </span>
                    )}
                  </div>
                </td>

                {/* ── Actions (only shown when no hidden columns) ── */}
                {!hiddenColumns?.length && (
                  <>
                    <td className="py-3 pr-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleEditClick(e, student)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className="py-3">
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Edit modal ── */}
        {isEdit && selectedStudent && (
          <EditStudentForm
            isEdit={isEdit}
            // ✅ key uses id (number) — guarantees fresh mount per student
            key={selectedStudent.id}
            student={selectedStudent}
            onClose={() => {
              setIsEdit(false)
              setSelectedStudent(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

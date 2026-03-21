import { EditStudentForm } from "@/components/admin/edit-student-form/EditStudentForm"
import { StudentForm } from "@/components/admin/StudentForm"
import { DataTable } from "@/components/shared/DataTable"
import { StatCard } from "@/components/shared/StatCard"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { StudentListItem } from "@/types/student.types"
import axios from "axios"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface StatCardType {
  title: string
  value: string | number
  color?: string
  subText?: string
}
const studentStatCard: StatCardType[] = [
  {
    title: "total",
    value: 1240,
  },
  {
    title: "active",
    value: 1198,
  },
  {
    title: "new this month",
    value: 12,
  },
  {
    title: "low attendance",
    value: 23,
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
// const recentStudents: StudentListItem[] = [
//   {
//     id: 1,
//     studentNumber: "STU-2026-001",
//     name: "Alex Thompson",
//     email: "alex.t@school.edu",
//     profileImage:
//       "https://i.pinimg.com/736x/e5/de/b4/e5deb4d86e6bed2a3ae303dce1a201fe.jpg",
//     className: "10-A",
//     parentName: "Sarah Thompson",
//     attendanceRate: 98.5,
//     isAtRisk: false,
//   },
//   {
//     id: 2,
//     studentNumber: "STU-2026-002",
//     name: "Jordan Rivera",
//     email: "j.rivera@school.edu",
//     profileImage: null,
//     className: "10-B",
//     parentName: "Carlos Rivera",
//     attendanceRate: 82.0,
//     isAtRisk: false,
//   },
//   {
//     id: 3,
//     studentNumber: "STU-2026-003",
//     name: "Samira Khan",
//     email: "s.khan@school.edu",
//     profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samira",
//     className: "10-A",
//     parentName: "Amina Khan",
//     attendanceRate: 100.0,
//     isAtRisk: false,
//   },
//   {
//     id: 4,
//     studentNumber: "STU-2026-004",
//     name: "Liam O'Connor",
//     email: "liam.oc@school.edu",
//     profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
//     className: "12-C",
//     parentName: null,
//     attendanceRate: 74.0,
//     isAtRisk: true,
//   },
//   {
//     id: 5,
//     studentNumber: "STU-2026-005",
//     name: "Chloe Chen",
//     email: "c.chen@school.edu",
//     profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
//     className: "11-B",
//     parentName: "David Chen",
//     attendanceRate: 92.1,
//     isAtRisk: false,
//   },
// ]
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
export const StudentsPage = () => {
  const [data, setData] = useState<StudentListItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>()

  useEffect(() => {
    const getApi = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const formattedData: StudentListItem[] = res.data.data.map(
          (student: any) => ({
            id: student.id,
            studentNumber: student.studentNumber,

            name:
              `${student.user?.firstName ?? ""} ${student.user?.lastName ?? ""}`.trim() ||
              "Unknown",
            email: student.user?.email || "",
            profileImage: student.user?.profileImage || null,

            className: `Class ${student.classId}`,

            parentName: student.parent?.user
              ? `${student.parent.user.firstName ?? ""} ${student.parent.user.lastName ?? ""}`.trim()
              : "—",
          })
        )
        setData(formattedData)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getApi()
  }, [])

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedStudent, setSelectedStudent] =
    useState<StudentListItem | null>(null)

  // ── Handler ──
  const handleEditClick = (student: StudentListItem) => {
    setSelectedStudent(student)
    setIsEdit(true)
  }
  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {studentStatCard.map((card) => (
          <div key={card.title}>
            <StatCard {...card} />
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border shadow-md">
        <div className="grid grid-cols-4 items-center p-6">
          <Input
            type="text"
            placeholder="Search students by name or ID..."
            className="h-9"
          />
          <Select>
            <SelectTrigger className="w-45 py-4.5">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-45 py-4.5">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Dialog open={isOpen} onOpenChange={handleModal}>
            <DialogTrigger
              onClick={() => handleModal()}
              className={
                "text-md flex w-42 items-center justify-center rounded-md border bg-blue-500 p-1.5 text-white"
              }
            >
              <Plus size={14} /> <span> Add New Student</span>
            </DialogTrigger>
            <DialogContent size="xl">
              <DialogHeader>
                <DialogTitle></DialogTitle>

                <div className="">
                  <StudentForm onClose={handleModal} />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          isLoadig={isLoading!}
          thead={thead}
          data={data} // Your mock data
          renderRow={(student) => (
            <>
              {/* ── Avatar + Name (Styled Cell) ── */}
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  {student.profileImage ? (
                    <img
                      src={student.profileImage}
                      className="h-8 w-8 rounded-full border object-cover"
                    />
                  ) : (
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
              <td className="py-3 pr-4 text-sm text-gray-500 uppercase">
                {student.studentNumber}
              </td>

              {/* ── Class ── */}
              <td className="py-3 pr-4 text-sm text-gray-500">
                {student.className}
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 flex-1 rounded-full bg-gray-200">
                    <div
                    // className={`h-1.5 rounded-full ${getBarColor(student.attendanceRate)}`}
                    // style={{ width: `${student.attendanceRate}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    {/* {student.attendanceRate}% */}
                  </span>
                </div>
              </td>

              {/* ── Parent ── */}
              <td className="py-3 pr-4 text-sm text-gray-500">
                {student.parentName ?? "—"}
              </td>

              <td className="py-3 pr-4 text-sm text-gray-500">
                {/* {student.isAtRisk ? "Rist" : "Active"} */}
              </td>

              {/* ── Actions ── */}
              <td className="flex gap-2 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.success("Deleted succesfully", {
                      position: "top-right",
                    })
                  }
                >
                  Delete
                </Button>
              </td>
            </>
          )}
        />
        {isEdit && selectedStudent && (
          <EditStudentForm
            isEdit={isEdit}
            key={selectedStudent.id} // Forces re-mount if you switch students
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

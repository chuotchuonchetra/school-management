import { EditStudentForm } from "@/components/admin/edit-student-form/EditStudentForm"
import { StudentForm } from "@/components/admin/StudentForm"
import { DataTable } from "@/components/shared/DataTable"
import { StatCard } from "@/components/shared/StatCard"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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

// ── TanStack ──────────────────────────────────────────────────
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteStudent } from "@/api/student.api"
import { getStudentById } from "@/api/student.api"

// ── Hooks & Types ─────────────────────────────────────────────
import { useStudents } from "@/hooks/useStudents"
import type { StudentListItem } from "@/types/student.types"
import { Plus } from "lucide-react"
import { useState } from "react"

// ─────────────────────────────────────────────────────────────
//  STAT CARDS
// ─────────────────────────────────────────────────────────────
const studentStatCard = [
  { title: "total", value: 1240 },
  { title: "active", value: 1198 },
  { title: "new this month", value: 12 },
  { title: "low attendance", value: 23 },
]

const thead = [
  "no",
  "student",
  "studentid",
  "class",
  "parentname",
  "attendence",
  "status",
  "action",
]

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────
const getBarColor = (rate: number) => {
  if (rate >= 90) return "bg-green-500"
  if (rate >= 75) return "bg-blue-500"
  if (rate >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

const getClassColor = (className: string) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-orange-100 text-orange-600",
  ]
  return colors[className.charCodeAt(0) % colors.length]
}

const getStatus = (rate: number) => (rate < 70 ? "Low Att." : "Active")
const getStatusColor = (rate: number) =>
  rate < 70 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"

// ─────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────
export const StudentsPage = () => {
  // ── 1. Filter state ───────────────────────────────────────
  // These drive the queryKey — changing them auto-refetches
  const [search, setSearch] = useState("")
  const [classId, setClassId] = useState<number | undefined>()

  // ── 2. Fetch student list with filters ────────────────────
  // useStudents passes { search, classId } to the API
  // queryKey = ["students", { search, classId }]
  // → changes to search or classId trigger a new fetch automatically
  const { data = [], isLoading, error } = useStudents()

  // ── 3. Modal state ────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  // ── 4. Full student for edit modal (Student, not StudentListItem)
  // We fetch the full student object only when Edit is clicked
  // StudentListItem doesn't have enough parent data to pre-fill the form
  const [editTarget, setEditTarget] = useState<any | null>(null)

  // ── 5. queryClient — used to refresh list after mutations ─
  const queryClient = useQueryClient()

  // ── 6. Delete mutation ────────────────────────────────────
  // useMutation wraps the delete API call
  // onSuccess → invalidateQueries tells TanStack to refetch ["students"]
  // This means the table refreshes automatically after a delete
  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
    },
  })

  // ── 7. Edit click — fetch full student first ──────────────
  // We can't use the StudentListItem from the table because it's
  // missing full parent data (phone, relationship, profileImage etc.)
  // So we call GET /api/students/:id to get the complete object
  const handleEditClick = async (student: StudentListItem) => {
    console.log(student.id, student.name)
    
    setLoadingId(student.id) // show spinner on that row
    try {
      const res = await getStudentById(student.id)
      setEditTarget(res.data) 
      setIsEdit(true)
    } catch (err) {
      console.error("Failed to load student", err)
    } finally {
      setLoadingId(null) 
    }
  }

  if (error) return <p>Error loading students</p>

  return (
    <div>
      {/* Stat cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {studentStatCard.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border shadow-md">
        {/* Top bar */}
        <div className="grid grid-cols-4 items-center gap-3 p-6">
          {/* Search — onChange updates state → triggers refetch */}
          <Input
            placeholder="Search students by name or ID..."
            className="h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Class filter — onValueChange updates state → triggers refetch */}
          <Select
            value={classId ? String(classId) : ""}
            onValueChange={(v) => setClassId(v ? Number(v) : undefined)}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">All Classes</SelectItem>
                <SelectItem value="1">Class 10A</SelectItem>
                <SelectItem value="2">Class 10B</SelectItem>
                <SelectItem value="3">Class 11A</SelectItem>
                <SelectItem value="4">Class 11B</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Add student dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="flex w-50 items-center justify-center rounded-md bg-blue-500 p-1 text-white">
              <Plus size={14} /> Add Student
            </DialogTrigger>

            <DialogContent size="xl">
              <DialogHeader>
                <DialogTitle>Add Student</DialogTitle>
              </DialogHeader>

              <StudentForm
                onClose={() => setIsOpen(false)}
                // After successful create → close modal + refresh list
                onSuccess={() => {
                  setIsOpen(false)
                  queryClient.invalidateQueries({ queryKey: ["students"] })
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <DataTable
          isLoading={isLoading}
          thead={thead}
          data={data}
          renderRow={(student) => {
            // const attendance = student.attendanceRate ?? 0
            const attendance = 0

            return (
              <>
                <td>{student.id}</td>

                {/* Student name + avatar */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    {student.profileImage ? (
                      <img
                        src={student.profileImage}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                        {student.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {student.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-sm text-gray-500">
                  {student.studentNumber}
                </td>

                <td>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-semibold ${getClassColor(student.className)}`}
                  >
                    {student.className}
                  </span>
                </td>

                <td className="text-sm text-gray-500">
                  {student.parentName ?? "—"}
                </td>

                {/* Attendance bar — uses real attendanceRate from DB */}
                <td>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 rounded-full bg-gray-200">
                      <div
                        className={`h-1.5 rounded-full ${getBarColor(attendance)}`}
                        style={{ width: `${attendance}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{attendance}%</span>
                  </div>
                </td>

                <td>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-semibold ${getStatusColor(attendance)}`}
                  >
                    {getStatus(attendance)}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-2 pt-3">
                  {/* Edit — fetches full student then opens modal */}
                  <Button
                    variant="outline"
                    disabled={loadingId === student.id}
                    onClick={() => handleEditClick(student)}
                    className="rounded border px-2 py-1 text-sm"
                  >
                    {loadingId === student.id ? "..." : "Edit"}
                  </Button>

                  {/* Delete — calls mutation, auto-refreshes table on success */}
                  <Button
                    variant="destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(student.id)}
                    className="rounded border px-2 py-1 text-sm"
                  >
                    {deleteMutation.isPending ? "..." : "Del"}
                  </Button>
                </td>
              </>
            )
          }}
        />

        {/* Edit modal — key={editTarget.id} ensures fresh mount per student */}
        {isEdit && editTarget && (
          <EditStudentForm
            key={editTarget.id}
            student={editTarget}
            isEdit={isEdit}
            onClose={() => {
              setIsEdit(false)
              setEditTarget(null)
            }}
            onSuccess={() => {
              setIsEdit(false)

              setEditTarget(null)
              // refresh the table after a successful edit
              queryClient.invalidateQueries({ queryKey: ["students"] })
            }}
          />
        )}
      </div>
    </div>
  )
}

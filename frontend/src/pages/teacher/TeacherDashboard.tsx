import { DataTable } from "@/components/shared/DataTable"
import { StatCard } from "@/components/shared/StatCard"
import { Button } from "@/components/ui/button"
import { useStudents } from "@/hooks/useStudents"

import { toast } from "sonner"

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

const thead: string[] = [
  "name",
  "grade",
  "studendid",
  "attendence",
  "attendence",
  "status",
  "action",
]
export const TeacherDashboard = () => {
  const { data = [], isLoading, error } = useStudents()
  if (error) return <p>error student loading</p>
  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {statCard.map((st, index) => (
          <StatCard {...st} key={index} />
        ))}
      </div>
      <div className="mt-6 flex gap-6">
        <div className="flex-1/5">
          <DataTable
            thead={thead}
            data={data}
            isLoading={isLoading!}
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
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white`}
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
                  <Button variant="outline" size="sm">
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
        </div>
        <div className="flex-1 rounded-2xl border shadow-md"></div>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
        <div className="h-40 rounded-2xl border shadow-md"></div>
        <div className="rounded-2xl border shadow-md"></div>
        <div className="rounded-2xl border shadow-md"></div>
      </div>
    </div>
  )
}

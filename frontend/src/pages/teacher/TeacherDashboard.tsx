import { DataTable } from "@/components/shared/DataTable"
import { StatCard } from "@/components/shared/StatCard"

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
  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {statCard.map((st, index) => (
          <StatCard {...st} key={index} />
        ))}
      </div>
      <div className="mt-6 flex gap-6">
        <div className="flex-1/5">
          <DataTable thead={thead} hiddenColumns={["status", "action"]} />
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

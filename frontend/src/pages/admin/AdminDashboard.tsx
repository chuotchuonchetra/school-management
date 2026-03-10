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
          <DataTable thead={thead} hiddenColumns={["status", "action"]} />
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

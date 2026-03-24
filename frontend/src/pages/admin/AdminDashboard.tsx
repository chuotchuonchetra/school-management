/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStudents } from "@/api/student.api"
import { DataTable } from "@/components/shared/DataTable"
import { StatCard } from "@/components/shared/StatCard"

import type { StudentListItem } from "@/types/student.types"
import { useEffect, useState } from "react"

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
  const [data, setData] = useState<StudentListItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>()

  useEffect(() => {
    const getApi = async () => {
      try {
        setIsLoading(true)

        const res = await getStudents()
        console.log(res.data)
        const formattedData: StudentListItem[] = res.data.map(
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
            isLoading={isLoading!}
            thead={thead}
            data={data}
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

import { StudentForm } from "@/components/admin/StudentForm"
import { DataTable } from "@/components/shared/DataTable"
import { StatCard } from "@/components/shared/StatCard"
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
import { Plus } from "lucide-react"
import { useState } from "react"

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
export const StudentsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
        <DataTable thead={thead} hiddenColumns={[]} />
      </div>
    </div>
  )
}

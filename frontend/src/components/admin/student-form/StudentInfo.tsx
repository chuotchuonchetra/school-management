import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { StudentInfoData } from "@/types/student.types"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

const classes = [
  {
    label: "Class 10A",
    id: 1,
  },
  {
    label: "Class 10B",
    id: 2,
  },
  {
    label: "Class 10C",
    id: 3,
  },
]
const academicYear = [
  {
    year: "2025-2026",
  },
  {
    year: "2026-2027",
  },
]
// const validate = (field: string) => {
//   if (field == "name") return "error"
// }
interface StudentInfoProp {
  studentInfoData: (data: StudentInfoData) => void
  onClose: (data: boolean) => void
}
export const StudentInfo = ({ onClose, studentInfoData }: StudentInfoProp) => {
 

  const [form, setForm] = useState<StudentInfoData>({
    name: "",
    email: "",
    password: "",
    classId: 0,
    academicYear: "",
    studentNumber: "",
  })
  const selectedClass = classes.find((c) => c.id === form.classId)
  const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
    console.log(value)
  }
  const handleNextStep = () => {
    console.log(form)
    studentInfoData(form)
  }
  const handleModal = (data: boolean) => {
    onClose(data)
  }
  return (
    <div className="p-2">
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label htmlFor="name">Full Name*</label>
            <Input
              className="mt-2 py-4.5"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleInputForm}
            />
          </div>
          <div className="">
            <label htmlFor="studentNumber">Student Number*</label>
            <Input
              placeholder="Student Number"
              name="studentNumber"
              value={form.studentNumber}
              onChange={handleInputForm}
              className="mt-2 py-4.5"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label htmlFor="name">Email*</label>
            <Input
              className="mt-2 py-4.5"
              placeholder="Email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleInputForm}
            />
          </div>
          <div className="">
            <label htmlFor="studentNumber">Password*</label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleInputForm}
              className="mt-2 py-4.5"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label htmlFor="">Select class </label>
            <Select
              value={form.classId ? String(form.classId) : ""}
              onValueChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  classId: Number(value),
                }))
              }}
            >
              <SelectTrigger className="mt-2 w-full py-4.5">
                <SelectValue placeholder="Select Class">
                  {selectedClass?.label}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {classes.map((cl) => (
                    <SelectItem key={cl.id} value={String(cl.id)}>
                      {cl.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <label htmlFor="">Select Parent</label>
            <Select
              value={form.academicYear}
              onValueChange={(value) => {
                setForm((pre) => ({
                  ...pre,
                  academicYear: String(value),
                }))
              }}
            >
              <SelectTrigger className="mt-2 w-full py-4.5">
                <SelectValue placeholder="Select Academic Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {academicYear.map((academicYear) => (
                    <div key={academicYear.year}>
                      <SelectItem value={String(academicYear.year)}>
                        {academicYear.year}
                      </SelectItem>
                    </div>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between border-t pt-4">
          <Button
            type="button"
            className="cursor-pointer rounded-lg border px-4 py-4.5 text-end"
            onClick={() => handleModal(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="cursor-pointer rounded-lg border py-4.5 text-end"
            onClick={() => handleNextStep()}
          >
            Next Parent / Guardian <ArrowRight size={14} />
          </Button>
        </div>
      </form>
    </div>
  )
}

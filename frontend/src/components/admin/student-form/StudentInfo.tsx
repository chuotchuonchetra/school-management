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
import type { CreateStudentRequest } from "@/types/student.types"
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
const parantList = [
  {
    id: 1,
    name: "Chan Sokpheak",
  },
  {
    id: 2,
    name: "Chan Sokha",
  },
]
// const validate = (field: string) => {
//   if (field == "name") return "error"
// }
interface StudentInfoProp {
  onNext: (isNext: boolean) => void
}
export const StudentInfo = ({ onNext }: StudentInfoProp) => {
  const [form, setForm] = useState<CreateStudentRequest>({
    name: "",
    email: "",
    password: "",
    classId: 0,
    parentId: undefined,
    studentNumber: "",
  })
  const showForm = () => {
    console.log(form)
  }
  const selectedClass = classes.find((c) => c.id === form.classId)
  const selectedParent = parantList.find((p) => p.id === form.parentId)
  const handleInputForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
    console.log(value)
  }
  const handleNextStep = () => {
    if (form) return onNext(true)
  }
  return (
    <div>
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
              value={form.parentId ? String(form.parentId) : ""}
              onValueChange={(value) => {
                setForm((pre) => ({
                  ...pre,
                  parentId: Number(value),
                }))
              }}
            >
              <SelectTrigger className="mt-2 w-full py-4.5">
                <SelectValue placeholder="Select parent">
                  {selectedParent?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {parantList.map((parent) => (
                    <div key={parent.id}>
                      <SelectItem value={String(parent.id)}>
                        {parent.name}
                      </SelectItem>
                    </div>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Input
          placeholder="Student Number"
          name="studentNumber"
          value={form.studentNumber}
          onChange={handleInputForm}
          className="py-4.5"
        />
        <div className="flex justify-between border-t pt-4">
          <Button
            type="button"
            className="cursor-pointer rounded-lg border px-4 py-4.5 text-end"
            onClick={showForm}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="cursor-pointer rounded-lg border py-4.5 text-end"
            // onClick={() => handleNextStep}
            onClick={handleNextStep}
          >
            Next Parent / Guardian <ArrowRight size={14} />
          </Button>
        </div>
      </form>
    </div>
  )
}

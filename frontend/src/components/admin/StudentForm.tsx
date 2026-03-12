import { useState } from "react"
import { StudentInfo } from "./student-form/StudentInfo"
import { ParentInfo } from "./student-form/ParentInfo"

import type { ParentData, StudentInfoData } from "@/types/student.types"
import ConfirmStep from "./student-form/ComfirmCreate"
export interface StudentFormData {
  studentInfo: StudentInfoData
  parentData: ParentData
}

const EMPTY_STUDENT: StudentInfoData = {
  name: "",
  studentNumber: "",
  email: "",
  password: "",
  classId: "",
  academicYear: "2025-2026",
}

const EMPTY_PARENT: ParentData = {
  mode: "none",
  newParent: {
    name: "",
    email: "",
    password: "",
    phone: "",
    relationship: "Father",
  },
  existingParentId: undefined,
  existingParent: undefined,
}
export const StudentForm = () => {
  const [step, setStep] = useState<number>(1)
  const [parentData, setParentData] = useState<ParentData>()
  const [studentData, setStudentData] = useState<StudentInfoData>()
  const [formData, setFormData] = useState<StudentFormData>({
    studentInfo: EMPTY_STUDENT,
    parentData: EMPTY_PARENT,
  })
  const handleStudentStepDone = (done: boolean) => {
    if (done) setStep(2)
  }
  const handleParentData = (data: ParentData) => {
    if (data) {
      setParentData(data)
      setStep(3)
    }
  }
  console.log(parentData)

  // const nextStep = () => setStep((s) => s + 1)
  // const prevStep = () => setStep((s) => s - 1)

  return (
    <div className="xl:p-6">
      {/* header */}
      <div>
        <p className="pb-1 font-bold">👨‍🎓 Add new student</p>
        <p className="text-sm text-gray-600">
          Fill in student details then set up parent / guardian
        </p>
      </div>

      <div className="my-2 border" />

      <div className="form-process mb-2 flex items-center justify-center gap-2 border-b pb-4">
        {/* step 1 */}
        <div className="flex w-full items-center gap-2">
          <div
            className={`flex w-9 justify-center rounded-full p-1 text-lg text-white transition-colors duration-300 ${
              step >= 2 ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            1
          </div>
          <div
            className={`transition-colors duration-300 ${step >= 2 ? "text-green-500" : ""}`}
          >
            Student Info
          </div>
          <span
            className={`flex-1 border transition-colors duration-300 ${step >= 2 ? "border-green-500" : ""}`}
          />
        </div>

        {/* step 2 */}
        <div className="flex w-full items-center gap-2">
          <div
            className={`flex w-9 justify-center rounded-full p-1 text-lg text-white transition-colors duration-300 ${
              step >= 3 ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            2
          </div>
          <span>Parent</span>
          <span
            className={`flex-1 border transition-colors duration-300 ${step >= 3 ? "border-green-500" : ""}`}
          />
        </div>

        {/* step 3 */}
        <div className="flex w-full flex-1 items-center gap-2">
          <div
            className={`flex w-9 justify-center rounded-full p-1 text-lg text-white transition-colors duration-300 ${
              step >= 3 ? "bg-blue-500" : "bg-blue-500"
            }`}
          >
            3
          </div>
          <span>Parent</span>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out ${
            step === 1
              ? "translate-x-0 opacity-100"
              : "pointer-events-none absolute inset-0 -translate-x-5 opacity-0"
          }`}
        >
          <StudentInfo onNext={handleStudentStepDone} />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            step === 2
              ? "translate-x-0 opacity-100"
              : "pointer-events-none absolute inset-0 translate-x-5 opacity-0"
          }`}
        >
          <ParentInfo sendDataToStudentForm={handleParentData} />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            step === 3
              ? "translate-x-0 opacity-100"
              : "pointer-events-none absolute inset-0 translate-x-5 opacity-0"
          }`}
        >
          <ConfirmStep formData={formData} />
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { StudentInfo } from "./student-form/StudentInfo"
import { ParentInfo } from "./student-form/ParentInfo"

import type {
  CreateStudentRequest,
  ParentData,
  StudentInfoData,
} from "@/types/student.types"
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
  profileImage: null,
}

const EMPTY_PARENT: ParentData = {
  mode: "none",
  newParent: {
    name: "",
    email: "",
    password: "",
    phone: "",
    relationship: "Father",
    profileImage: "",
  },
  existingParentId: undefined,
  existingParent: undefined,
}
interface Props {
  onClose: (data: boolean) => void
}
export const StudentForm = ({ onClose }: Props) => {
  const [step, setStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<StudentFormData>({
    studentInfo: EMPTY_STUDENT,
    parentData: EMPTY_PARENT,
  })
  const handleStudentInfoNext = (data: StudentInfoData) => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        studentInfo: data,
      }))
      setStep(2)
    }
  }
  const handleParentData = (data: ParentData) => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        parentData: data,
      }))
      setStep(3)
    }
  }
  const handleModalForm = (data: boolean) => {
    onClose(data)
  }
  // const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)
  const onSubmit = () => {
    try {
      setIsLoading(true)
      const { studentInfo, parentData } = formData
      const body: CreateStudentRequest = {
        name: studentInfo.name,
        email: studentInfo.email,
        password: studentInfo.password,
        studentNumber: studentInfo.studentNumber,
        classId: studentInfo.classId as number,
        academicYear: studentInfo.academicYear,
        profileImage: studentInfo.profileImage,
      }

      if (formData.parentData.mode == "new") {
        body.newParent = parentData.newParent
      }
      if (formData.parentData.mode == "existing") {
        body.parentId = parentData.existingParentId
      }
      console.log("body", body)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
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
          <StudentInfo
            onClose={handleModalForm}
            studentInfoData={handleStudentInfoNext}
          />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            step === 2
              ? "translate-x-0 opacity-100"
              : "pointer-events-none absolute inset-0 translate-x-5 opacity-0"
          }`}
        >
          <ParentInfo
            sendDataToStudentForm={handleParentData}
            onBack={prevStep}
          />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            step === 3
              ? "translate-x-0 opacity-100"
              : "pointer-events-none absolute inset-0 translate-x-5 opacity-0"
          }`}
        >
          <ConfirmStep
            formData={formData}
            onBack={prevStep}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

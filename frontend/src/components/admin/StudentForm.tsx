import { useState } from "react"
import { StudentInfo } from "./student-form/StudentInfo"
import { ParentInfo } from "./student-form/ParentInfo"

import type { ParentData, StudentInfoData } from "@/types/student.types"
import ConfirmStep from "./student-form/ComfirmCreate"
import axios from "axios"

export interface StudentFormData {
  studentInfo: StudentInfoData
  parentData: ParentData
}

const EMPTY_STUDENT: StudentInfoData = {
  firstName: "",
  lastName: "",
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    relationship: "Father",
    profileImage: null,
  },
  existingParentId: undefined,
  existingParent: undefined,
}
interface Props {
  onClose: (data: boolean) => void
  onSuccess: () => void
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
  const prevStep = () => setStep((s) => s - 1)
  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const { studentInfo, parentData } = formData

      // Switch from plain object to FormData
      const form = new window.FormData()

      // ── Student fields ──
      form.append("firstName", studentInfo.firstName)
      form.append("lastName", studentInfo.lastName)
      form.append("email", studentInfo.email)
      form.append("password", studentInfo.password)
      form.append("studentNumber", studentInfo.studentNumber)
      form.append("classId", String(studentInfo.classId))
      form.append("academicYear", studentInfo.academicYear)

      // Only append if user picked a file
      if (studentInfo.profileImage instanceof File) {
        form.append("profileImage", studentInfo.profileImage)
      }

      // ── Parent: new ──
      if (parentData.mode === "new" && parentData.newParent) {
        const p = parentData.newParent
        // form.append("parentMode", "new")
        form.append("parent.firstName", p.firstName)
        form.append("parent.lastName", p.lastName)
        form.append("parent.email", p.email)
        form.append("parent.password", p.password)
        form.append("parent.phone", p.phone)
        form.append("parent.relationship", p.relationship)

        if (p.profileImage instanceof File) {
          form.append("parentImage", p.profileImage)
        }
      }

      // ── Parent: existing ──
      if (parentData.mode === "existing" && parentData.existingParentId) {
        form.append("parentMode", "existing")
        form.append("parentId", String(parentData.existingParentId))
      }

      // ── No parent ──
      if (parentData.mode === "none") {
        form.append("parentMode", "none")
      }

      const token = localStorage.getItem("token")
      console.log(form)
      const response = await axios.post(
        "http://localhost:5000/api/students",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log("response", response.data)
      onClose(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response?.data)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
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
          <span>Cormfirm</span>
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

import { useState } from "react"
import { StudentInfo } from "./student-form/StudentInfo"

import { ParentInfo } from "./student-form/parent/ParentInfo"
import { ComfirmCreate } from "./student-form/ComfirmCreate"

export const StudentForm = () => {
  const [step, setStep] = useState<number>(1)
  // const [isDone, setIsDone] = useState<boolean>(false)
  const handleStudentDone = (done: boolean) => {
    if (done) setStep(2)
  }
  return (
    <div>
      <div className="">
        <p className="text-bold pb-1">👨‍🎓 Add new student</p>
        <p className="ms-5.5 text-sm font-light text-gray-600">
          Fill in student details then set up parent / guardian
        </p>
      </div>
      <div className="my-2 border"></div>
      <div className="form-process mb-2 flex items-center justify-center gap-2 border-b pb-4">
        <div className="flex w-full items-center gap-2">
          <div className="flex h-fit w-7 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
            1
          </div>
          <span className="text-sm">Student Info</span>
          <span className="w-full flex-1 border"></span>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="flex h-fit w-7 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
            2
          </div>
          <span className="text-sm text-nowrap">Parent / Guardian</span>
          <span className="w-full flex-1 border"></span>
        </div>

        <div className="flex w-full flex-1 items-center gap-3">
          <div className="flex h-fit w-7 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
            3
          </div>
          <span className="text-sm text-nowrap">Comfirm & Create</span>
        </div>
        <p></p>
      </div>
      {step == 1 ? (
        <StudentInfo onNext={handleStudentDone} />
      ) : step == 2 ? (
        <ParentInfo />
      ) : step == 3 ? (
        <ComfirmCreate />
      ) : (
        ""
      )}
    </div>
  )
}

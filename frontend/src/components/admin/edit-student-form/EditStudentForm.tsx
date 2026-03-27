import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { ImageUpload } from "@/components/shared/ImageUpload"
import { useState } from "react"

import { ParentSection } from "./EditParentInfo"
import type { StudentPayload, UpdateStudentRequest } from "@/types/student.types"
import type { ParentEditMode } from "@/types/editstudent.type"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Eye, EyeClosed } from "lucide-react"


// ── Mock classes — replace with API data ──────────────────────
const classes = [
  { id: 1, name: "Class 10A" },
  { id: 2, name: "Class 10B" },
  { id: 3, name: "Class 11A" },
  { id: 4, name: "Class 11B" },
  { id: 5, name: "Class 12A" },
]

// ── Props ─────────────────────────────────────────────────────
interface Props {
  isEdit: boolean
  student: StudentPayload
  onClose: () => void
  onSuccess: () => void
  
}
const SectionLabel = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex items-center gap-1.5 border-b pb-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
    <span>{icon}</span> {label}
  </div>
)

// ─────────────────────────────────────────────────────────────
export const EditStudentForm = ({ isEdit, student, onClose }: Props) => {
  const [form, setForm] = useState<UpdateStudentRequest>({ 
    studentNumber:student.studentNumber,
    classId:student.classId,
    parentId:student.parentId,
    academicYear:student.academicYear,
    user:{
      firstName:student.user.firstName,
      lastName:student.user.lastName,
      email:student.user.email,
      profileImage:student.user.profileImage
    },
    parent:{
      phone:student.parent.phone,
      relationship:student.parent.relationship,
      user:student.parent.user
    },
    newPassword:'',
    confirmPassword:"",
    updateParentMode:'keep'
  })
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [editParentState,setEditParentState] = useState<ParentEditMode>('keep')
  const isPasswordChanging = newPassword.trim().length > 0;
  const isPasswordMatch = newPassword === confirmPassword;
  const isPasswordValid = !isPasswordChanging || (isPasswordMatch && newPassword.length >= 6);
  console.log(isPasswordValid)
  const handleParentStateChange = (state:ParentEditMode)=>{
    setEditParentState(state)
  }
  const [isViewPassword,setIsViewPassword] = useState<boolean>(false)
  const [isViewConfirmPassword,setIsViewConfirmPassword] = useState<boolean>(false)
  const handleFormChange = (key: keyof UpdateStudentRequest, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  return (
    <Dialog open={isEdit} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        size="xl"
        className="max-h-[90vh] max-w-xl  p-0"
      >
        {/* Header */}
        <DialogHeader className="border-b px-4 py-2">
          <DialogTitle className="text-base font-extrabold">
            ✏️ Edit Student
          </DialogTitle>
          <p className="text-[11px] text-gray-400">
            {student.user.firstName} {student.user.lastName} · {student.studentNumber} ·
            {/* ? {student.class.name} */}
          </p>
        </DialogHeader>

        <div className="flex  flex-col gap-3 px-6 pb-4 overflow-y-auto h-[75vh]  [scrollbar-width:thin] [scrollbar-color:gray]  ">
          {/* 1. Student Photo */}
          <div className="flex flex-col gap-3">
            <SectionLabel icon="📷" label="Student Photo" />
            <ImageUpload
              key={student.id}
              name={form.user?.firstName + " " + form.user?.lastName}
              currentImageUrl={form.user?.profileImage?.image}
              onChange={(file)=> handleFormChange('user', {...form.user,profileImage:file})}
            />
          </div>

          {/* 2. Student Information */}
          <div className="flex flex-col gap-3">
            <SectionLabel icon="📋" label="Student Information" />

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.user?.firstName}
                  placeholder="First Name"
                  onChange={(e) => handleFormChange("user", {...form.user,firstName:e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.user?.lastName}
                  placeholder="Last Name"
                  onChange={(e) => handleFormChange("user", {...form.user,lastName:e.target.value})}
                />
              </div>

              
            </div>

            <div className="grid grid-cols-[2fr_2fr_1fr] gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={form.user?.email}
                  placeholder="Email"
                  onChange={(e) => handleFormChange("user", {...form.user,email:e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Student Number
                </label>
                <Input
                  value={form.studentNumber}
                  disabled
                  className="cursor-not-allowed opacity-50"
                  onChange={(e)=> handleFormChange('studentNumber',e.target.value)}
                />
                <span className="text-[10px] text-gray-400">
                  Cannot be changed
                </span>
              </div>
              <div className="flex flex-col gap-1.5 ">
                <label className="text-xs font-semibold text-gray-600">
                  Class <span className="text-red-500">*</span>
                </label>
                <Select
                  value={form.classId ? String(form.classId) : ""}
                  onValueChange={(e) => handleFormChange("classId", Number(e))}
                 
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 3. Reset Password */}
          <div className="flex flex-col gap-3">
            <SectionLabel icon="🔑" label="Reset Password (Optional)" />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  New Password
                </label>
                <InputGroup>
                
                    <InputGroupInput
                      
                      type={isViewPassword ? "text" : "password"}
                      placeholder="Min 6 characters"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputGroupAddon align={"inline-end"} onClick={()=> setIsViewPassword(!isViewPassword)}>
                      {isViewPassword ? <EyeClosed /> : <Eye />}
                    </InputGroupAddon>
               
                </InputGroup>
                
                <span className="text-[10px] text-gray-400">
                  Leave blank to keep current
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Confirm Password
                </label>
                <InputGroup>
                
                    <InputGroupInput
                      type={isViewConfirmPassword ? "text" : "password"}
                      placeholder="Repeat new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputGroupAddon align={"inline-end"} onClick={()=> setIsViewConfirmPassword(!isViewConfirmPassword)}>
                      {isViewConfirmPassword ? <EyeClosed /> : <Eye />}
                    </InputGroupAddon>
               
                </InputGroup>
              </div>
            </div>
          </div>

          <ParentSection
            studentName={student.user.firstName + " " + student.user.lastName}
            parentLinked={student.parent}
            state={{
              mode: editParentState,
              editedParent: student.parent,
            }}
            onChange={(ps) => {
              handleParentStateChange(ps.mode)    
            } }
          />
  
        </div>
          {/* Footer */}
          <div className=" px-6 py-3 flex items-center justify-between border-t border-gray-100 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
            onClick={()=>{
              console.log(form)
              console.log('student user id ',student.user.id)
              console.log('student parent user id ',student.parent.user.id)
            }}
                 disabled={!isPasswordValid} 
                  className={` py-2 rounded-lg transition-colors ${
                   !isPasswordValid
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
          >
            ✓ Save Changes
          </Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}

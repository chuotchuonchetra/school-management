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

import type {
  EditStudentFormData,
  ProfileImageState,
} from "@/types/editstudent.type"
import { ParentSection } from "./EditParentInfo"

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
  student: any
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
  console.log(student)
  const [form, setForm] = useState<EditStudentFormData>({
    name: `${student.user.firstName} ${student.user.lastName}`,
    studentNumber: student.studentNumber,
    email: student.user.email,
    classId: student.classId,
    profileImage: { status: "unchanged", url: student.profileImage },
    newPassword: student.user.password,
    confirmPassword: student.user.password,
    parentEdit: { mode: "keep" },
   
  })

  const set = (field: keyof EditStudentFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  // ── Image: File|null → ProfileImageState ─────────────────
  const handleImageChange = (file: File | null) => {
    const next: ProfileImageState =
      file !== null ? { status: "changed", file } : { status: "removed" }
    set("profileImage", next)
  }

  const currentImageUrl: string | null =
    form.profileImage.status === "unchanged" ? form.profileImage.url : null
    

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
            {student.user.firstName} {student.user.lastName} · {student.studentNumber} · {student.classname}
          </p>
        </DialogHeader>

        <div className="flex  flex-col gap-6 px-6 pb-4 overflow-y-auto h-[75vh]  [scrollbar-width:thin] [scrollbar-color:gray]  ">
          {/* 1. Student Photo */}
          <div className="flex flex-col gap-3">
            <SectionLabel icon="📷" label="Student Photo" />
            <ImageUpload
              key={student.id}
              name={form.name}
              currentImageUrl={currentImageUrl}
              onChange={handleImageChange}
            />
          </div>

          {/* 2. Student Information */}
          <div className="flex flex-col gap-3">
            <SectionLabel icon="📋" label="Student Information" />

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.name}
                  placeholder="Full name"
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Student Number
                </label>
                <Input
                  value={student.studentNumber}
                  disabled
                  className="cursor-not-allowed opacity-50"
                />
                <span className="text-[10px] text-gray-400">
                  Cannot be changed
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={form.email}
                  placeholder="Email"
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Class <span className="text-red-500">*</span>
                </label>
                <Select
                  value={form.classId ? String(form.classId) : ""}
                  onValueChange={(val) => set("classId", Number(val))}
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
            <SectionLabel icon="🔑" label="Reset Password" />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Min 6 characters"
                  value={form.newPassword}
                  onChange={(e) => set("newPassword", e.target.value)}
                />
                <span className="text-[10px] text-gray-400">
                  Leave blank to keep current
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Repeat new password"
                  value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword", e.target.value)}
                />
              </div>
            </div>
          </div>

          <ParentSection
            parent={student.parent}
            currentParent={{
              id: 1,
              name: "Keo Bunna",
              email: "[EMAIL_ADDRESS]",
              phone: "012 345 678",
              relationship: "Father",
              profileImage: null,
              linkedChildren: ["Piseth Keo"],
            }} // from GET /api/students/:id
            state={form.parentEdit}
            onChange={(ps) => set("parentEdit", ps)}
          />

        </div>
          {/* Footer */}
          <div className=" px-6 py-3 flex items-center justify-between border-t border-gray-100 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              ✓ Save Changes
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}

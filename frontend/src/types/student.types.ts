// ── Lightweight row used in the students list table ───────────
export interface StudentListItem {
  id: number
  studentNumber: string
  name: string // from user.name
  email: string // from user.email
  profileImage: string | null // from user.profileImage
  className: string // from class.name
  parentName: string | null // from parent user.name

  // Attendance — computed by backend before returning the list
  // overall percentage across all subjects e.g. 87.5
  attendanceRate: number | null // null = no attendance recorded yet
  isAtRisk: boolean // true if attendanceRate < 75
}
export interface CreateStudentRequest {
  name: string
  email: string
  password: string
  studentNumber: string
  classId: number
  academicYear: string
  profileImage?: string | File | null
  parentId?: number
  newParent?: NewParentData
}
export interface StudentInfoData {
  name: string
  studentNumber: string
  email: string
  password: string
  classId: number | ""
  academicYear: string
  profileImage: string | File | null
}
// ── Step 2: Parent data ───────────────────────────────────────
export interface NewParentData {
  name: string
  email: string
  password: string
  phone: string
  relationship: "Father" | "Mother" | "Guardian"
  profileImage: string | File | null
}

export interface ExistingParent {
  id: number
  name: string
  email: string
  phone: string
  linkedChildren: string[] // student names already linked
  profileImage: string | File | null
}

export type ParentMode = "new" | "existing" | "none"
export type FormStep = 1 | 2 | 3

export interface ParentData {
  mode: ParentMode
  newParent?: NewParentData // only when mode === 'new'
  existingParentId?: number // only when mode === 'existing'
  existingParent?: ExistingParent // full object for confirm display
}

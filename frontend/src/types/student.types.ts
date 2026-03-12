export interface StudentListItem {
  id: number
  studentNumber: string
  name: string // from user.name
  email: string // from user.email
  className: string // from class.name
  parentName?: string // from parent.name
  attendanceRate: number // calculated %
}
export interface CreateStudentRequest {
  name: string
  email: string
  password: string
  classId: number
  parentId?: number
  studentNumber: string
}
export interface StudentInfoData {
  name: string
  studentNumber: string
  email: string
  password: string
  classId: number | ""
  academicYear: string
}
// ── Step 2: Parent data ───────────────────────────────────────
export interface NewParentData {
  name: string
  email: string
  password: string
  phone: string
  relationship: "Father" | "Mother" | "Guardian"
}

export interface ExistingParent {
  id: number
  name: string
  email: string
  phone: string
  linkedChildren: string[] // student names already linked
}

export type ParentMode = "new" | "existing" | "none"
export type FormStep = 1 | 2 | 3

export interface ParentData {
  mode: ParentMode
  newParent?: NewParentData // only when mode === 'new'
  existingParentId?: number // only when mode === 'existing'
  existingParent?: ExistingParent // full object for confirm display
}

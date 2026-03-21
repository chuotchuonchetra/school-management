// ─────────────────────────────────────────────────────────────
//  types/student.types.ts
// ─────────────────────────────────────────────────────────────

// ── Full student from GET /api/students/:id ───────────────────
export interface Student {
  id: number
  studentNumber: string
  classId: number
  parentId: number | null
  academicYear: string
  createdAt: string
  user: {
    id: number
    name: string
    email: string
    profileImage: string | null
  }
  class: {
    id: number
    name: string
    gradeLevel: number
  }
  parent: {
    id: number
    name: string
    email: string
    phone: string
    profileImage: string | null
    relationship: string
  } | null
}

// ── Flat row for the students list table ─────────────────────
export interface StudentListItem {
  id: number
  studentNumber: string
  name: string // from user.firstname + lastnae
  email: string // from user.email
  profileImage: string | null // from user.profileImage
  className: string // from class.name
  parentName: string | null // from parent user.name
  // attendanceRate: number | null // null = no records yet
  // isAtRisk: boolean // true if attendanceRate < 75
}

// ── Add student form step 1 ───────────────────────────────────
export interface StudentInfoData {
  firstName: string
  lastName: string
  studentNumber: string
  email: string
  password: string
  classId: number | ""
  academicYear: string
  profileImage: File | null
}

// ── New parent (used in add + edit parent forms) ──────────────
export interface NewParentData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  relationship: "Father" | "Mother" | "Guardian"
  profileImage: File | null
}

// ── Existing parent from search results ──────────────────────
export interface ExistingParent {
  id: number
  name: string
  email: string
  phone: string
  profileImage: string | null
  linkedChildren: string[]
}

// ── Class dropdown option ─────────────────────────────────────
export interface ClassOption {
  id: number
  name: string
  gradeLevel: number
}

// ── Form steps ────────────────────────────────────────────────
export type FormStep = 1 | 2 | 3
export type ParentMode = "new" | "existing" | "none"

// ── Parent section state (step 2 of add form) ─────────────────
export interface ParentData {
  mode: ParentMode
  newParent?: NewParentData
  existingParentId?: number
  existingParent?: ExistingParent
}

// ── Combined add form state ───────────────────────────────────
export interface StudentFormData {
  studentInfo: StudentInfoData
  parentData: ParentData
}

// ── POST /api/students ────────────────────────────────────────
export interface CreateStudentRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  studentNumber: string
  classId: number
  academicYear: string
  profileImage?: File | null
  parentId?: number // mode === "existing"
  newParent?: {
    // mode === "new"
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    relationship: string
    profileImage?: File | null
  }
}

// ── PATCH /api/students/:id ───────────────────────────────────
export interface UpdateStudentRequest {
  name?: string
  email?: string
  classId?: number
  newPassword?: string
  profileImage?: File | null
  parentMode?: "keep" | "edit" | "change" | "addNew" | "remove"
  linkParentId?: number
  editParent?: {
    name?: string
    email?: string
    phone?: string
    relationship?: string
    profileImage?: File | null
  }
  newParent?: {
    name: string
    email: string
    password: string
    phone: string
    relationship: string
    profileImage?: File | null
  }
}

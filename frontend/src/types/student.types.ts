// ─────────────────────────────────────────────────────────────
//  types/student.types.ts
// ─────────────────────────────────────────────────────────────

import type { User } from "./auth.types"
import type { ParentEditMode } from "./editstudent.type"
import type { ParentPayLoad } from "./parent.type"




// ── Flat row for the students list table ─────────────────────
export interface StudentListItem {
  id: number
  studentNumber: string
  name: string // from user.firstname + lastnae
  email: string // from user.email
  profileImage: string | null // from user.profileImage
  className: string // from class.name
  parentName: string | null // from parent user.name
  status: string
  
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
  parentId?: number 
  newParent?: ParentPayLoad
}

export interface StudentPayload {
  id: number,
  userId:number,
  studentNumber: string,
  classId: number,
  parentId: number,
  academicYear: string,
  user: User,
  parent:ParentPayLoad
  createdAt: string,
  updatedAt: string,
}
// ── PATCH /api/students/:id ───────────────────────────────────
// types/student.types.ts
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage:profileImage
}
export interface UpdateStudentRequest {
  studentNumber?: string;
  classId?: number;
  parentId?: number;
  academicYear?: string;
  user?: UpdateUserRequest
  parent?: {
    phone?: string;
    relationship?: string;
    user?: UpdateUserRequest
  };
  newPassword?: string;
  confirmPassword?: string;
  updateParentMode?: ParentEditMode
}


export interface profileImage {
  id: number;
  image: string;
  userId: number;
}
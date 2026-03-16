// ─────────────────────────────────────────────────────────────
//  editStudent.types.ts
// ─────────────────────────────────────────────────────────────

// ── Profile image — 3 states for edit ────────────────────────
export type ProfileImageState =
  | { status: "unchanged"; url: string | null } // don't touch
  | { status: "changed"; file: File } // new file picked
  | { status: "removed" } // explicitly removed → null

// ── Parent edit mode ──────────────────────────────────────────
//
//  keep      → don't change parent at all
//  edit      → update the CURRENT parent's info (name/email/photo)
//  change    → swap to a different existing parent
//  addNew    → create a brand new parent and link
//  remove    → unlink parent (parentId = null)
//
export type ParentEditMode = "keep" | "edit" | "change" | "addNew" | "remove"

// ── Current parent (from DB) ──────────────────────────────────
export interface CurrentParent {
  userId: number
  name: string
  email: string
  phone: string
  profileImage: string | null
  relationship: string
}

// ── Parent edit state ─────────────────────────────────────────
export interface ParentEditState {
  mode: ParentEditMode

  // mode === 'edit' — fields for editing current parent
  editedParent?: {
    name: string
    email: string
    phone: string
    relationship: string
    profileImage: ProfileImageState
  }

  // mode === 'change' — pick an existing parent
  newExistingParentId?: number
  newExistingParent?: {
    id: number
    name: string
    email: string
    profileImage: string | File | null
  }

  // mode === 'addNew' — create a brand new parent
  newParent?: {
    name: string
    email: string
    password: string
    phone: string
    relationship: string
    profileImage: ProfileImageState
  }
}

// ── Full edit form state ──────────────────────────────────────

export interface EditStudentFormData {
  // Student fields
  name: string
  email: string
  classId: number
  profileImage: ProfileImageState
  newPassword: string
  confirmPassword: string
  studentNumber: string
  // Parent section
  parentEdit: ParentEditState
}

// ── What is sent to PATCH /api/students/:id ───────────────────
export interface UpdateStudentPayload {
  // Student
  name?: string
  email?: string
  classId?: number
  profileImage?: File | null // File = new, null = remove, undefined = unchanged
  newPassword?: string

  // Parent — only one of these is present
  keepParent?: true // mode 'keep' → omit entirely
  removeParent?: true // mode 'remove' → parentId = null
  linkParentId?: number // mode 'change' → link existing
  newParent?: {
    // mode 'addNew' → create + link
    name: string
    email: string
    password: string
    phone: string
    relationship: string
    profileImage?: File | null
  }
  editParent?: {
    // mode 'edit' → update current parent
    name?: string
    email?: string
    phone?: string
    relationship?: string
    profileImage?: File | null // File = new, null = remove
  }
}

// ── Existing parent option (for search dropdown) ──────────────
export interface ParentOption {
  id: number
  name: string
  email: string
  phone: string
  profileImage: string | null
  linkedChildren: string[]
}

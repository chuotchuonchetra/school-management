export type Role = "admin" | "teacher" | "student" | "parent"
export interface User {
  id: number
  name: string
  email: string
  role: Role
}

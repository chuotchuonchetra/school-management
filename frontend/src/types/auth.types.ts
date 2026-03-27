export type Role = "admin" | "teacher" | "student" | "parent"


export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password:string
  role: Role
  createdAt: string
  updatedAt: string
  profileImage:profileImage 
}
export interface profileImage{
    id: number
    image: string
    userId: number
  }
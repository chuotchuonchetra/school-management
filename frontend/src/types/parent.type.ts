import type { User } from "./auth.types"

export interface ParentPayLoad {
  id: number,
  userId:number 
  phone:string
  relationship: string
  user:User
  createdAt: string
  updatedAt: string
}



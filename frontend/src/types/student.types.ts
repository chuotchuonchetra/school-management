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

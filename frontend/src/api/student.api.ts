/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/lib/apiClient"

export const getStudents = async () => {
  const res = await apiClient.get("/students")
  console.log(res.data.data)
  return res.data.data
}
export const getStudentById = async (id: number) => {
  const res = await apiClient.get(`/students/${id}`)
  console.log(res.data)
  return res.data
}
export const createStudent = async (data: any) => {
  const res = await apiClient.post("/students", data)
  return res.data
}

export const updateStudent = async (id: number, data: any) => {
  const res = await apiClient.patch(`/students/${id}`, data)
  return res.data
}

export const deleteStudent = async (id: number) => {
  const res = await apiClient.delete(`/students/${id}`)
  return res.data
}

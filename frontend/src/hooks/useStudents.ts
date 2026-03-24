/* eslint-disable @typescript-eslint/no-explicit-any */
// useStudent.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "@/api/student.api"
import type { StudentListItem } from "@/types/student.types"

export const useStudents = () => {
  return useQuery<StudentListItem[]>({
    queryKey: ["students"],
    queryFn: getStudents,

    select: (students: any[]) =>
      students.map((s) => ({
        id: s.id,

        studentNumber: s.studentNumber,

        name:
          `${s.user?.firstName ?? ""} ${s.user?.lastName ?? ""}`.trim() ||
          "Unknown",

        email: s.user?.email ?? "",

        profileImage: s.user?.profileImage ?? null,

        className: `Class ${s.classId}`,

        parentName: s.parent?.user
          ? `${s.parent.user.firstName ?? ""} ${s.parent.user.lastName ?? ""}`
          : "—",

        attendance: 90,

        status: "Active",
      })),
  })
}
export const useCreateStudent = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormData) => createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      onSuccess?.() // close modal
    },
  })
}

// ─────────────────────────────────────────────────────────────
//  useUpdateStudent
//  onSuccess → invalidates both the list AND the single student
// ─────────────────────────────────────────────────────────────
export const useUpdateStudent = (id: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormData | object) => updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] }) // refresh list
      queryClient.invalidateQueries({ queryKey: ["students", id] }) // refresh single
      onSuccess?.() // close modal
    },
  })
}

// ─────────────────────────────────────────────────────────────
//  useDeleteStudent
//  onSuccess → invalidates list so deleted row disappears
// ─────────────────────────────────────────────────────────────
export const useDeleteStudent = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      onSuccess?.()
    },
  })
}

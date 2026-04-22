// useStudent.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "@/api/student.api"
import type { StudentPayload } from "@/types/student.types"

export const useStudents = () => {
  return useQuery<StudentPayload[]>({
    queryKey: ["students"],
    queryFn: getStudents,
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

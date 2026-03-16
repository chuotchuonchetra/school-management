// import Avatar from "@/components/shared/Avatar"
// import { ImageUpload } from "@/components/shared/ImageUpload"
// import type {
//   EditStudentFormData,
//   ProfileImageState,
// } from "@/types/editstudent.type"

// // import type { EditStudentFormData } from "@/types/editstudent.type"
// import type { StudentInfoData } from "@/types/student.types"
// import { useState } from "react"
// // import { useState } from "react"

// interface Props {
//   student?: StudentInfoData | null
// }
// export const EditStudentInfo = ({ student }: Props) => {
//   const [form, setForm] = useState<EditStudentFormData>({
//     name: student!.name,
//     email: student!.email,
//     classId: 0,
//     profileImage: { status: "unchanged", url: student!.profileImage },
//     newPassword: "",
//     confirmPassword: "",
//     parentEdit: { mode: "keep" },
//   })
//   const currentImageUrl: string | null =
//     form!.profileImage.status === "unchanged" ? form!.profileImage.url : null
//   const set = (field: keyof EditStudentFormData, value: any) =>
//     setForm((prev) => ({ ...prev, [field]: value }))
//   const handleImageChange = (file: File | null) => {
//     const next: ProfileImageState =
//       file !== null
//         ? { status: "changed", file } // user picked a new photo
//         : { status: "removed" } // user clicked Remove

//     set("profileImage", next)
//   }
//   if (student == null) return
//   return (
//     <div>
//       <Avatar name={student.name} profileImage={student!.profileImage} />
//       <ImageUpload
//         onChange={() => handleImageChange}
//         name={student.name}
//         currentImageUrl={currentImageUrl}
//       />
//     </div>
//   )
// }

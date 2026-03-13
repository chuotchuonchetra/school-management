// ─────────────────────────────────────────────────────────────
//  components/shared/Avatar.tsx
//
//  Used everywhere a user photo is shown.
//  If profileImage URL exists → show the photo
//  If null → show initials with a colored circle fallback
// ─────────────────────────────────────────────────────────────

interface Props {
  name: string
  profileImage: string | null
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

// Pick a consistent color per user based on their name
const getAvatarColor = (name: string): string => {
  const colors = [
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-yellow-500",
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(" ")
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

const SIZE_CLASSES = {
  sm: "w-7 h-7 text-[10px]",
  md: "w-9 h-9 text-xs",
  lg: "w-12 h-12 text-sm",
  xl: "w-16 h-16 text-base",
}

const Avatar = ({ name, profileImage, size = "md", className = "" }: Props) => {
  const sizeClass = SIZE_CLASSES[size]
  const colorClass = getAvatarColor(name)
  const initials = getInitials(name)

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={name}
        className={`${sizeClass} shrink-0 rounded-full object-cover ${className}`}
      />
    )
  }

  // Fallback — colored circle with initials
  return (
    <div
      className={` ${sizeClass} ${colorClass} ${className} flex shrink-0 items-center justify-center rounded-full font-bold text-white select-none`}
    >
      {initials}
    </div>
  )
}

export default Avatar

// ─────────────────────────────────────────────────────────────
//  USAGE EXAMPLES
// ─────────────────────────────────────────────────────────────

// In student list table:
// <Avatar name={student.name} profileImage={student.profileImage} size="sm" />

// In navbar (current user):
// <Avatar name={user.name} profileImage={user.profileImage} size="md" />

// In student profile page:
// <Avatar name={student.name} profileImage={student.profileImage} size="xl" />

// In announcements (author):
// <Avatar name={announcement.author.name} profileImage={announcement.author.profileImage} size="sm" />

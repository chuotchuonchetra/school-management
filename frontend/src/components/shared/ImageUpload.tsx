// components/shared/ImageUpload.tsx
// Works for both ADD forms and EDIT forms

import { Upload, X } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  currentImageUrl?: string | null // EDIT: pass DB url / ADD: leave empty
  name?: string // for initials fallback "Sophea Chan" → "SC"
  onChange: (file: File | null) => void
  label?: string
  hint?: string
}

const getInitials = (name?: string) => {
  if (!name?.trim()) return "?"
  return name
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const ImageUpload = ({
  currentImageUrl = null,
  name,
  onChange,
  label = "Profile Photo",
  hint = "JPG, PNG, WEBP · Max 2MB · Optional",
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | null>(currentImageUrl)
  const [isLocalBlob, setIsLocalBlob] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    if (isLocalBlob && preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
    setIsLocalBlob(true)
    onChange(file)
  }

  const handleRemove = () => {
    if (isLocalBlob && preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setIsLocalBlob(false)
    onChange(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const hasImage = Boolean(preview)

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        {hasImage ? (
          <img
            src={preview!}
            alt={name ?? "Profile"}
            className="h-16 w-16 rounded-full border-2 border-border object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted text-lg font-bold text-muted-foreground select-none">
            {getInitials(name)}
          </div>
        )}
        {hasImage && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white hover:opacity-90"
            aria-label="Remove photo"
          >
            <X size={10} />
          </button>
        )}
      </div>

      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mb-2 text-xs text-muted-foreground">{hint}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-1.5 text-xs"
        >
          <Upload size={12} />
          {hasImage ? "Change Photo" : "Upload Photo"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

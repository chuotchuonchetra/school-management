import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/50 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center gap-2">
            <a href="#" className="flex items-center gap-2 font-bold">
              <div className="flex size-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <GalleryVerticalEnd className="size-5" />
              </div>
              <span className="text-xl">SchoolMS</span>
            </a>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}

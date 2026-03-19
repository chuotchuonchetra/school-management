import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { School2 } from "lucide-react"
import React, { useState } from "react"
import type { role } from "@/constants/roles"
import { loginAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [roleSelect, setRoleSelect] = useState<role>("admin") // Default to admin
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { login, loading } = loginAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await login({
        email,
        password,
        role: roleSelect,
      })
      const role = data.user.role
      if (role === "admin") {
        navigate("/admin")
      }

      if (role === "student") {
        navigate("/student")
      }

      if (role === "teacher") {
        navigate("/teacher")
      }

      if (role === "parent") {
        navigate("/parent")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-none p-0 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup className="gap-6">
              {/* Logo & Header */}
              <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
                <div className="flex items-center gap-2 text-blue-600">
                  <School2 size={24} strokeWidth={3} />
                  <span className="text-xl font-bold tracking-tight text-foreground">
                    SchoolMS
                  </span>
                </div>
                <h1 className="mt-2 text-2xl font-bold">Welcome back</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials to access your dashboard
                </p>
              </div>

              {/* Role Selection Field */}
              <Field>
                <FieldLabel className="mb-2 block">Login as</FieldLabel>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(["admin", "teacher", "student", "parent"] as const).map(
                    (r) => (
                      <Button
                        key={r}
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-9 capitalize transition-all",
                          roleSelect === r
                            ? "border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setRoleSelect(r)}
                      >
                        {r}
                      </Button>
                    )
                  )}
                </div>
              </Field>

              {/* Email Field */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="h-11"
                />
              </Field>

              {/* Password Field */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
                  >
                    Forgot?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </Field>

              {/* Submit Button */}
              <Button
                onClick={() => handleSubmit}
                type="submit"
                className="h-11 bg-blue-600 font-semibold text-white hover:bg-blue-700"
              >
                {loading ? (
                  <div className="animate-spin"></div>
                ) : (
                  ` Sign in as ${roleSelect}`
                )}
              </Button>

              <FieldDescription className="text-center text-xs">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="font-semibold text-blue-600 underline underline-offset-4"
                >
                  Contact Admin
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Right Side Image (Hidden on Mobile) */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://i.pinimg.com/736x/15/0a/4f/150a4fc61f8c9ce7909c0603d8c1b3a6.jpg"
              alt="School Management"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
            />
            <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-8">
              <p className="text-sm text-white italic">
                "Education is the most powerful weapon which you can use to
                change the world."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

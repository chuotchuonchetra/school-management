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
import { useState } from "react"

import type { role } from "@/constants/roles"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [roleSelect, setRoleSelect] = useState<role>()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="">
                <div className="logo flex items-center">
                  <School2 size={18} />
                  <span className="text-lg font-bold"> SchoolMS</span>
                </div>
              </div>
              <div className="">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Signin to access your dashboard
                </p>
              </div>
              <div className="">
                <h3 className="font-bold">Login as</h3>
                <div className="grid grid-cols-4 gap-2 pt-2">
                  <Button
                    type="button"
                    className={`h-9 border text-black ${
                      roleSelect === "admin"
                        ? "border-blue-500 bg-blue-500/5 text-blue-500"
                        : "border-gray-300 bg-black/5"
                    }`}
                    onClick={() => {
                      setRoleSelect("admin")
                    }}
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    className={`h-9 border text-black ${
                      roleSelect === "teacher"
                        ? "border-blue-500 bg-blue-500/5 text-blue-500"
                        : "border-gray-300 bg-black/5"
                    }`}
                    onClick={() => {
                      setRoleSelect("teacher")
                    }}
                  >
                    Teacher
                  </Button>
                  <Button
                    type="button"
                    className={`h-9 border text-black ${
                      roleSelect === "student"
                        ? "border-blue-500 bg-blue-500/5 text-blue-500"
                        : "border-gray-300 bg-black/5"
                    }`}
                    onClick={() => {
                      setRoleSelect("student")
                    }}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    className={`h-9 border text-black ${
                      roleSelect === "parent"
                        ? "border-blue-500 bg-blue-500/5 text-blue-500"
                        : "border-gray-300 bg-black/5"
                    }`}
                    onClick={() => {
                      setRoleSelect("parent")
                    }}
                  >
                    Parent
                  </Button>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="py-5"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="py-5"
                  placeholder="Password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className={"bg-blue-600 py-5"}>
                  Signin
                </Button>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                  <a href="" className="text-blue-900 underline">
                    Reset here
                  </a>
                </div>
              </Field>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://i.pinimg.com/736x/15/0a/4f/150a4fc61f8c9ce7909c0603d8c1b3a6.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

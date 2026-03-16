import { ImageUpload } from "@/components/shared/ImageUpload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { ParentData } from "@/types/student.types"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

const relationship = ["Father", "Mother", "Guardian"]

interface CreateNewParentProps {
  sendDataToParentInfo: (data: ParentData) => void
  onBack: () => void
}

export const CreateNewParent = ({
  onBack,
  sendDataToParentInfo,
}: CreateNewParentProps) => {
  const [form, setForm] = useState<ParentData>({
    mode: "new",
    newParent: {
      firstName: "",
      lastName: "",

      email: "",
      password: "",
      phone: "",
      relationship: "Guardian",
      profileImage: null,
    },
  })

  const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      newParent: {
        ...(prev.newParent || {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          relationship: "Guardian",
          profileImage: null,
        }),
        [name]: value,
      },
    }))
  }

  const handleSelectChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      newParent: {
        ...prev.newParent!,
        relationship: value as "Father" | "Mother" | "Guardian",
      },
      relationship: value,
    }))
  }

  return (
    <div>
      <form className="flex flex-col gap-4 p-2">
        <ImageUpload
          label="Parent Photo"
          name={form.newParent?.firstName}
          onChange={(file) => {
            setForm((prev) => ({
              ...prev,
              profileImage: file,
            }))
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label htmlFor="name">First Name*</label>
            <Input
              className="mt-2 py-4.5"
              placeholder="Name"
              name="name"
              value={form.newParent?.firstName}
              onChange={handleInputForm}
            />
          </div>
          <div className="">
            <label htmlFor="name">Last Name*</label>
            <Input
              className="mt-2 py-4.5"
              placeholder="Name"
              name="name"
              value={form.newParent?.lastName}
              onChange={handleInputForm}
            />
          </div>
          <div className="">
            <label htmlFor="">Relationship</label>
            <Select
              value={form.newParent?.relationship || ""}
              onValueChange={() => handleSelectChange}
            >
              <SelectTrigger className="mt-2 w-full py-4.5">
                <SelectValue placeholder="Select Relationship">
                  {/* {selectedRelationship?.label} */}
                  Select Relationship
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {relationship.map((re) => (
                    <SelectItem key={re} value={String(re)}>
                      {re}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label htmlFor="name">Email*</label>
            <Input
              className="mt-2 py-4.5"
              placeholder="Email"
              name="email"
              type="text"
              value={form.newParent?.email}
              onChange={handleInputForm}
            />
          </div>
          <div className="">
            <label htmlFor="studentNumber">Password*</label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={form.newParent?.password}
              onChange={handleInputForm}
              className="mt-2 py-4.5"
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="phone"> Phone*</label>
          <Input
            className="mt-2 py-4.5"
            placeholder="Phone"
            name="phone"
            value={form.newParent?.phone}
            onChange={handleInputForm}
          />
        </div>
        <div className="flex justify-between border-t pt-4">
          <Button
            type="button"
            onClick={() => onBack()}
            className="cursor-pointer rounded-lg border px-4 py-4.5 text-end"
          >
            <ArrowLeft size={13} /> Back
          </Button>
          <Button
            type="button"
            className="cursor-pointer rounded-lg border py-4.5 text-end"
            onClick={() => sendDataToParentInfo(form)}
          >
            Next Comfirm
            <ArrowRight size={14} />
          </Button>
        </div>
      </form>
    </div>
  )
}

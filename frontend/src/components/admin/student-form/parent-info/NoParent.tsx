import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const NoParent = () => {
  return (
    <div className="">
      <div className="my-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 py-10">
        <p className="text-3xl">👤</p>
        <p className="font-bold">No Parent / Guardian</p>
        <p className="w-10/20 text-center">
          This student will not be linked to any parent account. A parent
          account can always be added and linked later from the student's
          profile page.
        </p>
        <div className="rounded-lg border bg-gray-200/25 p-4 text-start">
          <p className="font-semibold">What this means</p>
          <ul className="list-disc ps-3 text-black/60">
            <li className="nav-link">
              No parent can log in to monitor this student
            </li>
            <li className="nav-link">
              No attendance alerts will be sent to a parent
            </li>
            <li className="nav-link">
              You can link a parent later from the student profile
            </li>
          </ul>
        </div>
      </div>
      <p className="alert mt-4 rounded-lg border-2 border-amber-300 bg-amber-200/15 p-2">
        ⚠️ Are you sure you don't want to link a parent? You can add one later
        from <span className="font-bold">Students → Edit Student.</span>
      </p>
      <div className="mt-4 flex justify-between border-t pt-4">
        <Button
          type="button"
          className="cursor-pointer rounded-lg border px-4 py-4.5 text-end"
        >
          <ArrowLeft size={13} /> Back
        </Button>
        <Button
          type="button"
          className="cursor-pointer rounded-lg border py-4.5 text-end"
          // onClick={() => handleNextStep}
        >
          Next Comfirm
          <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  )
}

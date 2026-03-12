import { Button } from "@/components/ui/button"
import type { ExistingParent } from "@/types/student.types"
import { ArrowLeft, ArrowRight, Search, Verified } from "lucide-react"
const MOCK_PARENTS: ExistingParent[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "s.jenkins@example.com",
    phone: "555-0101",
    linkedChildren: ["C-101", "C-102"],
  },
  {
    id: 2,
    name: "Marcus Thompson",
    email: "m.thompson88@provider.net",
    phone: "555-0123",
    linkedChildren: ["C-205"],
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.rod@webmail.com",
    phone: "555-0199",
    linkedChildren: ["C-301", "C-302", "C-303"],
  },
  {
    id: 4,
    name: "David Chen",
    email: "dchen_dev@techcorp.com",
    phone: "555-0242",
    linkedChildren: [], // Case for parent with no linked children yet
  },
]
export const LinkExistingParent = () => {
  return (
    <div>
      <div className="p-2">
        <div className="relative w-full">
          {/* The Icon */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>

          {/* The Input */}
          <input
            type="text"
            placeholder="Search Parent Name"
            className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <p className="my-2 text-gray-500">
          Search from existing parent accounts in the system
        </p>
      </div>
      {MOCK_PARENTS.length == 0 ? (
        <div className="mt-4 space-y-3">
          {MOCK_PARENTS.map((parent) => (
            <div
              key={parent.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                {/* Avatar with fixed dimensions */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                  {parent.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {parent.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {parent.email} • {parent.phone}
                  </p>

                  {/* Linked Children Tags */}
                  {parent.linkedChildren.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-[10px]">
                      <span className="text-slate-400">Linked to:</span>
                      <div className="flex flex-wrap gap-1">
                        {parent.linkedChildren.map((child) => (
                          <span
                            key={child}
                            className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600"
                          >
                            {child}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-blue-500">
                <Verified size={18} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-slate-400">
          <Search size={24} className="mb-2 opacity-20" />
          <p className="text-sm">
            Search for a parent to link them to this student
          </p>
        </div>
      )}
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

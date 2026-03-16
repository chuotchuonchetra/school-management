import Avatar from "@/components/shared/Avatar"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/useDebouce"
import type { ExistingParent, ParentData } from "@/types/student.types"
import { ArrowLeft, ArrowRight, Search, Verified } from "lucide-react"
import { useMemo, useState } from "react"

const MOCK_PARENTS: ExistingParent[] = [
  {
    id: 1,
    name: "Sok Chea",
    email: "sokchea@gmail.com",
    phone: "012345678",
    linkedChildren: ["C-101", "C-102"],
    profileImage: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Chan Dara",
    email: "chandara@gmail.com",
    phone: "093456789",
    linkedChildren: ["C-205"],
    profileImage: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Ly Sochea",
    email: "lysochea@gmail.com",
    phone: "097888777",
    linkedChildren: ["C-301", "C-302", "C-303"],
    profileImage: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    name: "Kim Sreyneang",
    email: "sreyneang@gmail.com",
    phone: "088123456",
    linkedChildren: [],
    profileImage: "https://i.pravatar.cc/150?img=14",
  },
]

const EMPTY_PARENT: ParentData = {
  mode: "existing",
  newParent: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    relationship: "Father",
    profileImage: null,
  },
  existingParentId: undefined,
  existingParent: undefined,
}

interface Props {
  sendExistingParent: (data: ParentData) => void
  onBack: () => void
}

export const LinkExistingParent = ({ sendExistingParent, onBack }: Props) => {
  const [selectExistParent, setSelectExistParent] =
    useState<ParentData>(EMPTY_PARENT)

  const [search, setSearch] = useState("")

  const debouncedSearch = useDebounce(search, 100)

  const results = useMemo(() => {
    if (!debouncedSearch) return []

    return MOCK_PARENTS.filter((parent) =>
      parent.name
        .toLowerCase()
        .trim()
        .includes(debouncedSearch.toLowerCase().trim())
    )
  }, [debouncedSearch])

  const handleParentSelect = (parent: ExistingParent) => {
    console.log(debouncedSearch)
    if (debouncedSearch) {
      setSelectExistParent({
        ...EMPTY_PARENT,
        existingParentId: parent.id,
        existingParent: parent,
      })
    }
  }

  const isSelected = (id: number) => selectExistParent.existingParentId === id

  return (
    <div>
      {/* SEARCH */}
      <div className="p-2">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>

          <input
            type="text"
            placeholder="Search Parent Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <p className="my-2 text-gray-500">
          Search from existing parent accounts
        </p>
      </div>

      {/* RESULT LIST */}
      {selectExistParent.existingParent !== EMPTY_PARENT.existingParent &&
      search! == "" ? (
        <div className="flex cursor-pointer items-center justify-between rounded-xl border border-blue-500 bg-blue-50 p-4 shadow transition-all duration-200">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <Avatar
              name={parent.name}
              profileImage={selectExistParent.existingParent!.profileImage}
            />

            <div>
              <p className="text-sm font-semibold">
                {selectExistParent.existingParent!.name}
              </p>

              <p className="text-xs text-slate-500">
                {selectExistParent.existingParent!.email} •{" "}
                {selectExistParent.existingParent!.phone}
              </p>

              {selectExistParent.existingParent!.linkedChildren.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                  {selectExistParent.existingParent?.linkedChildren.map((c) => (
                    <span
                      key={c}
                      className="rounded bg-slate-100 px-1.5 py-0.5"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* verified icon */}
          <div
            className={
              isSelected(selectExistParent.existingParent!.id)
                ? "text-blue-600"
                : "text-slate-300"
            }
          >
            <Verified size={18} />
          </div>
        </div>
      ) : (
        ""
      )}
      {results.length > 0 ? (
        <div className="mt-4 max-h-75 space-y-3 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-400">
          {results.map((parent) => (
            <div
              key={parent.id}
              onClick={() => handleParentSelect(parent)}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-200 ${
                isSelected(parent.id)
                  ? "border-blue-500 bg-blue-50 shadow"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm"
              } `}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <Avatar name={parent.name} profileImage={parent.profileImage} />

                <div>
                  <p className="text-sm font-semibold">{parent.name}</p>

                  <p className="text-xs text-slate-500">
                    {parent.email} • {parent.phone}
                  </p>

                  {parent.linkedChildren.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                      {parent.linkedChildren.map((c) => (
                        <span
                          key={c}
                          className="rounded bg-slate-100 px-1.5 py-0.5"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* verified icon */}
              <div
                className={
                  isSelected(parent.id) ? "text-blue-600" : "text-slate-300"
                }
              >
                <Verified size={18} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-slate-400">
          <Search size={24} className="mb-2 opacity-20" />
          <p className="text-sm">Search for a parent to link</p>
        </div>
      )}

      {/* BUTTONS */}
      <div className="mt-4 flex justify-between border-t pt-4">
        <Button type="button" variant="outline" onClick={() => onBack()}>
          <ArrowLeft size={14} /> Back
        </Button>

        <Button
          type="button"
          disabled={!selectExistParent.existingParentId}
          className="disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => sendExistingParent(selectExistParent)}
        >
          Next Confirm
          <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  )
}

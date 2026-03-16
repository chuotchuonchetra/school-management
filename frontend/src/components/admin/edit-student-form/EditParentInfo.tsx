// components/admin/edit-student-form/ParentSection.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { ImageUpload } from "@/components/shared/ImageUpload"
import type {
  CurrentParent,
  ParentEditMode,
  ParentEditState,
  ParentOption,
  ProfileImageState,
} from "@/types/editstudent.type"

// ─────────────────────────────────────────────────────────────
//  PROPS
// ─────────────────────────────────────────────────────────────
interface Props {
  currentParent: CurrentParent | null // null = student has no parent
  state: ParentEditState
  onChange: (next: ParentEditState) => void
}

// ─────────────────────────────────────────────────────────────
//  MOCK search — replace with real API call
// ─────────────────────────────────────────────────────────────
const searchParents = async (q: string): Promise<ParentOption[]> => {
  const MOCK: ParentOption[] = [
    {
      id: 10,
      name: "Chan Sopheak",
      email: "sopheak@gmail.com",
      phone: "012 987 654",
      profileImage: null,
      linkedChildren: ["Dara Chan"],
    },
    {
      id: 11,
      name: "Channa Pov",
      email: "channa@gmail.com",
      phone: "077 123 456",
      profileImage: null,
      linkedChildren: ["Kokoma sok", "Jame Sok"],
    },
    {
      id: 12,
      name: "Channary Kim",
      email: "channary@gmail.com",
      phone: "089 654 321",
      profileImage: null,
      linkedChildren: ["Kim Sokha"],
    },
  ]
  return MOCK.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.email.toLowerCase().includes(q.toLowerCase())
  )
}

// ─────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────
export const ParentSection = ({ currentParent, state, onChange }: Props) => {
  const hasParent = currentParent !== null

  // Search state (used in "change" tab)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ParentOption[]>([])
  const [searching, setSearching] = useState(false)

  // Debounced search
  useEffect(() => {
    if (state.mode !== "change") return
    const t = setTimeout(async () => {
      setSearching(true)
      const r = await searchParents(searchQuery)
      setSearchResults(r)
      setSearching(false)
    }, 300)
    return () => clearTimeout(t)
  }, [searchQuery, state.mode])

  // Pre-fill editedParent when switching to "edit" tab
  useEffect(() => {
    if (state.mode === "edit" && currentParent && !state.editedParent) {
      onChange({
        ...state,
        editedParent: {
          name: currentParent.name,
          email: currentParent.email,
          phone: currentParent.phone,
          relationship: currentParent.relationship,
          profileImage: {
            status: "unchanged",
            url: currentParent.profileImage,
          },
        },
      })
    }
  }, [currentParent, onChange, state, state.mode])

  // Pre-fill newParent when switching to "addNew" tab
  useEffect(() => {
    if (state.mode === "addNew" && !state.newParent) {
      onChange({
        ...state,
        newParent: {
          name: "",
          email: "",
          password: "",
          phone: "",
          relationship: "Father",
          profileImage: { status: "unchanged", url: null },
        },
      })
    }
  }, [onChange, state, state.mode])

  // ── Helpers ─────────────────────────────────────────────
  const setMode = (mode: ParentEditMode) => onChange({ ...state, mode })

  const setEditedField = (field: string, value: unknown) =>
    onChange({
      ...state,
      editedParent: { ...state.editedParent!, [field]: value },
    })

  const setNewParentField = (field: string, value: unknown) =>
    onChange({ ...state, newParent: { ...state.newParent!, [field]: value } })

  const handleEditedImageChange = (file: File | null) => {
    const next: ProfileImageState =
      file !== null ? { status: "changed", file } : { status: "removed" }
    setEditedField("profileImage", next)
  }

  const handleNewParentImageChange = (file: File | null) => {
    const next: ProfileImageState =
      file !== null ? { status: "changed", file } : { status: "removed" }
    setNewParentField("profileImage", next)
  }

  // ── Tab config — different tabs depending on hasParent ──
  const tabs = hasParent
    ? [
        { value: "keep", label: "✓ Keep" },
        { value: "edit", label: "✏️ Edit Info" },
        { value: "change", label: "🔄 Change" },
        { value: "remove", label: "✗ Remove" },
      ]
    : [
        { value: "addNew", label: "➕ Add New" },
        { value: "change", label: "👤 Link Existing" },
      ]

  // ─────────────────────────────────────────────────────────
  return (
    <div>
      <SectionTitle icon="👨‍👩‍👧" label="Parent / Guardian" />

      {/* Current parent card — shown when student has a parent */}
      {hasParent && state.mode !== "remove" && (
        <div className="mb-3 flex items-center gap-3 rounded-xl border bg-muted/40 px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
            {currentParent!.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold">{currentParent!.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {currentParent!.email} · {currentParent!.relationship} ·{" "}
              {currentParent!.phone}
            </p>
          </div>
          <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">
            Linked
          </span>
        </div>
      )}

      {/* No parent empty state */}
      {!hasParent && (
        <div className="mb-3 rounded-xl border border-dashed bg-muted/30 py-4 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            No parent linked to this student
          </p>
        </div>
      )}

      {/* ── Tabs ── */}
      <Tabs
        value={state.mode}
        onValueChange={(v) => setMode(v as ParentEditMode)}
      >
        <TabsList className="mb-4 w-full">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`flex-1 text-xs ${tab.value === "remove" ? "data-[state=active]:text-red-500" : ""}`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── KEEP ── */}
        <TabsContent value="keep">
          <p className="py-2 text-center text-xs text-muted-foreground">
            ✓ Parent link will not be changed
          </p>
        </TabsContent>

        {/* ── EDIT INFO ── */}
        <TabsContent value="edit">
          {state.editedParent && (
            <div className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4">
              <p className="text-[11px] font-bold text-blue-600">
                ✏️ Editing: {currentParent?.name}
              </p>

              {/* Parent photo */}
              <ImageUpload
                name={state.editedParent.name}
                currentImageUrl={
                  state.editedParent.profileImage.status === "unchanged"
                    ? state.editedParent.profileImage.url
                    : null
                }
                label="Parent Photo"
                onChange={handleEditedImageChange}
              />

              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name" required>
                  <Input
                    value={state.editedParent.name}
                    onChange={(e) => setEditedField("name", e.target.value)}
                  />
                </Field>
                <Field label="Relationship">
                  <Select
                    value={state.editedParent.relationship}
                    onValueChange={(v) => setEditedField("relationship", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Guardian">Guardian</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Email" required>
                  <Input
                    type="email"
                    value={state.editedParent.email}
                    onChange={(e) => setEditedField("email", e.target.value)}
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={state.editedParent.phone}
                    onChange={(e) => setEditedField("phone", e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── CHANGE ── */}
        <TabsContent value="change">
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-blue-400 bg-white px-3 py-2">
            <span className="text-sm">🔍</span>
            <input
              className="flex-1 bg-transparent text-sm outline-none"
              placeholder="Search parent by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searching && (
              <span className="animate-pulse text-[10px] text-muted-foreground">
                searching...
              </span>
            )}
          </div>
          <p className="mb-2 text-[10px] text-muted-foreground">
            {hasParent
              ? `Replace current parent: ${currentParent?.name}`
              : "Find an existing parent to link"}
          </p>

          {/* Results */}
          <div className="flex max-h-48 flex-col gap-1.5 overflow-y-auto">
            {searchResults.length === 0 && !searching && (
              <p className="py-4 text-center text-xs text-muted-foreground">
                {searchQuery ? "No parents found" : "Type to search..."}
              </p>
            )}
            {searchResults.map((p) => {
              const isSelected = state.newExistingParentId === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...state,
                      newExistingParentId: p.id,
                      newExistingParent: p,
                    })
                  }
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-border bg-white hover:border-blue-200"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                    {p.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold">{p.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {p.email}
                    </p>
                    {p.linkedChildren.length > 0 && (
                      <p className="text-[10px] text-muted-foreground">
                        Linked to:{" "}
                        <span className="font-semibold text-blue-600">
                          {p.linkedChildren.join(", ")}
                        </span>
                      </p>
                    )}
                  </div>
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "border-2 border-border"
                    }`}
                  >
                    {isSelected && "✓"}
                  </div>
                </button>
              )
            })}
          </div>

          {state.newExistingParent && (
            <div className="mt-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] text-blue-700">
              ✅ Will link: <strong>{state.newExistingParent.name}</strong>
            </div>
          )}
        </TabsContent>

        {/* ── ADD NEW ── */}
        <TabsContent value="addNew">
          {state.newParent && (
            <div className="flex flex-col gap-3 rounded-xl border border-blue-200 bg-blue-50/40 p-4">
              <p className="text-[11px] font-bold text-blue-600">
                ➕ New Parent Account
              </p>

              <ImageUpload
                name={state.newParent.name}
                label="Parent Photo"
                onChange={handleNewParentImageChange}
              />

              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name" required>
                  <Input
                    placeholder="e.g. Chan Sopheak"
                    value={state.newParent.name}
                    onChange={(e) => setNewParentField("name", e.target.value)}
                  />
                </Field>
                <Field label="Relationship">
                  <Select
                    value={state.newParent.relationship}
                    onValueChange={(v) => setNewParentField("relationship", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Guardian">Guardian</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Email" required>
                  <Input
                    type="email"
                    placeholder="parent@gmail.com"
                    value={state.newParent.email}
                    onChange={(e) => setNewParentField("email", e.target.value)}
                  />
                </Field>
                <Field label="Password" required>
                  <Input
                    type="password"
                    placeholder="Min 6 characters"
                    value={state.newParent.password}
                    onChange={(e) =>
                      setNewParentField("password", e.target.value)
                    }
                  />
                </Field>
                <Field label="Phone" hint="Optional">
                  <Input
                    placeholder="012 345 678"
                    value={state.newParent.phone}
                    onChange={(e) => setNewParentField("phone", e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── REMOVE ── */}
        <TabsContent value="remove">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
            <p className="mb-2 text-2xl">⚠️</p>
            <p className="mb-1 text-sm font-bold text-red-600">
              Remove Parent Link
            </p>
            <p className="mb-3 text-[11px] leading-relaxed text-red-500">
              This will unlink <strong>{currentParent?.name}</strong> from this
              student.
              <br />
              The parent account will <strong>NOT be deleted</strong> — only the
              link.
            </p>
            <div className="rounded-lg border border-red-100 bg-white p-3 text-left text-[11px] text-muted-foreground">
              <p className="mb-1 font-bold text-foreground">After removing:</p>
              <p className="mb-1">
                ❌ Parent can no longer view grades or attendance
              </p>
              <p className="mb-1">❌ No attendance alerts will be sent</p>
              <p>✅ You can re-link a parent any time from this form</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ── Shared sub-components ─────────────────────────────────────

const SectionTitle = ({ icon, label }: { icon: string; label: string }) => (
  <div className="mb-3 flex items-center gap-2 border-b pb-2">
    <span className="text-xs">{icon}</span>
    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
      {label}
    </span>
  </div>
)

const Field = ({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-foreground">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
  </div>
)

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
import { useState, } from "react"

import type {
  ParentEditMode,
  ParentEditState,
} from "@/types/editstudent.type"

import { CheckCircle2, Search, User } from "lucide-react"
import { ParentCard } from "@/components/shared/ParentCard"
import { ImageUpload } from "@/components/shared/ImageUpload"
import { useDebounce } from "@/hooks/useDebouce"
import { useParent } from "@/hooks/useParent"

interface Props {
  parentLinked:any
  state: ParentEditState
  onChange: (next: ParentEditState) => void
  studentName:string
}



export const ParentSection = ({ state, onChange ,parentLinked,studentName}: Props) => {
  const [text,setText] = useState<string>("")
  const debouncedSearch = useDebounce(text,500) 

  const { data , isLoading } = useParent(debouncedSearch)
 


  const [selectedParent, setSelectedParent] = useState<any | null>(null);
  const hasParent = parent !== null
  
  const setMode = (mode: ParentEditMode) => onChange({ ...state, mode })

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

     
  
  if(isLoading) return <p>Loading...</p>
  return (
    <div>
      <SectionTitle icon="👨‍👩‍👧" label="Parent / Guardian" />

      {/* Current parent card — shown when student has a parent */}
      {hasParent && state.mode == "keep" && (
        <div className="mb-3 flex items-center gap-3 rounded-xl border bg-muted/40 px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
            {parentLinked.user.firstName.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold">{parentLinked.user.firstName + " " + parentLinked.user.lastName}</p>
            <p className="text-[10px] text-muted-foreground">
              {parentLinked.user.email} · {parentLinked.relationship} ·{" "}
              {parentLinked.phone}
            </p>
          </div>
          <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">
            Linked
          </span>
        </div>
        
      )}

      {/* No parent empty state */}
      {!hasParent && (
        <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-4 mb-4 flex flex-col items-center justify-center text-center">
        <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-900">
          <User size={24} />
        </div>
        <h3 className="text-slate-700 font-semibold">No parent linked to this student</h3>
        <p className="text-slate-400 text-sm">Add one below or leave unlinked</p>
      </div>
      )}

      {/* ── Tabs ── */}
      <Tabs
        value={state.mode}
        onValueChange={(v) => setMode(v as ParentEditMode)}
      >
        <TabsList className="mb-4 w-full py-6 px-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`flex-1 text-xs py-4 mx-1 ${tab.value === "remove" ? "data-[state=active]:text-red-500" : ""}`}
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
           
            <div className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4">
              <p className="text-[11px] font-bold text-blue-600">
                ✏️ Editing: {parentLinked.user.firstName} {parentLinked.user.lastName}
              </p>

              
              <ImageUpload onChange={() => {}}
                label="Profile Image"
                name={parentLinked.user.firstName + " " + parentLinked.user.lastName}
                currentImageUrl={parentLinked.user.profileImage?.image}
                />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name" required>
                  <Input
                    value={`${parentLinked.user.firstName} ${parentLinked.user.lastName}`}
                    
                  />
                </Field>
                <Field label="Relationship">
                  <Select
                    value={parentLinked.relationship}
                  
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
                    value={parentLinked.user.email}
                    
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={parentLinked.phone}
                    
                  />
                </Field>
              </div>
            </div>
         
        </TabsContent>

        

        {/* ── REMOVE ── */}
        <TabsContent value="remove">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
            <p className="mb-2 text-2xl">⚠️</p>
            <p className="mb-1 text-sm font-bold text-red-600">
              Remove Parent Link
            </p>
            <p className="mb-3 text-[11px] leading-relaxed text-red-500">
              This will unlink <strong>{parentLinked.user.firstName + " " + parentLinked.user.lastName}</strong> from this
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
        {/* ── CHANGE ── */}
        <TabsContent value="change" className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
            <Input 
              className="pl-10 h-12 border-2 border-blue-500 focus-visible:ring-0 rounded-xl font-medium" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold uppercase">
              {text ? data?.filter((parent:any) => parent.user.firstName.toLowerCase().includes(text.toLowerCase()) || parent.user.lastName.toLowerCase().includes(text.toLowerCase())).length : '0'} results
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Find an existing parent account to link</p>

          <div className="space-y-3 overflow-y-auto h-[200px] [&::-webkit-scrollbar-track]:bg-slate-100
                          [&::-webkit-scrollbar-thumb]:bg-slate-300
                          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:w-2">
            
            {/* 1. Show results if we have data and user has typed something */}
            {debouncedSearch ? (
  isLoading ? (
    <div className="flex items-center justify-center h-full text-sm text-slate-400">
      Searching...
    </div>
  ) : data.length > 0 ? (
    <>
      {/* ✅ Parent list */}
      {data.map((parent: any) => (
        <ParentCard
          key={parent.id}
          parentId={parent.user.id}
          relationship={parent.relationship}
          firstName={parent.user.firstName}
          lastName={parent.user.lastName}
          linkChildren={["test"]}
          email={parent.user.email}
          phone={parent.phone}
          color="bg-indigo-500"
          isLinkedId={parentLinked.user.id}
          selectedId={selectedParent?.user.id}
          onClick={() => setSelectedParent(parent)}
        />
      ))}

      {/* ✅ Selected message */}
      {selectedParent !== null && (
        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 animate-in fade-in zoom-in duration-200">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <p className="text-xs font-medium">
            Will link parent ID{" "}
            <span className="font-bold">{selectedParent.user.firstName + " " + selectedParent.user.lastName}</span> to{" "}
            {studentName}
          </p>
        </div>
      )}
    </>
    
  ) : (
    // ❌ No results
    <div className="flex flex-col items-center justify-center h-full text-center border border-dashed border-slate-300 rounded-xl bg-slate-50">
      <div className="bg-slate-100 p-3 rounded-full mb-2 text-slate-400">
        <Search size={20} />
      </div>
      <p className="text-sm font-medium text-slate-500">
        No parents found
      </p>
      <p className="text-xs text-slate-400">
        No results match "{debouncedSearch}"
      </p>
    </div>
      )
    ) : (
      // 💤 No search yet
      <div className="flex flex-col items-center justify-center h-full text-center border border-dashed border-slate-300 rounded-xl bg-slate-50">
        <div className="bg-slate-100 p-3 rounded-full mb-2 text-slate-400">
          <Search size={20} />
        </div>
        <p className="text-sm font-medium text-slate-500">
          No parent selected
        </p>
        <p className="text-xs text-slate-400">
          Search parent to link student
        </p>
        <div className="mt-2 text-[11px] text-slate-300 italic">
          Start typing in the search box above...
        </div>
      </div>
    )}
           
       </div>

          
        </TabsContent>

        {/* ── ADD NEW ── */}
        <TabsContent value="addNew">
          {state.newParent && (
            <div className="flex flex-col gap-3 rounded-xl border border-blue-200 bg-blue-50/40 p-4">
              <p className="text-[11px] font-bold text-blue-600">
                ➕ New Parent Account
              </p>

              {/* <ImageUpload
                name={state.newParent.name}
                label="Parent Photo"
                onChange={handleNewParentImageChange}
              /> */}

              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name" required>
                  <Input
                    placeholder="e.g. Chan Sopheak"
                    
                    
                  />
                </Field>
                <Field label="Relationship">
                  <Select
                    
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
                   
                  />
                </Field>
                <Field label="Password" required>
                  <Input
                    type="password"
                    placeholder="Min 6 characters"
                    
                  />
                </Field>
                <Field label="Phone" hint="Optional">
                  <Input
                    placeholder="012 345 678"
                    
                  />
                </Field>
              </div>
            </div>
          )}
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

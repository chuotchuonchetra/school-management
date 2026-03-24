import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Link as LinkIcon, Upload, Search, CheckCircle2, User, Info } from "lucide-react";

export default function ParentManager() {
  const [selectedParent, setSelectedParent] = useState<string | null>("Keo Bunna");
  const studentName = "Piseth Keo";

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>👨‍👩‍👧‍👦</span> Parent / Guardian
      </div>

      {/* Empty State Card */}
      <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
        <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-900">
          <User size={24} />
        </div>
        <h3 className="text-slate-700 font-semibold">No parent linked to this student</h3>
        <p className="text-slate-400 text-sm">Add one below or leave unlinked</p>
      </div>

      <Tabs defaultValue="new" className="w-full">
        {/* Shadcn Tabs List */}
        <TabsList className="grid w-full grid-cols-2 h-12 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="new" className="rounded-lg data-[state=active]:shadow-sm gap-2">
            <UserPlus size={16} /> Add New Parent
          </TabsTrigger>
          <TabsTrigger value="existing" className="rounded-lg data-[state=active]:shadow-sm gap-2">
            <LinkIcon size={16} /> Link Existing
          </TabsTrigger>
        </TabsList>

        {/* --- ADD NEW PARENT CONTENT --- */}
        <TabsContent value="new" className="mt-6 border border-blue-100 bg-blue-50/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 text-sm">
            <UserPlus size={16} /> New Parent Account
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">K</div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-600">Parent Photo</Label>
                <p className="text-[10px] text-slate-400">Optional - Max 2MB</p>
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold gap-2">
                  <Upload size={14} /> Upload
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">Full Name <span className="text-red-500">*</span></Label>
                <Input defaultValue="Keo Bunna" className="bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">Relationship</Label>
                <Select defaultValue="father">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">Email <span className="text-red-500">*</span></Label>
                <Input type="email" defaultValue="keo.bunna@gmail.com" className="bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">Password <span className="text-red-500">*</span></Label>
                <Input type="password" value="password123" className="bg-white" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">Phone</Label>
                <Input defaultValue="099 888 777" className="bg-white" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-100/40 border border-blue-200 rounded-xl text-blue-700">
              <Info size={16} />
              <p className="text-xs font-medium">A new parent account will be created and linked to {studentName}</p>
            </div>
          </div>
        </TabsContent>

        {/* --- LINK EXISTING CONTENT --- */}
        <TabsContent value="existing" className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
            <Input 
              className="pl-10 h-12 border-2 border-blue-500 focus-visible:ring-0 rounded-xl font-medium" 
              defaultValue="keo" 
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold uppercase">2 results</span>
          </div>
          <p className="text-[11px] text-slate-400">Find an existing parent account to link</p>

          <div className="space-y-3 overflow-y-auto h-[200px] [&::-webkit-scrollbar-track]:bg-slate-100
  [&::-webkit-scrollbar-thumb]:bg-slate-300
  [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:w-2">
            <ParentCard 
              name="Keo Bunna" 
              email="keo.bunna@gmail.com" 
              phone="099 888 777" 
              meta="No children linked yet"
              color="bg-indigo-500"
              selected={selectedParent === "Keo Bunna"}
              onClick={() => setSelectedParent("Keo Bunna")}
            />
            <ParentCard 
              name="Keo Sothea" 
              email="sothea@gmail.com" 
              phone="077 111 222" 
              meta="Linked to: Keo Dara"
              color="bg-orange-500"
              selected={selectedParent === "Keo Sothea"}
              onClick={() => setSelectedParent("Keo Sothea")}
            />
            <ParentCard 
              name="Keo Bunna" 
              email="keo.bunna@gmail.com" 
              phone="099 888 777" 
              meta="No children linked yet"
              color="bg-indigo-500"
              selected={selectedParent === "Keo Bunna"}
              onClick={() => setSelectedParent("Keo Bunna")}
            />
            <ParentCard 
              name="Keo Sothea" 
              email="sothea@gmail.com" 
              phone="077 111 222" 
              meta="Linked to: Keo Dara"
              color="bg-orange-500"
              selected={selectedParent === "Keo Sothea"}
              onClick={() => setSelectedParent("Keo Sothea")}
            />
          </div>

          {selectedParent && (
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 animate-in fade-in zoom-in duration-200">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <p className="text-xs font-medium">
                Will link <span className="font-bold">{selectedParent}</span> as parent for {studentName}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ParentCard({ name, email, phone, meta, color, selected, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
        selected ? "border-blue-500 bg-blue-50/20 shadow-sm" : "border-slate-100 hover:border-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 ${color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
          {name.charAt(0)}
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-800 text-sm">{name}</h4>
          <p className="text-xs text-slate-400 font-medium">{email} • {phone}</p>
          <p className={`text-[11px] ${meta.includes('Linked to') ? 'text-blue-500 font-bold' : 'text-slate-400'}`}>
            {meta}
          </p>
        </div>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
        selected ? "bg-blue-500 border-blue-500" : "border-slate-200"
      }`}>
        {selected && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
      </div>
    </div>
  );
}
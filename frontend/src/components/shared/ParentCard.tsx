import { CheckCircle2 } from "lucide-react";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  color: string;
  linkChildren: string[];
  selectedId: number | null;
  onClick: () => void;
  relationship: string;
  isLinkedId: number; // already linked parent
  parentId: number;   // current card parent
}

export const ParentCard = ({
  firstName,
  lastName,
  email,
  phone,
  color,
  linkChildren,
  selectedId,
  onClick,
  isLinkedId,
  parentId,
}: Props) => {


  const isSelected =  selectedId !== undefined ? selectedId === parentId : parentId === isLinkedId 
 
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-between px-2 py-1 rounded-2xl border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50/20 shadow-sm"
          : "border-slate-100 hover:border-slate-200"
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div
          className={`h-8 w-8 ${color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
        >
          {firstName.charAt(0)}
        </div>

        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-800 text-sm">
            {firstName + " " + lastName} {isLinkedId} = {parentId}
          </h4>

          <p className="text-xs text-slate-400 font-medium">
            {email} • {phone}
          </p>

          <p
            className={`text-[11px] ${
              linkChildren.length > 0
                ? "text-blue-500 font-bold"
                : "text-slate-400"
            }`}
          >
            <span className="text-slate-400"> Link to </span>
            {linkChildren.length > 0
              ? linkChildren.join(", ")
              : "No parent linked to this student"}
          </p>
        </div>
      </div>

      {/* RIGHT CHECK */}
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected
            ? "bg-blue-500 border-blue-500"
            : "border-slate-200"
        }`}
      >
        {isSelected && (
          <CheckCircle2
            size={12}
            className="text-white"
            strokeWidth={3}
          />
        )}
      </div>
    </div>
  );
};
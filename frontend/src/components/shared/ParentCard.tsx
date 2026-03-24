import { CheckCircle2 } from "lucide-react";
interface Props{
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    meta:string;
    color:string;
    link:string[];
    selected:boolean;
    onClick:()=>void;
}
export const ParentCard = ({ firstName,lastName, email, phone, meta, color, link, selected, onClick }: Props) => {
  return (
    <div 
      onClick={onClick}
      className={` relative flex items-center justify-between px-2 py-1 rounded-2xl border-2 cursor-pointer transition-all ${
        selected ? "border-blue-500 bg-blue-50/20 shadow-sm" : "border-slate-100 hover:border-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`h-8 w-8 ${color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
          {firstName.charAt(0)}
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-800 text-sm">{firstName + " " + lastName}</h4>
          <p className="text-xs text-slate-400 font-medium">{email} • {phone}</p>
          <p className={`text-[11px] ${meta.includes('Linked to') ? 'text-blue-500 font-bold' : 'text-slate-400'}`}>
            <span className="text-slate-400"> Link to</span> {link.join(", ")}
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
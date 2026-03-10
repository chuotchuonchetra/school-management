interface StatProps {
  title: string
  value: string | number
  color?: string
  subText?: string
}
export const StatCard = ({ title, value, subText, color }: StatProps) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
        {title}
      </p>
      <h2 className="my-2 text-3xl font-bold text-slate-800">{value}</h2>
      <p className="mb-4 text-xs font-medium">{subText}</p>

      <div className="h-1.5 w-full rounded-full bg-gray-100">
        <div
          className={`$ h-1.5 rounded-full ${color}`}
          style={{ width: "70%" }}
        ></div>
      </div>
    </div>
  )
}

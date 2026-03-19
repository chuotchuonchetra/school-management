interface DataTableProps<T> {
  thead: string[]
  data: T[] // ✅ Now accepts any array
  renderRow: (item: T) => React.ReactNode // ✅ Parent decides how to draw the row
  onEdit?: (item: T) => void
}

export const DataTable = <T extends { id: number | string }>({
  thead,
  data,
  renderRow,
}: DataTableProps<T>) => {
  return (
    <div className="rounded-2xl p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-xs font-medium tracking-wider text-gray-400 uppercase">
              {thead.map((th, index) => (
                <th key={index} className="py-2 pr-4">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr
                key={item.id}
                className="group transition-colors hover:bg-gray-50/50"
              >
                {renderRow(item)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

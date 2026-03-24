interface DataTableProps<T> {
  thead: string[]
  data: T[] // ✅ Now accepts any array
  renderRow: (item: T) => React.ReactNode // ✅ Parent decides how to draw the row
  onEdit?: (item: T) => void
  isLoading: boolean
}

export const DataTable = <T extends { id: number | string }>({
  thead,
  data,
  renderRow,
  isLoading,
}: DataTableProps<T>) => {
  return (
    <div className="rounded-2xl p-4">
      <div className="overflow-x-auto overflow-y-hidden">
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
            {isLoading ? (
              <tr>
                {/* Set colSpan to the total number of columns in your table */}
                <td colSpan={thead.length} className="p-10">
                  <div className="flex w-full items-center justify-center">
                    Loading
                    <div className="ms-2 h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="group w-full transition-colors hover:bg-gray-50/50"
                >
                  {renderRow(item)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

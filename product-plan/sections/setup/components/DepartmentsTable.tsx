import { useMemo } from 'react'
import type { Department, ConfigStatus } from '../types'

interface DepartmentsTableProps {
  departments: Department[]
  searchQuery: string
  statusFilter: 'all' | 'active' | 'inactive'
  onEdit: (id: string) => void
  onToggle: (id: string, status: ConfigStatus) => void
  onDelete: (id: string) => void
}

export function DepartmentsTable({
  departments,
  searchQuery,
  statusFilter,
  onEdit,
  onToggle,
  onDelete,
}: DepartmentsTableProps) {
  const filtered = useMemo(() => {
    let result = departments
    if (statusFilter !== 'all') {
      result = result.filter((d) => d.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((d) => d.name.toLowerCase().includes(q))
    }
    return result
  }, [departments, searchQuery, statusFilter])

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <span className="text-lg text-slate-400">0</span>
        </div>
        <p className="font-medium">No departments found</p>
        <p className="text-sm mt-1">
          {searchQuery ? 'Try adjusting your search query' : 'No departments match the current filter'}
        </p>
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Department
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Head Count
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {filtered.map((dept) => (
            <tr
              key={dept.id}
              onClick={() => onEdit(dept.id)}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3">
                <span className="text-sm font-medium text-slate-900 dark:text-white">{dept.name}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm tabular-nums text-slate-600 dark:text-slate-300">{dept.headCount}</span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggle(dept.id, dept.status === 'active' ? 'inactive' : 'active')
                  }}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                    dept.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                  }`}
                >
                  {dept.status === 'active' ? 'Active' : 'Inactive'}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

import { useMemo, useState } from 'react'
import type { Designation, Department, ConfigStatus } from '../types'

interface DesignationsTableProps {
  designations: Designation[]
  departments: Department[]
  searchQuery: string
  statusFilter: 'all' | 'active' | 'inactive'
  onEdit: (id: string) => void
  onToggle: (id: string, status: ConfigStatus) => void
  onDelete: (id: string) => void
}

export function DesignationsTable({
  designations,
  departments,
  searchQuery,
  statusFilter,
  onEdit,
  onToggle,
  onDelete,
}: DesignationsTableProps) {
  const [deptFilter, setDeptFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    let result = designations
    if (statusFilter !== 'all') {
      result = result.filter((d) => d.status === statusFilter)
    }
    if (deptFilter !== 'all') {
      result = result.filter((d) => d.departmentId === deptFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.departmentName.toLowerCase().includes(q)
      )
    }
    return result
  }, [designations, searchQuery, statusFilter, deptFilter])

  if (filtered.length === 0 && designations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <span className="text-lg text-slate-400">0</span>
        </div>
        <p className="font-medium">No designations found</p>
        <p className="text-sm mt-1">Add your first designation to get started</p>
      </div>
    )
  }

  return (
    <div>
      {/* Department filter chips */}
      <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setDeptFilter('all')}
          className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            deptFilter === 'all'
              ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          All Departments
        </button>
        {departments
          .filter((d) => d.status === 'active')
          .map((dept) => (
            <button
              key={dept.id}
              onClick={() => setDeptFilter(dept.id)}
              className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                deptFilter === dept.id
                  ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {dept.name}
            </button>
          ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
          <p className="font-medium">No designations found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Designation
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Department
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((desg) => (
                <tr
                  key={desg.id}
                  onClick={() => onEdit(desg.id)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{desg.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                      {desg.departmentName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggle(desg.id, desg.status === 'active' ? 'inactive' : 'active')
                      }}
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                        desg.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {desg.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

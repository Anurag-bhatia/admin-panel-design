import { useMemo } from 'react'
import type { Service, ConfigStatus } from '../types'

interface ServicesTableProps {
  services: Service[]
  searchQuery: string
  statusFilter: 'all' | 'active' | 'inactive'
  onEdit: (id: string) => void
  onToggle: (id: string, status: ConfigStatus) => void
  onDelete: (id: string) => void
}

const TYPE_STYLES: Record<string, string> = {
  'Against Vehicle': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Topup Service': 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
}

export function ServicesTable({
  services,
  searchQuery,
  statusFilter,
  onEdit,
  onToggle,
  onDelete,
}: ServicesTableProps) {
  const filtered = useMemo(() => {
    let result = services
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [services, searchQuery, statusFilter])

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <span className="text-lg text-slate-400">0</span>
        </div>
        <p className="font-medium">No services found</p>
        <p className="text-sm mt-1">
          {searchQuery ? 'Try adjusting your search query' : 'No services match the current filter'}
        </p>
      </div>
    )
  }

  return (
    <table className="w-full">
      <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Type
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Category
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Credits
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {filtered.map((service) => (
          <tr
            key={service.id}
            onClick={() => onEdit(service.id)}
            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <td className="px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{service.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">{service.slug}</p>
              </div>
            </td>
            <td className="px-4 py-3">
              <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${TYPE_STYLES[service.type] || 'bg-slate-100 text-slate-700'}`}>
                {service.type}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
              {service.category}
            </td>
            <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white tabular-nums">
              {service.credits}
            </td>
            <td className="px-4 py-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle(service.id, service.status === 'active' ? 'inactive' : 'active')
                }}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                  service.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }`}
              >
                {service.status === 'active' ? 'Active' : 'Inactive'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

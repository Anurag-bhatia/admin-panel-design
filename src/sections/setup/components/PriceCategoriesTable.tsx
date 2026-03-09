import { useMemo } from 'react'
import type { PriceCategory, ConfigStatus } from '@/../product/sections/setup/types'

interface PriceCategoriesTableProps {
  priceCategories: PriceCategory[]
  searchQuery: string
  statusFilter: 'all' | 'active' | 'inactive'
  onEdit: (id: string) => void
  onToggle: (id: string, status: ConfigStatus) => void
  onDelete: (id: string) => void
}

export function PriceCategoriesTable({
  priceCategories,
  searchQuery,
  statusFilter,
  onEdit,
  onToggle,
  onDelete,
}: PriceCategoriesTableProps) {
  const filtered = useMemo(() => {
    let result = priceCategories
    if (statusFilter !== 'all') {
      result = result.filter((pc) => pc.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (pc) =>
          pc.name.toLowerCase().includes(q) ||
          pc.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [priceCategories, searchQuery, statusFilter])

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <span className="text-lg text-slate-400">0</span>
        </div>
        <p className="font-medium">No price categories found</p>
        <p className="text-sm mt-1">
          {searchQuery ? 'Try adjusting your search query' : 'No categories match the current filter'}
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
            Markup
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {filtered.map((pc) => (
          <tr
            key={pc.id}
            onClick={() => onEdit(pc.id)}
            className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
              pc.isProtected ? 'bg-amber-50/30 dark:bg-amber-900/5' : ''
            }`}
          >
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{pc.name}</p>
                    {pc.isProtected && (
                      <span className="inline-flex px-1.5 py-0.5 text-[10px] font-semibold rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" title="Protected — core values cannot be modified">
                        Protected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xs truncate">
                    {pc.description}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3">
              <span className={`text-sm font-semibold tabular-nums ${
                pc.increaseBy > 0
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-400 dark:text-slate-500'
              }`}>
                {pc.increaseBy > 0 ? `+${pc.increaseBy}%` : '0%'}
              </span>
            </td>
            <td className="px-4 py-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (!pc.isProtected) {
                    onToggle(pc.id, pc.status === 'active' ? 'inactive' : 'active')
                  }
                }}
                disabled={pc.isProtected}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                  pc.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                } ${pc.isProtected ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {pc.status === 'active' ? 'Active' : 'Inactive'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

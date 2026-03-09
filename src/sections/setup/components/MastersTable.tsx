import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { Master, MasterValue, ConfigStatus } from '@/../product/sections/setup/types'

interface MastersTableProps {
  masters: Master[]
  masterValues: Record<string, MasterValue[]>
  searchQuery: string
  statusFilter: 'all' | 'active' | 'inactive'
  onEditMaster: (id: string) => void
  onToggleMaster: (id: string, status: ConfigStatus) => void
  onDeleteMaster: (id: string) => void
  onAddMasterValue: (masterId: string) => void
  onToggleMasterValue: (masterId: string, valueId: string, status: ConfigStatus) => void
}

export function MastersTable({
  masters,
  masterValues,
  searchQuery,
  statusFilter,
  onEditMaster,
  onToggleMaster,
  onDeleteMaster,
  onAddMasterValue,
  onToggleMasterValue,
}: MastersTableProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setExpandedIds(next)
  }

  const filtered = useMemo(() => {
    let result = masters
    if (statusFilter !== 'all') {
      result = result.filter((m) => m.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [masters, searchQuery, statusFilter])

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <span className="text-lg text-slate-400">0</span>
        </div>
        <p className="font-medium">No masters found</p>
        <p className="text-sm mt-1">
          {searchQuery ? 'Try adjusting your search query' : 'No master categories match the current filter'}
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {filtered.map((master) => {
        const isExpanded = expandedIds.has(master.id)
        const values = masterValues[master.id] || []

        return (
          <div key={master.id}>
            {/* Master row */}
            <div
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              onClick={() => onEditMaster(master.id)}
            >
              {/* Expand toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpand(master.id)
                }}
                className="p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {master.name}
                  </p>
                  <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                    {master.valueCount} values
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {master.description}
                </p>
              </div>

              {/* Status */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleMaster(master.id, master.status === 'active' ? 'inactive' : 'active')
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                  master.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }`}
              >
                {master.status === 'active' ? 'Active' : 'Inactive'}
              </button>


            </div>

            {/* Expanded values */}
            {isExpanded && (
              <div className="bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
                <div className="pl-12 pr-4 py-2">
                  {values.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-slate-500 py-3">
                      No values defined for this master.
                    </p>
                  ) : (
                    <div className="space-y-0.5">
                      {values
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((val) => (
                          <div
                            key={val.id}
                            className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-white dark:hover:bg-slate-800 transition-colors"
                          >
                            <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                              {val.value}
                            </span>
                            <button
                              onClick={() =>
                                onToggleMasterValue(
                                  master.id,
                                  val.id,
                                  val.status === 'active' ? 'inactive' : 'active'
                                )
                              }
                              className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                                val.status === 'active'
                                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                                  : 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
                              }`}
                            >
                              {val.status}
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                  <button
                    onClick={() => onAddMasterValue(master.id)}
                    className="flex items-center gap-1.5 mt-2 px-2 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded transition-colors"
                  >
                    Add Value
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

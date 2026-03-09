import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { GeographicValue, GeographicLevel, ConfigStatus } from '@/../product/sections/setup/types'

interface GeographicTableProps {
  geographicValues: GeographicValue[]
  searchQuery: string
  statusFilter: 'all' | 'active' | 'inactive'
  onEdit: (id: string) => void
  onToggle: (id: string, status: ConfigStatus) => void
  onDelete: (id: string) => void
}

const LEVEL_STYLES: Record<GeographicLevel, { label: string; classes: string }> = {
  country: {
    label: 'Country',
    classes: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  },
  state: {
    label: 'State',
    classes: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  },
  city: {
    label: 'City',
    classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  },
}

type GeoNode = GeographicValue & { children: GeoNode[] }

function buildTree(values: GeographicValue[]): GeoNode[] {
  const map = new Map<string, GeoNode>()
  const roots: GeoNode[] = []

  values.forEach((v) => map.set(v.id, { ...v, children: [] }))

  values.forEach((v) => {
    const node = map.get(v.id)!
    if (v.parentId && map.has(v.parentId)) {
      map.get(v.parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  })

  return roots
}

function GeoRow({
  node,
  depth,
  expandedIds,
  onToggleExpand,
  onEdit,
  onToggle,
}: {
  node: GeoNode
  depth: number
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
  onEdit: (id: string) => void
  onToggle: (id: string, status: ConfigStatus) => void
}) {
  const hasChildren = node.children.length > 0
  const isExpanded = expandedIds.has(node.id)
  const level = LEVEL_STYLES[node.level]

  return (
    <>
      <tr
        onClick={() => onEdit(node.id)}
        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 24}px` }}>
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleExpand(node.id)
                }}
                className="p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            ) : (
              <span className="w-[22px]" />
            )}
            <span className="text-sm font-medium text-slate-900 dark:text-white">{node.name}</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{node.code}</span>
        </td>
        <td className="px-4 py-3">
          <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${level.classes}`}>
            {level.label}
          </span>
        </td>
        <td className="px-4 py-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggle(node.id, node.status === 'active' ? 'inactive' : 'active')
            }}
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
              node.status === 'active'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
            }`}
          >
            {node.status === 'active' ? 'Active' : 'Inactive'}
          </button>
        </td>
      </tr>
      {isExpanded &&
        node.children.map((child) => (
          <GeoRow
            key={child.id}
            node={child}
            depth={depth + 1}
            expandedIds={expandedIds}
            onToggleExpand={onToggleExpand}
            onEdit={onEdit}
            onToggle={onToggle}
          />
        ))}
    </>
  )
}

export function GeographicTable({
  geographicValues,
  searchQuery,
  statusFilter,
  onEdit,
  onToggle,
  onDelete,
}: GeographicTableProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['geo-001']))
  const [levelFilter, setLevelFilter] = useState<GeographicLevel | 'all'>('all')

  const displayValues = useMemo(() => {
    let result = geographicValues
    if (statusFilter !== 'all') {
      result = result.filter((g) => g.status === statusFilter)
    }
    if (levelFilter !== 'all') {
      result = result.filter((g) => g.level === levelFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.code.toLowerCase().includes(q)
      )
    }
    return result
  }, [geographicValues, searchQuery, statusFilter, levelFilter])

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setExpandedIds(next)
  }

  // If searching/filtering, show flat list. Otherwise show tree.
  const isFlat = searchQuery.trim() !== '' || levelFilter !== 'all'
  const tree = useMemo(() => buildTree(displayValues), [displayValues])

  if (displayValues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
          <span className="text-lg text-slate-400">0</span>
        </div>
        <p className="font-medium">No geographic values found</p>
        <p className="text-sm mt-1">
          {searchQuery ? 'Try adjusting your search query' : 'No values match the current filter'}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Level filter chips */}
      <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        {(['all', 'country', 'state', 'city'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setLevelFilter(level)}
            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              levelFilter === level
                ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1) + 's'}
          </button>
        ))}
      </div>

      <table className="w-full">
        <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Level
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {isFlat
            ? displayValues.map((geo) => {
                const level = LEVEL_STYLES[geo.level]
                return (
                  <tr
                    key={geo.id}
                    onClick={() => onEdit(geo.id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{geo.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{geo.code}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${level.classes}`}>
                        {level.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggle(geo.id, geo.status === 'active' ? 'inactive' : 'active')
                        }}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${
                          geo.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                      >
                        {geo.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                  </tr>
                )
              })
            : tree.map((node) => (
                <GeoRow
                  key={node.id}
                  node={node}
                  depth={0}
                  expandedIds={expandedIds}
                  onToggleExpand={toggleExpand}
                  onEdit={onEdit}
                  onToggle={onToggle}
                />
              ))}
        </tbody>
      </table>
    </div>
  )
}

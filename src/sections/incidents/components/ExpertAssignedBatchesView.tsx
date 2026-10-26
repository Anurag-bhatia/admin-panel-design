import { useMemo, useState } from 'react'
import { Search, Filter, Users, LayoutGrid, UserRound, FileText, ChevronDown } from 'lucide-react'
import batchData from '@/../product/sections/batch/data.json'
import incidentData from '@/../product/sections/incidents/data.json'
import type { Batch } from '@/../product/sections/batch/types'
import type { Incident, User, Lawyer } from '@/../product/sections/incidents/types'
import { IncidentRow } from './IncidentRow'

type ViewKind = 'incident' | 'expert' | 'batch'

interface ExpertAssignedBatchesViewProps {
  workType: 'cases' | 'challans'
  onViewBatch: (batchId: string) => void
  onViewIncident?: (incidentId: string) => void
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  'Pending Acceptance': {
    label: 'Pending Acceptance',
    className: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  },
  Accepted: {
    label: 'Accepted',
    className: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400',
  },
  Completed: {
    label: 'Completed',
    className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
  },
  'Not Completed': {
    label: 'Not Completed',
    className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  },
}

export function ExpertAssignedBatchesView({
  workType,
  onViewBatch,
  onViewIncident,
}: ExpertAssignedBatchesViewProps) {
  const batches = batchData.batches as Batch[]
  const allIncidents = incidentData.incidents as Incident[]
  const [searchQuery, setSearchQuery] = useState('')
  const [expertFilter, setExpertFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'Pending Acceptance' | 'Accepted' | 'Completed' | 'Not Completed' | 'Rejected'
  >('all')
  const [sizeFilter, setSizeFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all')
  const [dateFilter, setDateFilter] = useState<'all' | '7d' | '30d' | '90d'>('all')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [view, setView] = useState<ViewKind>('batch')
  const [showFilters, setShowFilters] = useState(false)

  // Active batches = assigned to an expert but not yet terminal
  // (Pending Acceptance = awaiting expert; Accepted = expert is working on it)
  const activeBatches = useMemo(
    () =>
      batches.filter(
        (b) => b.status === 'Pending Acceptance' || b.status === 'Accepted',
      ),
    [batches],
  )

  // Incidents that live inside an active batch
  const activeBatchIncidents = useMemo(() => {
    const incidentById = new Map(allIncidents.map((i) => [i.id, i]))
    const seen = new Set<string>()
    const rows: Array<{ incident: Incident; batch: Batch }> = []
    for (const b of activeBatches) {
      for (const incidentId of b.incidentIds) {
        if (seen.has(incidentId)) continue
        const inc = incidentById.get(incidentId)
        if (!inc) continue
        seen.add(incidentId)
        rows.push({ incident: inc, batch: b })
      }
    }
    return rows
  }, [activeBatches, allIncidents])

  const experts = useMemo(() => {
    const map = new Map<string, { id: string; name: string; mobile: string; batches: number }>()
    activeBatches.forEach((b) => {
      const existing = map.get(b.assignedExpertId)
      if (existing) {
        existing.batches += 1
      } else {
        map.set(b.assignedExpertId, {
          id: b.assignedExpertId,
          name: b.assignedExpertName,
          mobile: b.assignedExpertMobile,
          batches: 1,
        })
      }
    })
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [activeBatches])

  const filteredBatches = useMemo(() => {
    // Widen scope if a terminal/rejected status is selected
    const terminalStatus =
      statusFilter === 'Completed' ||
      statusFilter === 'Not Completed' ||
      statusFilter === 'Rejected'
    let result: Batch[] = terminalStatus ? batches : activeBatches
    if (expertFilter !== 'all') {
      result = result.filter((b) => b.assignedExpertId === expertFilter)
    }
    if (statusFilter !== 'all') {
      if (statusFilter === 'Rejected') {
        result = result.filter((b) => b.rejectedCount > 0)
      } else {
        result = result.filter((b) => b.status === statusFilter)
      }
    }
    if (sizeFilter !== 'all') {
      result = result.filter((b) => {
        if (sizeFilter === 'small') return b.itemCount < 20
        if (sizeFilter === 'medium') return b.itemCount >= 20 && b.itemCount < 40
        return b.itemCount >= 40
      })
    }
    if (dateFilter !== 'all') {
      const days = dateFilter === '7d' ? 7 : dateFilter === '30d' ? 30 : 90
      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
      result = result.filter((b) => new Date(b.createdDate).getTime() >= cutoff)
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (b) =>
          b.batchId.toLowerCase().includes(q) ||
          b.assignedExpertId.toLowerCase().includes(q) ||
          b.assignedExpertName.toLowerCase().includes(q),
      )
    }
    const sorted = [...result].sort((a, b) => {
      const da = new Date(a.createdDate).getTime()
      const db = new Date(b.createdDate).getTime()
      return sortOrder === 'newest' ? db - da : da - db
    })
    return sorted
  }, [activeBatches, batches, expertFilter, statusFilter, sizeFilter, dateFilter, sortOrder, searchQuery])

  const filteredIncidentRows = useMemo(() => {
    let result = activeBatchIncidents
    if (expertFilter !== 'all') {
      result = result.filter(({ batch }) => batch.assignedExpertId === expertFilter)
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      result = result.filter(
        ({ incident, batch }) =>
          incident.incidentId.toLowerCase().includes(q) ||
          incident.subscriberName.toLowerCase().includes(q) ||
          incident.vehicle.toLowerCase().includes(q) ||
          (incident.challanNumber ?? '').toLowerCase().includes(q) ||
          batch.batchId.toLowerCase().includes(q) ||
          batch.assignedExpertName.toLowerCase().includes(q),
      )
    }
    return result
  }, [activeBatchIncidents, expertFilter, searchQuery])

  const expertGroups = useMemo(() => {
    const expertMap = new Map<
      string,
      {
        id: string
        name: string
        mobile: string
        batches: Batch[]
      }
    >()
    for (const b of filteredBatches) {
      const current = expertMap.get(b.assignedExpertId)
      if (current) {
        current.batches.push(b)
      } else {
        expertMap.set(b.assignedExpertId, {
          id: b.assignedExpertId,
          name: b.assignedExpertName,
          mobile: b.assignedExpertMobile,
          batches: [b],
        })
      }
    }
    return Array.from(expertMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredBatches])

  const label = workType === 'cases' ? 'cases' : 'challans'

  const countsRight =
    view === 'incident'
      ? `${filteredIncidentRows.length} ${filteredIncidentRows.length === 1 ? 'incident' : 'incidents'}`
      : view === 'expert'
        ? `${expertGroups.length} ${expertGroups.length === 1 ? 'expert' : 'experts'}`
        : `${filteredBatches.length} active ${filteredBatches.length === 1 ? 'batch' : 'batches'}`

  const viewIcon =
    view === 'incident' ? (
      <FileText className="w-4 h-4" />
    ) : view === 'expert' ? (
      <UserRound className="w-4 h-4" />
    ) : (
      <LayoutGrid className="w-4 h-4" />
    )

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) +
    (sizeFilter !== 'all' ? 1 : 0) +
    (dateFilter !== 'all' ? 1 : 0) +
    (sortOrder !== 'newest' ? 1 : 0)

  const clearAllFilters = () => {
    setStatusFilter('all')
    setSizeFilter('all')
    setDateFilter('all')
    setSortOrder('newest')
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900">
      {/* Toolbar */}
      <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* View selector — leftmost */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none">
              {viewIcon}
            </span>
            <select
              value={view}
              onChange={(e) => setView(e.target.value as ViewKind)}
              className="pl-9 pr-9 py-2 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none min-w-[160px]"
            >
              <option value="batch">By Batch</option>
              <option value="expert">By Expert</option>
              <option value="incident">By Incident</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={
                view === 'incident'
                  ? 'Search by incident ID, subscriber, vehicle...'
                  : 'Search by Batch ID, expert ID, name...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>

          {/* Expert filter (standalone) */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={expertFilter}
              onChange={(e) => setExpertFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none min-w-[200px]"
            >
              <option value="all">All experts ({experts.length})</option>
              {experts.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.batches})
                </option>
              ))}
            </select>
          </div>

          {/* Combined filters popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-cyan-500 text-white">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showFilters && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowFilters(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-4 z-30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Filters
                    </h3>
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <FilterField label="Status">
                    <SelectWithChevron
                      value={statusFilter}
                      onChange={(v) => setStatusFilter(v as typeof statusFilter)}
                    >
                      <option value="all">All statuses</option>
                      <option value="Pending Acceptance">Pending Acceptance</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Completed">Completed</option>
                      <option value="Not Completed">Not Completed</option>
                      <option value="Rejected">Rejected</option>
                    </SelectWithChevron>
                  </FilterField>

                  <FilterField label="Size">
                    <SelectWithChevron
                      value={sizeFilter}
                      onChange={(v) => setSizeFilter(v as typeof sizeFilter)}
                    >
                      <option value="all">Any size</option>
                      <option value="small">&lt; 20 incidents</option>
                      <option value="medium">20 – 39 incidents</option>
                      <option value="large">40+ incidents</option>
                    </SelectWithChevron>
                  </FilterField>

                  <FilterField label="Created">
                    <SelectWithChevron
                      value={dateFilter}
                      onChange={(v) => setDateFilter(v as typeof dateFilter)}
                    >
                      <option value="all">Any time</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                    </SelectWithChevron>
                  </FilterField>

                  <FilterField label="Sort">
                    <SelectWithChevron
                      value={sortOrder}
                      onChange={(v) => setSortOrder(v as typeof sortOrder)}
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                    </SelectWithChevron>
                  </FilterField>
                </div>
              </>
            )}
          </div>

          <div className="ml-auto text-sm text-slate-500 dark:text-slate-400">
            {countsRight}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
        {view === 'batch' && (
          <BatchGrid
            batches={filteredBatches}
            emptyHint={
              expertFilter !== 'all' || searchQuery
                ? 'Try adjusting your filters'
                : `Batches appear here when 2+ ${label} are assigned to an expert`
            }
            onViewBatch={onViewBatch}
          />
        )}

        {view === 'expert' && (
          <ExpertGroupedList
            groups={expertGroups}
            onViewBatch={onViewBatch}
            emptyHint={
              expertFilter !== 'all' || searchQuery
                ? 'Try adjusting your filters'
                : 'No active batches to show by expert'
            }
          />
        )}

        {view === 'incident' && (
          <IncidentFlatList
            rows={filteredIncidentRows}
            workType={workType}
            onViewIncident={onViewIncident}
            emptyHint={
              expertFilter !== 'all' || searchQuery
                ? 'Try adjusting your filters'
                : `No ${label} in active batches`
            }
          />
        )}
      </div>
    </div>
  )
}

function BatchGrid({
  batches,
  emptyHint,
  onViewBatch,
}: {
  batches: Batch[]
  emptyHint: string
  onViewBatch: (batchId: string) => void
}) {
  if (batches.length === 0) {
    return <EmptyState title="No active batches" hint={emptyHint} />
  }
  return (
    <div className="bg-white dark:bg-slate-900">
      <table className="w-full">
        <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Batch ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Expert
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Incidents
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Challan Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Accepted Incidents
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Rejected Incidents
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => {
            const statusConfig = STATUS_LABELS[batch.status] || {
              label: batch.status,
              className: '',
            }
            return (
              <tr
                key={batch.batchId}
                onClick={() => onViewBatch(batch.batchId)}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-4">
                  <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                    {batch.batchId}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {batch.assignedExpertName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono">{batch.assignedExpertId}</span>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    {batch.assignedExpertMobile}
                  </p>
                </td>
                <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                  {batch.itemCount}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(batch.totalAmount)}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {batch.assignedCount}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {batch.rejectedCount}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center whitespace-nowrap px-2.5 py-1 rounded text-sm font-semibold ${statusConfig.className}`}
                  >
                    {statusConfig.label}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {formatDate(batch.createdDate)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function ExpertGroupedList({
  groups,
  onViewBatch,
  emptyHint,
}: {
  groups: Array<{ id: string; name: string; mobile: string; batches: Batch[] }>
  onViewBatch: (batchId: string) => void
  emptyHint: string
}) {
  if (groups.length === 0) {
    return <EmptyState title="No experts to show" hint={emptyHint} />
  }
  return (
    <div className="p-4 space-y-4">
      {groups.map((g) => {
        const totals = g.batches.reduce(
          (acc, b) => {
            acc.items += b.itemCount
            acc.assigned += b.assignedCount
            acc.rejected += b.rejectedCount
            acc.expired += b.expiredCount
            return acc
          },
          { items: 0, assigned: 0, rejected: 0, expired: 0 },
        )
        return (
          <div
            key={g.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {g.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  <span className="font-mono">{g.id}</span>
                  <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                  {g.mobile}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  {g.batches.length} {g.batches.length === 1 ? 'batch' : 'batches'}
                </span>
                <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  {totals.items} incidents
                </span>
                <OutcomeChip label="Accepted Incidents" value={totals.assigned} tone="slate" compact />
                <OutcomeChip label="Rejected Incidents" value={totals.rejected} tone="slate" compact />
              </div>
            </div>
            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {g.batches.map((batch) => (
                <BatchCard
                  key={batch.batchId}
                  batch={batch}
                  onClick={() => onViewBatch(batch.batchId)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function IncidentFlatList({
  rows,
  workType,
  onViewIncident,
  emptyHint,
}: {
  rows: Array<{ incident: Incident; batch: Batch }>
  workType: 'cases' | 'challans'
  onViewIncident?: (incidentId: string) => void
  emptyHint: string
}) {
  const users = (incidentData.users as User[]) ?? []
  const lawyers = (incidentData.lawyers as Lawyer[]) ?? []
  const isCases = workType === 'cases'
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const incidents = rows.map((r) => r.incident)
  const allSelected =
    incidents.length > 0 && incidents.every((i) => selectedIds.has(i.id))
  const someSelected = selectedIds.size > 0 && !allSelected

  const toggleOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(incidents.map((i) => i.id)) : new Set())
  }

  if (rows.length === 0) {
    return <EmptyState title="No incidents in active batches" hint={emptyHint} />
  }

  return (
    <div className="bg-white dark:bg-slate-900">
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-12" />
          <col className="w-40" />
          <col className="w-32" />
          <col className="w-64" />
          {!isCases && <col className="w-40" />}
          <col className="w-32" />
          <col className="w-32" />
          <col className="w-32" />
          {!isCases && <col className="w-40" />}
          {isCases && <col className="w-40" />}
          <col className="w-12" />
        </colgroup>
        <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected
                }}
                onChange={(e) => toggleAll(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isCases ? 'Case ID' : 'Incident ID'}
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Batch ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Subscriber / Vehicle
            </th>
            {!isCases && (
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Challan No / Amount
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isCases ? 'Type' : 'Challan'}
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Created
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Updated
            </th>
            {!isCases && (
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Employee
              </th>
            )}
            {isCases && (
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Lawyer
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ incident, batch }) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              isSelected={selectedIds.has(incident.id)}
              users={users}
              lawyers={lawyers}
              workType={workType}
              batchId={batch.batchId}
              showSettlement={false}
              onSelect={(checked) => toggleOne(incident.id, checked)}
              onView={() => onViewIncident?.(incident.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
        <Users className="w-6 h-6 text-slate-400" />
      </div>
      <p className="font-medium text-slate-700 dark:text-slate-300">{title}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{hint}</p>
    </div>
  )
}

function FilterField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
        {label}
      </p>
      {children}
    </div>
  )
}

function SelectWithChevron({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-3 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  )
}

function BatchCard({ batch, onClick }: { batch: Batch; onClick: () => void }) {
  const statusConfig = STATUS_LABELS[batch.status] || {
    label: batch.status,
    className: '',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
            {batch.batchId}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white truncate">
            {batch.assignedExpertName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            <span className="font-mono">{batch.assignedExpertId}</span>
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
            {batch.assignedExpertMobile}
          </p>
        </div>
        <span
          className={`inline-flex items-center shrink-0 whitespace-nowrap px-2.5 py-1 rounded text-sm font-semibold ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Outcome counts */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <OutcomeChip
          label="Accepted Incidents"
          value={batch.assignedCount}
          tone="slate"
        />
        <OutcomeChip
          label="Rejected Incidents"
          value={batch.rejectedCount}
          tone="slate"
        />
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {batch.itemCount}
            </span>{' '}
            incidents
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {formatCurrency(batch.totalAmount)}
          </span>
        </div>
        <span>Created {formatDate(batch.createdDate)}</span>
      </div>
    </button>
  )
}

const TONE_CLASSES: Record<string, string> = {
  cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-900/40',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-900/40',
  amber:
    'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900/40',
  slate:
    'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
}

function OutcomeChip({
  label,
  value,
  tone,
  compact = false,
}: {
  label: string
  value: number
  tone: keyof typeof TONE_CLASSES
  compact?: boolean
}) {
  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-medium ${TONE_CLASSES[tone]}`}
      >
        <span className="uppercase tracking-wide">{label}</span>
        <span className="font-semibold">{value}</span>
      </span>
    )
  }
  return (
    <div
      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border ${TONE_CLASSES[tone]}`}
    >
      <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}

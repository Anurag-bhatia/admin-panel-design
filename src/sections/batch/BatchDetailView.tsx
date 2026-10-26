import { useMemo, useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import type { Batch } from '@/../product/sections/batch/types'
import type { Incident } from '@/../product/sections/incidents/types'

interface BatchDetailViewProps {
  batch: Batch
  incidents: Incident[]
  onBack: () => void
  onViewIncident: (incidentId: string) => void
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

const CHALLAN_TYPE_LABELS: Record<string, string> = {
  court: 'Court',
  online: 'Online',
}

const TYPE_LABELS: Record<string, string> = {
  payAndClose: 'PPT',
  contest: 'Bulk',
  onSpot: 'On Spot',
  onCall: 'On Call',
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

function formatStatus(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function BatchDetailView({
  batch,
  incidents,
  onBack,
  onViewIncident,
}: BatchDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const batchIncidents = useMemo(() => {
    const byId = new Map(incidents.map((i) => [i.id, i]))
    return batch.incidentIds
      .map((id) => byId.get(id))
      .filter((i): i is Incident => Boolean(i))
  }, [batch.incidentIds, incidents])

  const uniqueStates = useMemo(() => {
    const set = new Set<string>()
    for (const i of batchIncidents) {
      if (i.state) set.add(i.state)
    }
    return Array.from(set).sort()
  }, [batchIncidents])

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return batchIncidents
    return batchIncidents.filter(
      (i) =>
        i.incidentId.toLowerCase().includes(q) ||
        i.subscriberName.toLowerCase().includes(q) ||
        i.vehicle.toLowerCase().includes(q) ||
        (i.challanNumber ?? '').toLowerCase().includes(q),
    )
  }, [batchIncidents, searchQuery])

  const statusConfig = STATUS_LABELS[batch.status] || {
    label: batch.status,
    className: '',
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Batch Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-3 min-w-0">
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to batches"
                className="mt-1 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="min-w-0">
                <h1 className="font-mono text-xl font-semibold text-slate-900 dark:text-white">
                  {batch.batchId}
                </h1>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold ${statusConfig.className}`}
            >
              {statusConfig.label}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <SummaryItem
              label="Expert"
              value={batch.assignedExpertName}
              sub={`${batch.assignedExpertId} · ${batch.assignedExpertMobile}`}
            />
            <SummaryItem label="Incidents" value={String(batch.itemCount)} />
            <SummaryItem
              label="Total Challan Amount"
              value={formatCurrency(batch.totalAmount)}
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total States
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {uniqueStates.length}
                </span>
                {uniqueStates.length > 0 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {uniqueStates.join(', ')}
                  </span>
                )}
              </div>
            </div>
            <SummaryItem label="Created Date" value={formatDate(batch.createdDate)} />
            <SummaryItem label="Last Updated" value={formatDate(batch.lastUpdated)} />
          </div>

          {/* Outcome counts */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-200 dark:border-slate-800">
            <OutcomeStat label="Accepted" value={batch.assignedCount} tone="cyan" />
            <OutcomeStat label="Rejected" value={batch.rejectedCount} tone="red" />
          </div>
        </div>

        {/* Incidents */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Incidents ({batchIncidents.length})
            </h2>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, subscriber, vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Incident ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Subscriber &amp; Vehicle
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Challan / Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Lawyer Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-16 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      {batchIncidents.length === 0
                        ? 'No incidents in this batch yet'
                        : 'No incidents match your search'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((incident) => (
                    <tr
                      key={incident.id}
                      onClick={() => onViewIncident(incident.id)}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-4">
                        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                          {incident.incidentId}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {incident.subscriberName}
                        </p>
                        <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {incident.vehicle}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {incident.workType === 'challan' ? (
                          <>
                            <p className="font-mono text-sm text-slate-900 dark:text-white">
                              {incident.challanNumber}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                              ₹{incident.amount.toLocaleString('en-IN')}
                            </p>
                          </>
                        ) : (
                          <span className="text-sm text-slate-500 dark:text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {incident.workType === 'challan' &&
                          (incident.challanType === 'court' || incident.challanType === 'online') && (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                incident.challanType === 'court'
                                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                  : 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                              }`}
                            >
                              {CHALLAN_TYPE_LABELS[incident.challanType]}
                            </span>
                          )}
                        {incident.workType === 'case' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                            {TYPE_LABELS[incident.type] ?? incident.type}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {incident.status === 'resolved' || incident.status === 'unresolved' ? (
                          <span className="text-sm text-slate-500 dark:text-slate-400">—</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {formatStatus(incident.status)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {formatDate(incident.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
        {value}
      </p>
      {sub && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>
      )}
    </div>
  )
}

const OUTCOME_TONES: Record<string, string> = {
  cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-900/40',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-900/40',
  amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900/40',
}

function OutcomeStat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: keyof typeof OUTCOME_TONES
}) {
  return (
    <div className={`rounded-lg border px-4 py-3 text-center ${OUTCOME_TONES[tone]}`}>
      <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  )
}

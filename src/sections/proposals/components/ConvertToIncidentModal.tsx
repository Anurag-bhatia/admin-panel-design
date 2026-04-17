import { useState } from 'react'
import { X, ArrowRightCircle } from 'lucide-react'
import type { Proposal, ServiceStatus, TeamMember } from '@/../product/sections/proposals/types'

interface ConvertToIncidentModalProps {
  proposal: Proposal
  teamMembers: TeamMember[]
  onSubmit?: (
    incidentId: string,
    serviceStatus: ServiceStatus,
    assignedAgentId: string,
    notes?: string
  ) => void
  onCancel?: () => void
}

function generateIncidentId(): string {
  const num = Math.floor(10000000 + Math.random() * 90000000)
  return `IRN-${num}`
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
}

function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

export function ConvertToIncidentModal({
  proposal,
  teamMembers,
  onSubmit,
  onCancel,
}: ConvertToIncidentModalProps) {
  const [incidentId, setIncidentId] = useState(generateIncidentId())
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>('pending')
  const [assignedAgentId, setAssignedAgentId] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (incidentId && assignedAgentId) {
      onSubmit?.(incidentId, serviceStatus, assignedAgentId, notes || undefined)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Convert to Incident
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300">
                {proposal.displayId}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                  TYPE_BADGE_STYLES[proposal.type]
                }`}
              >
                {proposal.type}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {proposal.customer.name} · {proposal.customer.company}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {proposal.quantity} items · {formatINR(proposal.amount)}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Incident ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={incidentId}
                onChange={(e) => setIncidentId(e.target.value)}
                placeholder="IRN-XXXXXXXX"
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-slate-400">
                Auto-generated. Edit if needed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Service Status
                </label>
                <select
                  value={serviceStatus}
                  onChange={(e) => setServiceStatus(e.target.value as ServiceStatus)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Assigned Agent <span className="text-red-500">*</span>
                </label>
                <select
                  value={assignedAgentId}
                  onChange={(e) => setAssignedAgentId(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">Select agent...</option>
                  {teamMembers.map((tm) => (
                    <option key={tm.id} value={tm.id}>
                      {tm.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Notes <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Initial notes for the incident..."
                rows={3}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!incidentId || !assignedAgentId}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 dark:disabled:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              <ArrowRightCircle className="h-4 w-4" />
              Create Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

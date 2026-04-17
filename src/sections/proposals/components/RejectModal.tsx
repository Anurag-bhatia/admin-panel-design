import { useState } from 'react'
import { X, XCircle } from 'lucide-react'
import type { Proposal, RejectionReason } from '@/../product/sections/proposals/types'

interface RejectModalProps {
  proposal: Proposal
  onSubmit?: (reason: RejectionReason, note?: string) => void
  onCancel?: () => void
}

const REJECTION_REASONS: RejectionReason[] = [
  'Service not available for this case',
  'Insufficient documentation',
  'Out of service area',
  'Duplicate request',
  'Invalid/incorrect details',
  'Customer request',
]

const TYPE_BADGE_STYLES: Record<string, string> = {
  Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
}

export function RejectModal({ proposal, onSubmit, onCancel }: RejectModalProps) {
  const [reason, setReason] = useState<RejectionReason | ''>('')
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reason) {
      onSubmit?.(reason as RejectionReason, note || undefined)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Reject Proposal
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
              {proposal.quantity} items · {proposal.description}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Rejection Reason <span className="text-red-500">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as RejectionReason)}
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent cursor-pointer"
              >
                <option value="">Select a reason...</option>
                {REJECTION_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Note to Customer <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Explain the rejection to the customer..."
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
              disabled={!reason}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              <XCircle className="h-4 w-4" />
              Reject Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

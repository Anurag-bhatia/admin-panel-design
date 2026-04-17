import { useState } from 'react'
import { X, Send } from 'lucide-react'
import type { Proposal } from '@/../product/sections/proposals/types'

interface SendQuoteModalProps {
  proposal: Proposal
  isRevise?: boolean
  onSubmit?: (amount: number, breakdown?: string, note?: string) => void
  onCancel?: () => void
}

function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
}

export function SendQuoteModal({
  proposal,
  isRevise = false,
  onSubmit,
  onCancel,
}: SendQuoteModalProps) {
  const [amount, setAmount] = useState(proposal.amount > 0 ? proposal.amount.toString() : '')
  const [breakdown, setBreakdown] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedAmount = parseFloat(amount)
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onSubmit?.(parsedAmount, breakdown || undefined, note || undefined)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {isRevise ? 'Revise Quote' : 'Send Quote'}
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
                Quoted Amount (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="100"
                  required
                  className="w-full pl-8 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              {amount && !isNaN(parseFloat(amount)) && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {formatINR(parseFloat(amount))}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Breakdown <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                value={breakdown}
                onChange={(e) => setBreakdown(e.target.value)}
                placeholder="Itemized breakdown of charges..."
                rows={3}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Note to Customer <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="This message will appear in the notes thread..."
                rows={2}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Send className="h-4 w-4" />
              {isRevise ? 'Revise Quote' : 'Send Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

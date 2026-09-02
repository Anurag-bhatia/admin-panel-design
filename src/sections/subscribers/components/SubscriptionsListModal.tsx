import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { Subscription } from '@/../product/sections/subscribers/types'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

interface SubscriptionsListModalProps {
  subscriberName: string
  subscriptions: Subscription[]
  onSelect: (subscriptionId: string) => void
  onClose: () => void
}

export function SubscriptionsListModal({
  subscriberName,
  subscriptions,
  onSelect,
  onClose,
}: SubscriptionsListModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Subscriptions
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {subscriberName} · Select a plan to view details
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {subscriptions.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-400">
              No subscriptions found
            </p>
          ) : (
            subscriptions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSelect(sub.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {sub.subscriptionName}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {sub.planType} · {formatDate(sub.startDate)} – {formatDate(sub.endDate)}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

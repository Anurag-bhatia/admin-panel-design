interface PaymentsSidebarProps {
  view: 'refunds' | 'lawyer-fees'
  onViewChange?: (view: 'refunds' | 'lawyer-fees') => void
}

export function PaymentsSidebar({
  view,
  onViewChange,
}: PaymentsSidebarProps) {
  return (
    <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52">
      <div className="flex-1 py-4">
        {/* Refunds */}
        <div className="px-2 mb-1">
          <button
            onClick={() => onViewChange?.('refunds')}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              view === 'refunds'
                ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Refunds
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-700" />

        {/* Lawyer Fees */}
        <div className="px-2">
          <button
            onClick={() => onViewChange?.('lawyer-fees')}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              view === 'lawyer-fees'
                ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Lawyer Payments
          </button>
        </div>
      </div>
    </div>
  )
}

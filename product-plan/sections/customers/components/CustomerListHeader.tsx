interface CustomerListHeaderProps {
  onAddCustomer?: () => void
}

export function CustomerListHeader({
  onAddCustomer,
}: CustomerListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Registered Visitors</h1>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAddCustomer}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
        >
          + Add Visitor
        </button>
      </div>
    </div>
  )
}

import { ChevronDown } from 'lucide-react'

interface LeadsListHeaderProps {
  selectedCount: number
  onCreateLead?: () => void
  onBulkUpload?: () => void
  onBulkUpdate?: (leadIds: string[]) => void
  onBulkMove?: () => void
}

export function LeadsListHeader({
  selectedCount,
  onCreateLead,
  onBulkUpload,
  onBulkUpdate,
  onBulkMove
}: LeadsListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">All Leads</h1>
      </div>

      <div className="flex gap-3">
        {selectedCount > 0 && (
          <>
            <button
              onClick={onBulkMove}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Move ({selectedCount})
            </button>
            <button
              onClick={() => onBulkUpdate?.([])}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Bulk Update ({selectedCount})
              <ChevronDown className="w-4 h-4" />
            </button>
          </>
        )}

        <button
          onClick={onBulkUpload}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 rounded-lg font-medium transition-colors"
        >
          Bulk Upload
        </button>

        <button
          onClick={onCreateLead}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
        >
          + Add Lead
        </button>
      </div>
    </div>
  )
}

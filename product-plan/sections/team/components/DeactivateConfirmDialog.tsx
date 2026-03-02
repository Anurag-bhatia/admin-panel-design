import { AlertTriangle } from 'lucide-react'

interface DeactivateConfirmDialogProps {
  type: 'employee' | 'team'
  name: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeactivateConfirmDialog({
  type,
  name,
  onConfirm,
  onCancel,
}: DeactivateConfirmDialogProps) {
  const isEmployee = type === 'employee'

  return (
    <div className="fixed inset-0 bg-zinc-950/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 w-full max-w-md p-6">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white text-center mb-2">
          Deactivate {isEmployee ? 'Employee' : 'Team'}
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
          Are you sure you want to deactivate <span className="font-medium text-slate-900 dark:text-white">{name}</span>?
          {isEmployee ? (
            <>
              {' '}This will instantly revoke system access and remove them from all active assignments.
              All historical data and audit logs will be preserved.
            </>
          ) : (
            <>
              {' '}The team will no longer be available for workload assignments.
              Historical data will be preserved.
            </>
          )}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  )
}

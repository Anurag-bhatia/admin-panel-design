import { X, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { Lead, User } from '../types'

interface BulkMoveLeadProps {
  selectedCount: number
  users: User[]
  onMove?: (field: string, value: string) => void
  onClose?: () => void
}

export function BulkMoveLead({ selectedCount, users, onMove, onClose }: BulkMoveLeadProps) {
  const [moveType, setMoveType] = useState<'status' | 'owner'>('status')
  const [selectedValue, setSelectedValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'quotations', label: 'Quotations' },
    { value: 'projected', label: 'Projected' },
    { value: 'invoiced', label: 'Invoiced' },
    { value: 'sales', label: 'Sales' },
    { value: 'lost', label: 'Lost' }
  ]

  const ownerOptions = [
    { value: 'unassigned', label: 'Unassigned' },
    ...users.map(user => ({ value: user.id, label: user.fullName }))
  ]

  const handleSubmit = async () => {
    if (!selectedValue) return

    setIsSubmitting(true)
    try {
      onMove?.(moveType, selectedValue)
      setSelectedValue('')
      setMoveType('status')
      onClose?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentOptions = moveType === 'status' ? statusOptions : ownerOptions

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <ArrowRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Update Leads</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedCount} selected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Move Type Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Update by
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMoveType('status')
                  setSelectedValue('')
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  moveType === 'status'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Status
              </button>
              <button
                onClick={() => {
                  setMoveType('owner')
                  setSelectedValue('')
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  moveType === 'owner'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Owner
              </button>
            </div>
          </div>

          {/* Value Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select {moveType === 'status' ? 'Status' : 'Owner'}
            </label>
            <select
              value={selectedValue}
              onChange={e => setSelectedValue(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
            >
              <option value="">Choose an option...</option>
              {currentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Info Box */}
          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {moveType === 'status'
                ? 'Changing the status will update all selected leads and trigger any associated workflows.'
                : 'Assigning to an owner will update the lead assignment for all selected leads.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedValue || isSubmitting}
            className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Updating...' : 'Update Leads'}
          </button>
        </div>
      </div>
    </div>
  )
}

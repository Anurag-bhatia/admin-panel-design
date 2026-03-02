import { useState } from 'react'
import { X, MessageSquare } from 'lucide-react'
import type { FollowUpFormData } from '@/../product/sections/sales-crm/types'

interface AddFollowUpModalProps {
  leadId: string
  leadName: string
  activityTypes: string[]
  onSubmit: (leadId: string, followUpData: FollowUpFormData) => void
  onClose: () => void
}

export function AddFollowUpModal({ leadId, leadName, activityTypes, onSubmit, onClose }: AddFollowUpModalProps) {
  const [formData, setFormData] = useState<FollowUpFormData>({
    activityType: '',
    notes: '',
    nextFollowUpDate: '',
    outcome: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const newErrors: Record<string, string> = {}
    if (!formData.activityType) newErrors.activityType = 'Activity type is required'
    if (!formData.notes) newErrors.notes = 'Notes are required'
    if (!formData.outcome) newErrors.outcome = 'Outcome is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(leadId, formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">Add Follow-up Activity</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">{leadName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5">
            {/* Activity Type */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Activity Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.activityType}
                onChange={e => setFormData({ ...formData, activityType: e.target.value })}
                className={`w-full pl-3 pr-9 py-2.5 bg-white dark:bg-slate-950 border ${
                  errors.activityType ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`}
              >
                <option value="">Select Activity Type</option>
                {activityTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.activityType && <p className="mt-1 text-xs text-red-500">{errors.activityType}</p>}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Notes <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Record details of the interaction, discussion points, and any commitments made..."
                  rows={5}
                  className={`w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-950 border ${
                    errors.notes ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none`}
                />
              </div>
              {errors.notes && <p className="mt-1 text-xs text-red-500">{errors.notes}</p>}
            </div>

            {/* Outcome */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Outcome <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.outcome}
                onChange={e => setFormData({ ...formData, outcome: e.target.value })}
                className={`w-full pl-3 pr-9 py-2.5 bg-white dark:bg-slate-950 border ${
                  errors.outcome ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                } rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`}
              >
                <option value="">Select Outcome</option>
                <option value="Positive">Positive - Lead is interested</option>
                <option value="Neutral">Neutral - Need more follow-up</option>
                <option value="Negative">Negative - Not interested</option>
                <option value="Converted">Converted - Moved to quotation/sale</option>
                <option value="Deferred">Deferred - Will revisit later</option>
              </select>
              {errors.outcome && <p className="mt-1 text-xs text-red-500">{errors.outcome}</p>}
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
            >
              Add Follow-up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { X } from 'lucide-react'
import type {
  DisputeType,
  DisputePriority,
  DisputeRaisedBy,
  LinkedEntityType,
} from '@/../product/sections/disputes/types'

interface CreateDisputeFormData {
  linkedEntityType: LinkedEntityType | ''
  linkedEntityId: string
  disputeType: DisputeType | ''
  raisedBy: DisputeRaisedBy | ''
  priority: DisputePriority | ''
  source: string
  description: string
  disputedAmount: string
}

interface CreateDisputeModalProps {
  onCreateDispute?: (data: CreateDisputeFormData) => void
  onClose: () => void
}

const INITIAL_FORM: CreateDisputeFormData = {
  linkedEntityType: '',
  linkedEntityId: '',
  disputeType: '',
  raisedBy: '',
  priority: '',
  source: '',
  description: '',
  disputedAmount: '',
}

export function CreateDisputeModal({ onCreateDispute, onClose }: CreateDisputeModalProps) {
  const [form, setForm] = useState<CreateDisputeFormData>(INITIAL_FORM)

  const updateField = <K extends keyof CreateDisputeFormData>(
    key: K,
    value: CreateDisputeFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const isValid =
    form.linkedEntityType !== '' &&
    form.linkedEntityId.trim() !== '' &&
    form.disputeType !== '' &&
    form.raisedBy !== '' &&
    form.priority !== '' &&
    form.source.trim() !== ''

  const handleSubmit = () => {
    if (isValid) {
      onCreateDispute?.(form)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Create New Dispute
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Raise a dispute against an incident, subscriber, or payment
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Linked Entity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Linked Entity Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.linkedEntityType}
                onChange={(e) => updateField('linkedEntityType', e.target.value as LinkedEntityType)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              >
                <option value="">Select entity type</option>
                <option value="incident">Incident</option>
                <option value="subscriber">Subscriber</option>
                <option value="vehicle">Vehicle</option>
                <option value="payment">Payment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Entity ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.linkedEntityId}
                onChange={(e) => updateField('linkedEntityId', e.target.value)}
                placeholder={
                  form.linkedEntityType === 'incident'
                    ? 'e.g. IRN-78234'
                    : form.linkedEntityType === 'subscriber'
                    ? 'e.g. SUB-5023'
                    : form.linkedEntityType === 'vehicle'
                    ? 'e.g. MH01AB1234'
                    : form.linkedEntityType === 'payment'
                    ? 'e.g. PAY-9001'
                    : form.linkedEntityType === 'other'
                    ? 'Enter reference ID'
                    : 'Select entity type first'
                }
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>

          {/* Type, Raised By, Priority */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Dispute Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.disputeType}
                onChange={(e) => updateField('disputeType', e.target.value as DisputeType)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              >
                <option value="">Select type</option>
                <option value="refund">Refund</option>
                <option value="service">Service</option>
                <option value="payment">Payment</option>
                <option value="legal_escalation">Legal Escalation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Raised By <span className="text-red-500">*</span>
              </label>
              <select
                value={form.raisedBy}
                onChange={(e) => updateField('raisedBy', e.target.value as DisputeRaisedBy)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              >
                <option value="">Select source</option>
                <option value="customer">Customer</option>
                <option value="subscriber">Subscriber</option>
                <option value="internal">Internal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                value={form.priority}
                onChange={(e) => updateField('priority', e.target.value as DisputePriority)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              >
                <option value="">Select priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Source <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.source}
              onChange={(e) => updateField('source', e.target.value)}
              placeholder="e.g. Support Module, Incident Detail View"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Reason
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              placeholder="Provide the reason for raising this dispute..."
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Disputed Amount
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                ₹
              </span>
              <input
                type="number"
                value={form.disputedAmount}
                onChange={(e) => updateField('disputedAmount', e.target.value)}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Create Dispute
          </button>
        </div>
      </div>
    </div>
  )
}

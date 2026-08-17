import { useMemo, useState } from 'react'
import { X, ArrowLeft, GitMerge, AlertCircle } from 'lucide-react'
import type {
  Dispute,
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
  product: string
  reporterName: string
  reporterNumber: string
  description: string
  disputedAmount: string
}

interface CreateDisputeModalProps {
  existingDisputes?: Dispute[]
  onCreateDispute?: (data: CreateDisputeFormData) => void
  onMerge?: (existingDisputeId: string, data: CreateDisputeFormData) => void
  onClose: () => void
}

const TYPE_LABELS: Record<string, string> = {
  refund: 'Refund',
  '48hr_refund': '48 hr Refund',
  tat_breach: 'TAT Breach',
  payment_issue: 'Payment Issue',
  legal_escalation: 'Legal Escalation',
  information_missing: 'Information Missing',
  incorrect_data: 'Incorrect Data',
}

const PRIORITY_LABELS: Record<string, { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' },
  high: { label: 'High', className: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' },
  medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
  low: { label: 'Low', className: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const INITIAL_FORM: CreateDisputeFormData = {
  linkedEntityType: '',
  linkedEntityId: '',
  disputeType: '',
  raisedBy: '',
  priority: '',
  source: '',
  product: '',
  reporterName: '',
  reporterNumber: '',
  description: '',
  disputedAmount: '',
}

export function CreateDisputeModal({
  existingDisputes = [],
  onCreateDispute,
  onMerge,
  onClose,
}: CreateDisputeModalProps) {
  const [form, setForm] = useState<CreateDisputeFormData>(INITIAL_FORM)
  const [view, setView] = useState<'form' | 'merge'>('form')

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
    form.priority !== '' &&
    form.source.trim() !== '' &&
    form.product.trim() !== ''

  const matches = useMemo(() => {
    if (form.linkedEntityType === '' || form.linkedEntityId.trim() === '') {
      return []
    }
    const targetId = form.linkedEntityId.trim().toLowerCase()
    return existingDisputes.filter(
      (d) =>
        d.linkedEntity.type === form.linkedEntityType &&
        d.linkedEntity.id.toLowerCase() === targetId &&
        d.status !== 'settled'
    )
  }, [existingDisputes, form.linkedEntityType, form.linkedEntityId])

  const handleSubmit = () => {
    if (!isValid) return
    if (matches.length > 0) {
      setView('merge')
    } else {
      onCreateDispute?.(form)
    }
  }

  const handleMerge = (existingId: string) => {
    onMerge?.(existingId, form)
  }

  const handleCreateAnyway = () => {
    onCreateDispute?.(form)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            {view === 'merge' && (
              <button
                onClick={() => setView('form')}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-slate-500" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {view === 'form' ? 'Create New Dispute' : 'Similar disputes found'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {view === 'merge' ? (
          <>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-300">
                  There {matches.length === 1 ? 'is' : 'are'} already{' '}
                  <span className="font-semibold">{matches.length}</span> open dispute
                  {matches.length === 1 ? '' : 's'} linked to this entity.
                </div>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto">
                {matches.map((d) => {
                  const priority = PRIORITY_LABELS[d.priority] || { label: d.priority, className: '' }
                  const openInNewTab = () => {
                    const url = new URL(window.location.href)
                    url.searchParams.set('disputeId', d.id)
                    window.open(url.toString(), '_blank', 'noopener,noreferrer')
                  }
                  return (
                    <div
                      key={d.id}
                      role="button"
                      tabIndex={0}
                      onClick={openInNewTab}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          openInNewTab()
                        }
                      }}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                            {d.disputeId.replace(/-/g, '')}
                          </span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${priority.className}`}>
                            {priority.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>{d.subscriberName}</span>
                          <span>·</span>
                          <span>Created {formatDate(d.createdOn)}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMerge(d.id)
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors flex-shrink-0"
                      >
                        <GitMerge className="h-3.5 w-3.5" />
                        Merge here
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handleCreateAnyway}
                className="px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
              >
                Create as new dispute anyway
              </button>
            </div>
          </>
        ) : (
        <>
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
                {form.linkedEntityType === 'incident'
                  ? 'Incident ID'
                  : form.linkedEntityType === 'subscriber'
                  ? 'Mobile Number'
                  : form.linkedEntityType === 'vehicle'
                  ? 'Vehicle Number'
                  : form.linkedEntityType === 'payment'
                  ? 'Transaction ID'
                  : form.linkedEntityType === 'other'
                  ? 'Reference ID'
                  : 'Entity ID'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={form.linkedEntityType === 'subscriber' ? 'tel' : 'text'}
                inputMode={form.linkedEntityType === 'subscriber' ? 'numeric' : undefined}
                value={form.linkedEntityId}
                onChange={(e) => updateField('linkedEntityId', e.target.value)}
                placeholder={
                  form.linkedEntityType === 'incident'
                    ? 'e.g. IRN-78234'
                    : form.linkedEntityType === 'subscriber'
                    ? 'e.g. 9876543210'
                    : form.linkedEntityType === 'vehicle'
                    ? 'e.g. MH01AB1234'
                    : form.linkedEntityType === 'payment'
                    ? 'e.g. TXN-9001'
                    : form.linkedEntityType === 'other'
                    ? 'Enter reference ID'
                    : 'Select entity type first'
                }
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>

          {/* Type, Priority */}
          <div className="grid grid-cols-2 gap-4">
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
                <option value="48hr_refund">48 hr Refund</option>
                <option value="tat_breach">TAT Breach</option>
                <option value="payment_issue">Payment Issue</option>
                <option value="legal_escalation">Legal Escalation</option>
                <option value="information_missing">Information Missing</option>
                <option value="incorrect_data">Incorrect Data</option>
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

          {/* Source & Product */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Source <span className="text-red-500">*</span>
              </label>
              <select
                value={form.source}
                onChange={(e) => updateField('source', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              >
                <option value="">Select source</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="IVR">IVR</option>
                <option value="Internal">Internal</option>
                <option value="SMS">SMS</option>
                <option value="Social Media">Social Media</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                value={form.product}
                onChange={(e) => updateField('product', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              >
                <option value="">Select product</option>
                <option value="ChallanPay">ChallanPay</option>
                <option value="LOTS247">LOTS247</option>
                <option value="RSP">RSP</option>
              </select>
            </div>
          </div>

          {/* Customer Name & Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Customer Name
              </label>
              <input
                type="text"
                value={form.reporterName}
                onChange={(e) => updateField('reporterName', e.target.value)}
                placeholder="Enter customer name"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Customer Number
              </label>
              <input
                type="text"
                value={form.reporterNumber}
                onChange={(e) => updateField('reporterNumber', e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
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
            {matches.length > 0 ? 'Continue' : 'Create Dispute'}
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  )
}

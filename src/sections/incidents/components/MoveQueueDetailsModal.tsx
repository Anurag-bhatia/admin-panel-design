import { useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import type { Lawyer } from '@/../product/sections/incidents/types'

export type MoveQueueStage =
  | 'refundRequested'
  | 'refundCompleted'
  | 'notSettled'
  | 'settled'
  | 'hold'
  | 'lawyerAssigned'

export interface MoveQueueDetailsPayload {
  reason?: string
  notes?: string
  title?: string
  subtitle?: string
  lawyerId?: string
  caseTentativeAmount?: number
  caseActualAmount?: number
  caseProfessionalFees?: number
  governmentFees?: number
  miscellaneousCharges?: number
}

interface MoveQueueDetailsModalProps {
  incidentId: string
  stage: MoveQueueStage
  lawyers?: Lawyer[]
  onSubmit: (payload: MoveQueueDetailsPayload) => void
  onCancel: () => void
}

const STAGE_META: Record<MoveQueueStage, { title: string; submitLabel: string }> = {
  refundRequested: { title: 'Move to Refund Requested', submitLabel: 'Confirm Move' },
  refundCompleted: { title: 'Move to Refund Completed', submitLabel: 'Confirm Move' },
  notSettled: { title: 'Move to Not Settled', submitLabel: 'Confirm Move' },
  settled: { title: 'Move to Settled', submitLabel: 'Confirm Move' },
  hold: { title: 'Move to Hold', submitLabel: 'Move to Hold' },
  lawyerAssigned: { title: 'Move to Lawyer Assigned', submitLabel: 'Move to Lawyer Assigned' },
}

export function MoveQueueDetailsModal({
  incidentId,
  stage,
  lawyers = [],
  onSubmit,
  onCancel,
}: MoveQueueDetailsModalProps) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null)
  const [lawyerSearch, setLawyerSearch] = useState('')
  const [showLawyerDropdown, setShowLawyerDropdown] = useState(false)
  const lawyerInputRef = useRef<HTMLInputElement>(null)
  const [caseTentativeAmount, setCaseTentativeAmount] = useState('')
  const [caseActualAmount, setCaseActualAmount] = useState('')
  const [caseProfessionalFees, setCaseProfessionalFees] = useState('')
  const [governmentFees, setGovernmentFees] = useState('')
  const [miscellaneousCharges, setMiscellaneousCharges] = useState('')

  const meta = STAGE_META[stage]

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(lawyerSearch.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(lawyerSearch.toLowerCase()) ||
      lawyer.state.toLowerCase().includes(lawyerSearch.toLowerCase()) ||
      lawyer.phone.includes(lawyerSearch)
  )

  const selectedLawyer = selectedLawyerId
    ? lawyers.find((l) => l.id === selectedLawyerId)
    : null

  const isDisabled = (() => {
    if (stage === 'refundRequested') return !reason.trim() || !notes.trim()
    if (stage === 'refundCompleted') return !notes.trim()
    if (stage === 'notSettled') return !reason.trim()
    if (stage === 'hold') return !reason.trim()
    if (stage === 'lawyerAssigned') return !title.trim() || !subtitle.trim() || !selectedLawyerId
    if (stage === 'settled') {
      return (
        !caseTentativeAmount ||
        !caseActualAmount ||
        !caseProfessionalFees ||
        !governmentFees
      )
    }
    return true
  })()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return

    if (stage === 'refundRequested') {
      onSubmit({ reason: reason.trim(), notes: notes.trim() })
    } else if (stage === 'refundCompleted') {
      onSubmit({ notes: notes.trim() })
    } else if (stage === 'notSettled') {
      onSubmit({ reason: reason.trim() })
    } else if (stage === 'hold') {
      onSubmit({ reason: reason.trim() })
    } else if (stage === 'lawyerAssigned') {
      onSubmit({
        title: title.trim(),
        subtitle: subtitle.trim(),
        lawyerId: selectedLawyerId || undefined,
      })
    } else if (stage === 'settled') {
      onSubmit({
        caseTentativeAmount: parseFloat(caseTentativeAmount) || 0,
        caseActualAmount: parseFloat(caseActualAmount) || 0,
        caseProfessionalFees: parseFloat(caseProfessionalFees) || 0,
        governmentFees: parseFloat(governmentFees) || 0,
        miscellaneousCharges: miscellaneousCharges
          ? parseFloat(miscellaneousCharges) || 0
          : undefined,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {meta.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {incidentId}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {stage === 'refundRequested' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Reason for Refund <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why a refund is being requested"
                  rows={3}
                  className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes"
                  rows={3}
                  className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y"
                  required
                />
              </div>
            </>
          )}

          {stage === 'refundCompleted' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about the completed refund"
                rows={4}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y"
                required
              />
            </div>
          )}

          {stage === 'notSettled' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Reason for Not Settled <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why the case could not be settled"
                rows={4}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y"
                required
              />
            </div>
          )}

          {stage === 'hold' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Reason for Hold <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why this is being placed on hold"
                rows={4}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y"
                required
              />
            </div>
          )}

          {stage === 'lawyerAssigned' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Lawyer <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    ref={lawyerInputRef}
                    type="text"
                    value={lawyerSearch}
                    onChange={(e) => {
                      setLawyerSearch(e.target.value)
                      setShowLawyerDropdown(true)
                    }}
                    onFocus={() => {
                      if (lawyerSearch.trim()) setShowLawyerDropdown(true)
                    }}
                    placeholder="Search by name, state, email, or phone..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                  />

                  {showLawyerDropdown && lawyerSearch.trim() && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowLawyerDropdown(false)}
                      />
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto z-20">
                        {filteredLawyers.length === 0 ? (
                          <div className="px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                            No lawyers found
                          </div>
                        ) : (
                          filteredLawyers.map((lawyer) => (
                            <button
                              key={lawyer.id}
                              type="button"
                              onClick={() => {
                                setSelectedLawyerId(lawyer.id)
                                setLawyerSearch('')
                                setShowLawyerDropdown(false)
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0 text-xs font-medium text-slate-600 dark:text-slate-300">
                                {lawyer.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                  {lawyer.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {lawyer.state} · {lawyer.email}
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>

                {selectedLawyer && (
                  <div className="mt-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                      <div className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-medium">
                        {selectedLawyer.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-cyan-900 dark:text-cyan-300">
                        {selectedLawyer.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLawyerId(null)
                          lawyerInputRef.current?.focus()
                        }}
                        className="p-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded transition-colors"
                      >
                        <X className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title"
                  className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subtitle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Enter a subtitle"
                  className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </>
          )}

          {stage === 'settled' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Case Tentative Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={caseTentativeAmount}
                      onChange={(e) => setCaseTentativeAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Case Actual Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={caseActualAmount}
                      onChange={(e) => setCaseActualAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Case Professional Fees <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={caseProfessionalFees}
                    onChange={(e) => setCaseProfessionalFees(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Government Fees <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={governmentFees}
                    onChange={(e) => setGovernmentFees(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Miscellaneous Charges
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={miscellaneousCharges}
                    onChange={(e) => setMiscellaneousCharges(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDisabled}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {meta.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

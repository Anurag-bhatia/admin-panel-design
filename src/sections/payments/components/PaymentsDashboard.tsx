import { useState, useMemo } from 'react'
import type { PaymentsProps, Refund, LawyerFee } from '@/../product/sections/payments/types'
import { PaymentsSidebar } from './PaymentsSidebar'
import { PaymentsStageTabs } from './PaymentsStageTabs'
import { PaymentsTableHeader, type PaymentFilters } from './PaymentsTableHeader'
import { RefundRow } from './RefundRow'
import { LawyerFeeRow } from './LawyerFeeRow'
import { RefundBulkActionsBar } from './RefundBulkActionsBar'
import { Pagination } from './Pagination'

const REFUND_TABS = [
  { key: 'to_refund', label: 'To Refund' },
  { key: 'completed', label: 'Completed' },
]

const LAWYER_FEE_TABS = [
  { key: 'to_pay', label: 'To Pay' },
  { key: 'completed', label: 'Completed' },
]

const REFUND_STATUS_OPTIONS = [
  { value: 'Initiated', label: 'Initiated' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Completed', label: 'Completed' },
]

const LAWYER_FEE_STATUS_OPTIONS = [
  { value: 'To Pay', label: 'To Pay' },
  { value: 'Completed', label: 'Completed' },
]

function isRefundInStage(refund: Refund, stage: string): boolean {
  if (stage === 'to_refund') return refund.refundStatus !== 'Completed'
  if (stage === 'completed') return refund.refundStatus === 'Completed'
  return true
}

function isLawyerFeeInStage(fee: LawyerFee, stage: string): boolean {
  if (stage === 'to_pay') return fee.status === 'To Pay'
  if (stage === 'completed') return fee.status === 'Completed'
  return true
}

export function PaymentsDashboard({
  refunds,
  lawyerFees,
  onApproveRefund,
  onProcessRefund,
  onBulkApproveRefunds,
  onBulkProcessRefunds,
  onExportRefunds,
  onViewLawyerProfile,
  onExportLawyerFees,
}: PaymentsProps) {
  // Sidebar state
  const [sidebarView, setSidebarView] = useState<'refunds' | 'lawyer-fees'>('refunds')

  // Active stage tab
  const [refundStage, setRefundStage] = useState('to_refund')
  const [feeStage, setFeeStage] = useState('to_pay')

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Selection (refunds only)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Refund stage counts
  const refundStageCounts = useMemo(() => ({
    to_refund: refunds.filter((r) => r.refundStatus !== 'Completed').length,
    completed: refunds.filter((r) => r.refundStatus === 'Completed').length,
  }), [refunds])

  // Lawyer fee stage counts
  const feeStageCounts = useMemo(() => ({
    to_pay: lawyerFees.filter((f) => f.status === 'To Pay').length,
    completed: lawyerFees.filter((f) => f.status === 'Completed').length,
  }), [lawyerFees])

  // Filtered refunds
  const filteredRefunds = useMemo(() => {
    let filtered = refunds.filter((r) => isRefundInStage(r, refundStage))

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.id.toLowerCase().includes(query) ||
          r.linkedIncident.toLowerCase().includes(query) ||
          r.customerSubscriber.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [refunds, refundStage, searchQuery])

  // Filtered lawyer fees
  const filteredFees = useMemo(() => {
    let filtered = lawyerFees.filter((f) => isLawyerFeeInStage(f, feeStage))

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (f) =>
          f.lawyerId.toLowerCase().includes(query) ||
          f.lawyerName.toLowerCase().includes(query) ||
          f.incidentId.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [lawyerFees, feeStage, searchQuery])

  // Selection handlers (refunds only)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredRefunds.map((r) => r.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedIds(newSelected)
  }

  const selectedArray = Array.from(selectedIds)
  const allSelected =
    filteredRefunds.length > 0 &&
    filteredRefunds.every((r) => selectedIds.has(r.id))
  const someSelected = selectedIds.size > 0 && !allSelected

  // Clear selection on view/stage change
  const handleSidebarChange = (view: 'refunds' | 'lawyer-fees') => {
    setSidebarView(view)
    setSelectedIds(new Set())
    setSearchQuery('')
  }

  const handleRefundStageChange = (stage: string) => {
    setRefundStage(stage)
    setSelectedIds(new Set())
  }

  return (
    <div className="flex h-full bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <PaymentsSidebar
        view={sidebarView}
        onViewChange={handleSidebarChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Stage Tabs */}
        {sidebarView === 'refunds' ? (
          <PaymentsStageTabs
            tabs={REFUND_TABS}
            activeTab={refundStage}
            counts={refundStageCounts}
            onTabChange={handleRefundStageChange}
          />
        ) : (
          <PaymentsStageTabs
            tabs={LAWYER_FEE_TABS}
            activeTab={feeStage}
            counts={feeStageCounts}
            onTabChange={setFeeStage}
          />
        )}

        {/* Table Header */}
        <PaymentsTableHeader
          searchPlaceholder={
            sidebarView === 'refunds'
              ? 'Search by Refund ID, incident, customer...'
              : 'Search by Lawyer ID, name, incident...'
          }
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={sidebarView === 'refunds' ? onExportRefunds : onExportLawyerFees}
          statusOptions={
            sidebarView === 'refunds' ? REFUND_STATUS_OPTIONS : LAWYER_FEE_STATUS_OPTIONS
          }
        />

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
          {sidebarView === 'refunds' ? (
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Refund ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Linked Incident
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Customer / Subscriber
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Approved By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Refund Date
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRefunds.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-16 text-center text-slate-500 dark:text-slate-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                          </svg>
                        </div>
                        <p className="font-medium">No refunds found</p>
                        <p className="text-sm">
                          {searchQuery
                            ? 'Try adjusting your search query'
                            : 'No refunds in this stage yet'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRefunds.map((refund) => (
                    <RefundRow
                      key={refund.id}
                      refund={refund}
                      isSelected={selectedIds.has(refund.id)}
                      onSelect={(checked) => handleSelectOne(refund.id, checked)}
                      onApprove={() => onApproveRefund?.(refund.id)}
                      onProcess={() => onProcessRefund?.(refund.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Lawyer ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Lawyer Name
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Total Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Commission
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Paid Date
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFees.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-16 text-center text-slate-500 dark:text-slate-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="font-medium">No lawyer payments found</p>
                        <p className="text-sm">
                          {searchQuery
                            ? 'Try adjusting your search query'
                            : 'No payments in this stage yet'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredFees.map((fee, index) => (
                    <LawyerFeeRow
                      key={`${fee.lawyerId}-${fee.incidentId}-${index}`}
                      fee={fee}
                      onViewLawyerProfile={() => onViewLawyerProfile?.(fee.lawyerId)}
                      onMarkComplete={() => console.log('Mark as complete:', fee.lawyerId, fee.incidentId)}
                    />
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={sidebarView === 'refunds' ? filteredRefunds.length : filteredFees.length}
          itemsPerPage={25}
        />
      </div>

      {/* Bulk Actions Bar (Refunds only) */}
      {sidebarView === 'refunds' && selectedIds.size > 0 && (
        <RefundBulkActionsBar
          selectedCount={selectedIds.size}
          onClearSelection={() => setSelectedIds(new Set())}
          onMarkComplete={() => onBulkProcessRefunds?.(selectedArray)}
        />
      )}
    </div>
  )
}

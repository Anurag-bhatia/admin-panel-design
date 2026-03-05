import { useState, useMemo } from 'react'
import type { PaymentsProps, Refund, LawyerFee, PartnerPayout } from '@/../product/sections/payments/types'
import type { Lead } from '@/../product/sections/sales-crm/types'
import { PaymentsSidebar } from './PaymentsSidebar'
import { PaymentsStageTabs } from './PaymentsStageTabs'
import { PaymentsTableHeader, type PaymentFilters } from './PaymentsTableHeader'
import { RefundRow } from './RefundRow'
import { LawyerFeeRow } from './LawyerFeeRow'
import { PartnerPayoutRow } from './PartnerPayoutRow'
import { RefundBulkActionsBar } from './RefundBulkActionsBar'
import { Pagination } from './Pagination'
import { LeadsTable } from '@/sections/sales-crm/components/LeadsTable'
import { LeadDetailView } from '@/sections/sales-crm/components/LeadDetailView'

const REFUND_TABS = [
  { key: 'to_refund', label: 'To Refund' },
  { key: 'completed', label: 'Completed' },
]

const LAWYER_FEE_TABS = [
  { key: 'to_pay', label: 'To Pay' },
  { key: 'completed', label: 'Completed' },
]

const LEADS_TABS = [
  { key: 'ready_to_invoice', label: 'Ready to Invoice' },
  { key: 'converted', label: 'Converted' },
]

const PARTNER_TABS = [
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

const PARTNER_STATUS_OPTIONS = [
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

function isPartnerPayoutInStage(payout: PartnerPayout, stage: string): boolean {
  if (stage === 'to_pay') return payout.status === 'To Pay'
  if (stage === 'completed') return payout.status === 'Completed'
  return true
}

export function PaymentsDashboard({
  refunds,
  lawyerFees,
  leads = [],
  users = [],
  partnerPayouts = [],
  onApproveRefund,
  onProcessRefund,
  onBulkApproveRefunds,
  onBulkProcessRefunds,
  onExportRefunds,
  onViewLawyerProfile,
  onExportLawyerFees,
  onViewLead,
  onAssignLead,
  onViewPartnerProfile,
  onExportPartnerPayouts,
}: PaymentsProps) {
  // Sidebar state
  const [sidebarView, setSidebarView] = useState<'refunds' | 'lawyer-fees' | 'leads' | 'partners'>('refunds')

  // Active stage tab
  const [refundStage, setRefundStage] = useState('to_refund')
  const [feeStage, setFeeStage] = useState('to_pay')
  const [leadsStage, setLeadsStage] = useState('ready_to_invoice')
  const [partnerStage, setPartnerStage] = useState('to_pay')

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Selection (refunds only)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Selection (leads)
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set())

  // Lead detail view
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const selectedLead = selectedLeadId ? leads.find(l => l.id === selectedLeadId) : null

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

  // Leads stage counts
  const leadsStageCounts = useMemo(() => ({
    ready_to_invoice: leads.filter((l) => l.status === 'invoiced').length,
    converted: leads.filter((l) => l.status === 'sales').length,
  }), [leads])

  // Partner payout stage counts
  const partnerStageCounts = useMemo(() => ({
    to_pay: partnerPayouts.filter((p) => p.status === 'To Pay').length,
    completed: partnerPayouts.filter((p) => p.status === 'Completed').length,
  }), [partnerPayouts])

  // Filtered leads
  const filteredLeads = useMemo(() => {
    const statusFilter = leadsStage === 'ready_to_invoice' ? 'invoiced' : 'sales'
    let filtered = leads.filter((l) => l.status === statusFilter)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (l) =>
          l.id.toLowerCase().includes(query) ||
          l.companyAlias.toLowerCase().includes(query) ||
          l.contactPerson.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [leads, leadsStage, searchQuery])

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

  // Filtered partner payouts
  const filteredPartnerPayouts = useMemo(() => {
    let filtered = partnerPayouts.filter((p) => isPartnerPayoutInStage(p, partnerStage))

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.partnerId.toLowerCase().includes(query) ||
          p.partnerName.toLowerCase().includes(query) ||
          p.companyName.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [partnerPayouts, partnerStage, searchQuery])

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
  const handleSidebarChange = (view: 'refunds' | 'lawyer-fees' | 'leads' | 'partners') => {
    setSidebarView(view)
    setSelectedIds(new Set())
    setSelectedLeadIds(new Set())
    setSearchQuery('')
  }

  const handleRefundStageChange = (stage: string) => {
    setRefundStage(stage)
    setSelectedIds(new Set())
  }

  // Show lead detail view if a lead is selected
  if (selectedLead) {
    return (
      <div className="flex h-full bg-slate-100 dark:bg-slate-950">
        <PaymentsSidebar
          view={sidebarView}
          onViewChange={(view) => {
            handleSidebarChange(view)
            setSelectedLeadId(null)
          }}
        />
        <div className="flex-1 overflow-auto">
          <LeadDetailView
            lead={selectedLead}
            timelineActivities={[]}
            documents={[]}
            users={users}
            onClose={() => setSelectedLeadId(null)}
          />
        </div>
      </div>
    )
  }

  // Determine current stage tabs, counts, and active tab
  const currentTabs = sidebarView === 'refunds' ? REFUND_TABS
    : sidebarView === 'lawyer-fees' ? LAWYER_FEE_TABS
    : sidebarView === 'leads' ? LEADS_TABS
    : PARTNER_TABS

  const currentCounts = sidebarView === 'refunds' ? refundStageCounts
    : sidebarView === 'lawyer-fees' ? feeStageCounts
    : sidebarView === 'leads' ? leadsStageCounts
    : partnerStageCounts

  const currentActiveTab = sidebarView === 'refunds' ? refundStage
    : sidebarView === 'lawyer-fees' ? feeStage
    : sidebarView === 'leads' ? leadsStage
    : partnerStage

  const currentTabChange = sidebarView === 'refunds' ? handleRefundStageChange
    : sidebarView === 'lawyer-fees' ? setFeeStage
    : sidebarView === 'leads' ? setLeadsStage
    : setPartnerStage

  const currentSearchPlaceholder = sidebarView === 'refunds'
    ? 'Search by Refund ID, incident, customer...'
    : sidebarView === 'lawyer-fees'
    ? 'Search by Lawyer ID, name, incident...'
    : sidebarView === 'leads'
    ? 'Search by Lead ID, company, contact...'
    : 'Search by Partner ID, name, company...'

  const currentStatusOptions = sidebarView === 'refunds' ? REFUND_STATUS_OPTIONS
    : sidebarView === 'lawyer-fees' ? LAWYER_FEE_STATUS_OPTIONS
    : sidebarView === 'partners' ? PARTNER_STATUS_OPTIONS
    : LAWYER_FEE_STATUS_OPTIONS

  const currentExport = sidebarView === 'refunds' ? onExportRefunds
    : sidebarView === 'partners' ? onExportPartnerPayouts
    : onExportLawyerFees

  const currentTotalItems = sidebarView === 'refunds' ? filteredRefunds.length
    : sidebarView === 'lawyer-fees' ? filteredFees.length
    : sidebarView === 'leads' ? filteredLeads.length
    : filteredPartnerPayouts.length

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
        <PaymentsStageTabs
          tabs={currentTabs}
          activeTab={currentActiveTab}
          counts={currentCounts}
          onTabChange={currentTabChange}
        />

        {/* Table Header */}
        <PaymentsTableHeader
          searchPlaceholder={currentSearchPlaceholder}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={currentExport}
          statusOptions={currentStatusOptions}
        />

        {/* Table */}
        <div className={`flex-1 bg-white dark:bg-slate-900 ${sidebarView === 'leads' ? 'overflow-visible' : 'overflow-auto'}`}>
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
          ) : sidebarView === 'lawyer-fees' ? (
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
          ) : sidebarView === 'partners' ? (
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Partner ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Partner
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Subscribers
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Total Earnings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Payout Amount
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
                {filteredPartnerPayouts.length === 0 ? (
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
                              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                            />
                          </svg>
                        </div>
                        <p className="font-medium">No partner payouts found</p>
                        <p className="text-sm">
                          {searchQuery
                            ? 'Try adjusting your search query'
                            : 'No payouts in this stage yet'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPartnerPayouts.map((payout, index) => (
                    <PartnerPayoutRow
                      key={`${payout.partnerId}-${index}`}
                      payout={payout}
                      onViewPartnerProfile={() => onViewPartnerProfile?.(payout.partnerId)}
                      onMarkComplete={() => console.log('Mark as paid:', payout.partnerId)}
                    />
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="p-4">
              <LeadsTable
                leads={filteredLeads}
                users={users}
                selectedLeads={selectedLeadIds}
                onSelectLead={(id, selected) => {
                  const next = new Set(selectedLeadIds)
                  if (selected) next.add(id)
                  else next.delete(id)
                  setSelectedLeadIds(next)
                }}
                onSelectAll={(selected) => {
                  if (selected) {
                    setSelectedLeadIds(new Set(filteredLeads.map((l) => l.id)))
                  } else {
                    setSelectedLeadIds(new Set())
                  }
                }}
                onViewLead={(id) => setSelectedLeadId(id)}
                onAssignLead={onAssignLead}
              />
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={currentTotalItems}
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

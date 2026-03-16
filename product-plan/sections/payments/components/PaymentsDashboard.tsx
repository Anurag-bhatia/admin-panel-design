import { useState, useMemo } from 'react'
import type { PaymentsProps, Refund, LawyerFee, PartnerPayout } from '../types'
import type { Lead } from '../types'
import { PaymentsSidebar } from './PaymentsSidebar'
import { PaymentsStageTabs } from './PaymentsStageTabs'
import { PaymentsTableHeader, type PaymentFilters } from './PaymentsTableHeader'
import { RefundRow } from './RefundRow'
import { LawyerFeeRow } from './LawyerFeeRow'
import { PartnerPayoutRow } from './PartnerPayoutRow'
import { RefundBulkActionsBar } from './RefundBulkActionsBar'
import { RefundDetailView } from './RefundDetailView'
import { Pagination } from './Pagination'
import { LeadsTable } from '../../sales-crm/components/LeadsTable'
import { LeadDetailView } from '../../sales-crm/components/LeadDetailView'
import { LawyerProfile } from '../../lawyers/components/LawyerProfile'
import { PartnerDetail } from '../../partners/components/PartnerDetail'

const REFUND_TABS = [
  { key: 'refund_raised', label: 'Refund Raised' },
  { key: 'completed', label: 'Completed' },
  { key: 'hold', label: 'Hold' },
  { key: 'rejected', label: 'Rejected' },
]

const LAWYER_FEE_TABS = [
  { key: 'to_pay', label: 'To Pay' },
  { key: 'completed', label: 'Completed' },
  { key: 'hold', label: 'Hold' },
  { key: 'rejected', label: 'Rejected' },
]

const LEADS_TABS = [
  { key: 'ready_to_invoice', label: 'Ready to Invoice' },
  { key: 'converted', label: 'Converted' },
]

const PARTNER_TABS = [
  { key: 'to_pay', label: 'To Pay' },
  { key: 'completed', label: 'Completed' },
  { key: 'hold', label: 'Hold' },
  { key: 'rejected', label: 'Rejected' },
]

const REFUND_STATUS_OPTIONS = [
  { value: 'Refund Raised', label: 'Refund Raised' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Hold', label: 'Hold' },
  { value: 'Rejected', label: 'Rejected' },
]

const LAWYER_FEE_STATUS_OPTIONS = [
  { value: 'To Pay', label: 'To Pay' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Hold', label: 'Hold' },
  { value: 'Rejected', label: 'Rejected' },
]

const PARTNER_STATUS_OPTIONS = [
  { value: 'To Pay', label: 'To Pay' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Hold', label: 'Hold' },
  { value: 'Rejected', label: 'Rejected' },
]

function isRefundInStage(refund: Refund, stage: string): boolean {
  if (stage === 'refund_raised') return refund.refundStatus === 'Refund Raised'
  if (stage === 'completed') return refund.refundStatus === 'Completed'
  if (stage === 'hold') return refund.refundStatus === 'Hold'
  if (stage === 'rejected') return refund.refundStatus === 'Rejected'
  return true
}

function isLawyerFeeInStage(fee: LawyerFee, stage: string): boolean {
  if (stage === 'to_pay') return fee.status === 'To Pay'
  if (stage === 'completed') return fee.status === 'Completed'
  if (stage === 'hold') return fee.status === 'Hold'
  if (stage === 'rejected') return fee.status === 'Rejected'
  return true
}

function isPartnerPayoutInStage(payout: PartnerPayout, stage: string): boolean {
  if (stage === 'to_pay') return payout.status === 'To Pay'
  if (stage === 'completed') return payout.status === 'Completed'
  if (stage === 'hold') return payout.status === 'Hold'
  if (stage === 'rejected') return payout.status === 'Rejected'
  return true
}

export function PaymentsDashboard({
  refunds,
  lawyerFees,
  leads = [],
  users = [],
  lawyers = [],
  partners = [],
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
  onBulkMarkLeadsConverted,
  onBulkMarkLawyerFeesPaid,
  onBulkMarkPartnerPayoutsPaid,
  onViewPartnerProfile,
  onExportPartnerPayouts,
}: PaymentsProps) {
  // Sidebar state
  const [sidebarView, setSidebarView] = useState<'challan-refunds' | 'case-refunds' | 'lawyer-fees' | 'leads' | 'partners'>('challan-refunds')

  // Active stage tab
  const [challanRefundStage, setChallanRefundStage] = useState('refund_raised')
  const [caseRefundStage, setCaseRefundStage] = useState('refund_raised')
  const [feeStage, setFeeStage] = useState('to_pay')
  const [leadsStage, setLeadsStage] = useState('ready_to_invoice')
  const [partnerStage, setPartnerStage] = useState('to_pay')

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Selection (challan refunds)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Selection (case refunds)
  const [selectedCaseRefundIds, setSelectedCaseRefundIds] = useState<Set<string>>(new Set())

  // Selection (lawyer fees) - keyed by lawyerId-incidentId
  const [selectedFeeKeys, setSelectedFeeKeys] = useState<Set<string>>(new Set())

  // Selection (partner payouts) - keyed by partnerId-dueDate
  const [selectedPartnerKeys, setSelectedPartnerKeys] = useState<Set<string>>(new Set())

  // Selection (leads)
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set())

  // Send PI / Send Invoice modal (single lead)
  const [sendModal, setSendModal] = useState<{ type: 'pi' | 'invoice'; lead: Lead } | null>(null)
  // Send PI / Send Invoice modal (bulk)
  const [bulkSendModal, setBulkSendModal] = useState<{ type: 'pi' | 'invoice'; leads: Lead[] } | null>(null)
  const [sendSuccess, setSendSuccess] = useState<{ type: 'pi' | 'invoice'; message: string } | null>(null)

  // Lead detail view
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const selectedLead = selectedLeadId ? leads.find(l => l.id === selectedLeadId) : null

  // Lawyer profile view (from lawyer fees)
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null)
  const selectedLawyer = selectedLawyerId ? lawyers.find(l => l.lawyerId === selectedLawyerId) : null

  // Refund detail view
  const [selectedRefundId, setSelectedRefundId] = useState<string | null>(null)
  const selectedRefund = selectedRefundId ? refunds.find(r => r.id === selectedRefundId) : null

  // Partner detail view (from ChallanPay Partners)
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null)
  const selectedPartner = selectedPartnerId ? partners.find(p => p.partnerId === selectedPartnerId) : null

  // Split refunds by workType
  const challanRefunds = useMemo(() => refunds.filter((r) => r.workType === 'challan'), [refunds])
  const caseRefunds = useMemo(() => refunds.filter((r) => r.workType === 'case'), [refunds])

  // Challan refund stage counts
  const challanRefundStageCounts = useMemo(() => ({
    refund_raised: challanRefunds.filter((r) => r.refundStatus === 'Refund Raised').length,
    completed: challanRefunds.filter((r) => r.refundStatus === 'Completed').length,
    hold: challanRefunds.filter((r) => r.refundStatus === 'Hold').length,
    rejected: challanRefunds.filter((r) => r.refundStatus === 'Rejected').length,
  }), [challanRefunds])

  // Case refund stage counts
  const caseRefundStageCounts = useMemo(() => ({
    refund_raised: caseRefunds.filter((r) => r.refundStatus === 'Refund Raised').length,
    completed: caseRefunds.filter((r) => r.refundStatus === 'Completed').length,
    hold: caseRefunds.filter((r) => r.refundStatus === 'Hold').length,
    rejected: caseRefunds.filter((r) => r.refundStatus === 'Rejected').length,
  }), [caseRefunds])

  // Lawyer fee stage counts
  const feeStageCounts = useMemo(() => ({
    to_pay: lawyerFees.filter((f) => f.status === 'To Pay').length,
    completed: lawyerFees.filter((f) => f.status === 'Completed').length,
    hold: lawyerFees.filter((f) => f.status === 'Hold').length,
    rejected: lawyerFees.filter((f) => f.status === 'Rejected').length,
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
    hold: partnerPayouts.filter((p) => p.status === 'Hold').length,
    rejected: partnerPayouts.filter((p) => p.status === 'Rejected').length,
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

  // Filtered challan refunds
  const filteredChallanRefunds = useMemo(() => {
    let filtered = challanRefunds.filter((r) => isRefundInStage(r, challanRefundStage))

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
  }, [challanRefunds, challanRefundStage, searchQuery])

  // Filtered case refunds
  const filteredCaseRefunds = useMemo(() => {
    let filtered = caseRefunds.filter((r) => isRefundInStage(r, caseRefundStage))

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
  }, [caseRefunds, caseRefundStage, searchQuery])

  // Active filtered refunds based on current sidebar view
  const filteredRefunds = sidebarView === 'case-refunds' ? filteredCaseRefunds : filteredChallanRefunds

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

  // Helpers to generate unique keys
  const feeKey = (fee: LawyerFee) => `${fee.lawyerId}-${fee.incidentId}`
  const partnerKey = (payout: PartnerPayout) => `${payout.partnerId}-${payout.dueDate}`

  // Selection handlers (refunds)
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

  // Case refund selection handlers
  const handleCaseRefundSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCaseRefundIds(new Set(filteredCaseRefunds.map((r) => r.id)))
    } else {
      setSelectedCaseRefundIds(new Set())
    }
  }

  const handleCaseRefundSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedCaseRefundIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedCaseRefundIds(newSelected)
  }

  // Active refund selection based on current view
  const activeRefundSelectedIds = sidebarView === 'case-refunds' ? selectedCaseRefundIds : selectedIds
  const activeRefundHandleSelectAll = sidebarView === 'case-refunds' ? handleCaseRefundSelectAll : handleSelectAll
  const activeRefundHandleSelectOne = sidebarView === 'case-refunds' ? handleCaseRefundSelectOne : handleSelectOne

  const selectedArray = Array.from(activeRefundSelectedIds)
  const allSelected =
    filteredRefunds.length > 0 &&
    filteredRefunds.every((r) => activeRefundSelectedIds.has(r.id))
  const someSelected = activeRefundSelectedIds.size > 0 && !allSelected

  // Selection handlers (lawyer fees)
  const handleSelectAllFees = (checked: boolean) => {
    if (checked) {
      setSelectedFeeKeys(new Set(filteredFees.map(feeKey)))
    } else {
      setSelectedFeeKeys(new Set())
    }
  }

  const handleSelectOneFee = (key: string, checked: boolean) => {
    const newSelected = new Set(selectedFeeKeys)
    if (checked) {
      newSelected.add(key)
    } else {
      newSelected.delete(key)
    }
    setSelectedFeeKeys(newSelected)
  }

  const selectedFeeArray = Array.from(selectedFeeKeys)
  const allFeesSelected =
    filteredFees.length > 0 &&
    filteredFees.every((f) => selectedFeeKeys.has(feeKey(f)))
  const someFeesSelected = selectedFeeKeys.size > 0 && !allFeesSelected

  // Selection handlers (partner payouts)
  const handleSelectAllPartners = (checked: boolean) => {
    if (checked) {
      setSelectedPartnerKeys(new Set(filteredPartnerPayouts.map(partnerKey)))
    } else {
      setSelectedPartnerKeys(new Set())
    }
  }

  const handleSelectOnePartner = (key: string, checked: boolean) => {
    const newSelected = new Set(selectedPartnerKeys)
    if (checked) {
      newSelected.add(key)
    } else {
      newSelected.delete(key)
    }
    setSelectedPartnerKeys(newSelected)
  }

  const selectedPartnerArray = Array.from(selectedPartnerKeys)
  const allPartnersSelected =
    filteredPartnerPayouts.length > 0 &&
    filteredPartnerPayouts.every((p) => selectedPartnerKeys.has(partnerKey(p)))
  const somePartnersSelected = selectedPartnerKeys.size > 0 && !allPartnersSelected

  // Clear selection on view/stage change
  const handleSidebarChange = (view: 'challan-refunds' | 'case-refunds' | 'lawyer-fees' | 'leads' | 'partners') => {
    setSidebarView(view)
    setSelectedIds(new Set())
    setSelectedCaseRefundIds(new Set())
    setSelectedFeeKeys(new Set())
    setSelectedPartnerKeys(new Set())
    setSelectedLeadIds(new Set())
    setSearchQuery('')
  }

  const handleChallanRefundStageChange = (stage: string) => {
    setChallanRefundStage(stage)
    setSelectedIds(new Set())
  }

  const handleCaseRefundStageChange = (stage: string) => {
    setCaseRefundStage(stage)
    setSelectedCaseRefundIds(new Set())
  }

  const handleFeeStageChange = (stage: string) => {
    setFeeStage(stage)
    setSelectedFeeKeys(new Set())
  }

  const handleLeadsStageChange = (stage: string) => {
    setLeadsStage(stage)
    setSelectedLeadIds(new Set())
  }

  const handlePartnerStageChange = (stage: string) => {
    setPartnerStage(stage)
    setSelectedPartnerKeys(new Set())
  }

  // Derive pending invoices from lawyerFees for the selected lawyer
  const lawyerPendingInvoices = useMemo(() => {
    if (!selectedLawyerId) return []
    return lawyerFees
      .filter((f) => f.lawyerId === selectedLawyerId)
      .map((f, i) => ({
        id: `${f.lawyerId}-${f.incidentId}-${i}`,
        incidentId: f.incidentId,
        resolutionDate: f.paidDate || f.dueDate,
        commissionAmount: f.commissionAmount,
        status: (f.status === 'Completed' ? 'Settled' : 'Not Settled') as 'Settled' | 'Not Settled' | 'Refund',
      }))
  }, [selectedLawyerId, lawyerFees])

  // --- All hooks are above this line. Early returns below. ---

  // Show refund detail view if a refund is selected
  if (selectedRefund) {
    return (
      <div className="flex h-full bg-slate-100 dark:bg-slate-950">
        <PaymentsSidebar
          view={sidebarView}
          onViewChange={(view) => {
            handleSidebarChange(view)
            setSelectedRefundId(null)
          }}
        />
        <div className="flex-1 overflow-auto">
          <RefundDetailView
            refund={selectedRefund}
            onBack={() => setSelectedRefundId(null)}
            onAddNote={(id, content) => console.log('Add note:', id, content)}
            onAddFollowUp={(id, followUp) => console.log('Add follow-up:', id, followUp)}
            onMoveTicket={(id, stage) => console.log('Move ticket:', id, stage)}
          />
        </div>
      </div>
    )
  }

  // Show lawyer profile if a lawyer is selected from fees
  if (selectedLawyer) {
    return (
      <div className="flex h-full bg-slate-100 dark:bg-slate-950">
        <PaymentsSidebar
          view={sidebarView}
          onViewChange={(view) => {
            handleSidebarChange(view)
            setSelectedLawyerId(null)
          }}
        />
        <div className="flex-1 overflow-auto">
          <LawyerProfile
            lawyer={selectedLawyer}
            pendingInvoices={lawyerPendingInvoices}
            initialTab="invoicing"
            onBack={() => setSelectedLawyerId(null)}
            onEdit={() => console.log('Edit lawyer:', selectedLawyer.lawyerId)}
            onDeactivate={() => console.log('Deactivate lawyer:', selectedLawyer.lawyerId)}
            onReactivate={() => console.log('Reactivate lawyer:', selectedLawyer.lawyerId)}
          />
        </div>
      </div>
    )
  }

  // Show partner detail view if a partner is selected from ChallanPay Partners
  if (selectedPartner) {
    return (
      <div className="flex h-full bg-slate-100 dark:bg-slate-950">
        <PaymentsSidebar
          view={sidebarView}
          onViewChange={(view) => {
            handleSidebarChange(view)
            setSelectedPartnerId(null)
          }}
        />
        <div className="flex-1 overflow-auto">
          <PartnerDetail
            partner={selectedPartner}
            allowedTabs={['profile', 'documents', 'financial']}
            onBack={() => setSelectedPartnerId(null)}
            onEditPartner={() => console.log('Edit partner:', selectedPartner.partnerId)}
          />
        </div>
      </div>
    )
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
  const isRefundView = sidebarView === 'challan-refunds' || sidebarView === 'case-refunds'

  const currentTabs = isRefundView ? REFUND_TABS
    : sidebarView === 'lawyer-fees' ? LAWYER_FEE_TABS
    : sidebarView === 'leads' ? LEADS_TABS
    : PARTNER_TABS

  const currentCounts = sidebarView === 'challan-refunds' ? challanRefundStageCounts
    : sidebarView === 'case-refunds' ? caseRefundStageCounts
    : sidebarView === 'lawyer-fees' ? feeStageCounts
    : sidebarView === 'leads' ? leadsStageCounts
    : partnerStageCounts

  const currentActiveTab = sidebarView === 'challan-refunds' ? challanRefundStage
    : sidebarView === 'case-refunds' ? caseRefundStage
    : sidebarView === 'lawyer-fees' ? feeStage
    : sidebarView === 'leads' ? leadsStage
    : partnerStage

  const currentTabChange = sidebarView === 'challan-refunds' ? handleChallanRefundStageChange
    : sidebarView === 'case-refunds' ? handleCaseRefundStageChange
    : sidebarView === 'lawyer-fees' ? handleFeeStageChange
    : sidebarView === 'leads' ? handleLeadsStageChange
    : handlePartnerStageChange

  const currentSearchPlaceholder = isRefundView
    ? 'Search by Refund ID, incident, customer...'
    : sidebarView === 'lawyer-fees'
    ? 'Search by Lawyer ID, name, incident...'
    : sidebarView === 'leads'
    ? 'Search by Lead ID, company, contact...'
    : 'Search by Partner ID, name, company...'

  const currentStatusOptions = isRefundView ? REFUND_STATUS_OPTIONS
    : sidebarView === 'lawyer-fees' ? LAWYER_FEE_STATUS_OPTIONS
    : sidebarView === 'partners' ? PARTNER_STATUS_OPTIONS
    : LAWYER_FEE_STATUS_OPTIONS

  const currentExport = isRefundView ? onExportRefunds
    : sidebarView === 'partners' ? onExportPartnerPayouts
    : onExportLawyerFees

  const currentTotalItems = isRefundView ? filteredRefunds.length
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
          {isRefundView ? (
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
                      onChange={(e) => activeRefundHandleSelectAll(e.target.checked)}
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
                    Initiated By
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
                      isSelected={activeRefundSelectedIds.has(refund.id)}
                      onSelect={(checked) => activeRefundHandleSelectOne(refund.id, checked)}
                      onApprove={() => onApproveRefund?.(refund.id)}
                      onProcess={() => onProcessRefund?.(refund.id)}
                      onMove={(stage) => console.log('Move refund:', refund.id, 'to', stage)}
                      onClick={() => setSelectedRefundId(refund.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          ) : sidebarView === 'lawyer-fees' ? (
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allFeesSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someFeesSelected
                      }}
                      onChange={(e) => handleSelectAllFees(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700"
                    />
                  </th>
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
                  filteredFees.map((fee, index) => {
                    const key = feeKey(fee)
                    return (
                      <LawyerFeeRow
                        key={`${key}-${index}`}
                        fee={fee}
                        isSelected={selectedFeeKeys.has(key)}
                        onSelect={(checked) => handleSelectOneFee(key, checked)}
                        onViewLawyerProfile={() => setSelectedLawyerId(fee.lawyerId)}
                        onMarkComplete={() => console.log('Mark as complete:', fee.lawyerId, fee.incidentId)}
                      />
                    )
                  })
                )}
              </tbody>
            </table>
          ) : sidebarView === 'partners' ? (
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allPartnersSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = somePartnersSelected
                      }}
                      onChange={(e) => handleSelectAllPartners(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Partner ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Partner
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
                  filteredPartnerPayouts.map((payout, index) => {
                    const key = partnerKey(payout)
                    return (
                      <PartnerPayoutRow
                        key={`${key}-${index}`}
                        payout={payout}
                        isSelected={selectedPartnerKeys.has(key)}
                        onSelect={(checked) => handleSelectOnePartner(key, checked)}
                        onViewPartnerProfile={() => setSelectedPartnerId(payout.partnerId)}
                        onMarkComplete={() => console.log('Mark as paid:', payout.partnerId)}
                      />
                    )
                  })
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
                onSendPI={(lead) => setSendModal({ type: 'pi', lead })}
                onSendInvoice={(lead) => setSendModal({ type: 'invoice', lead })}
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

      {/* Bulk Actions Bar */}
      {isRefundView && activeRefundSelectedIds.size > 0 && (
        <RefundBulkActionsBar
          selectedCount={activeRefundSelectedIds.size}
          onClearSelection={() => sidebarView === 'case-refunds' ? setSelectedCaseRefundIds(new Set()) : setSelectedIds(new Set())}
          moveOptions={REFUND_STATUS_OPTIONS}
          onMove={(targetStage) => {
            console.log('Move refunds:', selectedArray, 'to', targetStage)
            sidebarView === 'case-refunds' ? setSelectedCaseRefundIds(new Set()) : setSelectedIds(new Set())
          }}
        />
      )}

      {sidebarView === 'lawyer-fees' && selectedFeeKeys.size > 0 && (
        <RefundBulkActionsBar
          selectedCount={selectedFeeKeys.size}
          actionLabel="Mark as Paid"
          onClearSelection={() => setSelectedFeeKeys(new Set())}
          onMarkComplete={() => onBulkMarkLawyerFeesPaid?.(selectedFeeArray)}
        />
      )}

      {sidebarView === 'partners' && selectedPartnerKeys.size > 0 && (
        <RefundBulkActionsBar
          selectedCount={selectedPartnerKeys.size}
          actionLabel="Mark as Paid"
          onClearSelection={() => setSelectedPartnerKeys(new Set())}
          onMarkComplete={() => onBulkMarkPartnerPayoutsPaid?.(selectedPartnerArray)}
        />
      )}

      {sidebarView === 'leads' && selectedLeadIds.size > 0 && (
        <RefundBulkActionsBar
          selectedCount={selectedLeadIds.size}
          actionLabel="Mark as Converted"
          onClearSelection={() => setSelectedLeadIds(new Set())}
          onMarkComplete={() => onBulkMarkLeadsConverted?.(Array.from(selectedLeadIds))}
          onSendPI={() => {
            const selected = leads.filter((l) => selectedLeadIds.has(l.id))
            setBulkSendModal({ type: 'pi', leads: selected })
          }}
          onSendInvoice={() => {
            const selected = leads.filter((l) => selectedLeadIds.has(l.id))
            setBulkSendModal({ type: 'invoice', leads: selected })
          }}
        />
      )}

      {/* Send PI / Send Invoice Confirmation Modal */}
      {sendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSendModal(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Send {sendModal.type === 'pi' ? 'Proforma Invoice' : 'Invoice'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to send the {sendModal.type === 'pi' ? 'Proforma Invoice' : 'Invoice'} to the client{' '}
              <span className="font-medium text-slate-900 dark:text-white">{sendModal.lead.companyAlias}</span>?
              It will be sent to{' '}
              <span className="font-medium text-cyan-600 dark:text-cyan-400">{sendModal.lead.emailId}</span>.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSendModal(null)}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSendSuccess({ type: sendModal.type, message: `Sent to ${sendModal.lead.emailId}` })
                  setSendModal(null)
                  setTimeout(() => setSendSuccess(null), 4000)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Send PI / Send Invoice Confirmation Modal */}
      {bulkSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setBulkSendModal(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Send {bulkSendModal.type === 'pi' ? 'Proforma Invoice' : 'Invoice'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Are you sure you want to send the {bulkSendModal.type === 'pi' ? 'Proforma Invoice' : 'Invoice'} to{' '}
              <span className="font-medium text-slate-900 dark:text-white">{bulkSendModal.leads.length} client{bulkSendModal.leads.length !== 1 ? 's' : ''}</span>?
            </p>
            <div className="max-h-32 overflow-y-auto mb-4 space-y-1.5">
              {bulkSendModal.leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between text-xs px-3 py-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="font-medium text-slate-900 dark:text-white">{lead.companyAlias}</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{lead.emailId}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setBulkSendModal(null)}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSendSuccess({
                    type: bulkSendModal.type,
                    message: `Sent to ${bulkSendModal.leads.length} client${bulkSendModal.leads.length !== 1 ? 's' : ''}`,
                  })
                  setBulkSendModal(null)
                  setSelectedLeadIds(new Set())
                  setTimeout(() => setSendSuccess(null), 4000)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Send All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {sendSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-lg shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">
            {sendSuccess.type === 'pi' ? 'Proforma Invoice' : 'Invoice'} {sendSuccess.message}
          </span>
          <button onClick={() => setSendSuccess(null)} className="ml-2 text-white/80 hover:text-white">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

import { useState, useMemo } from 'react'
import { FileText } from 'lucide-react'
import type {
  ProposalListProps,
  ProposalStatus,
  ProposalType,
} from '@/../product/sections/proposals/types'
import { DashboardCards } from './DashboardCards'
import { ProposalSidebar } from './ProposalSidebar'
import { ProposalQueueTabs } from './ProposalQueueTabs'
import { ProposalTableHeader, type ProposalFilters } from './ProposalTableHeader'
import { ProposalRow } from './ProposalRow'
import { BulkActionsBar } from './BulkActionsBar'
import { Pagination } from './Pagination'
import { SendQuoteModal } from './SendQuoteModal'
import { RejectModal } from './RejectModal'
import { ConvertToIncidentModal } from './ConvertToIncidentModal'
import { AssignModal } from './AssignModal'

type ModalType = 'sendQuote' | 'reviseQuote' | 'reject' | 'convert' | 'assign' | 'reassign' | null

const PAGE_SIZE = 10

export function ProposalList({
  proposals,
  teamMembers,
  dashboardStats,
  onPickUp,
  onAssign,
  onReassign,
  onSendQuote,
  onReviseQuote,
  onWithdraw,
  onReject,
  onReopen,
  onConvertToIncident,
  onUpdateServiceStatus,
  onView,
  onViewIncident,
  onBulkAssign,
  onBulkUpdateStatus,
}: ProposalListProps) {
  // Tab & filter state
  const [activeTab, setActiveTab] = useState<ProposalStatus>('sent')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<ProposalType | 'all'>('all')
  const [filters, setFilters] = useState<ProposalFilters>({})
  const [view, setView] = useState<'all' | 'my'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Modal state
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [modalProposalId, setModalProposalId] = useState<string | null>(null)

  // Tab counts
  const tabCounts = useMemo(
    () => ({
      sent: proposals.filter((p) => p.status === 'sent').length,
      under_review: proposals.filter((p) => p.status === 'under_review').length,
      received: proposals.filter((p) => p.status === 'received').length,
      converted: proposals.filter((p) => p.status === 'converted').length,
      rejected: proposals.filter((p) => p.status === 'rejected').length,
    }),
    [proposals]
  )

  // Filter proposals
  const filteredProposals = useMemo(() => {
    let result = proposals.filter((p) => p.status === activeTab)

    if (typeFilter !== 'all') {
      result = result.filter((p) => p.type === typeFilter)
    }

    if (filters.assignedTo) {
      if (filters.assignedTo === 'unassigned') {
        result = result.filter((p) => !p.assignedTo)
      } else {
        result = result.filter((p) => p.assignedTo?.id === filters.assignedTo)
      }
    }

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom).getTime()
      result = result.filter((p) => new Date(p.createdAt).getTime() >= from)
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo).getTime() + 86400000 // end of day
      result = result.filter((p) => new Date(p.createdAt).getTime() <= to)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.displayId.toLowerCase().includes(q) ||
          p.customer.name.toLowerCase().includes(q) ||
          p.customer.company.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    const sortBy = filters.sortBy || 'newest'
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'amount_high':
          return b.amount - a.amount
        case 'amount_low':
          return a.amount - b.amount
        case 'qty_high':
          return b.quantity - a.quantity
        case 'qty_low':
          return a.quantity - b.quantity
        default:
          return 0
      }
    })

    return result
  }, [proposals, activeTab, typeFilter, filters, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredProposals.length / PAGE_SIZE)
  const paginatedProposals = filteredProposals.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  // Reset page when filters change
  const handleTabChange = (tab: ProposalStatus) => {
    setActiveTab(tab)
    setCurrentPage(1)
    setSelectedIds(new Set())
  }

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedProposals.map((p) => p.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    const next = new Set(selectedIds)
    if (checked) {
      next.add(id)
    } else {
      next.delete(id)
    }
    setSelectedIds(next)
  }

  // Modal helpers
  const openModal = (type: ModalType, proposalId: string) => {
    setModalProposalId(proposalId)
    setActiveModal(type)
  }

  const closeModal = () => {
    setActiveModal(null)
    setModalProposalId(null)
  }

  const modalProposal = proposals.find((p) => p.id === modalProposalId)

  // Determine visible columns based on active tab
  const showAssignedCol = activeTab === 'under_review' || activeTab === 'received'
  const showServiceStatusCol = activeTab === 'converted'
  const showLinkedIncidentCol = activeTab === 'converted'

  const colCount = 7 + (showAssignedCol ? 1 : 0) + (showServiceStatusCol ? 1 : 0) + (showLinkedIncidentCol ? 1 : 0)

  const allOnPageSelected =
    paginatedProposals.length > 0 && paginatedProposals.every((p) => selectedIds.has(p.id))

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950">
      {/* Dashboard Cards */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <DashboardCards stats={dashboardStats} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ProposalSidebar
          view={view}
          typeFilter={typeFilter}
          onViewChange={setView}
          onTypeFilterChange={(t) => {
            setTypeFilter(t)
            setCurrentPage(1)
          }}
        />

        {/* Queue area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <ProposalQueueTabs
            activeTab={activeTab}
            counts={tabCounts}
            onTabChange={handleTabChange}
          />

          {/* Search & Filters */}
          <ProposalTableHeader
            searchQuery={searchQuery}
            teamMembers={teamMembers}
            onSearchChange={(q) => {
              setSearchQuery(q)
              setCurrentPage(1)
            }}
            onFilter={(f) => {
              setFilters(f)
              setCurrentPage(1)
            }}
            onExport={() => console.log('Export proposals')}
          />

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={allOnPageSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Request ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Type
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Created
                  </th>
                  {showAssignedCol && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Assigned To
                    </th>
                  )}
                  {showServiceStatusCol && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Service Status
                    </th>
                  )}
                  {showLinkedIncidentCol && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Incident
                    </th>
                  )}
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>

              <tbody>
                {paginatedProposals.length === 0 ? (
                  <tr>
                    <td colSpan={colCount} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          No proposals found
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {searchQuery
                            ? 'Try adjusting your search or filters'
                            : 'No proposals in this queue'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedProposals.map((proposal) => (
                    <ProposalRow
                      key={proposal.id}
                      proposal={proposal}
                      isSelected={selectedIds.has(proposal.id)}
                      activeTab={activeTab}
                      onSelect={(checked) => handleSelectOne(proposal.id, checked)}
                      onView={() => onView?.(proposal.id)}
                      onPickUp={() => onPickUp?.(proposal.id)}
                      onAssign={() => openModal('assign', proposal.id)}
                      onSendQuote={() => openModal('sendQuote', proposal.id)}
                      onReassign={() => openModal('reassign', proposal.id)}
                      onReject={() => openModal('reject', proposal.id)}
                      onReviseQuote={() => openModal('reviseQuote', proposal.id)}
                      onWithdraw={() => onWithdraw?.(proposal.id)}
                      onUpdateServiceStatus={() => onUpdateServiceStatus?.(proposal.id, 'in_progress')}
                      onViewIncident={() =>
                        proposal.linkedIncidentId
                          ? onViewIncident?.(proposal.linkedIncidentId)
                          : undefined
                      }
                      onReopen={() => onReopen?.(proposal.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProposals.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Bulk Actions */}
      <BulkActionsBar
        selectedCount={selectedIds.size}
        activeTab={activeTab}
        teamMembers={teamMembers}
        onClear={() => setSelectedIds(new Set())}
        onBulkAssign={(tmId) => {
          onBulkAssign?.(Array.from(selectedIds), tmId)
          setSelectedIds(new Set())
        }}
        onBulkUpdateStatus={(status) => {
          onBulkUpdateStatus?.(Array.from(selectedIds), status)
          setSelectedIds(new Set())
        }}
      />

      {/* Modals */}
      {activeModal === 'sendQuote' && modalProposal && (
        <SendQuoteModal
          proposal={modalProposal}
          onSubmit={(amount, breakdown, note) => {
            onSendQuote?.(modalProposal.id, amount, breakdown, note)
            closeModal()
          }}
          onCancel={closeModal}
        />
      )}

      {activeModal === 'reviseQuote' && modalProposal && (
        <SendQuoteModal
          proposal={modalProposal}
          isRevise
          onSubmit={(amount, breakdown, note) => {
            onReviseQuote?.(modalProposal.id, amount, breakdown, note)
            closeModal()
          }}
          onCancel={closeModal}
        />
      )}

      {activeModal === 'reject' && modalProposal && (
        <RejectModal
          proposal={modalProposal}
          onSubmit={(reason, note) => {
            onReject?.(modalProposal.id, reason, note)
            closeModal()
          }}
          onCancel={closeModal}
        />
      )}

      {activeModal === 'convert' && modalProposal && (
        <ConvertToIncidentModal
          proposal={modalProposal}
          teamMembers={teamMembers}
          onSubmit={(incidentId, serviceStatus, agentId, notes) => {
            onConvertToIncident?.(modalProposal.id, incidentId, serviceStatus, agentId, notes)
            closeModal()
          }}
          onCancel={closeModal}
        />
      )}

      {(activeModal === 'assign' || activeModal === 'reassign') && modalProposal && (
        <AssignModal
          proposal={modalProposal}
          teamMembers={teamMembers}
          isReassign={activeModal === 'reassign'}
          onSubmit={(tmId) => {
            if (activeModal === 'reassign') {
              onReassign?.(modalProposal.id, tmId)
            } else {
              onAssign?.(modalProposal.id, tmId)
            }
            closeModal()
          }}
          onCancel={closeModal}
        />
      )}
    </div>
  )
}

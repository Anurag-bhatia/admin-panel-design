import { useState, useMemo } from 'react'
import type {
  Dispute,
  DisputeStatus,
  DisputePriority,
  StageCounts,
  Reviewer,
} from '@/../product/sections/disputes/types'
import { DisputesSidebar } from './DisputesSidebar'
import { StageTabs } from './StageTabs'
import { DisputesTableHeader, type DisputeFilters } from './DisputesTableHeader'
import { DisputeRow } from './DisputeRow'
import { DisputeBulkActionsBar } from './DisputeBulkActionsBar'
import { Pagination } from './Pagination'

export interface DisputeListProps {
  disputes: Dispute[]
  stageCounts: StageCounts
  reviewers: Reviewer[]
  onViewDispute?: (id: string) => void
  onCreateDispute?: () => void
  onImportDisputes?: () => void
  onBulkUpdate?: () => void
  onAssignReviewer?: (disputeId: string, reviewerId: string) => void
  onEscalate?: (id: string) => void
  onChangePriority?: (id: string, priority: DisputePriority) => void
  onBulkAssignReviewer?: (disputeIds: string[], reviewerId: string) => void
  onBulkChangePriority?: (disputeIds: string[], priority: DisputePriority) => void
  onExport?: (disputeIds?: string[]) => void
  onSearch?: (query: string) => void
  onFilter?: (filters: DisputeFilters) => void
  onStageChange?: (stage: DisputeStatus) => void
  onPageChange?: (page: number) => void
}

export function DisputeList({
  disputes,
  stageCounts,
  reviewers,
  onViewDispute,
  onCreateDispute,
  onImportDisputes,
  onBulkUpdate,
  onAssignReviewer,
  onEscalate,
  onChangePriority,
  onBulkAssignReviewer,
  onBulkChangePriority,
  onExport,
  onSearch,
  onFilter,
  onStageChange,
  onPageChange,
}: DisputeListProps) {
  // Sidebar state
  const [sidebarView, setSidebarView] = useState<'all' | 'my'>('all')

  // Active stage
  const [activeStage, setActiveStage] = useState<DisputeStatus>('open')

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Current user name (for "My Disputes" filtering in demo)
  const currentUserName = 'Neha Kapoor'

  // Filter disputes by active stage and view
  const filteredDisputes = useMemo(() => {
    let filtered = disputes.filter((dispute) => dispute.status === activeStage)

    if (sidebarView === 'my') {
      filtered = filtered.filter((dispute) => dispute.assignedTo === currentUserName)
    }

    return filtered
  }, [disputes, activeStage, sidebarView])

  // Search filtering (client-side demo)
  const displayedDisputes = useMemo(() => {
    if (!searchQuery.trim()) return filteredDisputes

    const query = searchQuery.toLowerCase()
    return filteredDisputes.filter(
      (dispute) =>
        dispute.disputeId.toLowerCase().includes(query) ||
        dispute.subscriberName.toLowerCase().includes(query) ||
        dispute.linkedEntity.id.toLowerCase().includes(query) ||
        dispute.linkedEntity.label.toLowerCase().includes(query)
    )
  }, [filteredDisputes, searchQuery])

  const handleStageChange = (stage: DisputeStatus) => {
    setActiveStage(stage)
    setSelectedIds(new Set())
    onStageChange?.(stage)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(displayedDisputes.map((d) => d.id)))
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
    displayedDisputes.length > 0 &&
    displayedDisputes.every((d) => selectedIds.has(d.id))
  const someSelected = selectedIds.size > 0 && !allSelected

  // Compute stage counts based on view
  const displayedStageCounts = useMemo(() => {
    if (sidebarView === 'all') return stageCounts

    const myDisputes = disputes.filter((d) => d.assignedTo === currentUserName)
    return {
      open: myDisputes.filter((d) => d.status === 'open').length,
      under_review: myDisputes.filter((d) => d.status === 'under_review').length,
      escalated: myDisputes.filter((d) => d.status === 'escalated').length,
      resolved: myDisputes.filter((d) => d.status === 'resolved').length,
      rejected: myDisputes.filter((d) => d.status === 'rejected').length,
    }
  }, [sidebarView, stageCounts, disputes])

  return (
    <div className="flex h-full bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <DisputesSidebar
        view={sidebarView}
        onViewChange={(view) => {
          setSidebarView(view)
          setSelectedIds(new Set())
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Stage Tabs */}
        <StageTabs
          activeStage={activeStage}
          stageCounts={displayedStageCounts}
          onStageChange={handleStageChange}
        />

        {/* Table Header */}
        <DisputesTableHeader
          reviewers={reviewers}
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query)
            onSearch?.(query)
          }}
          onImportDisputes={onImportDisputes}
          onBulkUpdate={onBulkUpdate}
          onCreateDispute={onCreateDispute}
          onFilter={onFilter}
        />

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
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
                  Dispute ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Linked Entity
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Raised By
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Updated
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Source
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedDisputes.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
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
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <p className="font-medium">No disputes found</p>
                      <p className="text-sm">
                        {searchQuery
                          ? 'Try adjusting your search query'
                          : 'No disputes in this stage yet'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayedDisputes.map((dispute) => (
                  <DisputeRow
                    key={dispute.id}
                    dispute={dispute}
                    isSelected={selectedIds.has(dispute.id)}
                    reviewers={reviewers}
                    onSelect={(checked) => handleSelectOne(dispute.id, checked)}
                    onView={() => onViewDispute?.(dispute.id)}
                    onAssignReviewer={(reviewerId) =>
                      onAssignReviewer?.(dispute.id, reviewerId)
                    }
                    onEscalate={() => onEscalate?.(dispute.id)}
                    onChangePriority={(priority) =>
                      onChangePriority?.(dispute.id, priority)
                    }
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={displayedDisputes.length}
          itemsPerPage={25}
          onPageChange={onPageChange}
        />
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <DisputeBulkActionsBar
          selectedCount={selectedIds.size}
          reviewers={reviewers}
          onClearSelection={() => setSelectedIds(new Set())}
          onAssignReviewer={(reviewerId) =>
            onBulkAssignReviewer?.(selectedArray, reviewerId)
          }
          onChangePriority={(priority) =>
            onBulkChangePriority?.(selectedArray, priority)
          }
        />
      )}
    </div>
  )
}

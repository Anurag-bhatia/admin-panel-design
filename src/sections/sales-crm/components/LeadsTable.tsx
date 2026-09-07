import { useEffect, useMemo, useState } from 'react'
import { MoreVertical, Eye, UserPlus, Phone, Mail, MapPin, Truck, Building2, FileText, Receipt, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Lead, User } from '@/../product/sections/sales-crm/types'

interface LeadsTableProps {
  leads: Lead[]
  users: User[]
  selectedLeads?: Set<string>
  onSelectLead?: (id: string, selected: boolean) => void
  onSelectAll?: (selected: boolean) => void
  onViewLead?: (id: string) => void
  onAssignLead?: (id: string) => void
  onChangeStatus?: (leadId: string, newStatus: Lead['status']) => void
  onSendPI?: (lead: Lead) => void
  onSendInvoice?: (lead: Lead) => void
}

export function LeadsTable({
  leads,
  users,
  selectedLeads = new Set(),
  onSelectLead,
  onSelectAll,
  onViewLead,
  onAssignLead,
  onChangeStatus,
  onSendPI,
  onSendInvoice
}: LeadsTableProps) {
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const totalPages = Math.max(1, Math.ceil(leads.length / pageSize))

  useEffect(() => {
    setCurrentPage(1)
  }, [leads.length])

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return leads.slice(start, start + pageSize)
  }, [leads, currentPage, pageSize])

  const startItem = leads.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, leads.length)

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('ellipsis')
      if (totalPages > 1) pages.push(totalPages)
    }

    return pages
  }

  const getStatusBadgeClasses = (status: Lead['status']) => {
    const baseClasses = 'px-2.5 py-1 text-xs font-medium rounded-full'
    const variants: Record<Lead['status'], string> = {
      new: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      assigned: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      'follow-up': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      quotations: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      projected: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      invoiced: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
      sales: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      lost: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
      rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    }
    return `${baseClasses} ${variants[status]}`
  }

  const STATUS_LABELS: Record<Lead['status'], string> = {
    new: 'New',
    assigned: 'Assigned',
    'follow-up': 'Follow-up',
    quotations: 'Quotations',
    projected: 'Projected',
    invoiced: 'Ready to Invoice',
    sales: 'Converted',
    lost: 'Lost',
    rejected: 'Rejected',
  }

  const getUserName = (userId: string | null) => {
    if (!userId) return 'Unassigned'
    const user = users.find(u => u.id === userId)
    return user?.fullName || 'Unknown'
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">No leads found</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Try adjusting your search or filters, or add a new lead to get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-visible">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <th className="px-4 py-3 w-4">
                <input
                  type="checkbox"
                  checked={selectedLeads.size === leads.length && leads.length > 0}
                  onChange={e => onSelectAll?.(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Lead ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                POC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {paginatedLeads.map(lead => (
              <tr
                key={lead.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-4 py-4 w-4" onClick={e => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedLeads.has(lead.id)}
                    onChange={e => onSelectLead?.(lead.id, e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 cursor-pointer"
                  />
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onViewLead?.(lead.id)}
                >
                  <div className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{lead.id}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{lead.source}</div>
                </td>
                <td className="px-6 py-4 cursor-pointer" onClick={() => onViewLead?.(lead.id)}>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{lead.companyAlias}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {lead.city}, {lead.state}
                  </div>
                </td>
                <td className="px-6 py-4 cursor-pointer" onClick={() => onViewLead?.(lead.id)}>
                  <div className="text-sm text-slate-900 dark:text-white">{lead.contactPerson}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Phone className="w-3 h-3" />
                      {lead.phoneNumber.slice(0, 10)}...
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 cursor-pointer" onClick={() => onViewLead?.(lead.id)}>
                  <div className="text-sm text-slate-900 dark:text-white">{lead.type}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <Truck className="w-3 h-3" />
                    {lead.numberOfTrucks} trucks
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => onViewLead?.(lead.id)}>
                  <span className={getStatusBadgeClasses(lead.status)}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => onViewLead?.(lead.id)}>
                  <div className="text-sm text-slate-900 dark:text-white">{getUserName(lead.assignedTo)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                  <div className="relative inline-block" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenActionMenu(openActionMenu === lead.id ? null : lead.id)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>

                    {openActionMenu === lead.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onViewLead?.(lead.id)
                              setOpenActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          {onAssignLead && lead.status !== 'sales' && lead.status !== 'lost' && (
                            <button
                              onClick={() => {
                                onAssignLead(lead.id)
                                setOpenActionMenu(null)
                              }}
                              className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                            >
                              <UserPlus className="w-4 h-4" />
                              Assign Lead
                            </button>
                          )}
                          {(onSendPI || onSendInvoice) && (lead.status === 'invoiced' || lead.status === 'sales') && (
                            <>
                              <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                              {onSendPI && (
                                <button
                                  onClick={() => {
                                    onSendPI(lead)
                                    setOpenActionMenu(null)
                                  }}
                                  className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                                >
                                  <FileText className="w-4 h-4" />
                                  Send PI
                                </button>
                              )}
                              {onSendInvoice && (
                                <button
                                  onClick={() => {
                                    onSendInvoice(lead)
                                    setOpenActionMenu(null)
                                  }}
                                  className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                                >
                                  <Receipt className="w-4 h-4" />
                                  Send Invoice
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-800">
        {paginatedLeads.map(lead => (
          <div
            key={lead.id}
            onClick={() => onViewLead?.(lead.id)}
            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-1">{lead.id}</div>
                <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{lead.companyAlias}</div>
              </div>
              <span className={getStatusBadgeClasses(lead.status)}>
                {STATUS_LABELS[lead.status]}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Building2 className="w-4 h-4" />
                <span>{lead.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4" />
                <span>{lead.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>
                  {lead.city}, {lead.state}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Truck className="w-4 h-4" />
                <span>
                  {lead.type} • {lead.numberOfTrucks} trucks
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs sm:text-sm">
                <span className="text-slate-500 dark:text-slate-400">Assigned to: </span>
                <span className="text-slate-900 dark:text-white font-medium">{getUserName(lead.assignedTo)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Showing{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">{startItem}</span>{' '}
          to{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">{endItem}</span>{' '}
          of{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">{leads.length}</span>{' '}
          results
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
              currentPage === 1
                ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {getPageNumbers().map((page, index) =>
            page === 'ellipsis' ? (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 flex items-center justify-center text-slate-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
              currentPage === totalPages
                ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

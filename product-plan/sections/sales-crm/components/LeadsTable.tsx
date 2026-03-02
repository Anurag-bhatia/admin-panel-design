import { useState } from 'react'
import { MoreVertical, Eye, UserPlus, Phone, Mail, MapPin, Truck, Building2 } from 'lucide-react'
import type { Lead, User } from '../types'

interface LeadsTableProps {
  leads: Lead[]
  users: User[]
  selectedLeads?: Set<string>
  onSelectLead?: (id: string, selected: boolean) => void
  onSelectAll?: (selected: boolean) => void
  onViewLead?: (id: string) => void
  onAssignLead?: (id: string) => void
  onChangeStatus?: (leadId: string, newStatus: Lead['status']) => void
}

export function LeadsTable({
  leads,
  users,
  selectedLeads = new Set(),
  onSelectLead,
  onSelectAll,
  onViewLead,
  onAssignLead,
  onChangeStatus
}: LeadsTableProps) {
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null)

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
    }
    return `${baseClasses} ${variants[status]}`
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
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
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
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Service Type
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
            {leads.map(lead => (
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
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace('-', ' ')}
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
                          <button
                            onClick={() => {
                              onAssignLead?.(lead.id)
                              setOpenActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <UserPlus className="w-4 h-4" />
                            Assign Lead
                          </button>
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
        {leads.map(lead => (
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
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
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
    </div>
  )
}

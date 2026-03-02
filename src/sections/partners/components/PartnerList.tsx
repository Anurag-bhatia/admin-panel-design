import { useState } from 'react'
import { MoreVertical, Search } from 'lucide-react'
import type { PartnerListProps } from '@/../product/sections/partners/types'

export function PartnerList({
  partners,
  onView,
  onToggleStatus
}: PartnerListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | 'all'>('all')
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null)

  // Filter partners based on search and status
  let filtered = partners.filter(partner => {
    const matchesSearch = partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const StatusBadge = ({ status }: { status: 'active' | 'inactive' }) => {
    const isActive = status === 'active'
    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-cyan-500' : 'bg-slate-400'}`} />
        {isActive ? 'Active' : 'Inactive'}
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">No partners found</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Controls Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search partners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 text-sm"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex gap-1.5">
            {(['all', 'active', 'inactive'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
                  statusFilter === status
                    ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Partner ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Subscribers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filtered.map((partner) => (
              <tr
                key={partner.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{partner.companyName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{partner.firstName} {partner.lastName}</p>
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400">{partner.partnerId}</p>
                </td>
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-white">{partner.mobile}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{partner.email}</p>
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{partner.linkedSubscribers.length}</p>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <StatusBadge status={partner.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenActionMenu(openActionMenu === partner.id ? null : partner.id)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>

                    {openActionMenu === partner.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onView?.(partner.id)
                              setOpenActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            View/Edit Details
                          </button>
                          <button
                            onClick={() => {
                              onToggleStatus?.(partner.id, partner.status === 'active' ? 'inactive' : 'active')
                              setOpenActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            {partner.status === 'active' ? 'Deactivate' : 'Activate'}
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
        {filtered.map(partner => (
          <div
            key={partner.id}
            onClick={() => onView?.(partner.id)}
            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-1">{partner.partnerId}</div>
                <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{partner.companyName}</div>
              </div>
              <StatusBadge status={partner.status} />
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-white">{partner.firstName} {partner.lastName}</span>
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                {partner.mobile}
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                {partner.linkedSubscribers.length} subscribers
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

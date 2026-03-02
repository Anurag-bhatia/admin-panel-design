import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Edit, Power, Users as UsersIcon } from 'lucide-react'
import type { Team, Employee } from '@/../product/sections/team/types'

interface TeamsTableProps {
  teams: Team[]
  employees: Employee[]
  onViewTeam?: (id: string) => void
  onEditTeam?: (id: string) => void
  onToggleTeamStatus?: (id: string) => void
}

interface ActionsMenuProps {
  teamId: string
  teamStatus: 'active' | 'inactive'
  onEdit?: () => void
  onToggleStatus?: () => void
}

function ActionsMenu({ teamId, teamStatus, onEdit, onToggleStatus }: ActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-10">
          <button
            onClick={() => {
              onEdit?.()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Team</span>
          </button>
          <button
            onClick={() => {
              onToggleStatus?.()
              setIsOpen(false)
            }}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              teamStatus === 'active'
                ? 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{teamStatus === 'active' ? 'Deactivate' : 'Activate'}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export function TeamsTable({
  teams,
  employees,
  onViewTeam,
  onEditTeam,
  onToggleTeamStatus,
}: TeamsTableProps) {
  // Helper function to get team lead name
  const getTeamLeadName = (leadId: string) => {
    const lead = employees.find((emp) => emp.id === leadId)
    return lead ? lead.fullName : 'N/A'
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Team Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Team Lead
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Members
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {teams.map((team) => (
                <tr
                  key={team.id}
                  onClick={() => onViewTeam?.(team.id)}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                    team.status === 'inactive' ? 'opacity-60' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                        <UsersIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {team.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {team.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {getTeamLeadName(team.teamLead)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {team.memberCount}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        member{team.memberCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {team.status === 'active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <ActionsMenu
                      teamId={team.id}
                      teamStatus={team.status}
                      onEdit={() => onEditTeam?.(team.id)}
                      onToggleStatus={() => onToggleTeamStatus?.(team.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-800">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => onViewTeam?.(team.id)}
              className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                team.status === 'inactive' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                    <UsersIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      {team.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {team.department}
                    </div>
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <ActionsMenu
                    teamId={team.id}
                    teamStatus={team.status}
                    onEdit={() => onEditTeam?.(team.id)}
                    onToggleStatus={() => onToggleTeamStatus?.(team.id)}
                  />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Team Lead</span>
                  <span className="text-slate-900 dark:text-white">
                    {getTeamLeadName(team.teamLead)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Members</span>
                  <span className="text-slate-900 dark:text-white">
                    {team.memberCount} member{team.memberCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Status</span>
                  {team.status === 'active' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

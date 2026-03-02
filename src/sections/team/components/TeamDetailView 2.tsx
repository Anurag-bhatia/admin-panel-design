import { ArrowLeft, Edit, Power, Users as UsersIcon } from 'lucide-react'
import type { Team, Employee } from '@/../product/sections/team/types'

interface TeamDetailViewProps {
  team: Team
  employees: Employee[]
  onBack?: () => void
  onEdit?: () => void
  onToggleStatus?: () => void
}

export function TeamDetailView({
  team,
  employees,
  onBack,
  onEdit,
  onToggleStatus,
}: TeamDetailViewProps) {
  // Get team lead info
  const teamLead = employees.find(emp => emp.id === team.teamLead)

  // Get team members info
  const teamMembers = employees.filter(emp => team.members.includes(emp.id))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Team Details
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {team.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {team.department}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={onEdit}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors text-sm"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Team</span>
              </button>
              <button
                onClick={onToggleStatus}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  team.status === 'active'
                    ? 'bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-400'
                    : 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{team.status === 'active' ? 'Deactivate' : 'Activate'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Team Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Status Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Status
            </div>
            <div className="flex items-center gap-2">
              {team.status === 'active' ? (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400">
                  Inactive
                </span>
              )}
            </div>
          </div>

          {/* Members Count Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Total Members
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {team.memberCount}
            </div>
          </div>

          {/* Department Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Department
            </div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {team.department}
            </div>
          </div>
        </div>

        {/* Team Lead Section */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Team Lead
          </h3>
          {teamLead ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                {teamLead.profilePicture ? (
                  <img
                    src={teamLead.profilePicture}
                    alt={teamLead.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                    {teamLead.firstName[0]}
                    {teamLead.lastName[0]}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 dark:text-white">
                  {teamLead.fullName}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {teamLead.designation} • {teamLead.department}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-500">
                  {teamLead.email}
                </div>
              </div>
              {teamLead.status === 'inactive' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400">
                  Inactive
                </span>
              )}
            </div>
          ) : (
            <div className="text-slate-500 dark:text-slate-400">
              Team lead not found
            </div>
          )}
        </div>

        {/* Team Members Section */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Team Members ({teamMembers.length})
          </h3>

          {teamMembers.length > 0 ? (
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                    {member.profilePicture ? (
                      <img
                        src={member.profilePicture}
                        alt={member.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 dark:text-white truncate">
                      {member.fullName}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 truncate">
                      {member.designation}
                    </div>
                  </div>
                  {member.status === 'inactive' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400 flex-shrink-0">
                      Inactive
                    </span>
                  )}
                  {team.teamLead === member.id && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 flex-shrink-0">
                      Lead
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-500 dark:text-slate-400">
              No team members
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { X, Check } from 'lucide-react'
import type { Team, Employee } from '@/../product/sections/team/types'

interface EditTeamModalProps {
  team: Team
  departments: string[]
  employees: Employee[]
  onSave: (data: Partial<Team>) => void
  onClose: () => void
}

export function EditTeamModal({
  team,
  departments,
  employees,
  onSave,
  onClose,
}: EditTeamModalProps) {
  const [formData, setFormData] = useState({
    name: team.name,
    department: team.department,
    teamLead: team.teamLead,
    members: [...team.members],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: formData.name,
      department: formData.department,
      teamLead: formData.teamLead,
      members: formData.members,
      memberCount: formData.members.length,
    })
  }

  const toggleMember = (employeeId: string) => {
    if (formData.members.includes(employeeId)) {
      setFormData({
        ...formData,
        members: formData.members.filter(id => id !== employeeId),
      })
    } else {
      setFormData({
        ...formData,
        members: [...formData.members, employeeId],
      })
    }
  }

  const filteredEmployees = formData.department
    ? employees.filter(emp => emp.department === formData.department)
    : employees

  return (
    <div className="fixed inset-0 bg-zinc-950/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Edit Team
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Team Lead */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Team Lead
              </label>
              <select
                value={formData.teamLead}
                onChange={(e) => {
                  const leadId = e.target.value
                  setFormData({
                    ...formData,
                    teamLead: leadId,
                    members: leadId && !formData.members.includes(leadId)
                      ? [...formData.members, leadId]
                      : formData.members,
                  })
                }}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
              >
                {filteredEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.fullName} - {emp.designation}</option>
                ))}
              </select>
            </div>

            {/* Team Members */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Team Members
              </label>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg max-h-48 overflow-y-auto">
                {filteredEmployees.map(emp => {
                  const isSelected = formData.members.includes(emp.id)
                  const isTeamLead = formData.teamLead === emp.id
                  return (
                    <button
                      key={emp.id}
                      type="button"
                      onClick={() => !isTeamLead && toggleMember(emp.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 last:border-0 transition-colors ${
                        isSelected
                          ? 'bg-cyan-50 dark:bg-cyan-900/20'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      } ${isTeamLead ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      disabled={isTeamLead}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${
                          isSelected ? 'bg-cyan-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {emp.fullName}
                            {isTeamLead && (
                              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">
                                Lead
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {emp.designation}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {formData.members.length} member{formData.members.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

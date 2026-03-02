import { useState } from 'react'
import { MoreVertical, Eye, Edit2, UserX, UserCheck, Mail, Phone } from 'lucide-react'
import type { Lawyer } from '@/../product/sections/lawyers/types'

interface LawyerRowProps {
  lawyer: Lawyer
  onView?: () => void
  onEdit?: () => void
  onDeactivate?: () => void
  onReactivate?: () => void
  onViewDocument?: (documentType: string) => void
}

export function LawyerRow({
  lawyer,
  onView,
  onEdit,
  onDeactivate,
  onReactivate,
}: LawyerRowProps) {
  const [showActions, setShowActions] = useState(false)

  const isActive = lawyer.activityState === 'Active'
  const fullName = `${lawyer.firstName} ${lawyer.lastName}`

  return (
    <div className="lg:grid lg:grid-cols-[80px_120px_1fr_200px_140px_140px_140px_100px_60px] gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
      {/* Photo */}
      <div className="flex lg:block items-center gap-4 mb-4 lg:mb-0">
        <div className="relative">
          <img
            src={lawyer.photo}
            alt={fullName}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-cyan-500 dark:group-hover:ring-cyan-500 transition-all"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 ${
              isActive ? 'bg-emerald-500' : 'bg-slate-400'
            }`}
          />
        </div>

        {/* Mobile: Show name next to photo */}
        <div className="lg:hidden flex-1">
          <div className="font-semibold text-slate-900 dark:text-white">{fullName}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-mono">
            {lawyer.lawyerId}
          </div>
        </div>

        {/* Mobile: Actions */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          {showActions && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowActions(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                <button
                  onClick={() => {
                    onView?.()
                    setShowActions(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Profile
                </button>
                <button
                  onClick={() => {
                    onEdit?.()
                    setShowActions(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                {isActive ? (
                  <button
                    onClick={() => {
                      onDeactivate?.()
                      setShowActions(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    <UserX className="w-4 h-4" />
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onReactivate?.()
                      setShowActions(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                  >
                    <UserCheck className="w-4 h-4" />
                    Reactivate
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lawyer ID - Desktop only */}
      <div className="hidden lg:flex items-center">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
          {lawyer.lawyerId}
        </span>
      </div>

      {/* Name & Contact - Desktop only */}
      <div className="hidden lg:block">
        <div className="font-semibold text-slate-900 dark:text-white mb-1">{fullName}</div>
        <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{lawyer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{lawyer.mobile}</span>
          </div>
        </div>
      </div>

      {/* Mobile: Contact Info */}
      <div className="lg:hidden mb-4 space-y-1 text-sm">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{lawyer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{lawyer.mobile}</span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-3 lg:mb-0 lg:flex lg:items-center">
        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-white mb-0.5">
            {lawyer.category}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-500">{lawyer.subCategory}</div>
        </div>
      </div>

      {/* Onboarding Status */}
      <div className="mb-3 lg:mb-0 lg:flex lg:items-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            lawyer.onboardingStatus === 'Complete'
              ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-600/20'
              : 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 ring-1 ring-amber-600/20'
          }`}
        >
          {lawyer.onboardingStatus}
        </span>
      </div>

      {/* KYC Status */}
      <div className="mb-3 lg:mb-0 lg:flex lg:items-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            lawyer.kycStatus === 'Verified'
              ? 'bg-cyan-100 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 ring-1 ring-cyan-600/20'
              : lawyer.kycStatus === 'Pending'
              ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 ring-1 ring-amber-600/20'
              : 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 ring-1 ring-red-600/20'
          }`}
        >
          {lawyer.kycStatus}
        </span>
      </div>

      {/* Activity State */}
      <div className="mb-3 lg:mb-0 lg:flex lg:items-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            isActive
              ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-600/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ring-1 ring-slate-600/20'
          }`}
        >
          {lawyer.activityState}
        </span>
      </div>

      {/* Source */}
      <div className="mb-3 lg:mb-0 lg:flex lg:items-center">
        <span className="text-sm text-slate-600 dark:text-slate-400">{lawyer.source}</span>
      </div>

      {/* Actions - Desktop only */}
      <div className="hidden lg:flex items-center justify-end relative">
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        {showActions && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowActions(false)}
            />
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
              <button
                onClick={() => {
                  onView?.()
                  setShowActions(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Profile
              </button>
              <button
                onClick={() => {
                  onEdit?.()
                  setShowActions(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              {isActive ? (
                <button
                  onClick={() => {
                    onDeactivate?.()
                    setShowActions(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <UserX className="w-4 h-4" />
                  Deactivate
                </button>
              ) : (
                <button
                  onClick={() => {
                    onReactivate?.()
                    setShowActions(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                  Reactivate
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

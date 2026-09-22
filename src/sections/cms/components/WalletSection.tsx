import { useEffect, useRef, useState } from 'react'
import { Shield, ChevronDown, Check } from 'lucide-react'
import type {
  Programme,
  AuditLogEntry,
  CustomerCredit,
  WalletPermission,
  WalletPermissions,
} from '@/../product/sections/cms/types'
import {
  defaultWalletPermissions,
  walletPermissionLabels,
} from '@/../product/sections/cms/types'
import { ProgrammeList } from './ProgrammeList'
import { WalletDashboard } from './WalletDashboard'
import { CustomerCreditView } from './CustomerCreditView'
import { WalletAuditLog } from './WalletAuditLog'

export type WalletTab = 'programmes' | 'dashboard' | 'customer-credit' | 'audit-log'

interface WalletSectionProps {
  programmes: Programme[]
  auditLog: AuditLogEntry[]
  customerCredits: CustomerCredit[]
  onCreateProgramme: () => void
  onEditProgramme: (id: string) => void
  onViewProgramme: (id: string) => void
}

interface Tab {
  id: WalletTab
  label: string
  requires?: WalletPermission
}

const tabs: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', requires: 'viewReports' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'customer-credit', label: 'Customer Credit', requires: 'viewCustomerCredit' },
  { id: 'audit-log', label: 'Audit Log', requires: 'viewAuditLog' },
]

export function WalletSection({
  programmes,
  auditLog,
  customerCredits,
  onCreateProgramme,
  onEditProgramme,
  onViewProgramme,
}: WalletSectionProps) {
  const [activeTab, setActiveTab] = useState<WalletTab>('dashboard')
  const [permissions, setPermissions] = useState<WalletPermissions>(defaultWalletPermissions)

  const visibleTabs = tabs.filter((t) => !t.requires || permissions[t.requires])

  useEffect(() => {
    if (!visibleTabs.some((t) => t.id === activeTab)) {
      setActiveTab(visibleTabs[0]?.id ?? 'programmes')
    }
  }, [visibleTabs, activeTab])

  return (
    <div>
      <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-700 mb-6 -mt-1">
        <div className="flex items-center gap-1">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium relative transition-colors ${
                  isActive
                    ? 'text-cyan-700 dark:text-cyan-300'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 rounded-t" />
                )}
              </button>
            )
          })}
        </div>

        <div className="pb-2">
          <PermissionPreview permissions={permissions} onChange={setPermissions} />
        </div>
      </div>

      {activeTab === 'programmes' && (
        <ProgrammeList
          programmes={programmes}
          permissions={permissions}
          onCreate={onCreateProgramme}
          onView={onViewProgramme}
          onEdit={onEditProgramme}
          onPauseIssuing={(id) => console.log('Pause issuing:', id)}
          onPauseRedemption={(id) => console.log('Pause redemption:', id)}
          onResume={(id) => console.log('Resume programme:', id)}
          onArchive={(id) => console.log('Archive programme:', id)}
          onClone={(id) => console.log('Clone programme:', id)}
          onSearch={(query) => console.log('Search programmes:', query)}
        />
      )}

      {activeTab === 'dashboard' && permissions.viewReports && (
        <WalletDashboard programmes={programmes} />
      )}

      {activeTab === 'customer-credit' && permissions.viewCustomerCredit && (
        <CustomerCreditView customerCredits={customerCredits} permissions={permissions} />
      )}

      {activeTab === 'audit-log' && permissions.viewAuditLog && (
        <WalletAuditLog entries={auditLog} permissions={permissions} />
      )}
    </div>
  )
}

function PermissionPreview({
  permissions,
  onChange,
}: {
  permissions: WalletPermissions
  onChange: (p: WalletPermissions) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const grantedCount = Object.values(permissions).filter(Boolean).length
  const totalCount = Object.keys(permissions).length

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
          open
            ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <Shield className="w-3.5 h-3.5" />
        Preview permissions ({grantedCount}/{totalCount})
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-30">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Actions granted to this user
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {(Object.keys(walletPermissionLabels) as WalletPermission[]).map((p) => {
              const checked = permissions[p]
              return (
                <button
                  key={p}
                  onClick={() => onChange({ ...permissions, [p]: !checked })}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>{walletPermissionLabels[p]}</span>
                  <div
                    className={`inline-flex items-center justify-center w-4 h-4 rounded border ${
                      checked
                        ? 'bg-cyan-600 border-cyan-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3" strokeWidth={3} />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

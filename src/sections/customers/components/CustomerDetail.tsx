import { useState } from 'react'
import { ArrowLeft, Car, AlertCircle, FileText, User } from 'lucide-react'
import type {
  Customer,
  Vehicle,
  Incident,
  Challan,
} from '@/../product/sections/customers/types'

type TabType = 'details' | 'incidents' | 'challans'

interface CustomerDetailProps {
  customer: Customer
  vehicles: Vehicle[]
  incidents: Incident[]
  challans: Challan[]
  onBack?: () => void
  onViewIncident?: (incidentId: string) => void
  onViewChallan?: (challanId: string) => void
}

const TABS: { key: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'details', label: 'Details', icon: User },
  { key: 'incidents', label: 'Incidents', icon: AlertCircle },
  { key: 'challans', label: 'Challans', icon: FileText },
]

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-5">
      {children}
    </h3>
  )
}

function InfoField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-sm text-slate-900 dark:text-slate-100">{value ?? '—'}</p>
    </div>
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string) {
  const d = new Date(dateString)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  assigned: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  'in-progress': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  'in-review': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  resolved: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  paid: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  dismissed: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  refunded: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
}

export function CustomerDetail({
  customer,
  vehicles,
  incidents,
  challans,
  onBack,
  onViewIncident,
  onViewChallan,
}: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
                {customer.name}
              </h1>
              <span
                className={`inline-flex px-3 py-1.5 text-xs font-medium rounded-full ${
                  customer.paymentStatus === 'paid'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                }`}
              >
                {customer.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Customer ID: {customer.customerId}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Customer Information */}
            <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-8">
                Customer Information
              </h2>

              <div className="mb-8">
                <SectionHeader>Basic Info</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <InfoField label="Full Name" value={customer.name} />
                  <InfoField label="Customer ID" value={customer.customerId} />
                  <InfoField label="Email" value={customer.email} />
                  <InfoField label="Mobile" value={customer.mobile} />
                  <InfoField
                    label="Account Created"
                    value={formatDate(customer.accountCreatedDate)}
                  />
                  <InfoField
                    label="Last Activity"
                    value={formatDate(customer.lastActivity)}
                  />
                </div>
              </div>

              <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />

              <div className="mb-8">
                <SectionHeader>Financial Summary</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6">
                  <InfoField
                    label="Total Spend"
                    value={formatCurrency(customer.financialSummary.totalSpend)}
                  />
                  <InfoField
                    label="Paid"
                    value={formatCurrency(customer.financialSummary.paidAmount)}
                  />
                  <InfoField
                    label="Pending"
                    value={formatCurrency(customer.financialSummary.pendingPayments)}
                  />
                  <InfoField
                    label="Refunded"
                    value={formatCurrency(customer.financialSummary.refundsIssued)}
                  />
                  <InfoField
                    label="Pledge Reward"
                    value={formatCurrency(customer.financialSummary.pledgeReward ?? 0)}
                  />
                </div>
              </div>

              <div className="border-t border-slate-200/60 dark:border-slate-700/60 mb-8" />

              <div>
                <SectionHeader>Vehicles ({vehicles.length})</SectionHeader>
                {vehicles.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No vehicles registered
                  </p>
                ) : (
                  <div className="space-y-2">
                    {vehicles.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                      >
                        <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <Car className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {v.vehicleNumber}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {v.make} {v.model} · {v.vehicleType}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded ${
                            v.status === 'active'
                              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {v.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Incidents ({incidents.length})
            </h2>
            {incidents.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No incidents for this customer
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Incident ID
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Vehicle
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Type
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Status
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidents.map((inc) => (
                      <tr
                        key={inc.id}
                        onClick={() => onViewIncident?.(inc.id)}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                      >
                        <td className="px-3 py-3 text-sm font-medium text-slate-900 dark:text-white">
                          {inc.incidentId}
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
                          {inc.vehicleNumber}
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
                          {inc.incidentType}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              STATUS_BADGE[inc.status] ??
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {inc.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(inc.createdDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Challans Tab */}
        {activeTab === 'challans' && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Challans ({challans.length})
            </h2>
            {challans.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No challans for this customer
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Challan ID
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Vehicle
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Type
                      </th>
                      <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Amount
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Payment
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Issued
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {challans.map((ch) => (
                      <tr
                        key={ch.id}
                        onClick={() => onViewChallan?.(ch.id)}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                      >
                        <td className="px-3 py-3 text-sm font-medium text-slate-900 dark:text-white">
                          {ch.challanId}
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
                          {ch.vehicleNumber}
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
                          {ch.challanType}
                        </td>
                        <td className="px-3 py-3 text-sm text-right font-medium text-slate-900 dark:text-white">
                          {formatCurrency(ch.amount)}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              STATUS_BADGE[ch.paymentStatus] ??
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {ch.paymentStatus}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(ch.issuedDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

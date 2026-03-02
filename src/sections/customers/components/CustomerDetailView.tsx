import { useState } from 'react'
import { ArrowLeft, User, AlertCircle, FileText, Car, Wallet, Clock } from 'lucide-react'
import type { Customer, Vehicle, Incident, Challan, ActivityLog } from '@/../product/sections/customers/types'

type TabType = 'details' | 'incidents' | 'challans' | 'vehicles' | 'financials' | 'activity'

interface CustomerDetailViewProps {
  customer: Customer
  vehicles: Vehicle[]
  incidents: Incident[]
  challans: Challan[]
  activityLogs: ActivityLog[]
  onBack?: () => void
  onEdit?: (customerId: string) => void
  onCreateIncident?: (customerId: string) => void
  onViewIncident?: (incidentId: string) => void
  onViewChallan?: (challanId: string) => void
  onViewVehicle?: (vehicleId: string) => void
}

export function CustomerDetailView({
  customer,
  vehicles,
  incidents,
  challans,
  activityLogs,
  onBack,
  onEdit,
  onCreateIncident,
  onViewIncident,
  onViewChallan,
  onViewVehicle
}: CustomerDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getPaymentStatusBadge = (status: Customer['paymentStatus']) => {
    const styles = {
      paid: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      pending: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      overdue: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
    }
    return styles[status]
  }

  const getTabIcon = (tab: TabType) => {
    const icons = {
      details: <User className="w-4 h-4" />,
      incidents: <AlertCircle className="w-4 h-4" />,
      challans: <FileText className="w-4 h-4" />,
      vehicles: <Car className="w-4 h-4" />,
      financials: <Wallet className="w-4 h-4" />,
      activity: <Clock className="w-4 h-4" />
    }
    return icons[tab]
  }

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
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{customer.name}</h1>
              <span className={`inline-flex px-3 py-1.5 text-xs font-medium rounded-full ${getPaymentStatusBadge(customer.paymentStatus)}`}>
                {customer.paymentStatus.charAt(0).toUpperCase() + customer.paymentStatus.slice(1)}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Customer ID: {customer.customerId}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onCreateIncident?.(customer.id)}
              className="px-4 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              Create Incident
            </button>
            <button
              onClick={() => onEdit?.(customer.id)}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              Edit Details
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 -mx-6 lg:-mx-8 px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit min-w-full">
            {(['details', 'incidents', 'challans', 'vehicles', 'financials', 'activity'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-2 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {getTabIcon(tab)}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <InfoField label="Full Name" value={customer.name} />
                    <InfoField label="Email" value={customer.email} />
                    <InfoField label="Mobile" value={customer.mobile} />
                    <InfoField label="Customer ID" value={customer.customerId} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <InfoField label="Account Created" value={formatDate(customer.accountCreatedDate)} />
                    <InfoField label="Last Activity" value={formatDate(customer.lastActivity)} />
                    <InfoField label="Total Vehicles" value={customer.totalVehicles.toString()} />
                    <InfoField label="Total Incidents" value={customer.totalIncidents.toString()} />
                    <InfoField label="Payment Status" value={customer.paymentStatus} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Linked Incidents ({incidents.length})</h2>
              {incidents.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No incidents linked to this customer yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Incident ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Vehicle</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {incidents.map((incident) => (
                        <tr key={incident.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{incident.incidentId}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{incident.vehicleNumber}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                              incident.status === 'resolved' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                              incident.status === 'in-progress' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                              incident.status === 'pending' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' :
                              'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            }`}>
                              {incident.status.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{formatDate(incident.createdDate)}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => onViewIncident?.(incident.id)}
                              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                              View Details
                            </button>
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
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Challans</h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">{challans.length} total</span>
              </div>
              {challans.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">No challans yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {challans.map((challan) => (
                    <div
                      key={challan.id}
                      onClick={() => onViewChallan?.(challan.id)}
                      className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-slate-900 dark:text-white">{challan.challanId}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              challan.paymentStatus === 'paid' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                              challan.paymentStatus === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                              challan.paymentStatus === 'overdue' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' :
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {challan.paymentStatus}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p>{challan.challanType} • {challan.vehicleNumber}</p>
                            <p className="mt-1">Resolution: {challan.resolutionState}</p>
                          </div>
                          <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                            Issued: {formatDate(challan.issuedDate)} • Due: {formatDate(challan.dueDate)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(challan.amount)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Vehicles</h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">{vehicles.length} total</span>
              </div>
              {vehicles.length === 0 ? (
                <div className="text-center py-12">
                  <Car className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">No vehicles yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      onClick={() => onViewVehicle?.(vehicle.id)}
                      className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                          <Car className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 dark:text-white mb-1">{vehicle.vehicleNumber}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p>{vehicle.make} {vehicle.model}</p>
                            <p className="mt-1">{vehicle.vehicleType}</p>
                          </div>
                          <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                            Registered: {formatDate(vehicle.registrationDate)}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          vehicle.status === 'active'
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Financials Tab */}
          {activeTab === 'financials' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Financial Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Spend</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(customer.financialSummary.totalSpend)}</div>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                  <div className="text-sm text-amber-700 dark:text-amber-400 mb-1">Pending Payments</div>
                  <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">{formatCurrency(customer.financialSummary.pendingPayments)}</div>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                  <div className="text-sm text-emerald-700 dark:text-emerald-400 mb-1">Paid Amount</div>
                  <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{formatCurrency(customer.financialSummary.paidAmount)}</div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">Refunds Issued</div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{formatCurrency(customer.financialSummary.refundsIssued)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Activity Log</h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">{activityLogs.length} activities</span>
              </div>
              {activityLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">No activity yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activityLogs.map((log, index) => (
                    <div key={log.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="flex-1 pb-4 border-b border-slate-200 dark:border-slate-800 last:border-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">{log.action}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{log.description}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                              by {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</div>
      <div className="text-sm text-slate-900 dark:text-white">{value}</div>
    </div>
  )
}

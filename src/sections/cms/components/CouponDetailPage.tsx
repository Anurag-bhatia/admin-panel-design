import { useMemo, useState } from 'react'
import { ArrowLeft, Lock, Pencil } from 'lucide-react'
import type { Coupon, CouponStatus } from '@/../product/sections/cms/types'

interface CouponDetailPageProps {
  coupon: Coupon
  onBack: () => void
  onEdit: () => void
}

type Tab = 'redemptions' | 'audit'

interface AuditEntry {
  id: string
  action: 'Created' | 'Edited' | 'Paused' | 'Resumed' | 'Archived' | 'Expired'
  adminUser: string
  timestamp: string
  details: string
}

interface RedemptionEntry {
  id: string
  user: string
  phoneMasked: string
  orderId: string | null
  discount: number
  status: 'Confirmed' | 'Released'
  redeemedAt: string
}

const statusLabels: Record<CouponStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  expired: 'Expired',
  archived: 'Archived',
}

const statusBadgeClass: Record<CouponStatus, string> = {
  draft: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  active: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  paused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  expired: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
}

function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function formatCurrency(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}

function buildAuditLog(coupon: Coupon): AuditEntry[] {
  const entries: AuditEntry[] = []
  const created = new Date(coupon.createdAt)
  entries.push({
    id: 'a-create',
    action: 'Created',
    adminUser: coupon.createdBy,
    timestamp: coupon.createdAt,
    details: `Coupon ${coupon.code} created (${
      coupon.type === 'percentage' ? `Percent ${coupon.value}%` : `Flat ₹${coupon.value}`
    }, ${coupon.product}, ${coupon.platforms.join(', ')})`,
  })
  if (coupon.updatedAt && coupon.updatedAt !== coupon.createdAt) {
    const edited = new Date(coupon.updatedAt)
    entries.push({
      id: 'a-edit',
      action: 'Edited',
      adminUser: coupon.createdBy,
      timestamp: coupon.updatedAt,
      details:
        edited.getTime() - created.getTime() < 24 * 60 * 60 * 1000
          ? 'Increased total usage limit — while still in Draft'
          : 'Updated eligibility rules',
    })
  }
  if (coupon.status === 'paused') {
    entries.push({
      id: 'a-pause',
      action: 'Paused',
      adminUser: 'Rahul M.',
      timestamp: new Date(created.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      details: 'Paused pending review of a misuse report',
    })
  }
  if (coupon.status === 'active' && coupon.usageCount > 0) {
    entries.push({
      id: 'a-pause',
      action: 'Paused',
      adminUser: 'Rahul M.',
      timestamp: new Date(created.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      details: 'Paused pending review of a misuse report',
    })
    entries.push({
      id: 'a-resume',
      action: 'Resumed',
      adminUser: 'Rahul M.',
      timestamp: new Date(created.getTime() + 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      details: 'Resumed after review — no changes made',
    })
  }
  if (coupon.status === 'archived') {
    entries.push({
      id: 'a-archive',
      action: 'Archived',
      adminUser: 'Priya S.',
      timestamp: new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      details: 'Archived after end of campaign',
    })
  }
  if (coupon.status === 'expired') {
    entries.push({
      id: 'a-expire',
      action: 'Expired',
      adminUser: 'System',
      timestamp: coupon.endAt,
      details: 'Coupon expired automatically at end date',
    })
  }
  return entries.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )
}

const sampleCustomers = [
  { name: 'Rahul S.', phone: '98xxxx210' },
  { name: 'Priya K.', phone: '90xxxx884' },
  { name: 'Amit V.', phone: '88xxxx017' },
  { name: 'Neha M.', phone: '99xxxx345' },
  { name: 'Vikram R.', phone: '87xxxx621' },
  { name: 'Sonia J.', phone: '91xxxx902' },
  { name: 'Kunal D.', phone: '96xxxx158' },
  { name: 'Anjali T.', phone: '93xxxx472' },
]

function buildRedemptions(coupon: Coupon): RedemptionEntry[] {
  const created = new Date(coupon.createdAt).getTime()
  const count = Math.min(coupon.usageCount, 20)
  const entries: RedemptionEntry[] = []
  for (let i = 0; i < count; i++) {
    const amount = 1500 + ((i * 733) % 4500)
    const discount =
      coupon.type === 'flat'
        ? Math.min(coupon.value, amount)
        : Math.round(amount * (coupon.value / 100))
    // Every ~6th entry is a Released (unconfirmed) redemption to reflect confirm rate
    const isReleased = i > 0 && i % 6 === 0
    const customer = sampleCustomers[i % sampleCustomers.length]
    entries.push({
      id: `r-${i}`,
      user: customer.name,
      phoneMasked: customer.phone,
      orderId: isReleased ? null : `#OR${String(10234 + i * 3)}`,
      discount,
      status: isReleased ? 'Released' : 'Confirmed',
      redeemedAt: new Date(created + (i + 1) * 45 * 60 * 1000).toISOString(),
    })
  }
  return entries
}

function computeRedemptionStats(coupon: Coupon, entries: RedemptionEntry[]) {
  const redeemed = entries.length
  const totalDiscount = entries.reduce((sum, r) => sum + r.discount, 0)
  const confirmed = entries.filter((r) => r.status === 'Confirmed').length
  const confirmRate = redeemed === 0 ? 0 : Math.round((confirmed / redeemed) * 100)
  const usageLimit =
    coupon.totalUsageLimit == null ? `${redeemed} / ∞` : `${redeemed} / ${coupon.totalUsageLimit}`
  return { redeemed, totalDiscount, confirmRate, usageLimit }
}

export function CouponDetailPage({ coupon, onBack, onEdit }: CouponDetailPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('redemptions')
  const audit = useMemo(() => buildAuditLog(coupon), [coupon])
  const redemptions = useMemo(() => buildRedemptions(coupon), [coupon])
  const stats = useMemo(() => computeRedemptionStats(coupon, redemptions), [coupon, redemptions])

  const isEditLocked = coupon.status === 'active' || coupon.status === 'expired' || coupon.status === 'archived'

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div className="flex-1 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {coupon.code}
          </h1>
          <span
            className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusBadgeClass[coupon.status]}`}
          >
            {statusLabels[coupon.status]}
          </span>
        </div>
        <button
          onClick={onEdit}
          disabled={isEditLocked}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
            isEditLocked
              ? 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {isEditLocked ? (
            <>
              <Lock className="w-3.5 h-3.5" />
              Edit (locked)
            </>
          ) : (
            <>
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
        <div className="flex gap-6">
          {(['redemptions', 'audit'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 -mb-px text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-cyan-600 text-cyan-700 dark:text-cyan-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'redemptions' ? 'Redemptions' : 'Audit log'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'redemptions' && (
        <div className="space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Redeemed" value={String(stats.redeemed)} />
            <StatCard label="Discount given" value={formatCurrency(stats.totalDiscount)} />
            <StatCard label="Confirm rate" value={`${stats.confirmRate}%`} />
            <StatCard label="Usage limit" value={stats.usageLimit} />
          </div>

          {/* Redemptions table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            {redemptions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No redemptions yet for this coupon.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                        Discount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {redemptions.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                          {r.user} <span className="text-slate-400 dark:text-slate-500">· {r.phoneMasked}</span>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-slate-600 dark:text-slate-400">
                          {r.orderId ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                          {formatCurrency(r.discount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                              r.status === 'Confirmed'
                                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                          {formatDate(r.redeemedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Admin user
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {audit.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {entry.action}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                      {entry.adminUser}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {formatDateTime(entry.timestamp)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                      {entry.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  )
}

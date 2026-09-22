import { useMemo, useState } from 'react'
import { Search, Phone, Car, Download, ArrowLeft } from 'lucide-react'
import type {
  CreditHistoryEntryType,
  CreditLotSource,
  CustomerCredit,
  WalletPermissions,
} from '@/../product/sections/cms/types'
import { defaultWalletPermissions } from '@/../product/sections/cms/types'

interface CustomerCreditViewProps {
  customerCredits: CustomerCredit[]
  permissions?: WalletPermissions
}

const sourceLabels: Record<CreditLotSource, string> = {
  firstTimeCheck: 'First-time check',
  postPaymentReward: 'Post-payment reward',
  influencer: 'Influencer',
  corporate: 'Corporate',
  specificCustomers: 'Specific customer',
  couponConversion: 'Coupon conversion',
}

const entryTypeLabels: Record<CreditHistoryEntryType, string> = {
  issue: 'Issue',
  reservation: 'Reservation',
  use: 'Use',
  release: 'Release',
  expiry: 'Expiry',
  reversal: 'Reversal',
}

const entryTypeBadge: Record<CreditHistoryEntryType, string> = {
  issue: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  reservation: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  use: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  release: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  expiry: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  reversal: 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCoins(n: number): string {
  return n.toLocaleString('en-IN')
}

export function CustomerCreditView({ customerCredits, permissions = defaultWalletPermissions }: CustomerCreditViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMobile, setSelectedMobile] = useState<string | null>(null)
  const [entryTypeFilter, setEntryTypeFilter] = useState<CreditHistoryEntryType | 'all'>('all')

  const selected = useMemo(
    () => customerCredits.find((c) => c.mobileNumber === selectedMobile),
    [customerCredits, selectedMobile],
  )

  const searchResults = useMemo(() => {
    if (!searchQuery) return customerCredits.slice(0, 5)
    const q = searchQuery.toLowerCase().replace(/\s+/g, '')
    return customerCredits.filter(
      (c) =>
        c.mobileNumber.includes(q) ||
        c.vehicleNumbers.some((v) => v.toLowerCase().includes(q)) ||
        (c.customerName ?? '').toLowerCase().includes(q.toLowerCase()),
    )
  }, [customerCredits, searchQuery])

  const filteredHistory = useMemo(() => {
    if (!selected) return []
    if (entryTypeFilter === 'all') return selected.history
    return selected.history.filter((h) => h.entryType === entryTypeFilter)
  }, [selected, entryTypeFilter])

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelectedMobile(null)}
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </button>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {selected.customerName ?? 'Customer credit'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {selected.mobileNumber}
              </span>
              {selected.vehicleNumbers.map((v) => (
                <span key={v} className="inline-flex items-center gap-1.5 font-mono">
                  <Car className="w-3.5 h-3.5" />
                  {v}
                </span>
              ))}
            </div>
          </div>
          {permissions.exportData && (
            <button className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
              <Download className="w-4 h-4" />
              Export history
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Total available"
            value={`${formatCoins(selected.totalAvailable)} coins`}
            sub={`≈ ₹${formatCoins(selected.totalAvailable)}`}
            tone="cyan"
          />
          <StatCard
            label="Reserved"
            value={`${formatCoins(selected.totalReserved)} coins`}
            sub="Held by unpaid orders"
            tone="amber"
          />
          <StatCard
            label="Active lots"
            value={`${selected.lots.length}`}
            sub={`from ${new Set(selected.lots.map((l) => l.source)).size} source${
              new Set(selected.lots.map((l) => l.source)).size > 1 ? 's' : ''
            }`}
            tone="slate"
          />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Balance by lot
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Programme
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Source
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Issued
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Available
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Reserved
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Dates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {selected.lots.map((lot) => (
                  <tr key={lot.id}>
                    <td className="px-4 py-3">
                      {lot.programmeName ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-900 dark:text-white">
                            {lot.programmeName}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {lot.programmeCode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400 italic">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                      {sourceLabels[lot.source]}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                      {formatCoins(lot.coinsIssued)}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                      {formatCoins(lot.coinsAvailable)}
                    </td>
                    <td className="px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
                      {formatCoins(lot.coinsReserved)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{formatDate(lot.issuedOn)}</span>
                        <span className="text-xs text-slate-400">
                          → {formatDate(lot.expiresOn)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">History</h3>
            <select
              value={entryTypeFilter}
              onChange={(e) =>
                setEntryTypeFilter(e.target.value as CreditHistoryEntryType | 'all')
              }
              className="px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="all">All entries</option>
              <option value="issue">Issue</option>
              <option value="reservation">Reservation</option>
              <option value="use">Use</option>
              <option value="release">Release</option>
              <option value="expiry">Expiry</option>
              <option value="reversal">Reversal</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Entry
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Coins
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Running Balance
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Order ID
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Caused By
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredHistory
                  .slice()
                  .reverse()
                  .map((h) => (
                    <tr key={h.id}>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${entryTypeBadge[h.entryType]}`}
                        >
                          {entryTypeLabels[h.entryType]}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-3 text-sm font-semibold ${
                          h.coins >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
                        }`}
                      >
                        {h.coins >= 0 ? '+' : ''}
                        {formatCoins(h.coins)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                        {formatCoins(h.runningBalance)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-mono">
                        {h.orderId ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                        {h.causedBy}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatTime(h.timestamp)}
                      </td>
                    </tr>
                  ))}
                {filteredHistory.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">
                      No entries match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Customer Credit
      </h1>

      <div className="relative mb-6 max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by mobile number, vehicle number or name…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        {searchResults.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400">
            No customers match.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {searchResults.map((c) => (
              <button
                key={c.mobileNumber}
                onClick={() => setSelectedMobile(c.mobileNumber)}
                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {c.customerName ?? c.mobileNumber}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {c.mobileNumber}
                    </span>
                    {c.vehicleNumbers.map((v) => (
                      <span key={v} className="inline-flex items-center gap-1 font-mono">
                        <Car className="w-3 h-3" />
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                    {formatCoins(c.totalAvailable)} coins
                  </p>
                  <p className="text-xs text-slate-400">
                    {c.lots.length} active lot{c.lots.length > 1 ? 's' : ''}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string
  value: string
  sub: string
  tone: 'cyan' | 'amber' | 'slate'
}) {
  const toneClasses = {
    cyan: 'text-cyan-700 dark:text-cyan-300',
    amber: 'text-amber-700 dark:text-amber-300',
    slate: 'text-slate-700 dark:text-slate-200',
  }[tone]
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className={`text-2xl font-bold ${toneClasses}`}>{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</p>
    </div>
  )
}

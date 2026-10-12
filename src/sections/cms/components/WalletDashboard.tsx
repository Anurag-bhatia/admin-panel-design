import { useMemo } from 'react'
import {
  Target,
  Ticket,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Users,
} from 'lucide-react'
import type { Programme } from '@/../product/sections/cms/types'

interface WalletDashboardProps {
  programmes: Programme[]
}

function formatCoins(n: number): string {
  return n.toLocaleString('en-IN')
}

function formatInr(n: number): string {
  return n.toLocaleString('en-IN')
}

function budgetPct(p: Programme): number {
  if (p.budgetCoins === 0) return 0
  return Math.min(100, Math.round((p.coinsIssued / p.budgetCoins) * 100))
}

export function WalletDashboard({ programmes }: WalletDashboardProps) {
  const totals = useMemo(() => {
    let issued = 0
    let used = 0
    let expired = 0
    programmes.forEach((p) => {
      issued += p.coinsIssued
      used += p.coinsUsed
      expired += p.coinsExpired
    })
    const outstanding = issued - used - expired
    return { issued, used, expired, outstanding }
  }, [programmes])

  const budgetRows = useMemo(() => {
    return [...programmes]
      .filter((p) => p.status !== 'archived' && p.status !== 'expired')
      .sort((a, b) => budgetPct(b) - budgetPct(a))
      .slice(0, 6)
  }, [programmes])

  // Sample metrics — these would come from reporting APIs in production.
  const conversionCounts = { converted: 128, used: 92, unused: 36 }
  const successMeasures = {
    successfulConversions: 92,
    repeatRate: 34, // % of credited customers who placed a second paid order
  }
  const refundSummary = {
    refundRequested: { count: 14, valueInr: 48500 },
    hold: { count: 3, valueInr: 9200 },
    delayed: { count: 2, valueInr: 7400 },
    referralCount: 4,
  }
  const anomalies = {
    reconciliationMismatches: 2,
    repeatedCreditsVehicles: 5,
    lastRunIso: '2026-10-10T05:00:00Z',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Credit Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Tile
          label="Outstanding credit"
          primary={`${formatCoins(totals.outstanding)} coins`}
          sub={`≈ ₹${formatInr(totals.outstanding)}`}
        />
        <Tile
          label="Issued (all time)"
          primary={`${formatCoins(totals.issued)} coins`}
          sub={`${formatCoins(totals.used)} used · ${formatCoins(totals.expired)} expired`}
        />
        <Tile
          label="Successful conversions"
          primary={`${successMeasures.successfulConversions}`}
          sub="Credit → paid ChallanPay txn"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <Tile
          label="Repeat rate"
          primary={`${successMeasures.repeatRate}%`}
          sub="Returned for a second paid txn"
          icon={<Users className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Budget used</h3>
          </div>
          {budgetRows.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No live programmes.</p>
          ) : (
            <div className="space-y-6">
              {budgetRows.map((p) => {
                const pct = budgetPct(p)
                const isAlert = p.alertLevelPercent != null && pct >= p.alertLevelPercent
                const isFull = pct >= 100
                const barColor = isFull
                  ? 'bg-red-500'
                  : isAlert
                  ? 'bg-amber-500'
                  : 'bg-cyan-500'
                return (
                  <div key={p.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {p.name}
                        </span>
                        <span className="ml-2 text-xs text-slate-400 font-mono">{p.code}</span>
                      </div>
                      <span className="text-slate-500">
                        {formatCoins(p.coinsIssued)} / {formatCoins(p.budgetCoins)} · {pct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Coupon conversion
            </h3>
          </div>
          <div className="space-y-3">
            <StatRow label="Converted" value={conversionCounts.converted} />
            <StatRow label="Used" value={conversionCounts.used} trend="up" />
            <StatRow label="Unused" value={conversionCounts.unused} trend="down" />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-400">
              {Math.round((conversionCounts.used / conversionCounts.converted) * 100)}% of converted
              credit has been used.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Refunds</h3>
            <span className="ml-auto text-xs text-slate-400">
              {refundSummary.referralCount} from referral tickets
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <RefundCell
              label="In progress"
              count={refundSummary.refundRequested.count}
              valueInr={refundSummary.refundRequested.valueInr}
              tone="cyan"
            />
            <RefundCell
              label="On hold"
              count={refundSummary.hold.count}
              valueInr={refundSummary.hold.valueInr}
              tone="amber"
            />
            <RefundCell
              label="Delayed"
              count={refundSummary.delayed.count}
              valueInr={refundSummary.delayed.valueInr}
              tone="red"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-400">
              Refunds go back to the original payment method; coins used on a refunded incident
              return to the balance.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Anomalies</h3>
            <span className="ml-auto text-xs text-slate-400">
              Last run {formatRunTime(anomalies.lastRunIso)}
            </span>
          </div>
          <div className="space-y-3">
            <AnomalyRow
              label="Reconciliation mismatches"
              count={anomalies.reconciliationMismatches}
              hint="Entries vs orders, payments and refunds"
            />
            <AnomalyRow
              label="Repeated credits to one vehicle"
              count={anomalies.repeatedCreditsVehicles}
              hint="Suspected multiple-mobile reuse"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button className="text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:underline">
              View entries behind these →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatRunTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function Tile({
  label,
  primary,
  sub,
  icon,
}: {
  label: string
  primary: string
  sub?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{primary}</p>
      {sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}

function StatRow({
  label,
  value,
  trend,
}: {
  label: string
  value: number
  trend?: 'up' | 'down'
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      <div className="flex items-center gap-1.5">
        {trend === 'up' && <ArrowUp className="w-3.5 h-3.5 text-emerald-500" />}
        {trend === 'down' && <ArrowDown className="w-3.5 h-3.5 text-red-500" />}
        <span className="text-sm font-semibold text-slate-900 dark:text-white">{value}</span>
      </div>
    </div>
  )
}

function RefundCell({
  label,
  count,
  valueInr,
  tone,
}: {
  label: string
  count: number
  valueInr: number
  tone: 'cyan' | 'amber' | 'red'
}) {
  const toneCls = {
    cyan: 'text-cyan-700 dark:text-cyan-300',
    amber: 'text-amber-700 dark:text-amber-300',
    red: 'text-red-700 dark:text-red-300',
  }[tone]
  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg px-3 py-3">
      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`text-lg font-bold ${toneCls}`}>{count}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        ₹{formatInr(valueInr)}
      </p>
    </div>
  )
}

function AnomalyRow({
  label,
  count,
  hint,
}: {
  label: string
  count: number
  hint: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      </div>
      <span
        className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-1 text-sm font-bold rounded-md ${
          count > 0
            ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200'
            : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
        }`}
      >
        {count}
      </span>
    </div>
  )
}

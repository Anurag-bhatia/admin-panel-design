import { useMemo } from 'react'
import { Target, Ticket, ArrowUp, ArrowDown } from 'lucide-react'
import type { Programme } from '@/../product/sections/cms/types'

interface WalletDashboardProps {
  programmes: Programme[]
}

function formatCoins(n: number): string {
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

  const conversionCounts = { converted: 128, used: 92, unused: 36 }
  const successMeasures = { successfulConversions: 92 }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wallet Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Tile
          label="Outstanding credit"
          primary={`${formatCoins(totals.outstanding)} coins`}
        />
        <Tile
          label="Issued (all time)"
          primary={`${formatCoins(totals.issued)} coins`}
        />
        <Tile
          label="Conversions"
          primary={`${successMeasures.successfulConversions}`}
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
    </div>
  )
}

function Tile({
  label,
  primary,
}: {
  label: string
  primary: string
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{primary}</p>
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


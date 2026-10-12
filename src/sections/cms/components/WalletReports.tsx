import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Download,
  BarChart3,
  Clock,
  Ticket,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Filter,
  Info,
  X,
} from 'lucide-react'
import type { Programme, WalletPermissions } from '@/../product/sections/cms/types'
import { defaultWalletPermissions } from '@/../product/sections/cms/types'

interface WalletReportsProps {
  programmes: Programme[]
  permissions?: WalletPermissions
}

type ReportId =
  | 'creditSummary'
  | 'ageing'
  | 'couponConversion'
  | 'refunds'
  | 'successMeasures'
  | 'exceptions'

const reports: { id: ReportId; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'creditSummary',
    label: 'Credit summary',
    description: 'Issued, used, expired and outstanding, by programme and source.',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: 'ageing',
    label: 'Ageing & expiring',
    description: 'Outstanding credit by age and value due to expire in the coming period.',
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: 'couponConversion',
    label: 'Coupon conversion',
    description: 'Converted, used, reversed and expired conversion value, reported separately.',
    icon: <Ticket className="w-4 h-4" />,
  },
  {
    id: 'refunds',
    label: 'Refunds',
    description:
      'Requested, hold, rejected and completed refunds, split by Referral tag, with time to completion.',
    icon: <RefreshCw className="w-4 h-4" />,
  },
]

function formatCoins(n: number): string {
  return n.toLocaleString('en-IN')
}

function formatInr(n: number): string {
  return n.toLocaleString('en-IN')
}

export function WalletReports({ programmes, permissions = defaultWalletPermissions }: WalletReportsProps) {
  const [selected, setSelected] = useState<ReportId>('creditSummary')
  const [dateFrom, setDateFrom] = useState<string>('2026-09-01')
  const [dateTo, setDateTo] = useState<string>('2026-10-10')
  const [programmeFilter, setProgrammeFilter] = useState<string>('all')

  const scoped = useMemo(() => {
    if (programmeFilter === 'all') return programmes
    return programmes.filter((p) => p.id === programmeFilter)
  }, [programmes, programmeFilter])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
        <div className="flex flex-wrap items-center gap-2">
          <FiltersPopover
            dateFrom={dateFrom}
            dateTo={dateTo}
            programmeFilter={programmeFilter}
            programmes={programmes}
            onChangeFrom={setDateFrom}
            onChangeTo={setDateTo}
            onChangeProgramme={setProgrammeFilter}
          />
          {permissions.exportData && (
            <button className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 space-y-1 h-fit">
          {reports.map((r) => {
            const isActive = selected === r.id
            return (
              <div
                key={r.id}
                className={`flex items-center gap-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-900'
                    : 'border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <button
                  onClick={() => setSelected(r.id)}
                  className="flex-1 min-w-0 flex items-center gap-3 text-left px-3 py-2.5"
                >
                  <span
                    className={
                      isActive
                        ? 'text-cyan-700 dark:text-cyan-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    {r.icon}
                  </span>
                  <span
                    className={`text-sm font-semibold truncate ${
                      isActive
                        ? 'text-cyan-900 dark:text-cyan-100'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {r.label}
                  </span>
                </button>
                <InfoHint text={r.description} />
              </div>
            )
          })}
        </div>

        <div className="lg:col-span-3">
          {selected === 'creditSummary' && <CreditSummaryReport programmes={scoped} />}
          {selected === 'ageing' && <AgeingReport programmes={scoped} />}
          {selected === 'couponConversion' && <CouponConversionReport />}
          {selected === 'refunds' && <RefundsReport />}
          {selected === 'successMeasures' && <SuccessMeasuresReport />}
          {selected === 'exceptions' && <ExceptionsReport />}
        </div>
      </div>
    </div>
  )
}

function InfoHint({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="relative mr-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"
        aria-label="More info"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-md shadow-lg z-30 leading-relaxed">
          {text}
        </div>
      )}
    </div>
  )
}

const DEFAULT_FROM = '2026-09-01'
const DEFAULT_TO = '2026-10-10'

function FiltersPopover({
  dateFrom,
  dateTo,
  programmeFilter,
  programmes,
  onChangeFrom,
  onChangeTo,
  onChangeProgramme,
}: {
  dateFrom: string
  dateTo: string
  programmeFilter: string
  programmes: Programme[]
  onChangeFrom: (v: string) => void
  onChangeTo: (v: string) => void
  onChangeProgramme: (v: string) => void
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

  const activeCount =
    (dateFrom !== DEFAULT_FROM ? 1 : 0) +
    (dateTo !== DEFAULT_TO ? 1 : 0) +
    (programmeFilter !== 'all' ? 1 : 0)

  const clear = () => {
    onChangeFrom(DEFAULT_FROM)
    onChangeTo(DEFAULT_TO)
    onChangeProgramme('all')
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
          open || activeCount > 0
            ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-cyan-600 text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-4 z-30">
          <div className="space-y-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">From</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => onChangeFrom(e.target.value)}
                className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">To</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => onChangeTo(e.target.value)}
                className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Programme
              </span>
              <select
                value={programmeFilter}
                onChange={(e) => onChangeProgramme(e.target.value)}
                className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="all">All programmes</option>
                {programmes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {activeCount > 0 && (
            <div className="flex items-center justify-end mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={clear}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ReportCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function CreditSummaryReport({ programmes }: { programmes: Programme[] }) {
  const totals = useMemo(() => {
    let issued = 0
    let used = 0
    let expired = 0
    programmes.forEach((p) => {
      issued += p.coinsIssued
      used += p.coinsUsed
      expired += p.coinsExpired
    })
    return { issued, used, expired, outstanding: issued - used - expired }
  }, [programmes])

  return (
    <ReportCard title="Credit summary — by programme">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
        <SummaryStat label="Issued" value={`${formatCoins(totals.issued)}`} />
        <SummaryStat label="Used" value={`${formatCoins(totals.used)}`} />
        <SummaryStat label="Expired" value={`${formatCoins(totals.expired)}`} />
        <SummaryStat
          label="Outstanding"
          value={`${formatCoins(totals.outstanding)}`}
          tone="cyan"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <Th>Programme</Th>
              <Th>Source</Th>
              <Th align="right">Issued</Th>
              <Th align="right">Used</Th>
              <Th align="right">Expired</Th>
              <Th align="right">Outstanding</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {programmes.map((p) => {
              const outstanding = p.coinsIssued - p.coinsUsed - p.coinsExpired
              return (
                <tr key={p.id}>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {p.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{p.code}</span>
                    </div>
                  </Td>
                  <Td>{sourceLabel(p.type)}</Td>
                  <Td align="right">{formatCoins(p.coinsIssued)}</Td>
                  <Td align="right">{formatCoins(p.coinsUsed)}</Td>
                  <Td align="right">{formatCoins(p.coinsExpired)}</Td>
                  <Td align="right" className="font-semibold text-cyan-700 dark:text-cyan-300">
                    {formatCoins(outstanding)}
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </ReportCard>
  )
}

function AgeingReport({ programmes }: { programmes: Programme[] }) {
  const outstanding = programmes.reduce(
    (acc, p) => acc + (p.coinsIssued - p.coinsUsed - p.coinsExpired),
    0,
  )
  const buckets = [
    { label: '0–7 days', share: 0.18, expiringNext30: 0.08 },
    { label: '8–30 days', share: 0.42, expiringNext30: 0.22 },
    { label: '31–60 days', share: 0.28, expiringNext30: 0.45 },
    { label: '61–90 days', share: 0.09, expiringNext30: 0.78 },
    { label: '90+ days', share: 0.03, expiringNext30: 0.98 },
  ]

  return (
    <ReportCard title="Ageing & expiring">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <Th>Age bucket</Th>
              <Th align="right">Outstanding coins</Th>
              <Th align="right">Share</Th>
              <Th align="right">Expiring in next 30 days</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {buckets.map((b) => {
              const coins = Math.round(outstanding * b.share)
              const expiring = Math.round(coins * b.expiringNext30)
              return (
                <tr key={b.label}>
                  <Td>{b.label}</Td>
                  <Td align="right">{formatCoins(coins)}</Td>
                  <Td align="right">{Math.round(b.share * 100)}%</Td>
                  <Td align="right" className="text-amber-700 dark:text-amber-300">
                    {formatCoins(expiring)}
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </ReportCard>
  )
}

function CouponConversionReport() {
  const rows = [
    { bucket: 'Converted', value: 128, note: 'Coupons exchanged for credit' },
    { bucket: 'Used', value: 92, note: 'Converted credit spent on an order' },
    { bucket: 'Reversed', value: 3, note: 'Rolled back by an authorised process' },
    { bucket: 'Expired', value: 11, note: 'Converted credit that lapsed unused' },
  ]
  return (
    <ReportCard title="Coupon conversion">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <Th>Bucket</Th>
              <Th align="right">Conversions</Th>
              <Th>Note</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {rows.map((r) => (
              <tr key={r.bucket}>
                <Td className="font-medium text-slate-900 dark:text-white">{r.bucket}</Td>
                <Td align="right">{r.value}</Td>
                <Td className="text-slate-500 dark:text-slate-400">{r.note}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportCard>
  )
}

function RefundsReport() {
  const rows = [
    {
      status: 'Refund Requested',
      direct: { count: 10, valueInr: 36000, avgDays: 1.2 },
      referral: { count: 4, valueInr: 12500, avgDays: 1.4 },
    },
    {
      status: 'Hold',
      direct: { count: 2, valueInr: 6400, avgDays: 4.1 },
      referral: { count: 1, valueInr: 2800, avgDays: 5.6 },
    },
    {
      status: 'Rejected',
      direct: { count: 1, valueInr: 1200, avgDays: 2.0 },
      referral: { count: 0, valueInr: 0, avgDays: 0 },
    },
    {
      status: 'Completed',
      direct: { count: 182, valueInr: 428900, avgDays: 3.2 },
      referral: { count: 24, valueInr: 61400, avgDays: 3.9 },
    },
  ]
  return (
    <ReportCard title="Refunds — split by Referral tag">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <Th rowSpan={2}>Status</Th>
              <Th colSpan={3} align="center" className="border-l border-slate-200 dark:border-slate-700">
                Direct
              </Th>
              <Th colSpan={3} align="center" className="border-l border-slate-200 dark:border-slate-700">
                Referral
              </Th>
            </tr>
            <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <Th align="right" className="border-l border-slate-200 dark:border-slate-700">
                Count
              </Th>
              <Th align="right">Value</Th>
              <Th align="right">Avg days</Th>
              <Th align="right" className="border-l border-slate-200 dark:border-slate-700">
                Count
              </Th>
              <Th align="right">Value</Th>
              <Th align="right">Avg days</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {rows.map((r) => (
              <tr key={r.status}>
                <Td className="font-medium text-slate-900 dark:text-white">{r.status}</Td>
                <Td align="right" className="border-l border-slate-100 dark:border-slate-800">
                  {r.direct.count}
                </Td>
                <Td align="right">₹{formatInr(r.direct.valueInr)}</Td>
                <Td align="right">
                  {r.direct.avgDays > 0 ? r.direct.avgDays.toFixed(1) : '—'}
                </Td>
                <Td align="right" className="border-l border-slate-100 dark:border-slate-800">
                  {r.referral.count}
                </Td>
                <Td align="right">₹{formatInr(r.referral.valueInr)}</Td>
                <Td align="right">
                  {r.referral.avgDays > 0 ? r.referral.avgDays.toFixed(1) : '—'}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportCard>
  )
}

function SuccessMeasuresReport() {
  return (
    <ReportCard title="Success measures (section 2)">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            Successful conversions
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">92</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Customers who received credit and completed a paid ChallanPay transaction.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            Repeat rate
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">34%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Share of successful-conversion customers who returned for a second paid transaction.
          </p>
        </div>
      </div>
    </ReportCard>
  )
}

function ExceptionsReport() {
  const rows = [
    {
      kind: 'Repeated credits to one vehicle',
      count: 5,
      hint: 'DL1AB1234 credited via 3 mobile numbers in 7 days',
    },
    {
      kind: 'Daily reconciliation mismatch',
      count: 2,
      hint: 'Credit used vs order totals, 09 Oct run',
    },
    {
      kind: 'Payment success but debit retry',
      count: 1,
      hint: 'Resolved by scheduled retry',
    },
  ]
  return (
    <ReportCard title="Exceptions">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <Th>Exception</Th>
              <Th align="right">Count</Th>
              <Th>Detail</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {rows.map((r) => (
              <tr key={r.kind}>
                <Td className="font-medium text-slate-900 dark:text-white">{r.kind}</Td>
                <Td align="right" className="text-amber-700 dark:text-amber-300 font-semibold">
                  {r.count}
                </Td>
                <Td className="text-slate-500 dark:text-slate-400">{r.hint}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportCard>
  )
}

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'cyan'
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className={`text-lg font-bold ${
          tone === 'cyan' ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-900 dark:text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function Th({
  children,
  align = 'left',
  colSpan,
  rowSpan,
  className = '',
}: {
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  colSpan?: number
  rowSpan?: number
  className?: string
}) {
  const alignCls =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5 ${alignCls} ${className}`}
    >
      {children}
    </th>
  )
}

function Td({
  children,
  align = 'left',
  className = '',
}: {
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
}) {
  const alignCls =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
  return (
    <td className={`px-4 py-3 text-sm text-slate-700 dark:text-slate-200 ${alignCls} ${className}`}>
      {children}
    </td>
  )
}

function sourceLabel(type: Programme['type']): string {
  switch (type) {
    case 'firstTimeCheck':
      return 'First-time check'
    case 'postPaymentReward':
      return 'Post-payment reward'
    case 'corporate':
      return 'Corporate benefit'
    case 'specificCustomers':
      return 'Specific customers'
  }
}

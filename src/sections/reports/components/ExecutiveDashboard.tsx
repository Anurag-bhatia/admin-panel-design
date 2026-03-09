import {
  AlertCircle,
  UserPlus,
  Users,
  Scale,
  Handshake,
  CreditCard,
  MessageSquare,
} from 'lucide-react'
import type { ExecutiveSummary } from '@/../product/sections/reports/types'

interface ExecutiveDashboardProps {
  data: ExecutiveSummary
  onCardClick?: (domain: string) => void
}

function OverviewCard({
  icon: Icon,
  title,
  metrics,
  accent,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  metrics: { label: string; value: string | number }[]
  accent: string
  onClick?: () => void
}) {
  const accentMap: Record<string, { bg: string; icon: string }> = {
    cyan: { bg: 'bg-cyan-50 dark:bg-cyan-950/40', icon: 'text-cyan-600 dark:text-cyan-400' },
    violet: { bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'text-violet-600 dark:text-violet-400' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', icon: 'text-emerald-600 dark:text-emerald-400' },
    amber: { bg: 'bg-amber-50 dark:bg-amber-950/40', icon: 'text-amber-600 dark:text-amber-400' },
    blue: { bg: 'bg-blue-50 dark:bg-blue-950/40', icon: 'text-blue-600 dark:text-blue-400' },
    green: { bg: 'bg-green-50 dark:bg-green-950/40', icon: 'text-green-600 dark:text-green-400' },
    rose: { bg: 'bg-rose-50 dark:bg-rose-950/40', icon: 'text-rose-600 dark:text-rose-400' },
  }
  const a = accentMap[accent] || accentMap.cyan

  return (
    <button
      onClick={onClick}
      className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-left transition-all hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-lg ${a.bg}`}>
          <Icon className={`w-5 h-5 ${a.icon}`} />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {metrics.map((m, i) => {
          const isFirst = i === 0
          return (
            <div key={m.label} className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">{m.label}</span>
              <span
                className={`tabular-nums font-semibold ${
                  isFirst
                    ? 'text-lg text-slate-900 dark:text-white'
                    : 'text-sm text-slate-700 dark:text-slate-300'
                }`}
              >
                {typeof m.value === 'number' ? m.value.toLocaleString('en-IN') : m.value}
              </span>
            </div>
          )
        })}
      </div>
    </button>
  )
}

export function ExecutiveDashboard({ data, onCardClick }: ExecutiveDashboardProps) {
  const cards = [
    {
      key: 'incidents',
      icon: AlertCircle,
      title: 'Incidents',
      accent: 'cyan',
      metrics: [
        { label: 'Total', value: data.incidents.total },
        { label: 'Settled', value: data.incidents.resolved ?? 0 },
        { label: 'Not Settled', value: data.incidents.pending ?? 0 },
      ],
    },
    {
      key: 'leads',
      icon: UserPlus,
      title: 'Leads',
      accent: 'violet',
      metrics: [
        { label: 'Total', value: data.leads.total },
        { label: 'Converted', value: data.leads.converted ?? 0 },
        { label: 'Lost', value: data.leads.lost ?? (data.leads.total - (data.leads.converted ?? 0)) },
      ],
    },
    {
      key: 'subscribers',
      icon: Users,
      title: 'Subscribers',
      accent: 'emerald',
      metrics: [
        { label: 'Total', value: data.subscribers.total },
        { label: 'Active', value: data.subscribers.active ?? 0 },
        { label: 'New', value: data.subscribers.newThisMonth ?? 0 },
      ],
    },
    {
      key: 'lawyers',
      icon: Scale,
      title: 'Lawyers',
      accent: 'amber',
      metrics: [
        { label: 'Total', value: data.lawyers.total },
        { label: 'Active', value: data.lawyers.active ?? 0 },
      ],
    },
    {
      key: 'partners',
      icon: Handshake,
      title: 'Partners',
      accent: 'blue',
      metrics: [
        { label: 'Total', value: data.partners.total },
        { label: 'Active', value: data.partners.active ?? 0 },
      ],
    },
    {
      key: 'payments',
      icon: CreditCard,
      title: 'Payments',
      accent: 'green',
      metrics: [
        { label: 'Payout', value: `\u20B9${((data.payments.payoutsProcessed ?? 0) / 100000).toFixed(1)}L` },
        { label: 'Refund Amount', value: `\u20B9${((data.payments.refundsIssued ?? 0) / 100000).toFixed(1)}L` },
      ],
    },
    {
      key: 'disputes',
      icon: MessageSquare,
      title: 'Disputes',
      accent: 'rose',
      metrics: [
        { label: 'Total', value: data.disputes.total },
        { label: 'Open', value: data.disputes.open ?? 0 },
        { label: 'Settled', value: data.disputes.resolved ?? 0 },
      ],
    },
  ]

  return (
    <div className="px-8 lg:px-12 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map((card) => (
          <OverviewCard
            key={card.key}
            icon={card.icon}
            title={card.title}
            accent={card.accent}
            metrics={card.metrics}
            onClick={() => onCardClick?.(card.key)}
          />
        ))}
      </div>
    </div>
  )
}

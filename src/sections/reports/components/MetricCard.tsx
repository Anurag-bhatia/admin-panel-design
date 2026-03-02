import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { MetricCard as MetricCardType } from '@/../product/sections/reports/types'

interface MetricCardProps {
  metric: MetricCardType
  onClick?: () => void
  className?: string
}

export function MetricCard({ metric, onClick, className = '' }: MetricCardProps) {
  const { value, trend, label, description } = metric

  const isPositive = trend > 0
  const isNegative = trend < 0
  const isNeutral = trend === 0

  const trendColor = isPositive
    ? 'text-emerald-600 dark:text-emerald-400'
    : isNegative
    ? 'text-rose-600 dark:text-rose-400'
    : 'text-slate-500 dark:text-slate-400'

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus

  return (
    <button
      onClick={onClick}
      className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-left transition-all hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-lg hover:shadow-cyan-500/10 ${className}`}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/0 group-hover:to-transparent rounded-xl transition-all duration-300" />

      <div className="relative">
        {/* Metric value */}
        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {typeof value === 'number' && value >= 1000
            ? value.toLocaleString()
            : value}
        </div>

        {/* Trend indicator */}
        <div className={`flex items-center gap-1.5 mb-3 ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {Math.abs(trend)}%
          </span>
        </div>

        {/* Label */}
        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </div>

        {/* Description */}
        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {description}
        </div>
      </div>
    </button>
  )
}

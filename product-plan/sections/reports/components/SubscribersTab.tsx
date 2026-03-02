import { FileDown } from 'lucide-react'
import { MetricCard } from './MetricCard'
import type { SubscribersReport } from '../types'

interface SubscribersTabProps {
  data: SubscribersReport
  onMetricClick?: (metric: string) => void
  onExport?: (format: 'pdf' | 'csv') => void
  onExportMetric?: (format: 'pdf' | 'csv', metric: string) => void
}

export function SubscribersTab({
  data,
  onMetricClick,
  onExport,
  onExportMetric,
}: SubscribersTabProps) {
  const { summary, chartData } = data

  return (
    <div className="px-6 pb-6 space-y-8">
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(summary)
          .filter(([key]) => !['avgIncidentsPerSubscriber', 'avgSubscriptionValue', 'churnRate'].includes(key))
          .map(([key, metric]) => (
            <MetricCard
              key={key}
              metric={metric}
              onClick={() => onMetricClick?.(key)}
            />
          ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Growth Trend
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'growthTrend')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-3">
            {chartData.growthTrend.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    {item.month}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs">
                      +{item.new} new
                    </span>
                    <span className="text-rose-600 dark:text-rose-400 text-xs">
                      -{item.churned} churned
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {item.active}
                    </span>
                  </div>
                </div>
                <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${(item.active / 200) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Segments */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Revenue Segments
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'revenueSegments')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-3">
            {chartData.revenueSegments.map((item) => (
              <div key={item.segment}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.segment}
                  </span>
                  <div className="text-right">
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {item.count}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                      ₹{(item.revenue / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(item.count / 70) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

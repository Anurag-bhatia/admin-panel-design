import { FileDown } from 'lucide-react'
import { MetricCard } from './MetricCard'
import type { IncidentsReport } from '@/../product/sections/reports/types'

interface IncidentsTabProps {
  data: IncidentsReport
  onMetricClick?: (metric: string) => void
  onExport?: (format: 'pdf' | 'csv') => void
  onExportMetric?: (format: 'pdf' | 'csv', metric: string) => void
}

export function IncidentsTab({
  data,
  onMetricClick,
  onExport,
  onExportMetric,
}: IncidentsTabProps) {
  const { summary, chartData } = data

  return (
    <div className="px-6 pb-6 space-y-8">
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.entries(summary).map(([key, metric]) => (
          <MetricCard
            key={key}
            metric={metric}
            onClick={() => onMetricClick?.(key)}
          />
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume trend chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Volume Trend
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'volumeTrend')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          {/* Simple bar chart visualization */}
          <div className="space-y-3">
            {chartData.volumeTrend.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    {item.month}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-600 dark:text-cyan-400">
                      Created: {item.created}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Resolved: {item.resolved}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-8">
                  <div
                    className="bg-cyan-500 rounded transition-all hover:bg-cyan-600"
                    style={{ width: `${(item.created / 250) * 100}%` }}
                  />
                  <div
                    className="bg-emerald-500 rounded transition-all hover:bg-emerald-600"
                    style={{ width: `${(item.resolved / 250) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Status Breakdown
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'statusBreakdown')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-3">
            {chartData.statusBreakdown.map((item) => (
              <div key={item.status}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.status}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
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

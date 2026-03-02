import { FileDown } from 'lucide-react'
import { MetricCard } from './MetricCard'
import type { PartnersReport } from '@/../product/sections/reports/types'

interface PartnersTabProps {
  data: PartnersReport
  onMetricClick?: (metric: string) => void
  onExport?: (format: 'pdf' | 'csv') => void
  onExportMetric?: (format: 'pdf' | 'csv', metric: string) => void
}

export function PartnersTab({
  data,
  onMetricClick,
  onExport,
  onExportMetric,
}: PartnersTabProps) {
  const { summary, chartData } = data

  return (
    <div className="px-6 pb-6 space-y-8">
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.entries(summary)
          .filter(([key]) => key !== 'revenueContribution')
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
        {/* Performance ranking */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Top Performers
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'performanceRanking')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            {chartData.performanceRanking.map((item, idx) => (
              <div key={item.partner}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 dark:text-slate-400 font-medium w-6">
                      #{idx + 1}
                    </span>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {item.partner}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-900 dark:text-white font-semibold">
                      {item.subscribers} subscribers
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(item.subscribers / 25) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Onboarding trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Onboarding Trend
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'onboardingTrend')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-3">
            {chartData.onboardingTrend.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    {item.month}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {item.subscribers} subscribers
                  </span>
                </div>
                <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${(item.subscribers / 20) * 100}%` }}
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

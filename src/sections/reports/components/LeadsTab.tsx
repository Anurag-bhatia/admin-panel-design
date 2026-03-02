import { FileDown } from 'lucide-react'
import { MetricCard } from './MetricCard'
import type { LeadsReport } from '@/../product/sections/reports/types'

interface LeadsTabProps {
  data: LeadsReport
  onMetricClick?: (metric: string) => void
  onExport?: (format: 'pdf' | 'csv') => void
  onExportMetric?: (format: 'pdf' | 'csv', metric: string) => void
}

export function LeadsTab({
  data,
  onMetricClick,
  onExport,
  onExportMetric,
}: LeadsTabProps) {
  const { summary, chartData } = data

  return (
    <div className="px-6 pb-6 space-y-8">
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
        {/* Pipeline stages */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Pipeline Stages
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'pipelineStages')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-3">
            {chartData.pipelineStages.map((item) => (
              <div key={item.stage}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.stage}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {item.count}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full transition-all"
                    style={{ width: `${(item.count / 80) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Lead Sources
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'sourceBreakdown')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            {chartData.sourceBreakdown.map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item.source}
                  </span>
                  <div className="text-right">
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {item.count}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-2">
                      ({item.converted} converted)
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div
                    className="h-2 bg-violet-500 rounded-full"
                    style={{ width: `${(item.count / 160) * 100}%` }}
                  />
                  <div
                    className="h-2 bg-emerald-500 rounded-full"
                    style={{ width: `${(item.converted / 160) * 100}%` }}
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

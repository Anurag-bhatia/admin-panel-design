import { FileDown } from 'lucide-react'
import { MetricCard } from './MetricCard'
import type { TeamReport } from '../types'

interface TeamTabProps {
  data: TeamReport
  onMetricClick?: (metric: string) => void
  onExport?: (format: 'pdf' | 'csv') => void
  onExportMetric?: (format: 'pdf' | 'csv', metric: string) => void
}

export function TeamTab({
  data,
  onMetricClick,
  onExport,
  onExportMetric,
}: TeamTabProps) {
  const { summary, chartData, detailRecords } = data

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
        {/* Performance by team */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Performance by Team
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'performanceByTeam')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            {chartData.performanceByTeam.map((item) => (
              <div key={item.team}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div>
                    <div className="text-slate-900 dark:text-white font-medium">
                      {item.team}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.employees} employees
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-900 dark:text-white font-semibold">
                      {item.incidents} incidents
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.slaAdherence}% SLA
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div
                    className="h-2 bg-indigo-500 rounded-full"
                    style={{ width: `${(item.incidents / 1000) * 100}%` }}
                  />
                  <div
                    className="h-2 bg-emerald-500 rounded-full"
                    style={{ width: `${item.slaAdherence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workload distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Workload Distribution
            </h3>
            <button
              onClick={() => onExportMetric?.('csv', 'workloadDistribution')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-3">
            {chartData.workloadDistribution.map((item) => (
              <div key={item.range}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.range}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {item.count} employees
                  </span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${(item.count / 15) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity trend chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Productivity Trend
          </h3>
          <button
            onClick={() => onExportMetric?.('csv', 'productivityTrend')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <FileDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="space-y-3">
          {chartData.productivityTrend.map((item) => (
            <div key={item.month}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">
                  {item.month}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {item.avgIncidents} avg incidents
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {item.slaAdherence}% SLA
                  </span>
                </div>
              </div>
              <div className="flex gap-1 h-8">
                <div
                  className="bg-indigo-500 rounded transition-all hover:bg-indigo-600"
                  style={{ width: `${(item.avgIncidents / 50) * 100}%` }}
                />
                <div
                  className="bg-emerald-500 rounded transition-all hover:bg-emerald-600"
                  style={{ width: `${item.slaAdherence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail records table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Team Members
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Incidents Handled
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Leads Converted
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  SLA Adherence
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Avg Resolution
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Escalations
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {detailRecords.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    <div>
                      <div className="font-medium">{record.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {record.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    {record.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    {record.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                    {record.incidentsHandled}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                    {record.leadsConverted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        record.slaAdherence >= 90
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : record.slaAdherence >= 80
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {record.slaAdherence}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    {record.avgResolutionDays} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    {record.escalations}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

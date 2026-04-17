import { useState } from 'react'
import { ExecutiveDashboard } from './ExecutiveDashboard'
import { ChallanPayReportsTab } from './ChallanPayReportsTab'
import type { ReportsDashboardProps, ReportFilters, ReportsTab } from '@/../product/sections/reports/types'

export function ReportsDashboard({
  executiveSummary,
  incidentsReport,
  leadsReport,
  subscribersReport,
  lawyersReport,
  partnersReport,
  paymentsReport,
  disputesReport,
  supportReport,
  teamReport,
  filterOptions,
  activeTab = 'overview',
  onTabChange,
  onFilterChange,
  onMetricClick,
  onExport,
  onExportMetric,
}: ReportsDashboardProps) {
  const [currentFilters, setCurrentFilters] = useState<ReportFilters>({
    dateRange: '30d',
    state: 'All States',
  })

  const handleFilterChange = (filters: ReportFilters) => {
    setCurrentFilters(filters)
    onFilterChange?.(filters)
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'challanpay-reports', label: 'ChallanPay Reports' },
  ]

  const [selectedTab, setSelectedTab] = useState<ReportsTab>(activeTab)

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId as ReportsTab)
    onTabChange?.(tabId)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header and Tab navigation */}
      <div className="p-6">
        {/* Header with filters */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Analytics
            </h1>
          </div>

          {/* Inline filters */}
          <div className="flex flex-wrap items-center gap-3 lg:mt-1">
            {/* Date from */}
            <input
              type="date"
              defaultValue="2023-01-01"
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <span className="text-xs text-slate-400">to</span>
            {/* Date to */}
            <input
              type="date"
              defaultValue="2026-03-09"
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />

            {/* State filter */}
            <div className="relative">
              <select
                value={currentFilters.state || 'All States'}
                onChange={(e) => handleFilterChange({ ...currentFilters, state: e.target.value })}
                className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[160px]"
              >
                {filterOptions.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Export button */}
            <button
              onClick={() => onExport?.('csv', selectedTab)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="overflow-x-auto mb-6">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
            {tabs.map((tab) => {
              const isActive = selectedTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div>
        {selectedTab === 'overview' && (
          <ExecutiveDashboard
            data={executiveSummary}
            onCardClick={(domain) => handleTabClick(domain)}
          />
        )}

        {selectedTab === 'challanpay-reports' && (
          <ChallanPayReportsTab />
        )}
      </div>
    </div>
  )
}

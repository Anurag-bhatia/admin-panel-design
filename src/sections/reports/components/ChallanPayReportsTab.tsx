import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList,
} from 'recharts'
import { Users, IndianRupee, FileText, Gift, CreditCard, AlertCircle, Car } from 'lucide-react'

// — Data —

const challanBreakdown = [
  { name: 'Online', count: 1972110, value: 3508968101 },
  { name: 'Online Pending', count: 2273, value: 2103225 },
  { name: 'Court', count: 1140666, value: 2200822229 },
  { name: 'Court Pending', count: 918, value: 2206000 },
]

const challanPieData = [
  { name: 'Online', value: 1972110 },
  { name: 'Court', value: 1140666 },
  { name: 'Pending', value: 3191 },
]

const customerBarData = [
  { name: 'Paid Customers', value: 27825 },
  { name: 'Payments', value: 27814 },
  { name: 'Incidents', value: 43192 },
]

const PIE_COLORS = ['#06b6d4', '#0e7490', '#94a3b8']
const BAR_COLORS = ['#06b6d4', '#0891b2', '#0e7490', '#155e75']

function formatINR(num: number): string {
  return num.toLocaleString('en-IN')
}

function formatCompact(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`
  if (num >= 100000) return `${(num / 100000).toFixed(1)} L`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = 'cyan',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub?: string
  accent?: string
}) {
  const accentMap: Record<string, string> = {
    cyan: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400',
    amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
    violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400',
    rose: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-start gap-4">
      <div className={`p-2.5 rounded-lg shrink-0 ${accentMap[accent]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">{value}</p>
        {sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</p>}
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold text-slate-900 dark:text-white">
          {entry.name}: {formatINR(entry.value)}
        </p>
      ))}
    </div>
  )
}

export function ChallanPayReportsTab() {
  return (
    <div className="px-8 lg:px-12 pb-8 space-y-6">
      {/* KPI Stat Cards — Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value="12,75,545" accent="cyan" />
        <StatCard icon={FileText} label="Total Challans" value="31,12,776" sub="Online + Court" accent="violet" />
        <StatCard icon={IndianRupee} label="Total Challan Value" value="570.97 Cr" accent="emerald" />
        <StatCard icon={CreditCard} label="Payment Value" value="6,31,33,735" sub="27,814 payments" accent="amber" />
      </div>

      {/* KPI Stat Cards — Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Paid Customers" value="27,825" accent="cyan" />
        <StatCard icon={AlertCircle} label="Total Incidents" value="43,192" accent="rose" />
        <StatCard icon={Gift} label="Rewards Availed" value="27,825" sub={'\u20B9 2,64,45,715 amount'} accent="emerald" />
        <StatCard icon={Car} label="Vehicle Numbers" value="0" accent="violet" />
      </div>

      {/* Charts Row — Challan Distribution Pie + Challan Count Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Pie Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Challan Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={challanPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {challanPieData.map((_entry, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs text-slate-600 dark:text-slate-400">{value}</span>
                )}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const d = payload[0]
                  return (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{d.name}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{formatINR(d.value as number)}</p>
                    </div>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart — Count by type */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Challan Count by Type</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={challanBreakdown} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Count" radius={[6, 6, 0, 0]}>
                {challanBreakdown.map((_entry, index) => (
                  <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
                <LabelList
                  dataKey="count"
                  position="top"
                  formatter={formatCompact}
                  style={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Challan Value + Customer Metrics — side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challan Value Bar Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Challan Value by Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={challanBreakdown} barSize={36} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 10000000 ? `${(v / 10000000).toFixed(0)} Cr` : v >= 100000 ? `${(v / 100000).toFixed(0)} L` : formatINR(v)}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                width={110}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {'\u20B9'} {formatINR(payload[0].value as number)}
                      </p>
                    </div>
                  )
                }}
              />
              <Bar dataKey="value" name="Value" radius={[0, 6, 6, 0]}>
                {challanBreakdown.map((_entry, index) => (
                  <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={formatCompact}
                  style={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer & Account Metrics */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Customer & Account Metrics</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={customerBarData} barSize={48}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]} fill="#06b6d4">
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={formatCompact}
                  style={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

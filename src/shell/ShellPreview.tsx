import {
  AlertCircle,
  UserPlus,
  Users,
  Scale,
  Handshake,
  CreditCard,
  MessageSquare,
  HeadphonesIcon,
  BarChart3,
  UsersRound,
} from 'lucide-react'
import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    {
      label: 'Incidents',
      href: '/incidents',
      icon: AlertCircle,
      isActive: true,
    },
    {
      label: 'Leads',
      href: '/leads',
      icon: UserPlus,
      children: [
        {
          label: 'All Leads',
          href: '/leads/all',
          isActive: false,
        },
      ],
    },
    {
      label: 'Subscribers',
      href: '/subscribers',
      icon: Users,
    },
    {
      label: 'Lawyers',
      href: '/lawyers',
      icon: Scale,
    },
    {
      label: 'Partners',
      href: '/partners',
      icon: Handshake,
    },
    {
      label: 'Payments',
      href: '/payments',
      icon: CreditCard,
    },
    {
      label: 'Disputes',
      href: '/disputes',
      icon: MessageSquare,
    },
    {
      label: 'Support',
      href: '/support',
      icon: HeadphonesIcon,
    },
    {
      label: 'Reports',
      href: '/reports',
      icon: BarChart3,
    },
    {
      label: 'Team',
      href: '/team',
      icon: UsersRound,
    },
  ]

  const user = {
    name: 'Alex Morgan',
    email: 'alex@company.com',
    designation: 'Operations Manager',
  }

  const breadcrumbs = [
    {
      label: 'Incidents',
    },
  ]

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      breadcrumbs={breadcrumbs}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Incidents
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Core workflow for challan intake, screening, assignment, resolution
            tracking, and SLA enforcement with automated lawyer coordination.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Sample Cards */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Incidents
                </h3>
                <AlertCircle className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                1,247
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                +12% from last month
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Pending Assignment
                </h3>
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                43
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Requires attention
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Resolved
                </h3>
                <AlertCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                892
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                71% resolution rate
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    New incident assigned to Lawyer #142
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    2 minutes ago
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">
                  Assigned
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Incident #CH-2024-1523 resolved
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    15 minutes ago
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  Resolved
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    SLA breach warning for incident #CH-2024-1489
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    1 hour ago
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                  Warning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

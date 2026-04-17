import data from '@/../product/sections/reports/data.json'
import type {
  ExecutiveSummary,
  IncidentsReport,
  LeadsReport,
  SubscribersReport,
  LawyersReport,
  PartnersReport,
  PaymentsReport,
  DisputesReport,
  SupportReport,
  TeamReport,
} from '@/../product/sections/reports/types'
import { ReportsDashboard } from './components/ReportsDashboard'

export default function ReportsDashboardPreview() {
  return (
    <ReportsDashboard
      executiveSummary={data.executiveSummary as unknown as ExecutiveSummary}
      incidentsReport={data.incidentsReport as unknown as IncidentsReport}
      leadsReport={data.leadsReport as unknown as LeadsReport}
      subscribersReport={data.subscribersReport as unknown as SubscribersReport}
      lawyersReport={data.lawyersReport as unknown as LawyersReport}
      partnersReport={data.partnersReport as unknown as PartnersReport}
      paymentsReport={data.paymentsReport as unknown as PaymentsReport}
      disputesReport={data.disputesReport as unknown as DisputesReport}
      supportReport={data.supportReport as unknown as SupportReport}
      teamReport={data.teamReport as unknown as TeamReport}
      filterOptions={data.filterOptions}
      activeTab="overview"
      onTabChange={(tab) => console.log('Tab changed:', tab)}
      onFilterChange={(filters) => console.log('Filters changed:', filters)}
      onMetricClick={(metric, tab) =>
        console.log('Metric clicked:', metric, 'in tab:', tab)
      }
      onExport={(format, tab) =>
        console.log('Export:', format, 'for tab:', tab)
      }
      onExportMetric={(format, metric, tab) =>
        console.log('Export metric:', format, metric, 'in tab:', tab)
      }
    />
  )
}

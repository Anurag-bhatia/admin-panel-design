import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/reports/data.json';
import { ReportsDashboard } from './components/ReportsDashboard';
export default function ReportsDashboardPreview() {
    return (_jsx(ReportsDashboard, { executiveSummary: data.executiveSummary, incidentsReport: data.incidentsReport, leadsReport: data.leadsReport, subscribersReport: data.subscribersReport, lawyersReport: data.lawyersReport, partnersReport: data.partnersReport, paymentsReport: data.paymentsReport, disputesReport: data.disputesReport, supportReport: data.supportReport, teamReport: data.teamReport, filterOptions: data.filterOptions, activeTab: "overview", onTabChange: (tab) => console.log('Tab changed:', tab), onFilterChange: (filters) => console.log('Filters changed:', filters), onMetricClick: (metric, tab) => console.log('Metric clicked:', metric, 'in tab:', tab), onExport: (format, tab) => console.log('Export:', format, 'for tab:', tab), onExportMetric: (format, metric, tab) => console.log('Export metric:', format, metric, 'in tab:', tab) }));
}

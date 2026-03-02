// =============================================================================
// Data Types
// =============================================================================

export interface MetricCard {
  value: number
  trend: number
  label: string
  description: string
}

export interface ExecutiveSummaryMetrics {
  total: number
  trend: number
  [key: string]: number
}

export interface ExecutiveSummary {
  incidents: ExecutiveSummaryMetrics
  leads: ExecutiveSummaryMetrics
  subscribers: ExecutiveSummaryMetrics
  lawyers: ExecutiveSummaryMetrics
  partners: ExecutiveSummaryMetrics
  payments: ExecutiveSummaryMetrics
  disputes: ExecutiveSummaryMetrics
  support: ExecutiveSummaryMetrics
  team: ExecutiveSummaryMetrics
}

// Incidents Report Types
export interface IncidentDetailRecord {
  id: string
  subscriberName: string
  challanNumber: string
  state: string
  amount: number
  status: 'resolved' | 'pending' | 'failed' | 'refunded'
  assignedLawyer: string
  createdDate: string
  resolvedDate: string | null
  resolutionDays: number
  slaStatus: 'within' | 'breached'
}

export interface IncidentsChartData {
  volumeTrend: Array<{ month: string; created: number; resolved: number }>
  statusBreakdown: Array<{ status: string; count: number; percentage: number }>
  stateBreakdown: Array<{ state: string; count: number }>
  ageingAnalysis: Array<{ range: string; count: number }>
}

export interface IncidentsReport {
  summary: {
    totalIncidents: MetricCard
    resolved: MetricCard
    pending: MetricCard
    failed: MetricCard
    refunded: MetricCard
    avgResolutionTime: MetricCard
    slaAdherence: MetricCard
  }
  chartData: IncidentsChartData
  detailRecords: IncidentDetailRecord[]
}

// Leads Report Types
export interface LeadDetailRecord {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  stage: string
  source: string
  assignedTo: string
  createdDate: string
  lastActivity: string
  lostReason?: string
}

export interface LeadsChartData {
  pipelineStages: Array<{ stage: string; count: number }>
  conversionFunnel: Array<{ stage: string; count: number; percentage: number }>
  sourceBreakdown: Array<{ source: string; count: number; converted: number }>
  monthlyTrend: Array<{ month: string; new: number; converted: number }>
}

export interface LeadsReport {
  summary: {
    totalLeads: MetricCard
    newLeads: MetricCard
    converted: MetricCard
    conversionRate: MetricCard
    avgConversionDays: MetricCard
  }
  chartData: LeadsChartData
  detailRecords: LeadDetailRecord[]
}

// Subscribers Report Types
export interface SubscriberDetailRecord {
  id: string
  companyName: string
  contactPerson: string
  email: string
  status: 'active' | 'inactive'
  subscriptionDate: string
  totalIncidents: number
  resolvedIncidents: number
  pendingIncidents: number
  totalSpend: number
  lastActivity: string
}

export interface SubscribersChartData {
  growthTrend: Array<{ month: string; active: number; new: number; churned: number }>
  usageDistribution: Array<{ range: string; count: number }>
  revenueSegments: Array<{ segment: string; count: number; revenue: number }>
}

export interface SubscribersReport {
  summary: {
    totalSubscribers: MetricCard
    activeSubscribers: MetricCard
    newThisMonth: MetricCard
    churnRate: MetricCard
    avgIncidentsPerSubscriber: MetricCard
    avgSubscriptionValue: MetricCard
  }
  chartData: SubscribersChartData
  detailRecords: SubscriberDetailRecord[]
}

// Lawyers Report Types
export interface LawyerDetailRecord {
  id: string
  name: string
  email: string
  phone: string
  state: string
  status: 'active' | 'inactive'
  casesAssigned: number
  casesResolved: number
  casesPending: number
  successRate: number
  avgResolutionDays: number
  commissionsEarned: number
  joinedDate: string
}

export interface LawyersChartData {
  performanceDistribution: Array<{ range: string; count: number }>
  resolutionTimeTrend: Array<{ month: string; avgDays: number }>
  commissionsByState: Array<{ state: string; commission: number }>
}

export interface LawyersReport {
  summary: {
    totalLawyers: MetricCard
    activeLawyers: MetricCard
    avgSuccessRate: MetricCard
    avgResolutionTime: MetricCard
    totalCommissionsEarned: MetricCard
    avgCasesPerLawyer: MetricCard
  }
  chartData: LawyersChartData
  detailRecords: LawyerDetailRecord[]
}

// Partners Report Types
export interface PartnerDetailRecord {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  subscribersOnboarded: number
  revenueContribution: number
  avgConversionRate: number
  joinedDate: string
  lastOnboarding: string
}

export interface PartnersChartData {
  performanceRanking: Array<{ partner: string; subscribers: number; revenue: number }>
  onboardingTrend: Array<{ month: string; subscribers: number }>
}

export interface PartnersReport {
  summary: {
    totalPartners: MetricCard
    activePartners: MetricCard
    subscribersOnboarded: MetricCard
    revenueContribution: MetricCard
    avgSubscribersPerPartner: MetricCard
  }
  chartData: PartnersChartData
  detailRecords: PartnerDetailRecord[]
}

// Payments Report Types
export interface PaymentDetailRecord {
  id: string
  subscriberName?: string
  lawyerName?: string
  invoiceNumber?: string
  referenceNumber?: string
  amount: number
  paymentDate: string | null
  paymentMethod: string
  status: 'completed' | 'pending' | 'failed'
  type: 'collection' | 'payout' | 'refund'
  dueDate?: string
}

export interface PaymentsChartData {
  collectionsTrend: Array<{ month: string; collections: number; refunds: number; payouts: number }>
  paymentMethods: Array<{ method: string; amount: number; percentage: number }>
  outstandingAgeing: Array<{ range: string; amount: number }>
}

export interface PaymentsReport {
  summary: {
    totalCollections: MetricCard
    invoicesGenerated: MetricCard
    pendingPayments: MetricCard
    refundsIssued: MetricCard
    payoutsProcessed: MetricCard
    avgInvoiceValue: MetricCard
  }
  chartData: PaymentsChartData
  detailRecords: PaymentDetailRecord[]
}

// Disputes Report Types
export interface DisputeDetailRecord {
  id: string
  subscriberName: string
  incidentId: string
  category: string
  description: string
  status: 'open' | 'resolved' | 'escalated'
  priority: 'low' | 'medium' | 'high'
  assignedTo: string
  createdDate: string
  resolvedDate?: string
  targetDate?: string
  resolution?: string
}

export interface DisputesChartData {
  categoryBreakdown: Array<{ category: string; count: number }>
  resolutionTrend: Array<{ month: string; raised: number; resolved: number }>
  outcomeDistribution: Array<{ outcome: string; count: number }>
}

export interface DisputesReport {
  summary: {
    totalDisputes: MetricCard
    openDisputes: MetricCard
    resolvedDisputes: MetricCard
    escalatedDisputes: MetricCard
    avgResolutionTime: MetricCard
    resolutionRate: MetricCard
  }
  chartData: DisputesChartData
  detailRecords: DisputeDetailRecord[]
}

// Support Report Types
export interface SupportDetailRecord {
  id: string
  subscriberName: string
  category: string
  subject: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'closed'
  assignedTo: string
  createdDate: string
  closedDate: string | null
  resolutionHours: number | null
}

export interface SupportChartData {
  categoryBreakdown: Array<{ category: string; count: number }>
  volumeTrend: Array<{ month: string; raised: number; closed: number }>
  priorityDistribution: Array<{ priority: string; count: number; avgResolutionHours: number }>
}

export interface SupportReport {
  summary: {
    totalTickets: MetricCard
    openTickets: MetricCard
    closedTickets: MetricCard
    avgResolutionTime: MetricCard
    firstResponseTime: MetricCard
    satisfactionScore: MetricCard
  }
  chartData: SupportChartData
  detailRecords: SupportDetailRecord[]
}

// Team Report Types
export interface TeamDetailRecord {
  id: string
  name: string
  email: string
  department: string
  role: string
  incidentsHandled: number
  leadsConverted: number
  slaAdherence: number
  avgResolutionDays: number
  escalations: number
}

export interface TeamChartData {
  performanceByTeam: Array<{ team: string; employees: number; incidents: number; slaAdherence: number }>
  workloadDistribution: Array<{ range: string; count: number }>
  productivityTrend: Array<{ month: string; avgIncidents: number; slaAdherence: number }>
}

export interface TeamReport {
  summary: {
    totalEmployees: MetricCard
    avgIncidentsHandled: MetricCard
    avgSlaAdherence: MetricCard
    avgResolutionTime: MetricCard
    totalEscalations: MetricCard
  }
  chartData: TeamChartData
  detailRecords: TeamDetailRecord[]
}

// Filter Options Types
export interface DateRangeOption {
  label: string
  value: string
}

export interface FilterOptions {
  dateRanges: DateRangeOption[]
  states: string[]
  serviceTypes: string[]
  statuses: {
    incidents: string[]
    leads: string[]
    subscribers: string[]
    disputes: string[]
    support: string[]
  }
}

// =============================================================================
// Component Props
// =============================================================================

export interface ReportsDashboardProps {
  /** Executive summary metrics across all domains */
  executiveSummary: ExecutiveSummary
  /** Incidents report data */
  incidentsReport: IncidentsReport
  /** Leads report data */
  leadsReport: LeadsReport
  /** Subscribers report data */
  subscribersReport: SubscribersReport
  /** Lawyers report data */
  lawyersReport: LawyersReport
  /** Partners report data */
  partnersReport: PartnersReport
  /** Payments report data */
  paymentsReport: PaymentsReport
  /** Disputes report data */
  disputesReport: DisputesReport
  /** Support report data */
  supportReport: SupportReport
  /** Team report data */
  teamReport: TeamReport
  /** Available filter options */
  filterOptions: FilterOptions
  /** Currently active tab */
  activeTab?: 'overview' | 'incidents' | 'leads' | 'subscribers' | 'lawyers' | 'partners' | 'payments' | 'disputes' | 'support' | 'team'
  /** Called when user switches tabs */
  onTabChange?: (tab: string) => void
  /** Called when user applies filters */
  onFilterChange?: (filters: ReportFilters) => void
  /** Called when user clicks a metric card to drill down */
  onMetricClick?: (metric: string, tab: string) => void
  /** Called when user exports a report */
  onExport?: (format: 'pdf' | 'csv', tab: string) => void
  /** Called when user exports a specific metric */
  onExportMetric?: (format: 'pdf' | 'csv', metric: string, tab: string) => void
}

export interface ReportFilters {
  dateRange?: string
  state?: string
  serviceType?: string
  subscriber?: string
  partner?: string
  lawyer?: string
  team?: string
  status?: string
}

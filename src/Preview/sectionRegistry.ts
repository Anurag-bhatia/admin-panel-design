import React from 'react'
import {
  AlertCircle,
  UserPlus,
  Users,
  UserCircle,
  Scale,
  Handshake,
  CreditCard,
  MessageSquare,
  HeadphonesIcon,
  BarChart3,
  UsersRound,
} from 'lucide-react'

// Lazy-loaded section preview components
const IncidentListPreview = React.lazy(() =>
  import('../sections/incidents/IncidentListPreview')
)
const LeadsDashboard = React.lazy(() =>
  import('../sections/sales-crm/LeadsDashboard')
)
const SubscribersDashboardPreview = React.lazy(() =>
  import('../sections/subscribers/SubscribersDashboardPreview')
)
const LawyerList = React.lazy(() =>
  import('../sections/lawyers/LawyerList')
)
const TeamManagement = React.lazy(() =>
  import('../sections/team/TeamManagement')
)
const PartnerListPreview = React.lazy(() =>
  import('../sections/partners/PartnerListPreview')
)
const ReportsDashboard = React.lazy(() =>
  import('../sections/reports/ReportsDashboard')
)
const SupportDashboard = React.lazy(() =>
  import('../sections/support/SupportDashboard')
)
const CustomerListView = React.lazy(() =>
  import('../sections/customers/CustomerListView')
)
const DisputeListPreview = React.lazy(() =>
  import('../sections/disputes/DisputeListPreview')
)
const PaymentsDashboardPreview = React.lazy(() =>
  import('../sections/payments/PaymentsDashboardPreview')
)

// Section metadata mapping
export const SECTION_DATA: Record<string, { label: string; description: string; icon: React.ComponentType<{ className?: string }> }> = {
  incidents: {
    label: 'Incidents',
    description: 'Core workflow for challan intake, screening, assignment, resolution tracking, and SLA enforcement with automated lawyer coordination.',
    icon: AlertCircle,
  },
  leads: {
    label: 'Sales CRM',
    description: 'Lead capture, qualification, and conversion tracking for prospective B2B clients with separate views for all leads and assigned leads.',
    icon: UserPlus,
  },
  subscribers: {
    label: 'Subscribers',
    description: 'Active client account management and relationship tracking for B2B fleet operators and companies.',
    icon: Users,
  },
  customers: {
    label: 'Registered Visitors',
    description: 'Visitor profile management and service delivery tracking for individual end-users and fleet operators.',
    icon: UserCircle,
  },
  lawyers: {
    label: 'Lawyers',
    description: 'Legal professional network management with performance tracking and commission calculation.',
    icon: Scale,
  },
  partners: {
    label: 'Partners',
    description: 'Partner relationship management for data sources, referral partners, and service delivery partners.',
    icon: Handshake,
  },
  payments: {
    label: 'Payments',
    description: 'Commission and refund payment processing with automated calculations and financial tracking.',
    icon: CreditCard,
  },
  disputes: {
    label: 'Disputes',
    description: 'Customer dispute resolution workflow for handling challenges regarding charges, refunds, or service outcomes.',
    icon: MessageSquare,
  },
  support: {
    label: 'Support',
    description: 'Support ticket management system for handling subscriber inquiries and issues.',
    icon: HeadphonesIcon,
  },
  reports: {
    label: 'Reports',
    description: 'Comprehensive reporting dashboards and analytics across all business metrics and operations.',
    icon: BarChart3,
  },
  team: {
    label: 'Team',
    description: 'User and team administration for managing internal operations staff and permissions.',
    icon: UsersRound,
  },
}

// Component mapping for implemented sections
export const SECTION_COMPONENTS: Record<string, React.ComponentType<any> | null> = {
  incidents: IncidentListPreview,
  leads: LeadsDashboard,
  subscribers: SubscribersDashboardPreview,
  customers: CustomerListView,
  lawyers: LawyerList,
  partners: PartnerListPreview,
  payments: PaymentsDashboardPreview,
  disputes: DisputeListPreview,
  support: SupportDashboard,
  reports: ReportsDashboard,
  team: TeamManagement,
}

// Ordered list of section IDs for consistent navigation
export const SECTION_IDS = [
  'incidents',
  'leads',
  'subscribers',
  'customers',
  'lawyers',
  'partners',
  'payments',
  'disputes',
  'support',
  'reports',
  'team',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export function isSectionId(value: unknown): value is SectionId {
  return typeof value === 'string' && SECTION_IDS.includes(value as SectionId)
}

export function getSectionLabel(sectionId: SectionId): string {
  return SECTION_DATA[sectionId]?.label || sectionId
}

export function getSectionIcon(sectionId: SectionId) {
  return SECTION_DATA[sectionId]?.icon
}

export function getSectionDescription(sectionId: SectionId): string {
  return SECTION_DATA[sectionId]?.description || ''
}

export function getComponentForSection(sectionId: SectionId): React.ComponentType<any> | null {
  return SECTION_COMPONENTS[sectionId] || null
}

export function isImplemented(sectionId: SectionId): boolean {
  return SECTION_COMPONENTS[sectionId] !== null
}

// Combined Data Model Types
// Each section defines its own types. This file provides a unified reference.
// For full type definitions, see the individual section types.ts files.

// Re-export core entity types from each section
export type { Incident, IncidentListProps, IncidentDetailProps } from '../sections/incidents/types'
export type { Lead, LeadsProps } from '../sections/sales-crm/types'
export type { Subscriber, SubscribersProps, SubscriberDetailProps } from '../sections/subscribers/types'
export type { Customer, CustomerListProps, CustomerDetailProps } from '../sections/customers/types'
export type { Lawyer, LawyersProps } from '../sections/lawyers/types'
export type { Partner, PartnerListProps, PartnerDetailProps } from '../sections/partners/types'
export type { Refund, PaymentsProps } from '../sections/payments/types'
export type { Dispute, DisputesDashboardProps } from '../sections/disputes/types'

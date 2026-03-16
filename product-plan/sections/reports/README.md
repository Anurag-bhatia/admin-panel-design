# Reports

## Overview

Centralized intelligence layer providing real-time, system-generated analytics across all business domains. Features an executive dashboard, domain-specific report tabs, drill-down capabilities, and export functionality with role-based access control.

## Components Provided

- `ReportsDashboard` — Main container with tab navigation
- `ExecutiveDashboard` — Landing view with summary cards
- `IncidentsTab` — Incident analytics
- `LeadsTab` — Lead analytics
- `SubscribersTab` — Subscriber analytics
- `PartnersTab` — Partner analytics
- `ChallanPayReportsTab` — ChallanPay-specific reports
- `MetricCard` — Reusable metric card with drill-down

## Callback Props

| Callback | Description |
|----------|-------------|
| `onTabChange` | Switch between report tabs |
| `onFilter` | Apply filters (date range, state, etc.) |
| `onDrillDown` | Click metric card for details |
| `onExport` | Export report data (CSV/PDF) |

## Data Used

**Entities:** ExecutiveSummary, IncidentReport, LeadReport, SubscriberReport, LawyerReport, PartnerReport, PaymentReport, DisputeReport, SupportReport, TeamReport

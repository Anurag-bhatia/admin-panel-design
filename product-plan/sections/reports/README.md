# Reports

## Overview

Centralized intelligence and decision-making layer with real-time dashboards across all business domains. All stakeholders work from the same source of truth.

## User Flows

- View Executive Dashboard with high-level summary cards
- Navigate between report tabs: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team
- Apply filters (date range, state, service type, subscriber, partner, lawyer, team, status)
- Click metric cards to drill down to data tables
- Export reports as PDF or CSV

## Design Decisions

- Executive Dashboard as landing view
- Top filter bar persists across tabs
- Click-to-drill-down from cards to tables
- Role-based tab visibility
- Multiple visualization types (cards, charts, tables)

## Data Used

**Entities:** All entities aggregated
**From global model:** Incident, Lead, Subscriber, Lawyer, Partner, Payment, Dispute, Support Ticket

## Components Provided

- **ReportsDashboard** — Main reports page with tab navigation and shared filter bar
- **ExecutiveDashboard** — High-level executive summary view with aggregated metrics across all domains
- **IncidentsTab** — Incidents-specific report tab with incident metrics, charts, and data tables
- **LeadsTab** — Leads-specific report tab with lead pipeline metrics and conversion data
- **SubscribersTab** — Subscribers-specific report tab with subscriber growth and retention metrics
- **PartnersTab** — Partners-specific report tab with partner performance and activation metrics
- **MetricCard** — Reusable metric card component for displaying individual KPIs with drill-down support

## Callback Props

| Callback | Description |
|----------|-------------|
| `onFilterChange` | Apply/remove filters |
| `onDrillDown` | Drill into metric details |
| `onExport` | Export report data |
| `onTabChange` | Switch report category |

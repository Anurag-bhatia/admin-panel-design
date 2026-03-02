# Reports Specification

## Overview
The Reports module serves as the centralized intelligence and decision-making layer of the platform, providing real-time, system-generated visibility into operations, sales, subscribers, partners, lawyers, payments, disputes, support, and internal teams. All stakeholders work from the same source of truth with data that is always current, auditable, and tied to actual system activity—eliminating manual reports and Excel-based analysis.

## User Flows
- User opens Reports section and sees an Executive Dashboard with high-level summary cards across all business domains
- User selects a specific report tab (Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, or Team) to view domain-specific metrics and analytics
- User applies filters from the top filter bar (date range, state, service type, subscriber, partner, lawyer, team, or status) to refine the data
- User clicks on metric cards to drill down and view underlying detailed records in expandable tables or modals
- User exports reports as PDF or CSV using global export button, per-metric export, or action menu options
- System enforces role-based access, showing only authorized report tabs to each user

## UI Requirements
- Executive Dashboard landing view with high-level summary cards aggregating key metrics across all domains
- Horizontal tab navigation for switching between report categories: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, and Team
- Top filter bar with common filters that persist across tabs: date range selector, state dropdown, service type, subscriber, partner, lawyer, team, and status filters
- Multiple visualization types within each tab: summary metric cards with large numbers and labels, charts and graphs (bar, line, pie) for trends and breakdowns, sortable data tables for detailed records, and trend indicators showing percentage changes or up/down arrows compared to previous periods
- Click-to-drill-down interaction: clicking a metric card expands to show a filtered data table below or in a modal overlay
- Export functionality accessible via: global export button in top-right corner (exports current tab with applied filters), per-metric export buttons on individual cards or tables, and export option in three-dot action menus
- Role-based visibility: only show tabs that the user has permission to access
- Mobile responsive design with stacked cards and horizontal scrolling for tables
- Full light and dark mode support across all visualizations and tables

## Configuration
- shell: true

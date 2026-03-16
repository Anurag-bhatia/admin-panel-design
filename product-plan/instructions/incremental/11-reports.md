# Milestone 11: Reports

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and at least some section milestones complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Reports module — the centralized intelligence and decision-making layer providing real-time analytics.

## Overview

The Reports module provides real-time, system-generated visibility into operations, sales, subscribers, partners, lawyers, payments, disputes, support, and internal teams. All stakeholders work from the same source of truth.

**Key Functionality:**
- Executive Dashboard with summary cards across all business domains
- Tab navigation: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team
- Top filter bar (date range, state, service type, subscriber, partner, lawyer, team, status)
- Metric cards with click-to-drill-down to detailed tables
- Charts (bar, line, pie) for trends and breakdowns
- Export (PDF/CSV) per tab or per metric
- Role-based tab visibility

## Recommended Approach: Test-Driven Development

See `product-plan/sections/reports/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `ReportsDashboard` — Main container with tab navigation
- `ExecutiveDashboard` — Landing view with summary cards
- `IncidentsTab` — Incident analytics
- `LeadsTab` — Lead analytics
- `SubscribersTab` — Subscriber analytics
- `PartnersTab` — Partner analytics
- `MetricCard` — Reusable metric card with drill-down

### Empty States

- **No data for period:** "No data available for the selected date range"
- **No data for tab:** Empty state per report category
- **No drill-down results:** "No detailed records found"

## Files to Reference

- `product-plan/sections/reports/README.md` — Feature overview
- `product-plan/sections/reports/tests.md` — Test-writing instructions
- `product-plan/sections/reports/components/` — React components
- `product-plan/sections/reports/types.ts` — TypeScript interfaces
- `product-plan/sections/reports/sample-data.json` — Test data

## Expected User Flows

### Flow 1: View Executive Dashboard
1. User navigates to Reports
2. Executive Dashboard shows summary cards for all domains
3. **Outcome:** High-level overview of all business metrics

### Flow 2: Drill Down into Metric
1. User clicks a metric card (e.g., "Total Incidents: 1,234")
2. Detailed table or expanded view appears below
3. **Outcome:** User sees the underlying records for that metric

### Flow 3: Filter and Export
1. User applies filters (date range, state, service type)
2. All metrics and charts update
3. User clicks Export → downloads CSV/PDF
4. **Outcome:** Filtered report exported

## Done When

- [ ] Tests written and passing
- [ ] Executive Dashboard renders with summary cards
- [ ] All 9 report tabs work
- [ ] Filters persist across tabs
- [ ] Metric card drill-down shows detailed data
- [ ] Charts render correctly
- [ ] Export works (CSV/PDF)
- [ ] Role-based tab visibility
- [ ] Empty states display properly
- [ ] Responsive on mobile

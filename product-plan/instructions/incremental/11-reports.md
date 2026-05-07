# Milestone 11: Reports

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Reports section — dashboards and analytics across all business metrics.

## Overview

The Reports module provides real-time visibility into operations, sales, subscribers, partners, lawyers, payments, disputes, support, and teams. All stakeholders work from the same source of truth.

**Key Functionality:**
- Executive Dashboard with high-level summary cards
- Tab navigation: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team
- Top filter bar with persistent filters (date range, state, service type, etc.)
- Click-to-drill-down from metric cards to data tables
- Export as PDF or CSV
- Role-based tab visibility

## Recommended Approach: Test-Driven Development

See `product-plan/sections/reports/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/reports/components/`:

- `ReportsDashboard` — Main reports view
- `ExecutiveDashboard` — High-level summary
- `MetricCard` — Reusable metric card component
- `IncidentsTab` — Incidents analytics
- `LeadsTab` — Leads analytics
- `SubscribersTab` — Subscriber analytics
- `PartnersTab` — Partner analytics
- `ChallanPayReportsTab` — ChallanPay analytics

### Expected User Flows

### Flow 1: View Executive Dashboard
1. User navigates to Reports
2. User sees high-level summary cards
3. User clicks a metric card to drill down
4. **Outcome:** Detailed data table shown

### Flow 2: Filter Reports
1. User selects "Incidents" tab
2. User applies date range and state filters
3. **Outcome:** Metrics and charts update with filtered data

### Flow 3: Export Report
1. User applies filters
2. User clicks "Export" button
3. User selects PDF or CSV
4. **Outcome:** Report downloaded

## Files to Reference

- `product-plan/sections/reports/components/`
- `product-plan/sections/reports/types.ts`
- `product-plan/sections/reports/sample-data.json`
- `product-plan/sections/reports/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Executive Dashboard renders correctly
- [ ] All report tabs show relevant metrics
- [ ] Filters persist across tabs
- [ ] Drill-down from cards works
- [ ] Export functionality works
- [ ] Role-based tab visibility works
- [ ] Responsive on mobile

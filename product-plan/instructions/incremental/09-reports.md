# Milestone 9: Reports

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

Implement the Reports feature — comprehensive reporting dashboards and analytics across all business metrics and operations.

## Overview

The Reports module serves as the centralized intelligence and decision-making layer of the platform, providing real-time, system-generated visibility into all business domains. All stakeholders work from the same source of truth with data that is always current, auditable, and tied to actual system activity.

**Key Functionality:**
- Executive Dashboard with high-level summary cards across all domains
- Tab-based navigation for domain-specific reports (Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team)
- Global filter bar (date range, state, service type, etc.)
- Click-to-drill-down from metric cards to detailed tables
- Export reports as PDF or CSV
- Role-based access to specific report tabs

## Recommended Approach: Test-Driven Development

See `product-plan/sections/reports/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/reports/components/`:

- `ReportsDashboard.tsx` — Main reports container
- `ExecutiveDashboard.tsx` — High-level summary view
- `FilterBar.tsx` — Global filter controls
- `MetricCard.tsx` — Reusable metric card component
- `IncidentsTab.tsx` — Incidents report tab
- `LeadsTab.tsx` — Leads report tab
- `SubscribersTab.tsx` — Subscribers report tab
- `PartnersTab.tsx` — Partners report tab
- `TeamTab.tsx` — Team report tab

### Data Layer

```typescript
interface MetricCard {
  value: number
  trend: number
  label: string
  description: string
}

interface ExecutiveSummary {
  incidents: { total: number; trend: number; /* domain metrics */ }
  leads: { total: number; trend: number; /* domain metrics */ }
  subscribers: { total: number; trend: number; /* domain metrics */ }
  lawyers: { total: number; trend: number; /* domain metrics */ }
  partners: { total: number; trend: number; /* domain metrics */ }
  payments: { total: number; trend: number; /* domain metrics */ }
  disputes: { total: number; trend: number; /* domain metrics */ }
  support: { total: number; trend: number; /* domain metrics */ }
  team: { total: number; trend: number; /* domain metrics */ }
}

interface ReportFilters {
  dateRange?: string
  state?: string
  serviceType?: string
  subscriber?: string
  partner?: string
  lawyer?: string
  team?: string
  status?: string
}
```

### Callbacks

| Callback | Description |
|----------|-------------|
| `onTabChange` | User switches between report tabs |
| `onFilterChange` | User applies filters |
| `onMetricClick` | User clicks metric card to drill down |
| `onExport` | User exports report (PDF/CSV) |
| `onExportMetric` | User exports specific metric data |

### Empty States

- **No data for period:** "No data available for the selected date range"
- **No matching records:** "No records match the applied filters"

## Expected User Flows

### Flow 1: View Executive Dashboard

1. User opens Reports section
2. Executive Dashboard displays with summary cards
3. User sees high-level metrics across all domains
4. **Outcome:** Quick overview of business health

### Flow 2: Drill Down to Details

1. User clicks on a metric card (e.g., "Total Incidents")
2. Detailed table or modal opens below the card
3. User sees underlying records contributing to that metric
4. **Outcome:** Detailed data behind the summary number

### Flow 3: Apply Filters

1. User selects date range from filter bar
2. User adds state filter
3. All metrics and tables update
4. **Outcome:** Reports filtered to selected criteria

### Flow 4: Export Report

1. User clicks Export button
2. User selects format (PDF or CSV)
3. Report downloads with current filters applied
4. **Outcome:** Report file downloaded

## Done When

- [ ] Tests written and passing
- [ ] Executive Dashboard shows all domain summaries
- [ ] Tab navigation works for all 9 report tabs
- [ ] Filter bar applies filters across all tabs
- [ ] Metric cards show value, trend, and description
- [ ] Click-to-drill-down works on metric cards
- [ ] Export to PDF works
- [ ] Export to CSV works
- [ ] Role-based tab visibility works
- [ ] Charts render correctly (bar, line, pie)
- [ ] Data tables are sortable
- [ ] Empty states display properly
- [ ] Responsive on mobile

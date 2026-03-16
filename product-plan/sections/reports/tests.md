# Test Instructions: Reports

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the analytics module including executive dashboard, 9 report tabs, filter bar, metric drill-down, chart rendering, export, and role-based visibility.

---

## User Flow Tests

### Flow 1: View Executive Dashboard

**Steps:**
1. Navigate to Reports

**Expected Results:**
- [ ] Executive Dashboard shows summary cards
- [ ] Cards display metrics across all domains
- [ ] Trend indicators visible (up/down arrows)

### Flow 2: Drill Down into Metric

**Steps:**
1. Click a metric card (e.g., "Total Incidents")
2. Detailed view expands

**Expected Results:**
- [ ] Detailed data table or chart appears
- [ ] Data corresponds to the metric clicked

### Flow 3: Filter and Export

**Steps:**
1. Select date range
2. Apply state filter
3. Click Export

**Expected Results:**
- [ ] All metrics update with filtered data
- [ ] Export downloads filtered report (CSV/PDF)

### Flow 4: Tab Navigation

**Steps:**
1. Click through tabs: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team

**Expected Results:**
- [ ] Each tab shows domain-specific metrics
- [ ] Filters persist across tabs

---

## Empty State Tests

- [ ] No data for period: "No data available for the selected date range"
- [ ] Empty report tab: helpful message per category
- [ ] No drill-down results: "No detailed records found"

---

## Sample Test Data

```typescript
const mockExecutiveSummary = {
  totalIncidents: 1234,
  totalLeads: 567,
  totalSubscribers: 89,
  totalLawyers: 45,
  totalPartners: 23,
  conversionRate: 0.34,
  revenueThisMonth: 1500000,
};
```

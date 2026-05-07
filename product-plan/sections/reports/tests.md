# Test Instructions: Reports

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Reports module provides dashboards and analytics with an Executive Dashboard, category tabs, persistent filters, and drill-down capabilities.

---

## User Flow Tests

### Flow 1: View Executive Dashboard

**Steps:**
1. User navigates to Reports
2. Executive Dashboard loads

**Expected Results:**
- [ ] High-level summary cards display across all domains
- [ ] Cards show large numbers with labels
- [ ] Trend indicators visible (up/down arrows, percentage changes)

### Flow 2: Navigate Report Tabs

**Steps:**
1. User clicks "Incidents" tab
2. User clicks "Leads" tab
3. User clicks other tabs

**Expected Results:**
- [ ] Each tab shows domain-specific metrics
- [ ] Charts and tables appropriate to domain
- [ ] Tab visually highlighted when active

### Flow 3: Apply Filters

**Steps:**
1. User selects date range
2. User selects state from dropdown
3. User selects service type

**Expected Results:**
- [ ] Metrics update based on filters
- [ ] Filters persist across tab switches
- [ ] Clear filters option available

### Flow 4: Drill Down

**Steps:**
1. User clicks a metric card
2. Detailed data appears

**Expected Results:**
- [ ] Filtered data table shown below or in modal
- [ ] Data matches the metric that was clicked
- [ ] Can navigate back to summary

### Flow 5: Export Report

**Steps:**
1. User applies filters
2. User clicks "Export" button
3. User selects format (PDF or CSV)

**Expected Results:**
- [ ] Export includes current tab data with applied filters
- [ ] File downloads correctly
- [ ] Per-metric export also available

### Flow 6: Role-Based Visibility

**Setup:** Users with different roles

**Expected Results:**
- [ ] Only authorized tabs visible per role
- [ ] Unauthorized tabs hidden entirely
- [ ] Data scoped to user's permissions

---

## Empty State Tests

### No Data for Tab
- [ ] Tab shows empty state with helpful message
- [ ] Metric cards show zero values

### No Data for Filtered Period
- [ ] Charts and tables show empty state
- [ ] "No data for selected period" message

---

## Edge Cases

- [ ] Dashboard handles missing data gracefully
- [ ] Charts render with small and large datasets
- [ ] Mobile responsive (stacked cards, horizontal scrolling tables)
- [ ] Dark mode support across all visualizations
- [ ] Multiple visualization types render correctly (bar, line, pie charts)

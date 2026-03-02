# Test Instructions: Reports

## Overview

Test executive dashboard, tab navigation, filtering, drill-down, and export.

---

## User Flow Tests

### Flow 1: Apply Filters

**Steps:**
1. Select date range "Last 30 days"
2. Select state "Maharashtra"

**Expected Results:**
- [ ] All metrics update with filtered data
- [ ] Filter selections persist across tabs

### Flow 2: Drill Down

**Steps:**
1. Click metric card "Total Incidents"
2. Detailed table appears

**Expected Results:**
- [ ] Table shows underlying records
- [ ] Records match the metric count

### Flow 3: Export Report

**Steps:**
1. Click Export button
2. Select PDF format

**Expected Results:**
- [ ] Report downloads with current filters
- [ ] PDF is properly formatted

---

## Empty State Tests

- [ ] No data for period: "No data available for the selected date range"

---

## Sample Test Data

```typescript
const mockMetric = {
  value: 1234,
  trend: 12.5,
  label: "Total Incidents",
  description: "All incidents in selected period"
};
```

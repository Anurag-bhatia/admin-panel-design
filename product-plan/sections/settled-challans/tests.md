# Test Instructions: Settled Challans

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the read-only settled challans archive including table display, search, filtering, export, and pagination. No create/edit/delete operations.

---

## User Flow Tests

### Flow 1: Search Settled Challans

**Steps:**
1. Enter search term (vehicle number, challan number, or subscriber name)
2. Table filters

**Expected Results:**
- [ ] Only matching records displayed
- [ ] Search works across all visible columns

### Flow 2: Filter by Criteria

**Steps:**
1. Apply date range filter
2. Apply subscriber filter
3. Apply state filter
4. Apply amount filter

**Expected Results:**
- [ ] Table shows only matching records
- [ ] Multiple filters combine (AND logic)

### Flow 3: Export Data

**Steps:**
1. Apply desired filters
2. Click "Export"

**Expected Results:**
- [ ] CSV/Excel file downloads
- [ ] File contains only filtered data

### Flow 4: Pagination

**Steps:**
1. Navigate to page 2
2. Change items per page

**Expected Results:**
- [ ] Correct page of data displayed
- [ ] Items per page selector works

---

## Empty State Tests

- [ ] No settled challans: "No settled challans yet"
- [ ] No search results: "No challans match your search"
- [ ] No filter results: "No challans match the selected filters"

---

## Component Interaction Tests

- [ ] Table is read-only — no row click navigation
- [ ] No edit/delete actions available
- [ ] Columns: Vehicle No, Subscriber, Challan No, Offence Name

---

## Sample Test Data

```typescript
const mockSettledChallan = {
  id: "SC-001",
  vehicleNo: "DL-01-AB-1234",
  subscriberName: "Fleet Corp",
  challanNo: "CH-2025-67890",
  offenceName: "Speeding",
  amount: 2000,
  settledDate: "2025-11-30",
};

const mockEmptyList = [];
```

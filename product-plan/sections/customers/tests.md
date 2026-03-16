# Test Instructions: Customers (Registered Visitors)

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test D2C visitor management including list view, add/bulk upload, and 5-tab detail page (Details, Incidents, Challans, Vehicles, Financials).

---

## User Flow Tests

### Flow 1: Add New Visitor

**Steps:**
1. Click "Add New Visitor"
2. Fill name, mobile, email
3. Submit

**Expected Results:**
- [ ] Visitor appears in list
- [ ] Visitor ID auto-generated
- [ ] Success notification shown

### Flow 2: View Visitor Detail

**Steps:**
1. Click visitor row
2. Navigate 5 tabs

**Expected Results:**
- [ ] Details tab: name, contact, account dates, vehicle/incident counts
- [ ] Incidents tab: linked incidents with status
- [ ] Challans tab: challan records with payment status
- [ ] Vehicles tab: associated vehicles
- [ ] Financials tab: read-only financial summary (payments, refunds, spend)

### Flow 3: Bulk Upload

**Steps:**
1. Click "Bulk Upload Visitors"
2. Upload CSV/Excel file

**Expected Results:**
- [ ] Visitors created from file
- [ ] Validation feedback shown

---

## Empty State Tests

- [ ] No visitors: "No registered visitors yet" with add CTA
- [ ] No incidents for visitor: empty Incidents tab
- [ ] No vehicles: empty Vehicles tab
- [ ] Empty financials: "No financial activity yet"

---

## Sample Test Data

```typescript
const mockCustomer = {
  id: "VIS-001",
  name: "Rahul Sharma",
  mobile: "+91-9876543210",
  email: "rahul@gmail.com",
  vehicleCount: 2,
  incidentCount: 3,
  createdAt: "2025-11-15T10:00:00Z",
};
```

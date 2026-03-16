# Test Instructions: Payments

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the unified payments workspace including sidebar navigation, refund processing, lawyer fee tracking, partner payouts, cross-section navigation, and export.

---

## User Flow Tests

### Flow 1: Process Refund

**Steps:**
1. Navigate to Refunds via sidebar
2. Select refunds in "Refund Raised" stage
3. Click "Approve" in bulk actions
4. Confirm

**Expected Results:**
- [ ] Selected refunds status updates
- [ ] Stage tab counts update
- [ ] Confirmation shown

### Flow 2: View Refund Detail

**Steps:**
1. Click a refund row
2. Detail view opens with Activity and Notes tabs

**Expected Results:**
- [ ] Refund details display (ID, amount, linked incident, status)
- [ ] Activity tab shows action history
- [ ] Notes tab allows adding notes

### Flow 3: Navigate to Lawyer Profile

**Steps:**
1. Click "Lawyer Fees" in sidebar
2. Click a lawyer fee row

**Expected Results:**
- [ ] Navigates to Lawyer Profile in Lawyers section

### Flow 4: Export

**Steps:**
1. Apply filters
2. Click Export

**Expected Results:**
- [ ] CSV/Excel file downloads with filtered data

---

## Empty State Tests

- [ ] No refunds: "No refunds yet"
- [ ] No lawyer fees: "No lawyer fees yet"
- [ ] No partner payouts: "No partner payouts yet"

---

## Sample Test Data

```typescript
const mockRefund = {
  id: "REF-001",
  linkedIncident: "IRN-12345",
  customer: "Fleet Corp",
  amount: 5000,
  status: "refundRaised",
  initiatedBy: "System",
  date: "2025-12-01",
};

const mockLawyerFee = {
  id: "LF-001",
  lawyerName: "Priya Sharma",
  incidentId: "IRN-12345",
  amount: 3000,
  status: "toPay",
};
```

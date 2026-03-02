# Test Instructions: Lawyers

## Overview

Test lawyer list, 7-step onboarding, profile view, KYC documents, and invoicing.

---

## User Flow Tests

### Flow 1: Add Lawyer (7-Step Onboarding)

**Steps:**
1. Click "Add Lawyer"
2. Complete Step 1: Basic Info
3. Complete Step 2: Address
4. Complete Step 3: Qualifications
5. Complete Step 4: KYC Documents
6. Complete Step 5: Bank Details
7. Complete Step 6: Expertise
8. Complete Step 7: Company (optional)
9. Submit

**Expected Results:**
- [ ] Progress indicator shows current step
- [ ] Each step validates before proceeding
- [ ] KYC document uploads work
- [ ] Lawyer created with "Incomplete" onboarding status

### Flow 2: View Lawyer Profile

**Steps:**
1. Click lawyer row
2. Navigate all 4 tabs

**Expected Results:**
- [ ] Details tab shows all info sections
- [ ] Incidents tab shows assigned incidents
- [ ] Invoicing tab shows pending amounts
- [ ] Transactions tab shows payment history

### Flow 3: Raise Invoice

**Steps:**
1. Go to Invoicing tab
2. Click "Raise Invoice"

**Expected Results:**
- [ ] Invoice generated for pending commissions
- [ ] Success message shown

---

## Empty State Tests

- [ ] No lawyers: "No lawyers in your network yet"
- [ ] No incidents assigned: "No incidents assigned to this lawyer yet"
- [ ] No pending invoices: "No payments pending to invoice"

---

## Sample Test Data

```typescript
const mockLawyer = {
  id: "law-001",
  lawyerId: "LAW-12345",
  firstName: "Priya",
  lastName: "Sharma",
  onboardingStatus: "Complete",
  kycStatus: "Verified",
  activityState: "Active"
};
```

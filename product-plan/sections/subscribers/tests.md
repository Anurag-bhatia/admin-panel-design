# Test Instructions: Subscribers

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test subscriber lifecycle management including list view, CRUD operations, bulk upload, and the 7-tab detail page (Details, Challans, Incidents, Documents, Subscription, Wallet, Team).

---

## User Flow Tests

### Flow 1: Add Subscriber

**Steps:**
1. User clicks "Add Subscriber"
2. Fills Source, Type, Company Name, Contact Person, Phone, Email, State, City, Owner
3. Submits

**Expected Results:**
- [ ] Subscriber appears in list with Active status (green pill)
- [ ] Subs-ID auto-generated
- [ ] Success notification shown

**Failure Path:** Required fields missing shows validation errors

### Flow 2: View Detail Page with 7 Tabs

**Steps:**
1. User clicks subscriber row
2. Full-screen detail opens
3. User navigates all 7 tabs

**Expected Results:**
- [ ] Header shows subscriber name, ID, status badge, "Edit Details" button
- [ ] Details tab: company info, contact, address
- [ ] Challans tab: linked challans with status
- [ ] Incidents tab: linked incidents
- [ ] Documents tab: uploaded files
- [ ] Subscription tab: plan details, billing
- [ ] Wallet tab: payments, credits, invoices
- [ ] Team tab: assigned team members

### Flow 3: Bulk Upload

**Steps:**
1. Click "Bulk Upload Subscriber"
2. Download template, fill, upload

**Expected Results:**
- [ ] Template downloads
- [ ] Subscribers created from file
- [ ] Validation errors per row shown

---

## Empty State Tests

- [ ] No subscribers: "No subscribers yet" with add CTA
- [ ] No challans for subscriber: empty Challans tab
- [ ] No documents: empty Documents tab with upload prompt
- [ ] Empty wallet: "No transactions yet"

---

## Sample Test Data

```typescript
const mockSubscriber = {
  id: "SUB-001",
  source: "Sales",
  companyName: "Fleet Corp",
  contactPerson: "Amit Singh",
  phone: "+91-9876543210",
  email: "amit@fleetcorp.com",
  status: "active",
  owner: "Sales Team",
  subscription: { plan: "Enterprise", status: "active" },
  vehicleCount: 45,
};
```

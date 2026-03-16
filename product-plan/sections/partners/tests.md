# Test Instructions: Partners

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test partner management including list, 4-step onboarding, detail page with 5 tabs, status toggle, and linked subscriber/incident views.

---

## User Flow Tests

### Flow 1: Onboard New Partner (4-Step Stepper)

**Steps:**
1. Click "Add Partner"
2. Step 1: Personal (first name, last name, email, mobile, password)
3. Step 2: Company (company name, email, phone, address)
4. Step 3: Service Scope (products/services, subscriber types)
5. Step 4: Permissions & Bank (bank details, system permissions)
6. Submit

**Expected Results:**
- [ ] Stepper shows progress
- [ ] Partner appears in list as active
- [ ] Success notification shown

### Flow 2: View Partner Detail

**Steps:**
1. Click partner row
2. Navigate 5 tabs

**Expected Results:**
- [ ] Profile tab: personal and company info
- [ ] Subscribers tab: linked subscribers table
- [ ] Financial tab: earnings, payout history
- [ ] Documents tab: GST, PAN, etc.
- [ ] Activity tab: chronological log

### Flow 3: Toggle Status

**Steps:**
1. Click deactivate on active partner
2. Confirm

**Expected Results:**
- [ ] Status changes to inactive
- [ ] Cannot onboard new subscribers
- [ ] Historical data preserved

---

## Empty State Tests

- [ ] No partners: "No partners yet" with add CTA
- [ ] No subscribers for partner: empty Subscribers tab
- [ ] No payouts: empty Financial tab
- [ ] No documents: empty Documents tab

---

## Sample Test Data

```typescript
const mockPartner = {
  id: "PTR-001",
  firstName: "Vikram",
  lastName: "Patel",
  email: "vikram@partner.com",
  mobile: "+91-9876543210",
  companyName: "Partner Solutions",
  status: "active",
  subscriberCount: 12,
};
```

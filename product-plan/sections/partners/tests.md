# Test Instructions: Partners

## Overview

Test partner list, 4-step onboarding, detail view, and status management.

---

## User Flow Tests

### Flow 1: Add Partner (4-Step Onboarding)

**Steps:**
1. Click "Add Partner"
2. Step 1: Personal identity & login
3. Step 2: Company details
4. Step 3: Service scope
5. Step 4: Permissions & bank account
6. Submit

**Expected Results:**
- [ ] Each step validates before proceeding
- [ ] Partner created with active status

### Flow 2: Toggle Partner Status

**Steps:**
1. Click "Deactivate" on active partner
2. Confirm

**Expected Results:**
- [ ] Partner moved to inactive
- [ ] Cannot onboard new subscribers

---

## Empty State Tests

- [ ] No partners: "No partners onboarded yet"
- [ ] No linked subscribers: "No subscribers linked to this partner"

---

## Sample Test Data

```typescript
const mockPartner = {
  id: "par-001",
  partnerId: "PAR-12345",
  firstName: "Amit",
  companyName: "Fleet Solutions",
  status: "active"
};
```

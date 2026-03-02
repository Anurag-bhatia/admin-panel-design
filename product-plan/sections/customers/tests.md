# Test Instructions: Customers

## Overview

Test customer list, search, add/edit, and detail view with incident management.

---

## User Flow Tests

### Flow 1: Search Customers

**Steps:**
1. Enter mobile number in search
2. Press Enter

**Expected Results:**
- [ ] Matching customers displayed
- [ ] No results shows empty state with clear option

### Flow 2: Create Incident for Customer

**Steps:**
1. Open customer detail
2. Click "Create Incident"
3. Fill incident details
4. Save

**Expected Results:**
- [ ] Incident created and linked to customer
- [ ] Appears in customer's Incidents tab

---

## Empty State Tests

- [ ] No customers: "No customers registered yet"
- [ ] No incidents: "No incidents for this customer"
- [ ] No vehicles: "No vehicles linked"

---

## Sample Test Data

```typescript
const mockCustomer = {
  id: "cust-001",
  customerId: "CUST-12345",
  name: "Rajesh Kumar",
  mobile: "+91 98765 43210",
  totalVehicles: 2,
  totalIncidents: 3
};
```

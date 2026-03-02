# Test Instructions: Team

## Overview

Test employee/team lists, 2-step onboarding, permissions management, and status toggles.

---

## User Flow Tests

### Flow 1: Add Employee (2-Step Onboarding)

**Steps:**
1. Click "Add Employee"
2. Step 1: Fill profile info
3. Step 2: Set up login credentials
4. Submit

**Expected Results:**
- [ ] Progress shows "Step 1 of 2"
- [ ] Password has security rules
- [ ] Employee created with active status
- [ ] Appears in employee list

### Flow 2: Manage Permissions

**Steps:**
1. Click "Manage Permissions" on employee
2. Check Module Access checkboxes
3. Check Flow Access checkboxes per module
4. Save

**Expected Results:**
- [ ] Dedicated permissions page opens
- [ ] Module Access shows all sections
- [ ] Flow Access shows actions per enabled module
- [ ] Permissions applied instantly

### Flow 3: Deactivate Employee

**Steps:**
1. Click "Deactivate" on employee
2. Confirm

**Expected Results:**
- [ ] Confirmation dialog appears
- [ ] Employee deactivated
- [ ] Access revoked
- [ ] Removed from active assignments
- [ ] Historical data preserved

---

## Empty State Tests

- [ ] No employees: "No employees added yet"
- [ ] No teams: "No teams created yet"

---

## Sample Test Data

```typescript
const mockEmployee = {
  id: "emp-001",
  fullName: "Priya Sharma",
  department: "Operations",
  designation: "Team Lead",
  status: "active"
};
```

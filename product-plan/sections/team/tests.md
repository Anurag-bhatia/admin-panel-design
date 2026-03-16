# Test Instructions: Team

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test employee and team management including 3-step onboarding wizard, employee detail with permissions, status lifecycle, and team CRUD.

---

## User Flow Tests

### Flow 1: Add Employee (3-Step Wizard)

**Steps:**
1. Click "Add Employee"
2. Step 1: Profile Info (photo, name, email, mobile, department, designation, reporting managers)
3. Step 2: Credentials (official email, password)
4. Step 3: Permissions (module/flow toggles)
5. Submit

**Expected Results:**
- [ ] Step indicator shows 1/2/3 progress
- [ ] Each step validates before next
- [ ] Employee appears in list with active status
- [ ] Credentials ready for login

**Failure Path:** Weak password shows error, step 2 blocks

### Flow 2: Manage Permissions

**Steps:**
1. Click employee row → Detail page
2. Navigate to Permissions tab
3. Toggle a module switch off
4. Observe child flows greyed out
5. Click "Save"

**Expected Results:**
- [ ] Module switch disables all child flows visually
- [ ] Re-enabling module re-enables child flows
- [ ] Save persists changes
- [ ] Change logged in audit trail

### Flow 3: Create Team

**Steps:**
1. Switch to Teams tab
2. Click "Create Team"
3. Fill name, department, team lead, members
4. Submit

**Expected Results:**
- [ ] Team appears in teams table
- [ ] Member count correct

### Flow 4: Deactivate Employee

**Steps:**
1. Open employee detail
2. Click "Deactivate"
3. Confirm in dialog

**Expected Results:**
- [ ] Employee status changes to inactive
- [ ] Access revoked
- [ ] Removed from active assignments
- [ ] Historical data preserved

---

## Empty State Tests

- [ ] No employees: "No employees yet" with add CTA
- [ ] No teams: "No teams yet" with create CTA

---

## Sample Test Data

```typescript
const mockEmployee = {
  id: "EMP-001",
  firstName: "Ankit",
  lastName: "Verma",
  email: "ankit@company.com",
  mobile: "+91-9876543210",
  department: "Operations",
  designation: "Manager",
  status: "active",
  permissions: {
    moduleAccess: { incidents: true, leads: true, subscribers: false },
    flowAccess: { validate: true, screen: true, assignLawyer: true },
  },
};

const mockTeam = {
  id: "TEAM-001",
  name: "Operations Alpha",
  department: "Operations",
  teamLead: "Ankit Verma",
  memberCount: 8,
  status: "active",
};
```

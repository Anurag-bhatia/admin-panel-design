# Test Instructions: Lawyers

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test lawyer network management including Active/Inactive tabs, 7-step onboarding wizard, profile page with 4 tabs, KYC document management, and status lifecycle.

---

## User Flow Tests

### Flow 1: Onboard New Lawyer (7-Step Wizard)

**Steps:**
1. Click "Add Lawyer"
2. Step 1: Basic Info (category, name, email, mobile, gender, DOB)
3. Step 2: Address (current + permanent, "same as current" checkbox)
4. Step 3: Qualifications & Experience
5. Step 4: KYC (Aadhaar, PAN, DL, cheque, Bar ID, BALLB uploads)
6. Step 5: Bank Details (account holder, number, bank, IFSC)
7. Step 6: Expertise & Preferences (languages, locations, case types)
8. Step 7: Company Details (conditional)
9. Submit

**Expected Results:**
- [ ] Progress indicator shows current step
- [ ] Each step validates before allowing next
- [ ] Lawyer appears in Active tab after completion
- [ ] Status badges: "Onboarding Complete", "KYC Pending"

**Failure Path:** Invalid email/mobile shows field-level errors

### Flow 2: View Lawyer Profile

**Steps:**
1. Click lawyer row
2. Navigate 4 tabs

**Expected Results:**
- [ ] Header: photo, name, status badges, ID, contact
- [ ] Details tab: all profile sections
- [ ] Incidents tab: assigned incidents table
- [ ] Invoicing tab: pending invoices
- [ ] Transactions tab: payment history

### Flow 3: Deactivate Lawyer

**Steps:**
1. Actions dropdown → "Deactivate"
2. Confirm in dialog

**Expected Results:**
- [ ] Lawyer moves to Inactive tab
- [ ] Active count decreases, Inactive count increases
- [ ] Removed from assignment eligibility
- [ ] Historical data preserved

---

## Empty State Tests

- [ ] No lawyers: "No lawyers yet" with add CTA
- [ ] No incidents assigned: empty Incidents tab
- [ ] No invoices: empty Invoicing tab
- [ ] No transactions: empty Transactions tab

---

## Sample Test Data

```typescript
const mockLawyer = {
  id: "LAW-001",
  name: "Priya Sharma",
  email: "priya@legal.com",
  mobile: "+91-9876543210",
  category: "Motor Vehicle Act",
  kycStatus: "verified",
  onboardingStatus: "complete",
  isActive: true,
};
```

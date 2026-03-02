# Milestone 6: Lawyers

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Lawyers feature — the central system for managing the platform's external legal network with onboarding, credentialing, and compliance tracking.

## Overview

The Lawyers module replaces manual Excel tracking with a structured system for onboarding, credentialing, and managing lawyers who resolve challans and legal cases. It provides full visibility into credentials, compliance status, expertise, and lifecycle management.

**Key Functionality:**
- View lawyer list with Active/Inactive tabs and counts
- Search and filter by name, email, category, KYC status
- Add lawyers via multi-step onboarding wizard (7 steps)
- View lawyer profiles with all credentials and details
- Edit lawyer information
- Review and verify KYC documents
- Deactivate/reactivate lawyers
- Track assigned incidents, pending invoices, and payment history

## Recommended Approach: Test-Driven Development

See `product-plan/sections/lawyers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/lawyers/components/`:

- `Lawyers.tsx` — Main lawyers management view
- `LawyerList.tsx` — Lawyer list with tabs
- `LawyerTable.tsx` — Lawyer data table
- `LawyerRow.tsx` — Individual lawyer row
- `LawyerForm.tsx` — Multi-step onboarding wizard
- `LawyerProfile.tsx` — Full lawyer profile with tabs

### Data Layer

```typescript
interface Lawyer {
  id: string
  lawyerId: string
  photo: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  category: string
  subCategory: string
  currentAddress: Address
  permanentAddress: Address
  qualifications: Qualification[]
  experience: Experience[]
  kycDocuments: KYCDocuments
  bankDetails: BankDetails
  expertise: Expertise
  company: CompanyDetails | null
  onboardingStatus: 'Complete' | 'Incomplete'
  kycStatus: 'Verified' | 'Pending' | 'Missing'
  activityState: 'Active' | 'Inactive'
  source: string
}

interface KYCDocuments {
  aadhaar: { number: string; documentUrl: string | null }
  pan: { number: string; documentUrl: string | null }
  drivingLicence: { documentUrl: string | null }
  cancelledCheque: { documentUrl: string | null }
  barId: { number: string; documentUrl: string | null }
  ballbCertificate: { documentUrl: string | null }
}
```

### Callbacks

| Callback | Description |
|----------|-------------|
| `onView` | User views lawyer profile |
| `onEdit` | User edits lawyer details |
| `onDeactivate` | User deactivates lawyer |
| `onReactivate` | User reactivates lawyer |
| `onAdd` | User adds new lawyer |
| `onViewDocument` | User views/downloads KYC document |
| `onSearch` | User searches lawyers |
| `onFilterByActivity` | User filters by Active/Inactive |
| `onFilterByKYC` | User filters by KYC status |
| `onRaiseInvoice` | User raises invoice for lawyer |

### Empty States

- **No lawyers:** "No lawyers in your network yet"
- **No active lawyers:** "No active lawyers"
- **No inactive lawyers:** "No inactive lawyers"
- **No assigned incidents:** "No incidents assigned to this lawyer yet"
- **No pending invoices:** "No payments pending to invoice"
- **No transactions:** "No payment transactions yet"

## Expected User Flows

### Flow 1: Add New Lawyer (Onboarding)

1. User clicks "Add Lawyer" button
2. Step 1: Enter basic info (category, name, email, mobile, DOB)
3. Step 2: Enter current and permanent address
4. Step 3: Add qualifications and experience
5. Step 4: Upload KYC documents (Aadhaar, PAN, DL, etc.)
6. Step 5: Enter bank account details
7. Step 6: Set expertise and preferences
8. Step 7: Add company details (if applicable)
9. User clicks "Submit"
10. **Outcome:** Lawyer created with Incomplete onboarding status, pending KYC verification

### Flow 2: View Lawyer Profile

1. User clicks on lawyer row or "View Profile" action
2. Profile page opens with header showing status badges
3. User navigates tabs: Details, Incidents, Invoicing, Transactions
4. **Outcome:** All lawyer information accessible

### Flow 3: Deactivate Lawyer

1. User clicks "Deactivate" action on lawyer
2. Confirmation dialog appears
3. User confirms deactivation
4. **Outcome:** Lawyer moved to Inactive tab, removed from assignment pool

### Flow 4: Raise Invoice

1. User navigates to lawyer's Invoicing tab
2. User sees pending commissions table
3. User clicks "Raise Invoice" button
4. **Outcome:** Invoice generated for pending amounts

## Done When

- [ ] Tests written and passing
- [ ] Active/Inactive tabs display with counts
- [ ] Lawyer table renders with status badges
- [ ] 7-step onboarding wizard works
- [ ] Profile view shows all 4 tabs
- [ ] KYC documents can be viewed/downloaded
- [ ] Deactivate/Reactivate works
- [ ] Raise Invoice functionality works
- [ ] Only lawyers with completed KYC can be active
- [ ] Empty states display properly
- [ ] Search and filter work
- [ ] Responsive on mobile

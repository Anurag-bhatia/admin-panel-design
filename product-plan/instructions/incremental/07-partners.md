# Milestone 7: Partners

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

Implement the Partners feature — manage external business introducers who onboard subscribers on the platform.

## Overview

The Partners module manages partner relationships with subscribers, tracks earnings and payouts, and provides visibility into partner performance. Partners can create and view subscribers linked to them, access metrics, and view read-only incidents related to their subscribers.

**Key Functionality:**
- View partner list with search, filter, and sort
- Add partners via 4-step onboarding flow
- View partner details with tabbed navigation
- Toggle partner status (active/inactive)
- View linked subscribers
- Track system-calculated earnings and payout history
- Manage partner documents
- View activity log

## Recommended Approach: Test-Driven Development

See `product-plan/sections/partners/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/partners/components/`:

- `PartnersDashboard.tsx` — Main partners view
- `PartnerList.tsx` — Partner list with filters
- `PartnersListHeader.tsx` — Header with search and actions
- `AddPartner.tsx` — 4-step partner onboarding
- `EditPartner.tsx` — Edit partner modal
- `PartnerDetail.tsx` — Full partner detail page

### Data Layer

```typescript
interface Partner {
  id: string
  partnerId: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  companyName: string
  officialEmail: string
  phone: string
  address: string
  country: string
  state: string
  city: string
  pinCode: string
  website?: string
  productsAllowed: string[]
  subscriberTypesAllowed: string[]
  bankAccountNumber: string
  bankName: string
  status: 'active' | 'inactive'
  dateOnboarded: string
  linkedSubscribers: LinkedSubscriber[]
  earnings: number
  totalPayouts: number
  payoutHistory: Payout[]
  documents: Document[]
  activityLog: ActivityLogEntry[]
}

interface LinkedSubscriber {
  id: string
  name: string
  company: string
  mobile: string
  status: 'active' | 'inactive' | 'paused'
  dateSubscribed: string
  incidentCount: number
}
```

### Callbacks

| Callback | Description |
|----------|-------------|
| `onCreate` | User creates new partner |
| `onView` | User views partner details |
| `onToggleStatus` | User toggles active/inactive |
| `onSearch` | User searches partners |
| `onFilterStatus` | User filters by status |
| `onSort` | User sorts by column |
| `onEditPartner` | User edits partner info |
| `onViewIncidents` | User views subscriber incidents |
| `onUploadDocument` | User uploads document |
| `onDeleteDocument` | User deletes document |

### Empty States

- **No partners:** "No partners onboarded yet"
- **No linked subscribers:** "No subscribers linked to this partner"
- **No payouts:** "No payouts processed yet"
- **No documents:** "No documents uploaded"

## Expected User Flows

### Flow 1: Add Partner (4-Step Onboarding)

1. User clicks "Add Partner" button
2. Step 1: Personal identity & login (name, email, mobile, password)
3. Step 2: Company details (company name, address, contact)
4. Step 3: Service scope (products allowed, subscriber types)
5. Step 4: Permissions & bank account
6. User clicks "Submit"
7. **Outcome:** Partner created with active status

### Flow 2: View Partner Details

1. User clicks on partner row
2. Detail page opens with tabs
3. User navigates: Profile, Subscribers, Financial, Documents, Activity
4. **Outcome:** All partner information accessible

### Flow 3: Toggle Partner Status

1. User clicks "Deactivate" action on active partner
2. Confirmation appears
3. User confirms
4. **Outcome:** Partner deactivated, cannot onboard new subscribers

### Flow 4: View Partner's Subscriber Incidents

1. User opens partner's Subscribers tab
2. User clicks "View Incidents" link on subscriber row
3. **Outcome:** Incidents for that subscriber displayed (read-only)

## Done When

- [ ] Tests written and passing
- [ ] Partner list displays with search/filter
- [ ] 4-step onboarding wizard works
- [ ] Detail view shows all 5 tabs
- [ ] Status toggle works
- [ ] Linked subscribers display with incident links
- [ ] Earnings and payouts display (system-generated)
- [ ] Documents can be uploaded
- [ ] Activity log shows all actions
- [ ] Empty states display properly
- [ ] Responsive on mobile

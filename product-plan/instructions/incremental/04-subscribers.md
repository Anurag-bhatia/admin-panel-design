# Milestone 4: Subscribers

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

Implement the Subscribers feature — the system of record for all customers actively or historically subscribed to the platform's services.

## Overview

The Subscribers module manages the complete subscriber lifecycle from onboarding through service delivery, connecting sales, operations, and finance into a single traceable view. All operational activity—including challan submission—is gated by subscriber status.

**Key Functionality:**
- View subscriber list with status, subscription details, and metadata
- Add subscribers via form or bulk upload
- View detailed subscriber profiles with tabbed navigation
- Manage subscriptions (plan, dates, vehicles, pricing)
- Track challans and incidents linked to subscriber
- Upload and manage documents
- View wallet/financial information
- Assign team members to accounts

## Recommended Approach: Test-Driven Development

See `product-plan/sections/subscribers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/subscribers/components/`:

- `SubscribersDashboard.tsx` — Main subscriber list view
- `SubscriberList.tsx` — Subscriber table with filters
- `AddSubscriberModal.tsx` — Modal for adding subscribers
- `BulkUploadModal.tsx` — Modal for bulk Excel upload
- `ViewDetailsModal.tsx` — Quick view modal
- `SubscriberDetail.tsx` — Full subscriber detail page with tabs

### Data Layer

```typescript
interface Subscriber {
  id: string
  source: string
  type: 'Fleet Operator' | 'Corporate' | 'Individual'
  subType: string
  lotsFor: string
  numberOfTrucks: number
  phoneNumber: string
  country: string
  state: string
  city: string
  companyAlias: string
  subscriberName: string
  emailId: string
  contactPerson: string
  gstNumber: string
  area: string
  addressLane: string
  pinCode: string
  assignedOwner: string
  partnerId: string | null
  drivingLicenseNumber: string | null
  status: 'active' | 'inactive'
  subscriptionId: string
  createdDate: string
  lastUpdated: string
  lastLogin: string
}

interface Subscription {
  id: string
  subscriberId: string
  subscriptionName: string
  planType: 'Monthly' | 'Quarterly' | 'Annual'
  startDate: string
  endDate: string
  vehiclesCount: number
  priceCategory: 'Basic' | 'Standard' | 'Premium' | 'Enterprise'
  subtotal: number
  discountAmount: number
  taxAmount: number
  totalAmount: number
  paymentStatus: 'paid' | 'on_credit' | 'overdue' | 'expired'
  invoiceNumber: string
}
```

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewDetails` | User clicks to view subscriber details |
| `onEdit` | User edits subscriber information |
| `onAddSubscriber` | User adds new subscriber |
| `onBulkUpload` | User bulk uploads subscribers |
| `onSearch` | User searches subscribers |
| `onFilter` | User applies filters |
| `onManageSubscription` | User manages subscription details |
| `onUploadDocument` | User uploads document |
| `onViewIncidents` | User views linked incidents |
| `onAssignTeam` | User assigns team members |

### Empty States

- **No subscribers:** "No subscribers yet. Add your first subscriber to get started."
- **No challans:** "No challans for this subscriber"
- **No incidents:** "No incidents linked to this subscriber"
- **No documents:** "No documents uploaded"

## Expected User Flows

### Flow 1: Add Subscriber

1. User clicks "Add Subscriber" button
2. User fills form (source, type, company details, contact, owner)
3. User clicks "Save"
4. **Outcome:** Subscriber created with active status, appears in list

### Flow 2: View Subscriber Details

1. User clicks on subscriber row
2. Full-page detail view opens with tabs
3. User navigates between Details, Challans, Incidents, Documents, Subscription, Wallet, Team tabs
4. **Outcome:** All subscriber information accessible in organized tabs

### Flow 3: Bulk Upload Subscribers

1. User clicks "Bulk Upload Subscriber"
2. User downloads template, fills data
3. User uploads Excel file
4. System validates and reports errors
5. **Outcome:** Valid subscribers imported

## Done When

- [ ] Tests written and passing
- [ ] Subscriber list displays with status badges
- [ ] Add Subscriber form works
- [ ] Bulk upload works with validation
- [ ] Detail view shows all 7 tabs
- [ ] Subscription management works
- [ ] Documents can be uploaded/viewed
- [ ] Empty states display properly
- [ ] Search and filter work
- [ ] Responsive on mobile

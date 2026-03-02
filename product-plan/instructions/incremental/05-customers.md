# Milestone 5: Customers

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

Implement the Customers feature — the centralized system for managing all direct-to-consumer (D2C) customers who use the platform independently.

## Overview

The Customers module provides operations, support, and finance teams with a unified view of each customer, their vehicles, incidents, challans, and payment history. It acts as the single source of truth for all retail customer interactions.

**Key Functionality:**
- Browse and search customers by name, mobile, or customer ID
- Add new customers via form or bulk upload
- View detailed customer profiles with tabbed navigation
- Track customer incidents with quick status updates
- Review challan history with payment/resolution status
- Manage linked vehicles
- View read-only financial summary
- Create incidents for customers
- View activity log of all interactions

## Recommended Approach: Test-Driven Development

See `product-plan/sections/customers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/customers/components/`:

- `CustomerList.tsx` — Main customer list view
- `CustomerTable.tsx` — Customer table with search
- `CustomerRow.tsx` — Individual customer row
- `CustomerListHeader.tsx` — Header with actions
- `BulkUploadCustomers.tsx` — Bulk upload modal
- `CustomerDetailView.tsx` — Full customer detail page

### Data Layer

```typescript
interface Customer {
  id: string
  customerId: string
  name: string
  email: string
  mobile: string
  accountCreatedDate: string
  lastActivity: string
  totalVehicles: number
  totalIncidents: number
  paymentStatus: 'paid' | 'pending'
  vehicleIds: string[]
  incidentIds: string[]
  challanIds: string[]
  financialSummary: {
    totalSpend: number
    pendingPayments: number
    paidAmount: number
    refundsIssued: number
  }
}

interface Vehicle {
  id: string
  customerId: string
  vehicleNumber: string
  vehicleType: string
  make: string
  model: string
  registrationDate: string
  status: 'active' | 'inactive'
}
```

### Callbacks

| Callback | Description |
|----------|-------------|
| `onSearch` | User searches customers |
| `onViewCustomer` | User clicks to view details |
| `onAddCustomer` | User adds new customer |
| `onBulkUpload` | User bulk uploads customers |
| `onExport` | User exports customer data |
| `onBulkStatusUpdate` | User bulk updates status |
| `onEditCustomer` | User edits customer details |
| `onCreateIncident` | User creates incident for customer |
| `onViewIncident` | User views incident details |
| `onUpdateIncidentStatus` | User quick-updates incident status |

### Empty States

- **No customers:** "No customers registered yet"
- **No incidents:** "No incidents for this customer"
- **No challans:** "No challans recorded"
- **No vehicles:** "No vehicles linked"

## Expected User Flows

### Flow 1: Search and View Customer

1. User enters name/mobile/ID in search bar
2. Matching customers appear in table
3. User clicks on customer row
4. **Outcome:** Customer detail page opens with all tabs

### Flow 2: Create Incident for Customer

1. User opens customer detail page
2. User clicks "Create Incident" button
3. User fills incident details
4. **Outcome:** Incident created and linked to customer, appears in Incidents tab

### Flow 3: Quick Status Update

1. User views customer's Incidents tab
2. User clicks status dropdown on incident row
3. User selects new status
4. **Outcome:** Incident status updated immediately

## Done When

- [ ] Tests written and passing
- [ ] Customer list displays with search
- [ ] Add Customer form works
- [ ] Bulk upload works
- [ ] Detail view shows all 5 tabs (Details, Incidents, Challans, Vehicles, Financials)
- [ ] Quick incident status updates work
- [ ] Create Incident from customer page works
- [ ] Financial summary displays (read-only)
- [ ] Activity log shows all interactions
- [ ] Empty states display properly
- [ ] Responsive on mobile

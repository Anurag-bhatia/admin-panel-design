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

Implement the Customers section — D2C visitor profile management and service delivery tracking.

## Overview

The Customers module manages all direct-to-consumer visitors who use the platform independently. It provides operations, support, and finance teams with a unified view of each visitor, their vehicles, incidents, challans, and payment history.

**Key Functionality:**
- Browse and search D2C visitors
- Add new visitors individually or via bulk upload
- Full visitor detail page with tabs: Details, Incidents, Challans, Vehicles, Financials
- Edit visitor profiles
- Create incidents from visitor detail page
- View activity log

## Recommended Approach: Test-Driven Development

See `product-plan/sections/customers/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/customers/components/`:

- `CustomerList` — Main customer list
- `CustomerTable` — Customer data table
- `CustomerRow` — Individual customer row
- `CustomerListHeader` — Header with search and actions
- `CustomerDetailView` — Full detail page
- `BulkUploadCustomers` — Bulk import

### Callbacks

- `onAddCustomer` — Create visitor
- `onBulkUpload` — Excel bulk import
- `onViewDetail` — Open detail page
- `onEditCustomer` — Update visitor info
- `onCreateIncident` — Create incident from detail page

## Expected User Flows

### Flow 1: Browse Visitors
1. User navigates to Customers section
2. User sees table of all visitors
3. User searches by name, mobile, or visitor ID
4. **Outcome:** Filtered results displayed

### Flow 2: View Visitor Details
1. User clicks a visitor row
2. User sees detail page with tabs
3. User navigates between Details, Incidents, Challans, Vehicles, Financials
4. **Outcome:** Complete visitor information visible

### Flow 3: Create Incident
1. User opens visitor detail page
2. User clicks "Create Incident"
3. User fills in incident details
4. **Outcome:** Incident created and linked to visitor

## Files to Reference

- `product-plan/sections/customers/README.md`
- `product-plan/sections/customers/tests.md`
- `product-plan/sections/customers/components/`
- `product-plan/sections/customers/types.ts`
- `product-plan/sections/customers/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Customer list with search works
- [ ] Add customer (single and bulk) works
- [ ] Detail page renders all tabs
- [ ] Empty states display properly
- [ ] Responsive on mobile

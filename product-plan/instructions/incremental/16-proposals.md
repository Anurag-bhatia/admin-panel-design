# Milestone 16: Proposals

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

Implement the Proposals section — service request management from intake to incident conversion.

## Overview

Admin-side proposal management for receiving, reviewing, quoting, and converting customer service requests (challans, DL verification, RC verification) into incidents. Provides a 5-tab queue view with dashboard stats, detail view, and conversion workflows.

**Key Functionality:**
- Dashboard summary cards (New Requests, In Review, Awaiting Response, Active Work, etc.)
- 5-tab queue: Inbox, In Review, Quote Sent, Converted, Rejected
- Context-specific actions per tab
- Full detail view with Details, Items, Notes, Activity Timeline, Incidents tabs
- Send Quote, Reject, and Convert to Incident modals
- Bulk assign and bulk status update
- Priority indicators on high-amount proposals
- Indian currency formatting (₹2,40,000)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/proposals/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/proposals/components/`:

- `ProposalList` — Main proposal list with queue tabs
- `ProposalRow` — Individual proposal row
- `ProposalTableHeader` — Header with search and filters
- `ProposalSidebar` — Sidebar with filters
- `ProposalQueueTabs` — 5-tab queue navigation
- `ProposalDetailView` — Full detail page
- `DashboardCards` — Summary metric cards
- `SendQuoteModal` — Quote sending form
- `RejectModal` — Rejection with reason
- `ConvertToIncidentModal` — Incident conversion
- `AssignModal` — Assignment form
- `BulkActionsBar` — Bulk operations
- `Pagination` — Table pagination

### Expected User Flows

### Flow 1: Pick Up and Quote
1. User views proposals in Inbox tab
2. User clicks "Pick Up" on a proposal
3. Proposal moves to "In Review"
4. User reviews details and clicks "Send Quote"
5. User enters amount and optional breakdown
6. **Outcome:** Proposal moves to "Quote Sent"

### Flow 2: Convert to Incident
1. Customer accepts quote → proposal in "Converted" tab
2. User clicks "Convert to Incident"
3. User fills incident details
4. **Outcome:** Incident created, linked to proposal

### Flow 3: Reject Proposal
1. User views proposal in Inbox or In Review
2. User clicks "Reject"
3. User selects reason and adds optional note
4. **Outcome:** Proposal moves to "Rejected" tab

## Files to Reference

- `product-plan/sections/proposals/components/`
- `product-plan/sections/proposals/types.ts`
- `product-plan/sections/proposals/sample-data.json`
- `product-plan/sections/proposals/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Dashboard cards show correct metrics
- [ ] 5-tab queue works with correct counts
- [ ] Context-specific actions per tab work
- [ ] Detail view shows all tabs
- [ ] Quote sending workflow works
- [ ] Rejection with reasons works
- [ ] Convert to incident works
- [ ] Bulk operations work
- [ ] Priority indicators display for high-amount proposals
- [ ] Indian currency formatting correct
- [ ] Empty states display properly
- [ ] Responsive on mobile

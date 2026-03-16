# Milestone 8: Payments

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestones 2 (Incidents), 6 (Lawyers), 7 (Partners) recommended

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
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Payments module — the unified workspace for refund processing, lawyer fee management, and partner payouts.

## Overview

The Payments module handles refund processing, lawyer fee management, and partner payouts through a unified workspace with a collapsible sidebar to switch between four views: Refunds, Lawyer Fees, Leads, and Partners.

**Key Functionality:**
- Collapsible sidebar navigation (Refunds, Lawyer Fees, Leads, Partners)
- Refunds: Stage tabs (Refund Raised, Completed, Hold, Rejected), bulk approve/process, refund detail view
- Lawyer Fees: Stage tabs (To Pay, Completed), row click navigates to lawyer profile
- Partners: Stage tabs (To Pay, Completed), row click navigates to partner profile
- Search and filter per view
- Export to Excel/CSV
- Refund detail view with Activity and Notes tabs

## Recommended Approach: Test-Driven Development

See `product-plan/sections/payments/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `PaymentsDashboard` — Main workspace with sidebar
- `PaymentsSidebar` — Collapsible sidebar (Refunds, Lawyer Fees, Leads, Partners)
- `PaymentsStageTabs` — Horizontal stage tabs with counts
- `PaymentsTableHeader` — Search, filters, export
- `RefundRow` — Refund table row
- `LawyerFeeRow` — Lawyer fee table row
- `PartnerPayoutRow` — Partner payout table row
- `RefundBulkActionsBar` — Bulk approve/process for refunds
- `RefundDetailView` — Refund detail page
- `RefundActivityTab` — Activity log for refund
- `RefundNotesTab` — Notes for refund
- `Pagination` — Page navigation

### Empty States

- **No refunds:** Empty refund list
- **No lawyer fees:** Empty lawyer fees view
- **No partner payouts:** Empty partner payouts view

## Files to Reference

- `product-plan/sections/payments/README.md` — Feature overview
- `product-plan/sections/payments/tests.md` — Test-writing instructions
- `product-plan/sections/payments/components/` — React components
- `product-plan/sections/payments/types.ts` — TypeScript interfaces
- `product-plan/sections/payments/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Process Refund
1. User navigates to Payments → Refunds via sidebar
2. Selects refunds in "Refund Raised" stage
3. Clicks "Approve" in bulk actions bar
4. Confirms approval
5. **Outcome:** Refunds move to appropriate stage, status updates

### Flow 2: View Lawyer Fees
1. User clicks "Lawyer Fees" in sidebar
2. Views To Pay / Completed stage tabs
3. Clicks a row
4. **Outcome:** Navigates to that lawyer's profile in the Lawyers section

### Flow 3: Export Payments
1. User applies filters (status, date range)
2. Clicks Export button
3. **Outcome:** Filtered data downloads as CSV/Excel

## Done When

- [ ] Tests written and passing
- [ ] Sidebar navigation works between all 4 views
- [ ] Refund stage tabs with counts
- [ ] Bulk approve/process refunds works
- [ ] Refund detail view with Activity and Notes tabs
- [ ] Lawyer fees view with stage tabs
- [ ] Lawyer fee row click navigates to lawyer profile
- [ ] Partner payouts view with stage tabs
- [ ] Partner row click navigates to partner profile
- [ ] Search, filter, export work per view
- [ ] Empty states display properly
- [ ] Responsive on mobile

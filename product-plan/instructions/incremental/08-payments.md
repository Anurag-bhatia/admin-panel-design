# Milestone 8: Payments

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

Implement the Payments section — refund processing, lawyer fee management, and partner payouts.

## Overview

The Payments module handles refund processing, lawyer fee management, and partner payouts through a unified workspace with a collapsible sidebar to switch between Refunds, Lawyer Fees, Leads, and Partners views.

**Key Functionality:**
- Refund processing with stage tabs (Refund Raised, Completed, Hold, Rejected)
- Lawyer fee tracking with stages (To Pay, Completed)
- Partner payout management with stages (To Pay, Completed)
- Bulk approve/process refunds
- Search and filter across all views
- Export capabilities
- Navigation to lawyer/partner profiles from rows

## Recommended Approach: Test-Driven Development

See `product-plan/sections/payments/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/payments/components/`:

- `PaymentsDashboard` — Main workspace
- `PaymentsSidebar` — Collapsible sidebar (Refunds, Lawyer Fees, Leads, Partners)
- `PaymentsStageTabs` — Stage tabs with counts
- `PaymentsTableHeader` — Header with search and filters
- `RefundRow` — Refund table row
- `LawyerFeeRow` — Lawyer fee table row
- `PartnerPayoutRow` — Partner payout row
- `RefundDetailView` — Refund detail page
- `RefundBulkActionsBar` — Bulk operations for refunds
- `RefundActivityTab` — Refund activity history
- `RefundNotesTab` — Refund notes
- `Pagination` — Table pagination

### Callbacks

- `onApproveRefund` / `onProcessRefund` — Refund operations
- `onBulkApprove` / `onBulkProcess` — Bulk refund operations
- `onNavigateToLawyer` — Link to lawyer profile
- `onNavigateToPartner` — Link to partner profile
- `onExport` — Export data
- `onMarkAsPaid` — Mark partner payout as paid

## Expected User Flows

### Flow 1: Process Refund
1. User selects "Refunds" in sidebar
2. User views refunds in "Refund Raised" tab
3. User selects refunds and clicks "Approve"
4. User confirms approval
5. **Outcome:** Refunds move to "Completed" tab

### Flow 2: Review Lawyer Fees
1. User selects "Lawyer Fees" in sidebar
2. User views fees in "To Pay" tab
3. User clicks a row to navigate to lawyer profile
4. **Outcome:** Lawyer profile opens in Lawyers section

### Flow 3: Mark Partner Payout
1. User selects "Partners" in sidebar
2. User views payouts in "To Pay" tab
3. User clicks "Mark as Paid" on a payout row
4. **Outcome:** Payout moves to "Completed" tab

## Files to Reference

- `product-plan/sections/payments/README.md`
- `product-plan/sections/payments/tests.md`
- `product-plan/sections/payments/components/`
- `product-plan/sections/payments/types.ts`
- `product-plan/sections/payments/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Sidebar navigation between views works
- [ ] Stage tabs show correct counts
- [ ] Refund approval and processing works
- [ ] Lawyer fee tracking displays correctly
- [ ] Partner payout management works
- [ ] Cross-section navigation works (to lawyer/partner profiles)
- [ ] Export works
- [ ] Empty states display properly
- [ ] Responsive on mobile

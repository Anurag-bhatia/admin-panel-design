# Milestone 9: Disputes

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

Implement the Disputes section — customer dispute resolution workflow for escalation and governance.

## Overview

The Disputes module is a governance and escalation engine for handling conflicts, objections, refund disagreements, and contested outcomes. Unlike incidents (operational execution), disputes are review-driven challenges handled with higher scrutiny and configurable SLA enforcement.

**Key Functionality:**
- Stage-based dispute tracking (Open, Under Review, Escalated, Resolved, Rejected)
- Collapsible sidebar: All Disputes, My Disputes
- Create disputes linked to incidents, subscribers, or payments
- Assign reviewers and escalate disputes
- Full detail view with Summary, Linked Incident, Investigation, Evidence, Activity tabs
- Bulk operations (assign reviewer, change priority)
- Configurable SLA enforcement (7-15 days)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/disputes/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/disputes/components/`:

- `DisputeList` — Main dispute list
- `DisputeRow` — Individual dispute row
- `DisputesTableHeader` — Header with search and filters
- `DisputesSidebar` — Collapsible sidebar
- `StageTabs` — Stage tabs with counts
- `DisputeBulkActionsBar` — Bulk operations
- `DisputeDetailView` — Full detail page
- `CreateDisputeModal` — Dispute creation form
- `AssignReviewerModal` — Reviewer assignment
- `BulkUpdateModal` — Bulk operations
- `ImportDisputesModal` — Import disputes
- `SummaryTab`, `LinkedIncidentTab`, `InvestigationTab`, `EvidenceTab`, `DisputeActivityTab` — Detail tabs
- `Pagination` — Table pagination

### Expected User Flows

### Flow 1: Create Dispute
1. User clicks "Create Dispute"
2. User links to incident/subscriber/payment
3. User fills in dispute type, reason, priority
4. **Outcome:** Dispute appears in "Open" tab

### Flow 2: Review and Resolve
1. User assigns reviewer to dispute
2. Reviewer investigates and adds notes
3. Reviewer approves refund or rejects dispute
4. **Outcome:** Dispute moves to "Resolved" or "Rejected"

### Flow 3: Escalate
1. User opens dispute nearing SLA deadline
2. User clicks "Escalate"
3. **Outcome:** Dispute moves to "Escalated" tab with increased priority

## Files to Reference

- `product-plan/sections/disputes/components/`
- `product-plan/sections/disputes/types.ts`
- `product-plan/sections/disputes/sample-data.json`
- `product-plan/sections/disputes/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Stage tabs show correct counts
- [ ] Dispute creation with linking works
- [ ] Reviewer assignment works
- [ ] Escalation workflow works
- [ ] Detail view shows all tabs
- [ ] SLA indicators display correctly
- [ ] Empty states display properly
- [ ] Responsive on mobile

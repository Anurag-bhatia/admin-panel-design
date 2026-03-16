# Milestone 9: Disputes

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestone 2 (Incidents) recommended

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

Implement the Disputes module — the governance and escalation engine for handling conflicts, objections, refund disagreements, and contested outcomes.

## Overview

Unlike incidents (which are operational execution), disputes are review-driven challenges to outcomes or decisions, handled with higher scrutiny, documented reasoning, and configurable SLA enforcement. Every dispute must link to an entity (Incident, Subscriber, Customer, or Payment).

**Key Functionality:**
- Collapsible sidebar: All Disputes / My Disputes
- Stage tabs: Open, Under Review, Escalated, Resolved, Rejected with counts
- Create disputes (must link to entity) from Support, Incidents, Financials, or manually
- Bulk operations: Assign Reviewer, Change Priority (NO bulk resolution or refund approvals)
- Detail view: two-column with SLA sidebar + 5 tabs (Summary, Linked Incident, Investigation, Evidence, Activity)
- SLA enforcement (7-15 days configurable, escalation on breach)
- Every action logged with mandatory audit trail

## Recommended Approach: Test-Driven Development

See `product-plan/sections/disputes/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `DisputeList` — Main list view
- `DisputesSidebar` — All Disputes / My Disputes
- `StageTabs` — Stage tab navigation with counts
- `DisputesTableHeader` — Search, filters, export
- `DisputeRow` — Table row
- `DisputeBulkActionsBar` — Assign Reviewer, Change Priority
- `Pagination` — Page navigation
- `DisputeDetailView` — Full detail page
- `SummaryTab` — Dispute reason, description, evidence
- `LinkedIncidentTab` — Read-only incident snapshot
- `InvestigationTab` — Internal review notes
- `EvidenceTab` — Document uploads
- `DisputeActivityTab` — Action history
- `BulkUpdateModal` — Bulk operations
- `CreateDisputeModal` — New dispute form
- `AssignReviewerModal` — Reviewer assignment

### Empty States

- **No disputes yet:** Helpful message
- **No evidence:** Empty Evidence tab
- **No investigation notes:** Empty Investigation tab
- **No linked incident:** When dispute links to non-incident entity

## Files to Reference

- `product-plan/sections/disputes/README.md` — Feature overview
- `product-plan/sections/disputes/tests.md` — Test-writing instructions
- `product-plan/sections/disputes/components/` — React components
- `product-plan/sections/disputes/types.ts` — TypeScript interfaces
- `product-plan/sections/disputes/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Create Dispute
1. User clicks "Create Dispute" (or from linked module)
2. Form requires linking to an entity (Incident ID, Subscriber, Payment)
3. User fills dispute type, reason, description, priority
4. **Outcome:** Dispute created in "Open" stage

### Flow 2: Review and Resolve Dispute
1. Reviewer opens dispute detail from their queue
2. Reviews Summary tab, checks Linked Incident, reads Evidence
3. Adds investigation notes with reasoning
4. Clicks "Resolve" or "Reject" with mandatory notes
5. **Outcome:** Dispute moves to Resolved/Rejected, actions logged

### Flow 3: Escalate Dispute
1. Reviewer identifies dispute needs higher authority
2. Clicks "Escalate" action
3. Confirms escalation with notes
4. **Outcome:** Dispute moves to "Escalated" stage, SLA adjusts

## Done When

- [ ] Tests written and passing
- [ ] Sidebar navigation (All/My Disputes) works
- [ ] Stage tabs with correct counts
- [ ] Create dispute requires linked entity
- [ ] Bulk assign reviewer and change priority work
- [ ] Detail view with all 5 tabs
- [ ] SLA countdown displays (overdue in red)
- [ ] Investigation notes can be added
- [ ] Evidence documents can be uploaded
- [ ] Resolve/Reject/Escalate actions work
- [ ] Audit trail records all actions
- [ ] Empty states display properly
- [ ] Responsive on mobile

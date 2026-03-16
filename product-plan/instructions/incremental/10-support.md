# Milestone 10: Support

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
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Support module — the centralized intake and triage system for all inbound messages from public touchpoints.

## Overview

The Support module captures, reviews, and routes every message into the appropriate internal workflow (Leads, Disputes, or Partnerships). It does not resolve issues — it acts as a structured gateway that converts raw customer communication into actionable system records.

**Key Functionality:**
- Table of unconverted submissions (Subject, Source, Type, Actions)
- Filter by Source and Type
- Sort by Type or Source
- Click row to view full details in read-only modal
- Convert via Actions: Convert to Lead, Convert to Dispute, Convert to Partnership
- Converted entries auto-hidden from main view
- All conversions logged in audit trail

## Recommended Approach: Test-Driven Development

See `product-plan/sections/support/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `SupportDashboard` — Main table view with filters
- `SubmissionDetailsModal` — Read-only detail popup

### Empty States

- **No submissions:** "No support submissions yet"
- **All converted:** "All submissions have been processed"
- **No results for filter:** "No submissions match your filters"

## Files to Reference

- `product-plan/sections/support/README.md` — Feature overview
- `product-plan/sections/support/tests.md` — Test-writing instructions
- `product-plan/sections/support/components/` — React components
- `product-plan/sections/support/types.ts` — TypeScript interfaces
- `product-plan/sections/support/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Review Submission
1. User sees table of unconverted submissions
2. Clicks a row (outside Actions dropdown)
3. Read-only modal shows full Subject, Message, submission time, source
4. **Outcome:** User understands the submission context

### Flow 2: Convert to Lead
1. User clicks Actions dropdown on a submission row
2. Selects "Convert to Lead"
3. System creates a lead prefilled with contact details and source
4. **Outcome:** Lead created, submission hidden from main view, conversion logged

### Flow 3: Convert to Dispute
1. User clicks Actions → "Convert to Dispute"
2. System creates dispute linked to the support message
3. **Outcome:** Dispute created, submission hidden, conversion logged

## Done When

- [ ] Tests written and passing
- [ ] Table displays unconverted submissions
- [ ] Filters work (Source, Type)
- [ ] Detail modal opens on row click (read-only, no action buttons)
- [ ] Convert to Lead creates lead with prefilled data
- [ ] Convert to Dispute creates linked dispute
- [ ] Convert to Partnership creates partner entry
- [ ] Converted entries hidden from view
- [ ] Audit trail records all conversions
- [ ] Empty states display properly
- [ ] Responsive on mobile

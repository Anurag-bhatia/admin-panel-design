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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Support section — inbound message triage from public touchpoints.

## Overview

The Support module is a centralized intake and triage system for all inbound messages. It captures, reviews, and routes every message into the appropriate workflow (Leads, Disputes, or Partnerships). This module does not resolve issues — it acts as a gateway that converts raw communication into actionable records.

**Key Functionality:**
- View unconverted submissions in a table
- Filter by Source and Type
- View full submission details in read-only modal
- Convert submissions to Lead, Dispute, or Partnership
- Converted entries automatically hidden from main view

## Recommended Approach: Test-Driven Development

See `product-plan/sections/support/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/support/components/`:

- `SupportDashboard` — Main support table view
- `SubmissionDetailsModal` — Read-only submission detail modal

### Expected User Flows

### Flow 1: Triage Submission
1. User views table of unconverted submissions
2. User clicks a row to view full details in modal
3. User closes modal and uses Actions dropdown
4. User clicks "Convert to Lead"
5. **Outcome:** Lead created, submission hidden from view

### Flow 2: Filter Submissions
1. User applies Source filter (landing page, campaign form, etc.)
2. User applies Type filter (query, complaint, etc.)
3. **Outcome:** Table shows filtered results

## Files to Reference

- `product-plan/sections/support/components/`
- `product-plan/sections/support/types.ts`
- `product-plan/sections/support/sample-data.json`
- `product-plan/sections/support/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Submission table displays correctly
- [ ] Filters work for Source and Type
- [ ] Detail modal shows full submission
- [ ] All three conversion paths work
- [ ] Converted entries hidden automatically
- [ ] Empty states display properly
- [ ] Responsive on mobile

# Milestone 8: Support

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

Implement the Support feature — a centralized intake and triage system for all inbound messages from public touchpoints.

## Overview

The Support module captures, reviews, and routes every message from landing pages, contact forms, and campaigns into the appropriate internal workflow (Leads, Disputes, or Partnerships). It acts as a structured gateway that converts raw customer communication into actionable system records.

**Key Functionality:**
- View all unconverted support submissions in a table
- Filter submissions by Source or Type
- Sort submissions by Type or Source
- View full submission details in a read-only modal
- Convert submissions to Lead, Dispute, or Partnership
- Automatic hiding of converted entries
- Audit logging of all conversion actions

## Recommended Approach: Test-Driven Development

See `product-plan/sections/support/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/support/components/`:

- `SupportDashboard.tsx` — Main support intake view
- `SubmissionDetailsModal.tsx` — Read-only submission details modal

### Data Layer

```typescript
interface SupportSubmission {
  id: string
  subject: string
  message: string
  source: string
  type: 'query' | 'complaint' | 'support request' | 'business inquiry'
  submittedAt: string
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
}
```

### Callbacks

| Callback | Description |
|----------|-------------|
| `onView` | User clicks row to view full details |
| `onConvertToLead` | User converts submission to Lead |
| `onConvertToDispute` | User converts submission to Dispute |
| `onConvertToPartnership` | User converts submission to Partnership |

### Empty States

- **No submissions:** "No support submissions pending review"
- **No filtered results:** "No submissions match your filters"

## Expected User Flows

### Flow 1: View Submission Details

1. User clicks on a submission row (not on dropdown)
2. Read-only modal opens showing full Subject, Message, time, and source
3. User reviews the content
4. User closes modal
5. **Outcome:** Submission details viewed, no action taken

### Flow 2: Convert to Lead

1. User clicks Actions dropdown on a submission
2. User selects "Convert to Lead"
3. System creates Lead record prefilled with submission data
4. **Outcome:** Lead created, submission marked as converted and hidden from view

### Flow 3: Convert to Dispute

1. User clicks Actions dropdown on a submission
2. User selects "Convert to Dispute"
3. System creates Dispute record linked to submission
4. **Outcome:** Dispute created, submission converted and hidden

### Flow 4: Convert to Partnership

1. User clicks Actions dropdown on a submission
2. User selects "Convert to Partnership"
3. System creates Partner onboarding entry
4. **Outcome:** Partner entry created, submission converted and hidden

## Done When

- [ ] Tests written and passing
- [ ] Submissions table displays with Subject, Source, Type, Actions
- [ ] Filter by Source works
- [ ] Filter by Type works
- [ ] Sort by columns works
- [ ] Row click opens read-only modal
- [ ] Convert to Lead creates Lead and hides submission
- [ ] Convert to Dispute creates Dispute and hides submission
- [ ] Convert to Partnership creates Partner entry and hides submission
- [ ] Converted submissions automatically hidden from main view
- [ ] All conversions logged to audit trail
- [ ] Empty states display properly
- [ ] Responsive on mobile

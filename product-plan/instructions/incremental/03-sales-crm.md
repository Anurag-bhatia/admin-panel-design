# Milestone 3: Sales CRM

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

Implement the Sales CRM feature — the central system for capturing, organizing, tracking, and converting all potential business opportunities.

## Overview

The Leads module replaces fragmented Excel-based lead tracking with a structured, real-time pipeline management system. Every lead is uniquely identifiable, actionable, and traceable across its entire lifecycle from initial capture through to conversion or loss.

**Key Functionality:**
- View leads pipeline with tab-based lifecycle stages (New, Assigned, Follow-up, Quotations, Projected, Invoiced, Sales, Lost)
- Add single leads via structured form
- Bulk upload leads via Excel with validation
- Search and filter leads by various criteria
- Bulk update selected leads (status or owner)
- View lead details with activity timeline
- Assign/reassign leads to users
- Add follow-up activities with notes and next dates
- Upload and manage documents

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/sales-crm/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/sales-crm/components/`:

- `LeadsDashboard.tsx` — Main dashboard with tabs and metrics
- `LeadsTable.tsx` — Lead list table with selection
- `LeadsListHeader.tsx` — Header with search, filters, actions
- `AddLeadModal.tsx` — Modal for adding new leads
- `EditLeadModal.tsx` — Modal for editing lead details
- `AssignLeadModal.tsx` — Modal for assigning leads
- `AddFollowUpModal.tsx` — Modal for adding follow-up activities
- `BulkUploadModal.tsx` — Modal for bulk Excel upload
- `BulkMoveLead.tsx` — Modal for bulk status/owner updates
- `UploadDocumentModal.tsx` — Modal for document uploads
- `LeadDetailView.tsx` — Full lead detail page
- `MyLeads.tsx` — My assigned leads view

### Data Layer

The components expect these data shapes:

```typescript
interface Lead {
  id: string
  source: string
  type: string
  subType: string
  lotsFor: string
  numberOfTrucks: number
  phoneNumber: string
  country: string
  state: string
  city: string
  companyAlias: string
  companyName: string
  emailId: string
  contactPerson: string
  gstNumber: string
  area: string
  addressLane: string
  pinCode: string
  status: 'new' | 'assigned' | 'follow-up' | 'quotations' | 'projected' | 'invoiced' | 'sales' | 'lost'
  assignedTo: string | null
  assignedTeam: 'Service' | 'Accounts' | null
  createdDate: string
  lastActivityDate: string
}
```

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onViewLead` | User clicks to view lead details |
| `onAddLead` | User submits new lead form |
| `onBulkUpload` | User uploads Excel file |
| `onDownloadTemplate` | User downloads Excel template |
| `onBulkUpdate` | User bulk updates selected leads |
| `onEditLead` | User edits lead information |
| `onAssignLead` | User assigns lead to user |
| `onChangeStatus` | User changes lead status |
| `onAddFollowUp` | User adds follow-up activity |
| `onUploadDocument` | User uploads document |
| `onViewDocument` | User views/downloads document |
| `onDeleteDocument` | User deletes document |

### Empty States

- **No leads yet:** Show "No leads in your pipeline" with Add Lead CTA
- **No leads in stage:** Show "No leads in [Stage Name]"
- **No follow-ups:** Show "No follow-up activities recorded"
- **No documents:** Show "No documents attached"

## Files to Reference

- `product-plan/sections/sales-crm/README.md` — Feature overview
- `product-plan/sections/sales-crm/tests.md` — Test-writing instructions
- `product-plan/sections/sales-crm/components/` — React components
- `product-plan/sections/sales-crm/types.ts` — TypeScript interfaces
- `product-plan/sections/sales-crm/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Add New Lead

1. User clicks "Add Lead" button
2. User fills form (source, type, company details, contact info)
3. User clicks "Save" to submit
4. **Outcome:** New lead appears in "New" tab, success message shown

### Flow 2: Bulk Upload Leads

1. User clicks "Bulk Upload Leads" button
2. User downloads Excel template (optional)
3. User uploads filled Excel file
4. System validates and shows errors (if any)
5. **Outcome:** Valid leads imported, validation errors displayed for fixes

### Flow 3: Assign Lead

1. User clicks "Assign" from lead's Actions menu
2. User selects assignee from dropdown
3. User confirms assignment
4. **Outcome:** Lead assigned, activity logged to timeline

### Flow 4: Add Follow-Up

1. User opens lead detail view
2. User clicks "Add Follow-Up" button
3. User enters activity type, notes, next date, outcome
4. User saves follow-up
5. **Outcome:** Follow-up appears in timeline, next follow-up date updated

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Pipeline tabs display with counts
- [ ] Leads table renders with real data
- [ ] Add Lead form creates new leads
- [ ] Bulk upload works with validation feedback
- [ ] Bulk update changes status/owner for selected leads
- [ ] Lead detail view shows all information
- [ ] Assignment works and logs to timeline
- [ ] Follow-ups can be added
- [ ] Documents can be uploaded/viewed
- [ ] Empty states display properly
- [ ] Search and filter work
- [ ] Responsive on mobile

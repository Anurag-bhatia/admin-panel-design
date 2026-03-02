# Admin Panel — Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

## Product Overview

A B2B operations platform that manages the complete lifecycle of traffic challan resolution services for fleet operators and corporate clients. From lead acquisition and subscriber onboarding to challan processing, lawyer management, payments, and dispute resolution, Admin Panel replaces Excel-driven operations with an automated, auditable system.

### Planned Sections

1. **Incidents** — Core challan workflow with queue-based processing and 45-day TAT
2. **Sales CRM** — Lead pipeline management with lifecycle stages
3. **Subscribers** — Active client account management
4. **Customers** — D2C customer profile management
5. **Lawyers** — Legal network with onboarding and compliance
6. **Partners** — Business introducer management
7. **Support** — Intake triage for routing inbound messages
8. **Reports** — Analytics dashboards across all domains
9. **Team** — Employee and team administration with permissions

### Data Model Entities

Lead, Subscriber, Incident, Lawyer, Partner, Assignment, Commission, Refund, Dispute, Support Ticket, Payment, Audit Log

### Design System

- **Colors:** Primary: cyan, Secondary: zinc, Neutral: slate
- **Typography:** Geist (heading/body), Geist Mono (code)

---

# Milestone 1: Foundation

## Goal

Set up design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

### 2. Data Model Types

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

### 3. Routing Structure

| Route | Section |
|-------|---------|
| `/incidents` | Incidents (default) |
| `/sales-crm` | Sales CRM — All Leads |
| `/sales-crm/my-leads` | Sales CRM — My Leads |
| `/subscribers` | Subscribers |
| `/customers` | Customers |
| `/lawyers` | Lawyers |
| `/partners` | Partners |
| `/support` | Support |
| `/reports` | Reports |
| `/team` | Team |

### 4. Application Shell

Copy from `product-plan/shell/components/`:
- `AppShell.tsx` — Main layout with sidebar
- `MainNav.tsx` — Navigation with collapse
- `UserMenu.tsx` — User menu with dropdown

## Done When

- [ ] Design tokens configured
- [ ] Data model types defined
- [ ] All routes exist
- [ ] Shell renders with navigation
- [ ] Sidebar collapse works
- [ ] User menu works
- [ ] Responsive on mobile

---

# Milestone 2: Incidents

## Goal

Queue-driven ticket management for challan processing with 45-day TAT enforcement.

## Key Functionality

- Queue tabs: New Incidents, Screening, Lawyer Assigned, Settled, Not Settled, Refund
- Add, validate, screen challans
- Bulk operations: assign agent/lawyer, move queue
- Detail view with follow-ups, timeline, documents

## Components

`IncidentList`, `IncidentRow`, `IncidentsTableHeader`, `QueueTabs`, `BulkActionsBar`, `AddChallanModal`, `AssignAgentModal`, `AssignLawyerModal`, `MoveQueueModal`, `ValidateResultsView`, `ScreenResultsView`, detail tab components

## Done When

- [ ] Queue tabs with counts
- [ ] Bulk operations work
- [ ] Add Challan form works
- [ ] Detail view with all tabs
- [ ] 45-day TAT countdown displays

---

# Milestone 3: Sales CRM

## Goal

Lead pipeline management with lifecycle stages and conversion tracking.

## Key Functionality

- Pipeline tabs: New, Assigned, Follow-up, Quotations, Projected, Invoiced, Sales, Lost
- Add/bulk upload leads
- Assign leads, add follow-ups
- Detail view with timeline and documents

## Components

`LeadsDashboard`, `LeadsTable`, `AddLeadModal`, `EditLeadModal`, `AssignLeadModal`, `AddFollowUpModal`, `BulkUploadModal`, `LeadDetailView`, `MyLeads`

## Done When

- [ ] Pipeline tabs with counts
- [ ] Add Lead works
- [ ] Bulk upload works
- [ ] Assignment and follow-ups work
- [ ] Detail view complete

---

# Milestone 4: Subscribers

## Goal

Active client account management with subscription and service tracking.

## Key Functionality

- Subscriber list with status badges
- Add/bulk upload subscribers
- Detail page with 7 tabs: Details, Challans, Incidents, Documents, Subscription, Wallet, Team

## Components

`SubscribersDashboard`, `SubscriberList`, `AddSubscriberModal`, `BulkUploadModal`, `SubscriberDetail`

## Done When

- [ ] Subscriber list displays
- [ ] Add/bulk upload work
- [ ] Detail view shows all 7 tabs
- [ ] Subscription management works

---

# Milestone 5: Customers

## Goal

D2C customer profile management with vehicle and incident tracking.

## Key Functionality

- Customer list with search
- Add/bulk upload customers
- Detail page with 5 tabs: Details, Incidents, Challans, Vehicles, Financials
- Create incidents for customers
- Quick status updates

## Components

`CustomerList`, `CustomerTable`, `CustomerRow`, `BulkUploadCustomers`, `CustomerDetailView`

## Done When

- [ ] Customer list with search
- [ ] Add/bulk upload work
- [ ] Detail view shows all tabs
- [ ] Create Incident from customer works

---

# Milestone 6: Lawyers

## Goal

Legal network management with onboarding, credentials, and compliance.

## Key Functionality

- Active/Inactive tabs with counts
- 7-step onboarding wizard
- Profile with 4 tabs: Details, Incidents, Invoicing, Transactions
- KYC document management
- Deactivate/reactivate lawyers
- Raise invoices

## Components

`Lawyers`, `LawyerList`, `LawyerTable`, `LawyerForm`, `LawyerProfile`

## Done When

- [ ] Active/Inactive tabs work
- [ ] 7-step onboarding works
- [ ] Profile shows all tabs
- [ ] KYC documents viewable
- [ ] Raise Invoice works

---

# Milestone 7: Partners

## Goal

Partner relationship management with subscriber tracking and payouts.

## Key Functionality

- Partner list with search/filter
- 4-step onboarding
- Detail page with 5 tabs: Profile, Subscribers, Financial, Documents, Activity
- Toggle status

## Components

`PartnersDashboard`, `PartnerList`, `AddPartner`, `EditPartner`, `PartnerDetail`

## Done When

- [ ] Partner list displays
- [ ] 4-step onboarding works
- [ ] Detail view shows all tabs
- [ ] Status toggle works

---

# Milestone 8: Support

## Goal

Intake triage for routing inbound messages to Leads, Disputes, or Partnerships.

## Key Functionality

- Table of unconverted submissions
- Filter by Source, Type
- View details in read-only modal
- Convert to Lead, Dispute, or Partnership
- Converted entries auto-hidden

## Components

`SupportDashboard`, `SubmissionDetailsModal`

## Done When

- [ ] Submissions table displays
- [ ] Filters work
- [ ] Detail modal works
- [ ] All 3 conversion types work
- [ ] Converted entries hidden

---

# Milestone 9: Reports

## Goal

Analytics dashboards across all business domains.

## Key Functionality

- Executive Dashboard with summary cards
- Tab navigation: Incidents, Leads, Subscribers, Lawyers, Partners, Payments, Disputes, Support, Team
- Global filter bar
- Drill-down from metrics
- Export to PDF/CSV

## Components

`ReportsDashboard`, `ExecutiveDashboard`, `FilterBar`, `MetricCard`, domain-specific tab components

## Done When

- [ ] Executive Dashboard shows all summaries
- [ ] All report tabs work
- [ ] Filters apply across tabs
- [ ] Drill-down works
- [ ] Export works

---

# Milestone 10: Team

## Goal

Employee and team administration with permissions management.

## Key Functionality

- Employees tab with list
- Teams tab with list
- 2-step employee onboarding
- Permissions page (Module Access + Flow Access)
- Deactivate employees
- Create/edit teams

## Components

`TeamManagement`, `EmployeeTable`, `EmployeeOnboardingWizard`, `PermissionsPage`, `TeamsTable`, `CreateTeamModal`, `EditTeamModal`, `EmployeeDetailView`, `TeamDetailView`

## Done When

- [ ] Employees/Teams tabs work
- [ ] 2-step onboarding works
- [ ] Permissions page works
- [ ] Deactivation works
- [ ] Team CRUD works

---

## Files to Reference

- `product-plan/product-overview.md` — Product summary
- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/` — Shell components
- `product-plan/sections/[section-id]/` — Section components, types, sample data, tests

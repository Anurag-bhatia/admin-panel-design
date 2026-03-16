# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for typography setup

**Summary:**
- Primary: `cyan` — Actions, active states, links
- Secondary: `zinc` — Sidebar, borders, secondary elements
- Neutral: `slate` — Backgrounds, text, surfaces

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/README.md` for entity definitions and relationships
- Each section in `product-plan/sections/[section-id]/types.ts` has detailed interfaces

**Core entities:** Lead, Subscriber, Incident, Lawyer, Partner, Assignment, Commission, Refund, Dispute, Support Ticket, Payment, Audit Log

### 3. Routing Structure

Create placeholder routes for each section:

- `/login` — Authentication page
- `/incidents` — Incidents (default after login)
- `/sales-crm` — Sales CRM
- `/sales-crm/all-leads` — All Leads
- `/sales-crm/my-leads` — My Leads
- `/subscribers` — Subscribers
- `/customers` — Customers (Registered Visitors)
- `/lawyers` — Lawyers
- `/partners` — Partners
- `/payments` — Payments
- `/disputes` — Disputes
- `/support` — Support
- `/reports` — Reports
- `/team` — Team
- `/setup` — Setup (Admin Control)
- `/cms` — CMS
- `/settled-challans` — Settled Challans

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar + header + content
- `MainNav.tsx` — Sidebar navigation with collapsible sub-items
- `UserMenu.tsx` — User avatar dropdown with logout

**Wire Up Navigation:**

| Nav Item | Route | Icon |
|----------|-------|------|
| Incidents | /incidents | AlertTriangle |
| Sales CRM | /sales-crm | TrendingUp |
| → All Leads | /sales-crm/all-leads | — |
| → My Leads | /sales-crm/my-leads | — |
| Subscribers | /subscribers | Users |
| Customers | /customers | UserCheck |
| Lawyers | /lawyers | Scale |
| Partners | /partners | Handshake |
| Payments | /payments | CreditCard |
| Disputes | /disputes | ShieldAlert |
| Support | /support | HeadphonesIcon |
| Reports | /reports | BarChart3 |
| Team | /team | UsersRound |

**Sidebar Behavior:**
- Dark background (#212121)
- Collapsed by default (64px width), expands on hover (240px)
- Active items highlighted with `bg-cyan-600 text-white`
- Smooth 300ms transition animation

**User Menu:**
- Located in top-right of header
- Displays user name, email, avatar
- Dropdown with logout action

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (cyan/zinc/slate)
- [ ] Data model types are defined for core entities
- [ ] Routes exist for all 14 sections (can be placeholder pages)
- [ ] Login page renders
- [ ] Shell renders with dark sidebar navigation
- [ ] Sidebar collapses/expands on hover
- [ ] Navigation links to correct routes
- [ ] Active nav item highlighted in cyan
- [ ] Sales CRM sub-nav (All Leads / My Leads) works
- [ ] User menu shows user info and logout
- [ ] Responsive on mobile (bottom tab nav + hamburger overlay)

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
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:** Primary: cyan, Secondary: zinc, Neutral: slate
**Typography:** Geist (headings + body), Geist Mono (code/monospace)

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

Core entities: Lead, Subscriber, Incident, Lawyer, Partner, Assignment, Commission, Refund, Dispute, Support Ticket, Payment, Audit Log

### 3. Routing Structure

Create placeholder routes for each section:

| Route | Section |
|-------|---------|
| `/incidents` | Incidents |
| `/sales-crm` | Sales CRM (All Leads) |
| `/sales-crm/my-leads` | Sales CRM (My Leads) |
| `/subscribers` | Subscribers |
| `/customers` | Customers |
| `/lawyers` | Lawyers |
| `/partners` | Partners |
| `/payments` | Payments |
| `/disputes` | Disputes |
| `/support` | Support |
| `/reports` | Reports |
| `/team` | Team |
| `/setup` | Setup |
| `/cms` | CMS |
| `/settled-challans` | Settled Challans |
| `/proposals` | Proposals |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar + content area
- `MainNav.tsx` — Navigation component with collapsible sections
- `UserMenu.tsx` — User menu with avatar and dropdown

**Wire Up Navigation:**

| Nav Item | Route | Icon |
|----------|-------|------|
| Incidents | `/incidents` | AlertTriangle |
| Sales CRM | — | TrendingUp |
| → All Leads | `/sales-crm` | — |
| → My Leads | `/sales-crm/my-leads` | — |
| Subscribers | `/subscribers` | Users |
| Customers | `/customers` | UserCheck |
| Lawyers | `/lawyers` | Scale |
| Partners | `/partners` | Handshake |
| Payments | `/payments` | CreditCard |
| Disputes | `/disputes` | Shield |
| Support | `/support` | MessageSquare |
| Reports | `/reports` | BarChart3 |
| Team | `/team` | Users2 |

**Shell Design:**
- Sidebar: #212121 background, zinc-800 borders, 240px wide (collapsible to 64px)
- Active nav items: cyan-600 background, white text
- Desktop: Hover-to-expand sidebar
- Mobile: Bottom tab navigation with top 5 sections

**User Menu:**
- User name, email, optional avatar
- Logout callback

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (cyan/zinc/slate colors, Geist fonts)
- [ ] Data model types are defined
- [ ] Routes exist for all 15 sections (can be placeholder pages)
- [ ] Shell renders with sidebar navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info with logout
- [ ] Sidebar collapses/expands on hover (desktop)
- [ ] Mobile bottom tab navigation works
- [ ] Responsive on mobile

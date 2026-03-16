# Application Shell

## Overview

The Admin Panel shell provides a sidebar navigation layout optimized for operations management. The sidebar displays all major sections with clear visual hierarchy, while the content area provides maximum space for data tables, forms, and dashboards.

## Layout Pattern

- **Desktop:** Dark sidebar (#212121) on the left, collapsed by default (64px), expands on hover (240px). Content area fills remaining space with header bar containing user menu.
- **Mobile:** Bottom tab navigation showing 5 primary sections. Hamburger menu opens full sidebar overlay.

## Navigation Structure

| Nav Item | Route | Sub-items |
|----------|-------|-----------|
| Incidents | /incidents | — |
| Sales CRM | /sales-crm | All Leads, My Leads |
| Subscribers | /subscribers | — |
| Customers | /customers | — |
| Lawyers | /lawyers | — |
| Partners | /partners | — |
| Payments | /payments | — |
| Disputes | /disputes | — |
| Support | /support | — |
| Reports | /reports | — |
| Team | /team | — |

## Components Provided

### `AppShell`
Root layout wrapper. Renders sidebar, header, content area, and mobile bottom nav.

**Props:**
- `children` — Page content
- `navigationItems` — Array of nav items with label, href, icon, isActive, children
- `user` — Current user (name, email, avatarUrl, designation)
- `breadcrumbs` — Breadcrumb path (currently disabled)
- `onNavigate` — Called when user clicks a nav item
- `onLogout` — Called when user clicks logout

### `MainNav`
Sidebar navigation with collapsible sub-items.

**Props:**
- `items` — Navigation items array
- `onNavigate` — Navigation callback
- `isCollapsed` — Whether sidebar is collapsed
- `darkMode` — Use dark color scheme

### `UserMenu`
User avatar with dropdown containing logout.

**Props:**
- `user` — User object (name, email, avatarUrl, designation)
- `onLogout` — Logout callback

## Design Notes

- Active nav items use `bg-cyan-600 text-white`
- Collapsed sidebar shows icons only with hover tooltips
- Sub-navigation items (e.g., Sales CRM children) auto-expand when a child is active
- Smooth 300ms transition when hovering to expand sidebar
- Logo shows "L" when collapsed, full logo image when expanded
- Mobile bottom nav shows first 5 items from navigation

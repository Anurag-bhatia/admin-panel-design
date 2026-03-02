# Application Shell

## Overview

The Admin Panel shell provides a sidebar navigation layout optimized for operations management. The sidebar displays all major sections with clear visual hierarchy, while the content area provides maximum space for data tables, forms, and dashboards.

## Components

### AppShell

Main layout wrapper that provides:
- Collapsible sidebar navigation (expands on hover)
- Mobile-responsive layout with bottom tab navigation
- Header with breadcrumbs and user menu
- Content area for page content

**Props:**
- `children` — Page content to render
- `navigationItems` — Array of navigation items with icons
- `user` — Current user info (name, email, avatar)
- `breadcrumbs` — Current navigation path
- `onNavigate` — Callback when navigation item clicked
- `onLogout` — Callback when logout clicked

### MainNav

Navigation component with:
- Collapsible/expandable sidebar
- Active state highlighting (cyan-600)
- Sub-navigation support
- Dark mode styling

### UserMenu

User menu component with:
- Avatar or initials display
- Dropdown with user info
- Logout action

## Navigation Structure

| Route | Label | Icon |
|-------|-------|------|
| `/incidents` | Incidents | AlertTriangle |
| `/sales-crm` | Sales CRM | TrendingUp |
| `/sales-crm/all-leads` | All Leads | — |
| `/sales-crm/my-leads` | My Leads | — |
| `/subscribers` | Subscribers | Users |
| `/customers` | Customers | UserCheck |
| `/lawyers` | Lawyers | Scale |
| `/partners` | Partners | Handshake |
| `/support` | Support | Headphones |
| `/reports` | Reports | BarChart3 |
| `/team` | Team | UsersRound |

## Layout Pattern

- **Desktop:** Sidebar on left (240px expanded, 64px collapsed), content fills remaining space
- **Tablet:** Similar to desktop
- **Mobile:** Bottom tab navigation with first 5 sections, hamburger menu for sidebar

## Design Notes

- Sidebar has dark background (#212121) with zinc borders
- Active items use cyan-600 background with white text
- Collapse/expand uses smooth 300ms transition
- Logo shows "L" when collapsed, full logo when expanded

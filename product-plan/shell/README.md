# Application Shell

## Overview

The Admin Panel shell provides a sidebar navigation layout optimized for operations management. The sidebar displays all major sections with clear visual hierarchy, while the content area provides maximum space for data tables, forms, and dashboards.

## Components

### AppShell
Main layout wrapper that provides the sidebar + content area structure.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Main content to render |
| `navigationItems` | `NavigationItem[]` | Sidebar navigation items |
| `user` | `User` | Current user info |
| `breadcrumbs` | `Breadcrumb[]` | Breadcrumb trail |
| `onNavigate` | `(href: string) => void` | Navigation callback |
| `onLogout` | `() => void` | Logout callback |

### MainNav
Sidebar navigation with collapsible sections and active state highlighting.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `items` | `NavigationItem[]` | Navigation items |
| `onNavigate` | `(href: string) => void` | Click callback |
| `isCollapsed` | `boolean` | Collapsed state |
| `darkMode` | `boolean` | Dark sidebar theme |

### UserMenu
User avatar with dropdown menu for account actions.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `user` | `User` | User info (name, email, avatar) |
| `onLogout` | `() => void` | Logout callback |

## Layout Pattern

- **Desktop:** Sidebar (240px, collapsible to 64px) on left, content fills remaining space
- **Tablet:** Sidebar visible but slightly narrower
- **Mobile:** Bottom tab navigation bar with top 5 sections

## Navigation Structure

Wire up navigation items for these sections:
1. Incidents
2. Sales CRM (sub-items: All Leads, My Leads)
3. Subscribers
4. Customers
5. Lawyers
6. Partners
7. Payments
8. Disputes
9. Support
10. Reports
11. Team

## Design Notes

- Sidebar background: `#212121` with zinc-800 borders
- Active items: `cyan-600` background, white text
- Collapsed state shows single letter "L" logo, expanded shows full logo
- Hover-to-expand behavior on desktop
- Icons from `lucide-react`

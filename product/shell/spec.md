# Application Shell Specification

## Overview
The Admin Panel shell provides a sidebar navigation layout optimized for operations management. The sidebar displays all major sections with clear visual hierarchy, while the content area provides maximum space for data tables, forms, and dashboards. The user menu is positioned in the top right of the content area for quick access to account actions.

## Navigation Structure
- Incidents → Core challan workflow section
- Sales CRM → Lead capture and qualification
  - All Leads → Complete lead pipeline view
  - My Leads → Personal assigned leads view
- Subscribers → Active client account management
- Customers → Customer profile management and service delivery tracking
- Lawyers → Legal professional network management
- Partners → Partner relationship management
- Payments → Commission and refund processing
- Disputes → Customer dispute resolution
- Support → Support ticket management
- Reports → Analytics and reporting dashboards
- Team → User and team administration

## Breadcrumbs
Located in the header between the mobile menu button and the user menu. Displays the current navigation path (e.g., "Incidents" or "Sales CRM > My Leads"). Breadcrumb items can be clickable links to navigate back to parent sections. The last breadcrumb item is not clickable and shows the current page in bold.

## User Menu
Located in the top right corner of the content area header. Displays user avatar, name, and a dropdown menu containing logout and account-related actions.

## Layout Pattern
Sidebar navigation on the left (240px width on desktop, collapsible to 64px) with content area filling the remaining space. The sidebar contains the product logo at the top with a collapse button, followed by the navigation menu. Active states use the primary cyan color for clear visual feedback. When collapsed, only icons are shown with tooltips on hover.

## Responsive Behavior
- **Desktop:** Full sidebar visible on left (240px), content area fills remaining space with user menu in top right
- **Tablet:** Sidebar remains visible but may be slightly narrower (200px), layout maintains same structure
- **Mobile:** Sidebar converts to bottom tab navigation bar showing primary sections with icons, user menu moves to top right of mobile header

## Design Notes
- Default view on login is the Incidents section
- Navigation items use icons from lucide-react for visual clarity
- Active navigation items are highlighted with cyan-600 background and white text
- Sidebar has a subtle border on the right using slate-200/slate-800 for light/dark modes
- Sidebar collapse button shows PanelLeftClose icon when expanded, PanelLeft icon when collapsed
- When collapsed, navigation items show only icons centered with tooltips displaying the full label
- Collapsible sub-navigation is hidden when sidebar is collapsed
- Smooth transition animation (300ms) when toggling sidebar collapse state
- Breadcrumbs use ChevronRight icons as separators between items
- Breadcrumb links are styled in slate-600 with hover states, current page is bold in slate-900
- User menu dropdown appears on click with smooth animation
- Bottom navigation on mobile shows up to 5 key sections with remaining items in an overflow menu

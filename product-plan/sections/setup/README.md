# Setup

## Overview

Centralized configuration hub for managing system-wide categories, data points, statuses, and configurable values across all modules. Replaces hardcoded values with admin-managed configuration.

## User Flows

- Browse configuration areas via tabs: Categories, Data Points, Statuses, Sources, Service Types, Geographic Values, Audit Log
- Add entries via slide-over panel from right
- Edit entries via slide-over (pre-filled)
- Toggle entry status (active/inactive)
- Reorder entries via drag-and-drop
- View per-section audit history
- View global audit log with filters

## Design Decisions

- Tabbed layout with 7 configuration areas
- Slide-over panel keeps table visible behind
- Protected core values locked with tooltip
- Hierarchical category support
- Admin-only access

## Data Used

**Entities:** Configuration entries (Categories, Data Points, Statuses, Sources, Service Types, Geographic Values)
**From global model:** Audit Log

## Components Provided

- **SetupDashboard** — Main setup page with tab navigation across all configuration areas
- **SetupSidebar** — Left sidebar navigation for switching between configuration categories
- **SlideOverPanel** — Slide-over panel from the right for adding and editing configuration entries
- **ServicesTable** — Table for managing service type configuration entries
- **PriceCategoriesTable** — Table for managing price category configuration entries
- **DepartmentsTable** — Table for managing department configuration entries
- **DesignationsTable** — Table for managing designation configuration entries
- **MastersTable** — Table for managing master data configuration entries
- **GeographicTable** — Table for managing geographic value configuration entries (states, cities, etc.)
- **AuditLogTable** — Table displaying global audit log with filtering and search

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddEntry` | Create configuration entry |
| `onEditEntry` | Edit configuration entry |
| `onToggleStatus` | Activate/deactivate entry |
| `onReorder` | Reorder entries |

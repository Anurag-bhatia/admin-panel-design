# Setup (Admin Control)

## Overview

Centralized configuration hub for managing system-wide categories, data points, statuses, and configurable values. All selectable values across the platform are managed here instead of being hardcoded, with full audit history and protected core values.

## Components Provided

- `SetupDashboard` — Main tabbed view
- `SetupSidebar` — Navigation sidebar
- `SlideOverPanel` — Right-side panel for add/edit forms
- `ServicesTable` — Services configuration
- `PriceCategoriesTable` — Price categories
- `DepartmentsTable` — Departments
- `DesignationsTable` — Designations
- `MastersTable` — Master values
- `GeographicTable` — Geographic values
- `AuditLogTable` — Global audit log

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAdd` | Add new configuration entry |
| `onEdit` | Edit existing entry |
| `onToggleStatus` | Activate/deactivate entry |
| `onReorder` | Reorder entries via drag |
| `onSearch` | Search entries |
| `onFilter` | Filter by status/module |

## Data Used

**Entities:** Service, PriceCategory, Department, Designation, Master, MasterValue, GeographicValue, AuditEntry

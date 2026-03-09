# Setup (Admin Control) Specification

## Overview
The Setup module is the centralized configuration hub of the platform, providing administrators with a structured interface to manage system-wide categories, data points, statuses, and configurable values used across Incidents, Leads, Subscribers, Lawyers, Payments, Disputes, and Reports. All selectable values and operational metadata are managed here instead of being hardcoded, ensuring the platform remains flexible and adaptable as business rules evolve.

## User Flows
- **Browse configuration areas** — User lands on a tabbed dashboard with horizontal tabs: Categories, Data Points, Statuses, Sources, Service Types, Geographic Values. Switching tabs shows the relevant data table.
- **Add a new entry** — User clicks "Add" button above the table, a slide-over panel opens from the right with the creation form (name, description, category/parent, usage module, status). User fills and saves.
- **Edit an existing entry** — User clicks a row, a slide-over panel opens pre-filled with the entry's data. User modifies fields and saves.
- **Deactivate/reactivate an entry** — User toggles status between active/inactive via the slide-over or inline toggle. Inactive entries are hidden from future selections across the platform but preserved in historical records.
- **Reorder entries** — User drags rows to reorder display priority (e.g., dropdown order in forms across modules).
- **View per-section audit history** — Each tab has a "History" sub-tab showing changes made within that configuration area (who, what, when).
- **View global audit log** — A dedicated "Audit Log" tab at the top level aggregates all configuration changes across all areas with filters by area, user, and date range.
- **Search and filter** — User can search entries by name and filter by status (active/inactive) and usage module.

## UI Requirements
- Tabbed layout with horizontal tabs: Categories, Data Points, Statuses, Sources, Service Types, Geographic Values, Audit Log
- Each tab displays a data table with columns relevant to that config type (name, description, status, module, last modified, modified by)
- Slide-over panel from the right for add/edit forms — table remains visible behind
- Status toggle (active/inactive) with visual badge indicators
- Drag-to-reorder rows within tables
- Each config tab has an inline "History" sub-tab for per-section audit trail
- Global "Audit Log" tab with filterable timeline of all changes (user, area, action, timestamp)
- Admin-only access — module hidden or disabled for non-admin users
- Protected core values cannot be edited or deactivated (visually locked with tooltip explanation)
- Hierarchical category support — parent category selector shown when applicable

## Configuration
- shell: true

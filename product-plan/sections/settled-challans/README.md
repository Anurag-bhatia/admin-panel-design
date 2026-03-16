# Settled Challans

## Overview

Dedicated read-only table view for browsing all settled challans. Provides search, filtering, and export capabilities for quick lookup and reporting on resolved challans. No creation, editing, or detail views.

## Components Provided

- `SettledChallansDashboard` — Main table view with search, filters, export, pagination

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSearch` | Search across all fields |
| `onFilter` | Apply date range, subscriber, state, amount filters |
| `onExport` | Export filtered data as CSV/Excel |

## Data Used

**Entities:** SettledChallan

# Settled Challans

## Overview

Dedicated read-only table view for browsing all settled challans with search, filtering, and export capabilities.

## User Flows

- View paginated table of settled challans (Vehicle No, Subscriber, Challan No, Offence Name)
- Search across records
- Filter by date range, subscriber, state, amount
- Export filtered data as CSV/Excel

## Design Decisions

- Purely read-only — no row click or detail view
- Optimized for quick lookup and reporting
- Simple table with search and filters

## Data Used

**Entities:** Settled Challan (resolved Incident)
**From global model:** Incident, Subscriber

## Components Provided

- **SettledChallansDashboard** — Main view with paginated table of settled challans, search bar, filters, and export functionality

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSearch` | Search across records |
| `onFilter` | Apply filters |
| `onExport` | Export data |

# Customers (Registered Visitors)

## Overview

Centralized D2C visitor management system providing a unified view of each visitor, their vehicles, incidents, challans, and payment history. Acts as the single source of truth for all retail visitor interactions with a detail page featuring 5 tabs.

## Components Provided

- `CustomerList` — Main list view
- `CustomerListHeader` — Search, Add/Bulk Upload buttons
- `CustomerTable` — Data table
- `CustomerRow` — Table row with visitor data
- `BulkUploadCustomers` — CSV/Excel upload modal
- `CustomerDetailView` — Full detail page with 5 tabs

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddCustomer` | Create new visitor |
| `onBulkUpload` | Upload visitors via CSV/Excel |
| `onViewDetail` | Open visitor detail |
| `onEdit` | Edit visitor profile |
| `onSearch` | Search visitors |
| `onExport` | Export visitor data |

## Data Used

**Entities:** Customer, Vehicle, Incident, Challan, FinancialSummary, ActivityLog

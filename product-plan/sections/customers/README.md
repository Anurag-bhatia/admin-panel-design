# Customers

## Overview

D2C visitor profile management and service delivery tracking. Provides operations, support, and finance teams with unified view of each visitor.

## User Flows

- Browse and search D2C visitors
- Add visitors individually or bulk upload
- View visitor details with tabs: Details, Incidents, Challans, Vehicles, Financials
- Edit visitor profiles
- Create incidents from visitor detail page

## Design Decisions

- Consistent detail page layout matching Subscriber Detail Page structure
- Empty states with helpful messages on all tabs
- Read-only financials (system-generated)
- Bulk upload with dedicated modal component

## Data Used

**Entities:** Customer (with FinancialSummary), Vehicle, Incident, Challan, ActivityLog
**From global model:** Incident, Vehicle

## Components Provided

| Component | Description |
|-----------|-------------|
| `CustomerList` | Main list view with search, filters, and customer table |
| `CustomerListHeader` | Header bar with search input, filter controls, and action buttons (Add, Bulk Upload) |
| `CustomerTable` | Table component displaying customer rows with sortable columns |
| `CustomerRow` | Single customer row with name, contact, vehicles count, incidents count, and payment status |
| `BulkUploadCustomers` | Modal for bulk uploading customer data via Excel/CSV file |

**Additional components (not re-exported from index.ts):**

| Component | Description |
|-----------|-------------|
| `CustomerDetailView` | Full detail page with tabs for Details, Incidents, Challans, Vehicles, and Financials |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddCustomer` | Create visitor |
| `onBulkUpload` | Excel bulk import |
| `onViewCustomer` | Open detail page |
| `onSearch` | Search customers |
| `onExport` | Export selected customers |
| `onBulkStatusUpdate` | Bulk update customer status |
| `onBulkTag` | Bulk tag customers |
| `onEditCustomer` | Update visitor info |
| `onCreateIncident` | Create incident from detail page |
| `onViewIncident` | View full incident details |
| `onUpdateIncidentStatus` | Quick-update incident status |
| `onViewChallan` | View full challan details |
| `onViewVehicle` | View vehicle details |
| `onBack` | Navigate back to customer list |

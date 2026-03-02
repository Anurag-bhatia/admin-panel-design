# Customers

## Overview

The Customers module manages D2C customers who use the platform independently, providing a unified view of vehicles, incidents, challans, and payment history.

## Components Provided

- `CustomerList` — Main list view
- `CustomerTable` — Customer table with search
- `CustomerRow` — Individual customer row
- `BulkUploadCustomers` — Bulk upload modal
- `CustomerDetailView` — Detail page with 5 tabs

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewCustomer` | View customer details |
| `onAddCustomer` | Add new customer |
| `onBulkUpload` | Bulk upload customers |
| `onEditCustomer` | Edit customer |
| `onCreateIncident` | Create incident for customer |
| `onViewIncident` | View incident details |
| `onUpdateIncidentStatus` | Quick status update |

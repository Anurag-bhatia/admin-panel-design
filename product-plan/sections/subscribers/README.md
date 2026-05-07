# Subscribers

## Overview

System of record for all customers subscribed to the platform's services. Manages the complete subscriber lifecycle connecting sales, operations, and finance.

## User Flows

- View subscriber list with search and filters
- Add subscribers individually or via bulk upload
- View subscriber details with 7 tabs: Details, Challans, Incidents, Documents, Subscription, Wallet, Team
- Edit subscriber information
- Manage subscriptions and team assignments
- Add and manage vehicles and drivers
- Record follow-up activities
- Upload and manage documents (Contract, KYC, Invoice, Fleet Data, Technical)

## Design Decisions

- Full-screen detail page (not modal) with 7-tab navigation
- Status indicator pills (Active green, Inactive gray)
- Operational activity gated by subscriber status
- Subscription management with plan types, price categories, and payment status tracking
- Bulk upload with validation error reporting

## Data Used

**Entities:** Subscriber, Subscription, Vehicle, Driver, FollowUp, Document, User, Partner
**From global model:** Incident, Refund, Support Ticket

## Components Provided

| Component | Description |
|-----------|-------------|
| `SubscriberList` | Main list view with search, filters, and subscriber table |
| `SubscriberDetail` | Full detail page with 7-tab layout (Details, Challans, Incidents, Documents, Subscription, Wallet, Team) |
| `SubscribersDashboard` | Dashboard view with summary metrics and subscriber overview cards |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddSubscriber` | Create subscriber |
| `onBulkUpload` | Excel bulk import |
| `onViewDetails` | Open detail page |
| `onEdit` | Update subscriber info |
| `onSearch` | Search subscribers |
| `onFilter` | Apply filters (status, source, owner, state, city, plan, payment) |
| `onEditSubscriber` | Edit subscriber from detail page |
| `onAddFollowUp` | Record follow-up activity |
| `onEditFollowUp` | Edit existing follow-up |
| `onAddVehicle` | Add vehicle to subscriber |
| `onEditVehicle` | Edit vehicle details |
| `onDeleteVehicle` | Remove vehicle |
| `onAddDriver` | Add driver to subscriber |
| `onEditDriver` | Edit driver details |
| `onDeleteDriver` | Remove driver |
| `onUploadDocument` | Upload document |
| `onViewDocument` | View or download document |
| `onDeleteDocument` | Remove document |
| `onManageSubscription` | Manage subscription plan |
| `onViewIncidents` | View linked incidents |
| `onAssignTeam` | Assign team members |
| `onBack` | Navigate back to list |

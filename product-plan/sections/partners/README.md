# Partners

## Overview

Business introducer management for external organizations that onboard subscribers. Partners earn commissions and have controlled access. Supports two partner types: LOTS247 and ChallanPay, each with distinct onboarding flows and feature sets.

## User Flows

- View partner list with search, filters, status toggle
- Add LOTS247 partner via 4-step onboarding
- Add ChallanPay partner via 3-step onboarding
- View partner details with type-specific tabs (Profile, Subscribers/Visitors, Financial, Documents, Activity, Outlets, QRs, Follow-Ups)
- Edit partner information
- Manage partner status (active/inactive)
- View linked subscribers and incidents (read-only)
- Manage outlets and QR codes (ChallanPay partners)
- Record follow-up activities with stage-based tracking (Registration, Verification, Activation, Mobilisation)

## Design Decisions

- 4-step stepper onboarding flow for LOTS247, 3-step for ChallanPay
- Deactivation prevents new subscriber onboarding
- System-calculated earnings and payout history
- All data displayed is system-generated or permission-controlled
- Partner type determines available tabs and features
- Stage-based follow-up tracking with sub-activity types

## Data Used

**Entities:** Partner (with LinkedSubscriber, Payout, Document, ActivityLogEntry, Vehicle, RegisteredVisitor, RegisteredVisitorDetail, PartnerFollowUp, OutletQR, Outlet)
**From global model:** Subscriber, Commission

## Components Provided

| Component | Description |
|-----------|-------------|
| `PartnerList` | Main list view with search, status filter, and partner table |
| `PartnerDetail` | Full detail page with type-specific tabs (Profile, Subscribers/Visitors, Financial, Documents, Activity, Outlets, QRs, Follow-Ups) |
| `AddPartner` | 4-step onboarding form for LOTS247 partners |
| `AddPartnerChallanPay` | 3-step onboarding form for ChallanPay partners |
| `EditPartner` | Edit form for updating partner information |
| `PartnersDashboard` | Dashboard view with partner metrics and summary cards |
| `PartnersListHeader` | Header bar with search, filters, and action buttons |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreate` | Open onboarding form |
| `onView` | Open detail page |
| `onEditPartner` | Update partner info |
| `onToggleStatus` | Activate/deactivate partner |
| `onSearch` | Search partners by name |
| `onFilterStatus` | Filter by status (active, inactive, all) |
| `onSort` | Sort by column |
| `onExport` | Export partner data |
| `onBack` | Navigate back to partner list |
| `onViewIncidents` | View incidents for a linked subscriber |
| `onUploadDocument` | Upload document to partner |
| `onDeleteDocument` | Remove document from partner |
| `onAddSubscriber` | Add subscriber (LOTS247 only) |
| `onBulkImportSubscribers` | Bulk import subscribers (LOTS247 only) |
| `onAddFollowUp` | Record follow-up activity (ChallanPay only) |

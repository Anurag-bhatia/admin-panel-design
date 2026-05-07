# Payments

## Overview

Unified workspace for refund processing, lawyer fee management, and partner payouts with collapsible sidebar navigation.

## User Flows

- Navigate between Refunds, Lawyer Fees, Leads, Partners views via collapsible sidebar
- Process refunds through stages (Refund Raised, Completed, Hold, Rejected)
- View refund detail with activity log and notes tabs
- Track lawyer fees (To Pay, Completed, Hold, Rejected)
- Manage partner payouts (Eligible, Requested, Auto-Processed, Processing, Processed, Failed)
- Bulk approve/process refunds
- Bulk mark lawyer fees as paid
- Bulk mark partner payouts as paid
- Navigate to lawyer/partner profiles from rows
- Export data from any view

## Design Decisions

- Collapsible sidebar mirrors Disputes layout pattern
- Cross-section navigation to lawyer and partner profiles
- Only refunds have bulk actions (disputes are sensitive)
- Separate stage tabs per view
- Refund detail view with dedicated activity log and notes tabs
- Supports both challan and case work types for refunds

## Data Used

**Entities:** Refund (with RefundActivityLogEntry, RefundNote, RefundFollowUp), LawyerFee, PartnerPayout
**From global model:** Incident, Lawyer, Partner, Subscriber, Lead, User

## Components Provided

| Component | Description |
|-----------|-------------|
| `PaymentsDashboard` | Main dashboard orchestrating all payment views (Refunds, Lawyer Fees, Leads, Partners) |
| `PaymentsSidebar` | Collapsible sidebar for navigating between payment sub-sections |
| `PaymentsStageTabs` | Tab bar showing payment stages with badge counts per stage |
| `PaymentsTableHeader` | Column header row for the payments table |
| `RefundRow` | Single refund row with status, amount, linked incident, and action menu |
| `LawyerFeeRow` | Single lawyer fee row with lawyer name, incident, amount, and status |
| `PartnerPayoutRow` | Single partner payout row with partner name, earnings, payout amount, and status |
| `RefundBulkActionsBar` | Floating action bar for bulk operations on selected refunds |
| `RefundDetailView` | Full detail view for a single refund with summary, activity, and notes |
| `RefundActivityTab` | Activity/audit log tab in refund detail view |
| `RefundNotesTab` | Internal notes tab for refund detail view |
| `Pagination` | Page navigation control with page size and total count |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onApproveRefund` | Approve refund |
| `onProcessRefund` | Process refund |
| `onBulkApproveRefunds` | Bulk approve selected refunds |
| `onBulkProcessRefunds` | Bulk process selected refunds |
| `onExportRefunds` | Export refund data |
| `onViewLawyerProfile` | Navigate to lawyer profile |
| `onBulkMarkLawyerFeesPaid` | Bulk mark lawyer fees as paid |
| `onExportLawyerFees` | Export lawyer fee data |
| `onViewLead` | View lead details |
| `onAssignLead` | Assign a lead |
| `onBulkMarkLeadsConverted` | Bulk mark leads as converted |
| `onViewPartnerProfile` | Navigate to partner profile |
| `onBulkMarkPartnerPayoutsPaid` | Bulk mark partner payouts as paid |
| `onExportPartnerPayouts` | Export partner payout data |

# Payments

## Overview

Unified workspace for refund processing, lawyer fee management, and partner payouts. Features a collapsible sidebar to switch between four views (Refunds, Lawyer Fees, Leads, Partners) with stage-based tabs and cross-section navigation to lawyer and partner profiles.

## Components Provided

- `PaymentsDashboard` — Main workspace with sidebar
- `PaymentsSidebar` — Sidebar navigation (Refunds, Lawyer Fees, Leads, Partners)
- `PaymentsStageTabs` — Stage tabs with counts
- `PaymentsTableHeader` — Search, filters, export
- `RefundRow` — Refund table row
- `LawyerFeeRow` — Lawyer fee table row
- `PartnerPayoutRow` — Partner payout table row
- `RefundBulkActionsBar` — Bulk approve/process
- `RefundDetailView` — Refund detail page
- `RefundActivityTab` — Activity log
- `RefundNotesTab` — Notes section
- `Pagination` — Page navigation

## Callback Props

| Callback | Description |
|----------|-------------|
| `onApproveRefund` | Approve selected refunds |
| `onProcessRefund` | Process approved refunds |
| `onViewRefundDetail` | Open refund detail |
| `onViewLawyerProfile` | Navigate to lawyer profile |
| `onViewPartnerProfile` | Navigate to partner profile |
| `onExport` | Export data |
| `onSearch` | Search records |
| `onFilter` | Apply filters |

## Data Used

**Entities:** Refund, LawyerFee, PartnerPayout, Payment

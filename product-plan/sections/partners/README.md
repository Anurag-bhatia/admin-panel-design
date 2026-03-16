# Partners

## Overview

External business introducer management for subscriber onboarding with commission tracking. Partners onboard subscribers, earn commissions, and have visibility into their linked subscribers and metrics through a detail page with Profile, Subscribers, Financial, Documents, and Activity tabs.

## Components Provided

- `PartnerList` — Main list view
- `PartnerDetail` — Detail page with 5 tabs
- `AddPartner` — 4-step onboarding stepper
- `AddPartnerChallanPay` — ChallanPay partner variant
- `EditPartner` — Partner editing form
- `PartnersDashboard` — Dashboard with metrics
- `PartnersListHeader` — Search, filters, Add Partner button

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddPartner` | Start partner onboarding |
| `onViewDetail` | Open partner detail |
| `onEdit` | Edit partner info |
| `onToggleStatus` | Activate/deactivate partner |
| `onSearch` | Search partners |
| `onFilter` | Filter by status |

## Data Used

**Entities:** Partner, Subscriber, Payout, Document, FollowUp, Outlet, Vehicle, QRCode

# Subscribers

## Overview

System of record for all B2B clients actively or historically subscribed to the platform's services. Manages the complete subscriber lifecycle from onboarding through service delivery with a full-screen detail page featuring 7 tabs covering all aspects of the subscriber relationship.

## Components Provided

- `SubscribersDashboard` — Main dashboard view
- `SubscriberList` — Subscriber table with search, filters, actions
- `SubscriberDetail` — Full-screen detail page with 7-tab navigation

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddSubscriber` | Create new subscriber |
| `onBulkUpload` | Upload subscribers via Excel |
| `onViewDetail` | Open subscriber detail |
| `onEdit` | Edit subscriber info |
| `onSearch` | Search subscribers |
| `onFilter` | Apply filters |

## Data Used

**Entities:** Subscriber, Subscription, Vehicle, Driver, Document, User, Partner

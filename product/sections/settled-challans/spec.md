# Settled Challans Specification

## Overview
A dedicated read-only table view for browsing all settled challans. Provides search, filtering, and export capabilities for quick lookup and reporting on resolved challans.

## User Flows
- User views a paginated table of settled challans with columns: Vehicle No, Subscriber, Challan No, Offence Name
- User searches across the table (by vehicle no, challan no, subscriber, etc.)
- User filters the table by date range, subscriber, state, and amount
- User exports the filtered table data as CSV/Excel

## UI Requirements
- Table layout with columns: Vehicle No, Subscriber, Challan No, Offence Name
- Search bar for full-text search across records
- Filter controls for: date range, subscriber, state, amount
- Export button to download filtered data
- Pagination for the table
- Read-only — no row click or detail view

## Configuration
- shell: true

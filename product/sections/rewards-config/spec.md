# Rewards Configuration Specification

## Overview
The Rewards Configuration module is a lightweight admin dashboard for the Ops Head, Product Head, CEO, and CTO to configure the Operations Cost % / Margin % / Lawyered Margin % structure that determines the maximum reward ChallanPay can pass on to a user, at a state level. Access is gated by an email allow-list — only the four named individuals can view or edit configurations. Every change is versioned and viewable through a per-state change history.

## User Flows
- **Access the module** — User signs in with their company email. The module checks the logged-in email against the allow-list. Allowed users see the full dashboard; anyone else sees a locked screen with a "No access" message.
- **View all configurations** — User lands on a table listing one row per state (State, Region, Ops %, Margin %, Lawyered CV %, Lawyered NCV %, Max CV Reward %, Max NCV Reward %, Status, Approval Status, Last Updated By, Actions). Rows can be filtered by All / Active / Inactive and searched by state name.
- **Add configuration** — User clicks "Add Configuration" in the header. A form opens with fields in order: Select State (dropdown, states with existing configs excluded), Select Region (locked to "All Regions" in Phase 1), Operations Cost % (0–100), Margin % (auto-calculated, read-only), Lawyered CV Margin % (must be ≤ Margin %), Lawyered NCV Margin % (must be ≤ Margin %), Status (Active/Inactive). A live Max Reward preview strip below the form shows resulting Max CV Reward % and Max NCV Reward % as the user types. On submit, a confirmation popup summarizes the values; Yes runs validations and saves; No returns to the unchanged form.
- **Update configuration** — From the View All Configurations table, user clicks "Edit" on a row. The form opens pre-filled with the state's current values. State and Region are locked. Ops %, Lawyered CV Margin %, Lawyered NCV Margin %, and Status are editable. Margin % continues to auto-calculate. On submit, confirmation popup → validations → immediate save. A new version is recorded in the change log; the previous version is never deleted.
- **View change history** — From any row in View All Configurations, user clicks "History". A read-only chronological log opens showing every version of that state's configuration: date/timestamp, fields changed, before → after values, and who made the change. Nothing is ever overwritten.
- **Inline validation** — All validation errors (V1–V9) appear inline next to the offending field. Confirmation popup is blocked until inline validations pass on submit.

## UI Requirements
- Persistent "Logged in as [Role] · Full access" chip in the top-right of the module header — makes the allow-list gating visible.
- View All Configurations is the default landing screen for the module.
- Table columns: State, Region, Ops %, Margin %, Lawyered CV %, Lawyered NCV %, Max CV Reward %, Max NCV Reward %, Status (Active/Inactive badge), Approval Status (Approved badge — placeholder for Phase 2 maker-checker), Last Updated By, Actions (Edit, History).
- Max CV Reward % and Max NCV Reward % are computed/display-only, visually distinguished (subtle background tint) to signal derived values.
- Filter chips (All / Active / Inactive) and a search-by-state input above the table, matching the Setup module pattern.
- Add and Update forms use the same visual template — two-column layout, section grouping (Scope · Cost & Margin · Lawyered Margins · Status), inline field errors, live preview strip at the bottom of the form showing Max CV Reward % and Max NCV Reward %.
- Locked fields in the Update form (State, Region) are visually greyed out with a "Locked" badge and a small hint explaining why.
- Tooltip icons next to Lawyered CV Margin % and Lawyered NCV Margin % labels — "CV – Commercial Vehicle" and "NCV – Non-Commercial Vehicle."
- Confirmation modal is a small centered dialog: title, key summary lines (State, Ops %, Margin %, Max CV Reward %, Max NCV Reward %), two buttons — "No" (secondary) and "Yes, Add / Update Configuration" (primary).
- Change History modal shows a compact table: Date/Timestamp, Field(s) Changed, Before → After, Changed By. Read-only. Includes an "Initial creation" row at the bottom.
- Empty state for View All Configurations (no configurations yet): centered card with icon, headline "No configurations yet", subheading, and an "Add your first configuration" primary CTA.
- Fully responsive across sm/md/lg/xl; full dark mode support with `dark:` variants.

## Configuration
- shell: true

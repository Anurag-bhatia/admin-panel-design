# My Leads Specification

## Overview
My Leads is a personal command center for sales executives that provides a focused, action-oriented daily workspace. It displays only leads assigned to or actively followed up by the logged-in user, helping them plan their day, prioritize conversations, and drive leads toward closure with minimum friction. The module automatically surfaces today's meetings and high-priority actions, eliminating the need for personal notebooks or tracking sheets.

## User Flows
- View today's date, scheduled meetings (with time slots, lead names, and meeting types), and automatically generated priorities at the top of the page
- See Today's Priorities displayed as a list showing warm leads awaiting follow-up, quotations pending response, and overdue follow-ups
- Navigate between tabs: Assigned Leads, Follow-up (with sub-segments: Warm Leads, Cold Leads, All), Quotation, Converted Leads, and Lost Leads
- View leads in a scannable table showing lead ID, name/company, contact details, current status, last interaction date, and next follow-up date
- Click on any lead row to open the full lead detail page (same as in All Leads)
- Use quick actions on each row: View full details, Log follow-up + Schedule next follow-up, Send/Mark quotation
- Within the Follow-up tab, filter by Warm Leads, Cold Leads, or All to prioritize high-intent prospects
- Log follow-up notes immediately after calls or meetings to maintain data accuracy without friction

## UI Requirements
- Today's date displayed prominently at the top
- Today's Meetings section showing chronological schedule with time slots, lead name/company, and meeting type (blank if no meetings scheduled)
- Today's Priorities section displayed as a compact list of actionable items with automatic prioritization
- Tab navigation for Assigned Leads, Follow-up, Quotation, Converted Leads, Lost Leads
- Follow-up tab includes sub-tabs/segments for Warm Leads, Cold Leads, and All
- Table view optimized for scanning with columns: lead ID, name/company, contact details, status, last interaction, next follow-up
- Visual emphasis on "next action" rather than historical data
- Quick action buttons/menu on each row for common tasks
- Clean, uncluttered interface that emphasizes today's priorities and next actions
- All leads shown must be filtered to only those assigned to or followed up by the logged-in sales executive
- Clicking a lead row navigates to the shared lead detail page (same component used in All Leads)

## Configuration
- shell: true

# CMS Section -- Test Instructions

## Overview

The CMS section manages blogs, events, and news articles published across customer-facing channels. It features a two-tab layout (Blog / Events & News), data tables with inline status controls, modal forms for adding entries, rich text editing, and search/filter capabilities.

---

## 1. User Flow Tests

### 1.1 View Blogs (Default View)

**Success path:**
- Landing on the CMS section displays the "Blog" tab as active by default.
- The breadcrumb shows "CMS / Blog List".
- The blog table displays columns: SR No., Name, Category, Author, Read Mins, Featured on Challan Pay (Yes/No), Icon (thumbnail image), Alt Text.
- Blog entries are listed with sequential serial numbers starting from 1.
- A "+ Add Blog" button is visible as the primary action.
- Each blog row shows the correct values for all columns.
- The Featured column displays "Yes" or "No" (not true/false or 1/0).

**Failure path:**
- If blog data fails to load, an error message is shown in place of the table.

### 1.2 Add Blog

**Success path:**
- Clicking "+ Add Blog" opens a modal form.
- The modal contains fields: Title (text input), Category (dropdown or text), Author (text input), Read Mins (number input), Featured on Challan Pay (toggle), Icon (file upload), Alt Text (text input), Content (rich text editor).
- User fills in all required fields.
- The rich text editor supports formatting (bold, italic, headings, lists, links, images).
- Clicking "Submit" or "Save" creates the blog.
- The modal closes and the new blog appears in the table with the next sequential SR No.

**Failure path:**
- Submitting with required fields empty (e.g., Title, Category, Author) shows inline validation errors.
- Clicking "Cancel" or the modal close button discards unsaved data and closes the modal without creating a blog.
- Uploading an invalid file type for Icon shows an error message.

### 1.3 Edit Blog

**Success path:**
- Clicking an edit action on a blog row opens the modal pre-filled with the blog's current data.
- User modifies fields and submits.
- The modal closes and the table row updates to reflect the changes.

### 1.4 Delete Blog

**Success path:**
- Clicking a delete action on a blog row triggers a confirmation dialog.
- Confirming deletion removes the blog from the table.
- Serial numbers of remaining blogs re-sequence correctly.

**Failure path:**
- Cancelling the confirmation dialog leaves the blog unchanged.

### 1.5 View Events & News

**Success path:**
- Clicking the "Events & News" tab switches the view.
- The breadcrumb updates to "CMS / Event and News List".
- The events/news table displays columns: SR No., Name, Category, Author, Read Mins, Icon (thumbnail), Status (Enabled/Disabled), Actions (Toggle, Edit, Delete).
- Each entry shows the correct Status badge ("Enabled" in green, "Disabled" in grey/red).
- A "+ Add Event and News" button is visible.

### 1.6 Add Event & News

**Success path:**
- Clicking "+ Add Event and News" opens a modal form.
- The modal contains fields: Title (text input), Category (dropdown or text), Author (text input), Read Mins (number input), Icon (file upload), Content (rich text editor).
- User fills in all required fields and submits.
- The modal closes and the new entry appears in the Events & News table with "Enabled" status by default.

**Failure path:**
- Submitting with missing required fields shows validation errors.
- Clicking "Cancel" discards the form and closes the modal.

### 1.7 Toggle Event/News Status

**Success path:**
- Clicking the toggle/enable-disable action on an events/news row changes its status.
- If currently "Enabled", it changes to "Disabled" and the badge updates.
- If currently "Disabled", it changes to "Enabled" and the badge updates.
- The `onToggleEventNewsStatus` callback is called with the entry ID and the new status value.

### 1.8 Edit Event/News

**Success path:**
- Clicking the edit action on an events/news row opens the modal pre-filled with current data.
- User modifies fields and submits.
- The table row updates to reflect the changes.

### 1.9 Delete Event/News

**Success path:**
- Clicking the delete action triggers a confirmation dialog.
- Confirming deletion removes the entry from the table.

**Failure path:**
- Cancelling the dialog leaves the entry unchanged.

### 1.10 Search/Filter Blogs

**Success path:**
- A search bar above the blog table allows searching by name, category, or author.
- Typing a query filters the table rows in real time.
- Clearing the search input restores all blog entries.

**Success path (Events & News):**
- A similar search bar on the Events & News tab filters event/news entries.

---

## 2. Empty State Tests

- **No blogs**: When the blog list is empty, display "No blog posts yet" with a "+ Add Blog" button.
- **No events/news**: When the events/news list is empty, display "No events or news articles yet" with a "+ Add Event and News" button.
- **No search results (blogs)**: Searching with a term that matches no blogs shows "No blogs found for '[search term]'."
- **No search results (events/news)**: Searching with a term that matches no events/news shows "No events or news found for '[search term]'."

---

## 3. Component Interaction Tests

- **Tab switching**: Clicking "Blog" and "Events & News" tabs toggles between the two views. Only one tab is active at a time. The active tab has distinct visual styling. The breadcrumb updates on tab switch.
- **Modal open/close**: Clicking "+ Add Blog" or "+ Add Event and News" opens the respective modal. Clicking "Cancel", the close (X) button, or pressing Escape closes the modal. The modal has a backdrop overlay.
- **Modal pre-fill on edit**: When editing, modal form fields are populated with the selected entry's current values, including the rich text content.
- **SR No. auto-increment**: New entries automatically receive the next sequential serial number based on existing entries.
- **Featured toggle**: The "Featured on Challan Pay" toggle in the Add Blog modal defaults to off (No). Toggling it changes the value to Yes/true.
- **Icon thumbnail display**: The Icon column in the table displays a small thumbnail preview of the uploaded image. If no icon is uploaded, a placeholder is shown.
- **Rich text editor**: The content field in both modals renders a rich text editor with formatting toolbar. Content entered with formatting is preserved on save and displayed correctly on edit.
- **Status badge styling**: "Enabled" badges use a green/success color. "Disabled" badges use a grey/muted color.

---

## 4. Edge Cases

- **Long blog titles**: Titles exceeding 100+ characters should truncate with ellipsis in the table but show full text in the modal.
- **Very long content**: Blog posts or events with extensive rich text content (10,000+ characters) should save and load without truncation or errors.
- **Large icon file**: Uploading an image larger than the allowed size limit should show a file-size validation error.
- **Special characters in title**: Titles with characters like &, <, >, ", ' should render correctly in the table and modal.
- **Zero read minutes**: Entering 0 for "Read Mins" should be accepted as valid.
- **Negative read minutes**: Entering a negative number for "Read Mins" should show a validation error.
- **Rapid toggle**: Quickly toggling an event/news status multiple times should resolve to the correct final state.
- **Duplicate blog names**: Adding a blog with the same name as an existing one should either be allowed (blogs can share names) or show a duplicate warning.
- **HTML injection in content**: The rich text editor should sanitize input to prevent XSS (e.g., `<script>` tags should be stripped or escaped).
- **Missing icon alt text**: If no alt text is provided for the icon, the table cell should display empty or a default value, not "undefined".

---

## 5. Accessibility Checks

- All tabs are keyboard-navigable and activated with Enter or Space.
- Modal forms trap focus when open and return focus to the triggering button when closed.
- Modals can be closed with the Escape key.
- All form fields in modals have visible labels or `aria-label` attributes.
- The "+ Add Blog" and "+ Add Event and News" buttons have descriptive text (not just icons).
- Status badges ("Enabled" / "Disabled") convey meaning via text, not color alone.
- Toggle controls for enable/disable have accessible labels (e.g., "Toggle status for [entry name]").
- The rich text editor is keyboard-accessible (formatting shortcuts, tab navigation of toolbar).
- Table headers have appropriate `<th>` elements with scope attributes.
- Image thumbnails in the Icon column have `alt` attributes matching the entry's Alt Text field.
- Color contrast meets WCAG AA for all text, badges, and buttons in both light and dark modes.
- Delete confirmation dialogs are announced to screen readers.

---

## 6. Sample Test Data

### Blogs

| id | srNo | name | category | author | readMins | featuredOnChallanPay | icon | altText | status |
|----|------|------|----------|--------|----------|---------------------|------|---------|--------|
| BLOG-001 | 1 | Understanding Traffic Challans in India | Legal | Rahul Sharma | 5 | true | /images/challan-guide.jpg | Traffic challan guide | enabled |
| BLOG-002 | 2 | How to Pay Challans Online | How-To | Priya Patel | 3 | true | /images/online-pay.jpg | Online payment guide | enabled |
| BLOG-003 | 3 | New Motor Vehicle Act 2019 Updates | News | Amit Verma | 7 | false | /images/mv-act.jpg | Motor vehicle act | enabled |
| BLOG-004 | 4 | Top 10 Traffic Offences | Awareness | Neha Singh | 4 | false | /images/offences.jpg | Traffic offences list | disabled |

### Events & News

| id | srNo | name | category | author | readMins | icon | status |
|----|------|------|----------|--------|----------|------|--------|
| EVT-001 | 1 | Road Safety Week 2026 | Event | Admin | 2 | /images/road-safety.jpg | enabled |
| EVT-002 | 2 | Partnership with Delhi Traffic Police | News | Admin | 3 | /images/delhi-police.jpg | enabled |
| EVT-003 | 3 | Challan Pay App Update v3.0 | News | Priya Patel | 1 | /images/app-update.jpg | disabled |

### Add Blog Form Data

```
title: "Tips for Avoiding Traffic Fines"
category: "Awareness"
author: "Deepak Kumar"
readMins: 6
featuredOnChallanPay: false
icon: tips-traffic.jpg (valid JPEG, 200KB)
altText: "Traffic tips illustration"
content: "<h2>Introduction</h2><p>Here are the top tips for staying fine-free on Indian roads...</p>"
```

### Add Event/News Form Data

```
title: "Annual Driver Safety Conference 2026"
category: "Event"
author: "Admin"
readMins: 2
icon: safety-conference.jpg (valid JPEG, 150KB)
content: "<p>Join us for the annual driver safety conference happening on June 15, 2026...</p>"
```

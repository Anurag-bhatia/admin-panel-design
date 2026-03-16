# Milestone 14: CMS

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the CMS module — content management for creating, editing, and publishing blogs, events, and news articles.

## Overview

The CMS provides a simple content management interface for maintaining customer-facing content across blogs and events/news sections.

**Key Functionality:**
- Two tabs: Blog and Events & News
- Blog list table (SR No, Name, Category, Author, Read Mins, Featured, Icon, Alt Text)
- Events & News table (SR No, Name, Category, Author, Read Mins, Icon, Status, Actions)
- Add blog with rich text editor
- Add event/news article
- Toggle enable/disable for events/news
- Edit and delete entries

## Recommended Approach: Test-Driven Development

See `product-plan/sections/cms/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

- `CMSDashboard` — Main tabbed view
- `BlogList` — Blog table
- `EventNewsList` — Events & News table
- `AddBlogPage` — Blog creation page with rich text editor
- `AddEventNewsPage` — Event/News creation page
- `RichTextEditor` — Content editor component

### Empty States

- **No blog posts:** "No blog posts yet. Click '+ Add Blog' to create one."
- **No events/news:** "No events or news yet. Click '+ Add Event and News' to create one."

## Files to Reference

- `product-plan/sections/cms/README.md` — Feature overview
- `product-plan/sections/cms/tests.md` — Test-writing instructions
- `product-plan/sections/cms/components/` — React components
- `product-plan/sections/cms/types.ts` — TypeScript interfaces
- `product-plan/sections/cms/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Create Blog Post
1. User clicks "+ Add Blog"
2. Form opens with fields: Title, Category, Author, Read Mins, Featured toggle, Icon upload, Alt Text, Content (rich text)
3. User fills in details and submits
4. **Outcome:** Blog post appears in Blog tab list

### Flow 2: Create Event/News
1. User switches to "Events & News" tab
2. Clicks "+ Add Event and News"
3. Fills form with title, category, author, content
4. **Outcome:** Entry appears in list as Enabled by default

### Flow 3: Toggle Event Status
1. User clicks enable/disable toggle on an event row
2. **Outcome:** Event status changes immediately

## Done When

- [ ] Tests written and passing
- [ ] Blog tab shows blog list
- [ ] Add blog works with rich text editor
- [ ] Events & News tab shows entries
- [ ] Add event/news works
- [ ] Toggle enable/disable works
- [ ] Edit and delete work
- [ ] Image upload works
- [ ] Empty states display properly
- [ ] Responsive on mobile

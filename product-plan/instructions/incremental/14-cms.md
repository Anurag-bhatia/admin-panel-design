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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the CMS section — blog and events/news content management.

## Overview

Content management system for creating, editing, and publishing blogs, events, and news articles surfaced across customer-facing channels.

**Key Functionality:**
- Blog management with table list, add/edit forms
- Events & News management with enable/disable toggle
- Rich text editor for content creation
- Image upload for blog/event icons
- Category and author assignment

## Recommended Approach: Test-Driven Development

See `product-plan/sections/cms/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/cms/components/`:

- `CMSDashboard` — Main CMS view with tabs
- `BlogList` — Blog posts table
- `AddBlogModal` / `AddBlogPage` — Blog creation form
- `EventNewsList` — Events & news table
- `AddEventNewsModal` / `AddEventNewsPage` — Event/news creation form
- `RichTextEditor` — Content editor

### Expected User Flows

### Flow 1: Add Blog Post
1. User clicks "+ Add Blog"
2. User fills in title, category, author, content
3. User uploads icon image
4. User clicks "Save"
5. **Outcome:** Blog appears in list

### Flow 2: Manage Events & News
1. User clicks "Events & News" tab
2. User sees table with enable/disable toggle
3. User toggles an entry to disabled
4. **Outcome:** Entry status changes, reflected in table

## Files to Reference

- `product-plan/sections/cms/components/`
- `product-plan/sections/cms/types.ts`
- `product-plan/sections/cms/sample-data.json`
- `product-plan/sections/cms/tests.md`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Blog list renders correctly
- [ ] Blog creation with rich text works
- [ ] Events & News tab works
- [ ] Enable/disable toggle works
- [ ] Image upload works
- [ ] Empty states display properly
- [ ] Responsive on mobile

# CMS

## Overview

Content management system for creating, editing, and publishing blogs, events, and news articles surfaced across customer-facing channels. Simple two-tab interface with rich text editing capabilities.

## Components Provided

- `CMSDashboard` — Main tabbed view (Blog / Events & News)
- `BlogList` — Blog posts table
- `EventNewsList` — Events & News table
- `AddBlogPage` — Blog creation with rich text editor
- `AddEventNewsPage` — Event/News creation
- `RichTextEditor` — Content editor component

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddBlog` | Create new blog post |
| `onEditBlog` | Edit blog post |
| `onAddEventNews` | Create event/news |
| `onEditEventNews` | Edit event/news |
| `onDeleteEventNews` | Delete event/news |
| `onToggleStatus` | Enable/disable event/news |

## Data Used

**Entities:** Blog, EventNews

# CMS

## Overview

Content management system for creating, editing, and publishing blogs, events, and news articles for customer-facing channels.

## User Flows

- View blog posts in table (SR No., Name, Category, Author, Read Mins, Featured, Icon, Alt Text)
- Add new blog via modal form with rich text editor
- View events & news in table with enable/disable toggle
- Add events & news via modal form
- Toggle event/news status (Enabled/Disabled)
- Edit and delete entries

## Design Decisions

- Two-tab layout: Blog and Events & News
- Modal forms for content creation
- Rich text editor for content body
- Image upload for icons/thumbnails
- Toggle for featured blog status

## Data Used

**Entities:** Blog Post, Event/News Article
**From global model:** None (standalone content)

## Components Provided

- **CMSDashboard** — Main CMS page with tab navigation between Blog and Events & News sections
- **BlogList** — Table view listing all blog posts with columns for name, category, author, read time, and featured status
- **EventNewsList** — Table view listing all events and news articles with enable/disable toggle
- **AddBlogPage** — Full-page form for creating a new blog post with rich text editor and metadata fields
- **AddEventNewsPage** — Full-page form for creating a new event or news article with metadata fields
- **RichTextEditor** — Reusable rich text editor component for composing blog and article content

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddBlog` | Create blog post |
| `onEditBlog` | Edit blog post |
| `onAddEventNews` | Create event/news |
| `onEditEventNews` | Edit event/news |
| `onToggleStatus` | Enable/disable entry |
| `onDelete` | Delete entry |

# Tailwind Color Configuration

## Color Choices

- **Primary:** `cyan` — Used for buttons, links, active navigation, key accents
- **Secondary:** `zinc` — Used for tags, highlights, secondary elements, disabled states
- **Neutral:** `slate` — Used for backgrounds, text, borders, structural elements

## Usage Examples

### Buttons
```html
<!-- Primary -->
<button class="bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400">Action</button>

<!-- Secondary -->
<button class="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300">Secondary</button>

<!-- Outline -->
<button class="border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-600 dark:hover:bg-slate-800 dark:text-slate-300">Outline</button>
```

### Status Badges
```html
<span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</span>
<span class="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">Pending</span>
<span class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Overdue</span>
```

### Surfaces
```html
<!-- Page background -->
<div class="bg-slate-50 dark:bg-slate-950">

<!-- Card -->
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">

<!-- Table header -->
<thead class="bg-slate-50 dark:bg-slate-800">

<!-- Sidebar -->
<aside class="bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
```

### Text
```html
<h1 class="text-slate-900 dark:text-slate-100">Primary text</h1>
<p class="text-slate-600 dark:text-slate-400">Secondary text</p>
<span class="text-slate-400 dark:text-slate-500">Placeholder</span>
```

### Active Navigation
```html
<a class="bg-cyan-600 text-white">Active item</a>
<a class="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Inactive item</a>
```

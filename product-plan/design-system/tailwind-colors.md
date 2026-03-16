# Tailwind Color Configuration

## Color Choices

- **Primary:** `cyan` — Used for buttons, links, active navigation states, key accents
- **Secondary:** `zinc` — Used for sidebar background, borders, secondary UI elements
- **Neutral:** `slate` — Used for backgrounds, text, surfaces, cards

## Usage Examples

### Primary (Cyan)
```
Primary button:     bg-cyan-600 hover:bg-cyan-700 text-white
Active nav item:    bg-cyan-600 text-white
Link:               text-cyan-600 hover:text-cyan-700 dark:text-cyan-400
Badge:              bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200
Focus ring:         ring-cyan-500
```

### Secondary (Zinc)
```
Sidebar background: bg-zinc-900 (dark sidebar: #212121)
Sidebar border:     border-zinc-800
Secondary button:   bg-zinc-100 hover:bg-zinc-200 text-zinc-800
Muted text:         text-zinc-500 dark:text-zinc-400
Divider:            border-zinc-200 dark:border-zinc-700
```

### Neutral (Slate)
```
Page background:    bg-slate-50 dark:bg-slate-950
Card background:    bg-white dark:bg-slate-900
Primary text:       text-slate-900 dark:text-white
Secondary text:     text-slate-600 dark:text-slate-400
Border:             border-slate-200 dark:border-slate-800
Header:             bg-white dark:bg-slate-900 border-b border-slate-200
```

### Status Colors (Tailwind Built-in)
```
Success:   bg-emerald-100 text-emerald-800 (or green variants)
Warning:   bg-amber-100 text-amber-800
Error:     bg-red-100 text-red-800
Info:      bg-blue-100 text-blue-800
```

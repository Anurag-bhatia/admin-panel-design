# Typography Configuration

## Status

Typography tokens are **not defined** for this product. You may choose fonts that match your brand.

## Recommendations

If you need font suggestions, consider:

### Option A: System Fonts (Zero Config)
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```
- No external dependencies
- Fast loading
- Native look on each platform

### Option B: Inter (Popular for Admin UIs)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Option C: DM Sans (Clean and Modern)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** Your chosen heading font (or system default)
- **Body text:** Your chosen body font (or system default)
- **Code/technical:** `ui-monospace, 'Cascadia Code', 'Fira Code', monospace`

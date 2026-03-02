# One-Shot Implementation Prompt

Copy and paste this prompt into your coding agent (Claude, Cursor, etc.) to implement the full product in one session.

---

## Prompt

I need you to implement a complete admin panel application based on the design specifications I'll provide.

**Before we begin, please ask me about:**
1. **Authentication**: What auth provider should we use? (e.g., NextAuth, Clerk, Firebase Auth, custom)
2. **User Model**: How should user data be structured and stored?
3. **Tech Stack**: What framework? (Next.js, Vite + React, etc.) What database? (PostgreSQL, MongoDB, Supabase, etc.)
4. **Deployment**: Where will this be deployed? (Vercel, AWS, self-hosted, etc.)

**Once I answer those questions, please:**
1. Review the `product-overview.md` for context
2. Follow the instructions in `instructions/one-shot-instructions.md`
3. Use the components in `shell/` and `sections/` as reference implementations
4. Apply the design system from `design-system/`
5. Use the types and sample data from each section's folder

**Implementation approach:**
- Start with the foundation (project setup, design system, routing)
- Implement the shell (navigation, layout)
- Build each section incrementally
- Write tests using the `tests.md` files in each section
- Ensure dark mode and mobile responsiveness throughout

**Key files to reference:**
- `product-overview.md` — Product context and section list
- `instructions/one-shot-instructions.md` — Complete implementation guide
- `design-system/` — Colors, typography, tokens
- `shell/components/` — Navigation and layout components
- `sections/[name]/` — Components, types, sample data, tests

Let's begin! Please ask your clarifying questions first.

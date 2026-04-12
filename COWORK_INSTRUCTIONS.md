# Hasib Akash Portfolio — Claude Cowork Project Instructions

## Identity & Role

You are the dedicated engineering agent for Hasib Akash's personal portfolio website. You have full read/write access to the GitHub repo and deploy via Vercel on every push to `main`. Your job is to implement changes Hasib requests — edits, new features, bug fixes, content updates — and push them to GitHub immediately.

---

## Repository Access

- **Repo:** https://github.com/hasibakash03/Hasib-Akash-portfolio
- **Branch:** `main` (always push here — auto-deploys to Vercel)
- **PAT:** YOUR_PAT_HERE
- **Clone command:** `git clone https://YOUR_PAT@github.com/hasibakash03/Hasib-Akash-portfolio.git`
- **Git config:** `git config user.email "hasib@tradefigur.com" && git config user.name "Hasib Akash"`

**Workflow for every task:**
1. Clone or pull latest from `main`
2. Make changes
3. `npm run build` — must pass with 0 errors before pushing
4. `git add -A && git commit -m "..." && git push origin main`

---

## Live URLs

- **Site:** https://hasibakash.vercel.app
- **Admin CMS:** https://hasibakash.vercel.app/admin
- **Vercel project:** https://vercel.com/hasibakash03-2874s-projects/hasib-akash-portfolio

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind v4 (CSS-first) | 4.x |
| Database | Neon (Serverless Postgres) | — |
| ORM | Drizzle ORM | 0.45.x |
| Auth | NextAuth.js v5 beta | 5.0.0-beta.25 |
| Email | Resend | 6.x |
| Analytics | Vercel Analytics + Speed Insights | — |
| Icons | Lucide React | 1.8.x |
| Deployment | Vercel | — |

**Critical dependency note:** `next-auth@5.0.0-beta.25` conflicts with Next.js 16. The `.npmrc` file contains `legacy-peer-deps=true` to fix this for Vercel builds. Never remove `.npmrc`.

---

## Design System — NEVER DEVIATE FROM THIS

### Colors (all inline HSL — no Tailwind classes for colors)
```
Accent (CTA purple):   hsl(275 70% 55%)
Accent bright:         hsl(275 75% 65%)
Primary purple:        hsl(270 60% 40%)
Background:            hsl(270 30% 98%)
Background tint:       hsl(270 25% 95%)
Text:                  hsl(270 20% 12%)
Text light:            hsl(270 15% 40%)
Border:                hsl(270 20% 88%)

Dark gradient 1 (Hero):    linear-gradient(135deg, hsl(270 60% 10%), hsl(275 65% 20%), hsl(285 60% 28%))
Dark gradient 2 (Process): linear-gradient(135deg, hsl(270 60% 18%), hsl(275 55% 28%))
Dark gradient 3 (CTA):     linear-gradient(135deg, hsl(270 60% 25%), hsl(280 65% 40%), hsl(290 55% 50%))
```

### Typography
- Font: **Urbanist** (Google Fonts) — loaded via `<link>` in `app/layout.tsx`
- All weights 400-900 available
- H1 hero: `fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontWeight: 900, letterSpacing: "-0.02em"`
- Eyebrow labels: `fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase"`

### UI Rules
- **Buttons:** `borderRadius: 9999` (pill shape always)
- **Cards:** `borderRadius: "1.25rem"`, hover = `translateY(-4px)` + accent border + shadow
- **All styles are inline** — no Tailwind utility classes for design (Tailwind v4 is configured but design uses inline styles for consistency)
- **Dark sections** always use inline `style={{ background: "linear-gradient(...)" }}`

### Section IDs (required for Navbar dark/light detection)
- `id="section-hero"` — on hero section
- `id="section-process"` — on process section
- `id="section-cta"` — on CTA/form section

---

## File Structure

```
app/
├── layout.tsx              # Root layout — fonts, OG metadata, JSON-LD, Analytics
├── page.tsx                # Homepage — server component, fetches from DB
├── globals.css             # Tailwind v4 @theme + animations + mobile fixes
├── error.tsx               # Global error boundary
├── loading.tsx             # Loading spinner
├── not-found.tsx           # 404 page
├── sitemap.ts              # Auto-generated sitemap
├── robots.ts               # robots.txt
├── og/route.tsx            # Dynamic OG image (Edge runtime)
├── blog/
│   ├── page.tsx            # Blog listing — DB with static fallback
│   └── [slug]/page.tsx     # Blog post — DB + static fallback + dynamic metadata
├── projects/
│   ├── page.tsx            # Projects grid — DB with static fallback
│   └── [slug]/page.tsx     # Case study — DB + static + JSON-LD
├── consult/
│   └── page.tsx            # Offers + FAQ + form — Service JSON-LD
└── admin/
    ├── layout.tsx          # Auth guard — redirects to /admin/login if no session
    ├── AdminSidebar.tsx    # "use client" — sidebar navigation
    ├── login/page.tsx      # Login form
    ├── page.tsx            # Dashboard
    ├── hero/page.tsx       # Hero section editor
    ├── logos/page.tsx      # Logo slider CRUD
    ├── problem-cards/      # Problem cards editor
    ├── insight/            # Insight section editor
    ├── services/           # Service cards editor
    ├── process/            # Process steps editor
    ├── about/page.tsx      # About section + photo editor
    ├── stats/              # Stats editor
    ├── testimonials/page.tsx # Testimonials CRUD
    ├── projects/page.tsx   # Projects CRUD
    ├── blog/page.tsx       # Blog posts CRUD
    ├── offers/page.tsx     # Consultation offers CRUD
    ├── faq/page.tsx        # FAQ CRUD
    ├── submissions/page.tsx # Form submissions viewer
    └── settings/page.tsx   # Site settings

components/
├── Navbar.tsx              # "use client" — scroll + dark/light section detection
├── Footer.tsx              # Server component
├── ScrollReveal.tsx        # "use client" — IntersectionObserver animations
├── HoverCard.tsx           # "use client" — hover state handler
├── LogoSlider.tsx          # "use client" — CSS marquee
├── ContactForm.tsx         # "use client" — form → submitContactFormFull action
├── BlogCard.tsx            # "use client" — FeaturedBlogCard + BlogPostCard
├── ProjectCard.tsx         # "use client" — hover card
├── OfferCards.tsx          # "use client" — 3 consultation tier cards
└── admin/
    └── AdminCard.tsx       # Shared admin UI primitives

db/
├── schema.ts               # All 17 Drizzle table definitions
└── index.ts                # Lazy Neon connection (safe at build time without DATABASE_URL)

lib/
├── auth.ts                 # NextAuth v5 — env-var login + DB login
├── actions.ts              # ALL server actions (mutations → DB → revalidatePath)
├── data.ts                 # ALL data fetching (DB first → static fallback)
├── resend.ts               # Email notification on form submission
└── utils.ts                # cn(), slugify(), formatDate()

middleware.ts               # Protects /admin/* — redirects to /admin/login
drizzle.config.ts           # Drizzle Kit (reads .env.local via dotenv)
.npmrc                      # legacy-peer-deps=true — required for Vercel
```

---

## Database Tables (17 total in `db/schema.ts`)

| Table | Admin Page | Frontend Page |
|---|---|---|
| `users` | — | — |
| `site_settings` | /admin/settings | layout.tsx |
| `hero` | /admin/hero | homepage |
| `logos` | /admin/logos | homepage |
| `problem_cards` | /admin/problem-cards | homepage |
| `insight` | /admin/insight | homepage |
| `service_cards` | /admin/services | homepage |
| `process_steps` | /admin/process | homepage |
| `about` | /admin/about | homepage |
| `stats` | /admin/stats | homepage |
| `testimonials` | /admin/testimonials | homepage |
| `cta_section` | — | homepage |
| `projects` | /admin/projects | /projects, /projects/[slug] |
| `blog_posts` | /admin/blog | /blog, /blog/[slug] |
| `offers` | /admin/offers | /consult |
| `faq` | /admin/faq | /consult |
| `form_submissions` | /admin/submissions | (write from ContactForm) |

---

## Data Pattern — DB First, Static Fallback

Every frontend page fetches from DB using `lib/data.ts` helpers. If DB is unavailable or returns empty, static hardcoded content is returned. **Never break this pattern** — it's what keeps the site working even if DB has issues.

```typescript
// Pattern in lib/data.ts
export const fetchHero = cache(async () => {
  try {
    const { db, hero } = await import("@/db");
    const rows = await db.select().from(hero).limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return { /* static fallback */ };
});
```

---

## Server Actions Pattern

All mutations live in `lib/actions.ts`. Pattern:

```typescript
export async function updateSomething(data: {...}) {
  await requireAdmin(); // auth check
  // db operation
  revalidatePath("/affected-route"); // clear Next.js cache
  return { success: true };
}
```

**Always call `revalidatePath()`** after any mutation so the live site reflects the change immediately.

---

## Admin Components Available (`components/admin/AdminCard.tsx`)

```typescript
AdminCard        // white card wrapper with title + description
AdminInput       // label + input or textarea
AdminSelect      // label + select dropdown
SaveButton       // purple submit button with loading state
DeleteButton     // red delete button
PageHeader       // page title + description + optional action button
StatusBadge      // colored pill badge (new/contacted/closed/published/draft)
Toggle           // toggle switch
```

---

## Environment Variables (set in Vercel)

```
DATABASE_URL          postgresql://...neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET       VWHv8Zvp3oHOOZgtsj/hlxN929Wkp3tZTOpjPXRM7oU=
NEXTAUTH_URL          https://hasibakash.vercel.app
ADMIN_EMAIL           (Hasib's email)
ADMIN_PASSWORD        (Hasib's password)
RESEND_API_KEY        re_xxxxx
NOTIFICATION_EMAIL    hasib@tradefigur.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  dvhobmzyk
CLOUDINARY_API_KEY    (from Cloudinary dashboard)
CLOUDINARY_API_SECRET (from Cloudinary dashboard)
```

---

## Rules — Always Follow

1. **Build must pass before pushing.** Run `npm run build` locally. Fix all TypeScript errors before committing.

2. **Never break the static fallback.** Every `lib/data.ts` function must have a hardcoded fallback return if DB fails.

3. **Never use onMouseEnter/Leave in server components.** Extract interactive elements to `"use client"` components (like `HoverCard.tsx`).

4. **Never remove `.npmrc`.** The `legacy-peer-deps=true` is required for Vercel to install `next-auth`.

5. **Always use inline styles** for design tokens (colors, typography, spacing). Match the purple monochrome design system exactly.

6. **Always call `revalidatePath()`** in server actions after any DB mutation.

7. **Admin pages are always `"use client"`** — they use React state for forms.

8. **Server components fetch data** — `app/page.tsx`, `app/blog/page.tsx`, `app/projects/page.tsx` etc. are server components that call `lib/data.ts` functions with `await`.

9. **Commit messages must be descriptive.** Format: `feat:`, `fix:`, `docs:`, `style:`, or `refactor:` prefix.

10. **Never push without building first.** The Vercel build environment is stricter than local TypeScript — always verify.

---

## Common Tasks & How to Handle Them

### Adding a new blog post via code
Don't — use the CMS at `/admin/blog` instead. If asked to add content, direct Hasib to the CMS.

### Changing copy on the homepage
Edit `app/page.tsx` for static copy, or update via `/admin/hero`, `/admin/about` etc. for CMS-managed copy.

### Changing the accent color
Update `hsl(275 70% 55%)` across all files. Search the codebase for this value.

### Adding a new page
Create `app/new-page/page.tsx` as a server component. Import `Navbar` and `Footer`. Add to Footer nav if needed.

### Adding a new admin section
1. Create `app/admin/new-section/page.tsx` as `"use client"` with form
2. Add server action to `lib/actions.ts`
3. Add data fetcher to `lib/data.ts` with static fallback
4. Add nav item to `app/admin/AdminSidebar.tsx`
5. Wire to frontend page

### Fixing a Vercel build error
Always check: missing `"use client"` directive, `onMouseEnter` in server component, TypeScript type errors, missing env vars.

---

## Strategic Context (don't change without Hasib's approval)

- **Positioning:** "Strategy-first" consultant — tagline: "Your business doesn't have a marketing problem. It has a strategy problem."
- **Primary CTA:** Book a Free Strategy Diagnostic (free 30-min call)
- **Target market:** Bangladeshi SME founders, 25-45, 5-50 lakh/month revenue
- **Offer tiers:** Free Diagnostic → 9,900৳ Blueprint → 29,900৳ Intensive
- **Agency:** TradeFigur (tradefigur.com) — Hasib's brand strategy agency
- **Location:** Chattogram (Chittagong), Bangladesh

Never change the positioning language, CTA structure, or offer prices without explicit instruction from Hasib.

---

## What's Not Done Yet (pending tasks)

- [ ] Cloudinary upload widget in admin forms (currently paste URL manually)
- [ ] Newsletter signup wired to Resend audience
- [ ] WhatsApp number updated from placeholder `+8801XXXXXXXXX` to real number (update in DB via /admin/settings)
- [ ] Real favicon PNGs (currently 1x1 placeholders — replace with proper branded icons)
- [ ] Custom domain setup (update `NEXTAUTH_URL` in Vercel when domain is ready)

---

*Instructions version 1.0 — April 2026*
*Built by Alfred Advisory System across 5 phases*

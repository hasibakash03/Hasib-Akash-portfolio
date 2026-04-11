# Hasib Akash Portfolio — Complete Project Handover
**For:** Claude Cowork (desktop agent)
**Date:** April 2026
**Repo:** https://github.com/hasibakash03/Hasib-Akash-portfolio
**Live URL:** https://hasibakash.vercel.app

---

## 1. What This Project Is

A personal authority website + lead generation funnel for Hasib Akash — brand strategist and founder of TradeFigur, Chattogram, Bangladesh. It is NOT a portfolio site. Every page exists to move a visitor to book a free Strategy Diagnostic consultation.

**Strategic positioning:** "Strategy-first" consultant — no one else in the Chittagong market occupies this position. Tagline: "Your business doesn't have a marketing problem. It has a strategy problem."

**Primary conversion goal:** Book a Free Strategy Diagnostic (free 30-min call, application form on homepage and /consult)

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.3 (App Router) |
| Language | TypeScript |
| Styling | Tailwind v4 (CSS-first, @theme block) |
| Database | Neon (Serverless Postgres) |
| ORM | Drizzle ORM |
| Auth | NextAuth.js v5 (beta.25) |
| Email | Resend |
| Images | Cloudinary (configured, not yet integrated in UI) |
| Icons | Lucide React |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel |

**Critical note:** `next-auth@5.0.0-beta.25` requires `--legacy-peer-deps` because it only supports Next.js 14-15 officially (we're on 16). The `.npmrc` file handles this for Vercel.

---

## 3. Design System

**Colors (all HSL, purple monochrome):**
- Primary: `hsl(270 60% 40%)`
- Accent: `hsl(275 70% 55%)` ← main CTA color
- Accent Bright: `hsl(275 75% 65%)`
- Background: `hsl(270 30% 98%)`
- Background Tint: `hsl(270 25% 95%)`
- Text: `hsl(270 20% 12%)`
- Border: `hsl(270 20% 88%)`
- Dark BG 1 (hero): `linear-gradient(135deg, hsl(270 60% 10%), hsl(275 65% 20%), hsl(285 60% 28%))`
- Dark BG 2 (process): `linear-gradient(135deg, hsl(270 60% 18%), hsl(275 55% 28%))`
- Dark BG 3 (CTA): `linear-gradient(135deg, hsl(270 60% 25%), hsl(280 65% 40%), hsl(290 55% 50%))`

**Typography:** Urbanist (Google Fonts), weights 400-900. Loaded via `<link>` in layout.tsx head.

**Section rhythm (homepage):** Dark → Light → Light → Light-tint → Light → Dark → Light → Light-tint → Dark → Light

**Key UI rules:**
- Buttons: `border-radius: 9999px` (pill shape)
- Cards: `border-radius: 1.25rem`, hover lifts with `translateY(-4px)` + purple border
- All dark sections use inline `style={{ background: "linear-gradient(...)" }}`
- Navbar: fixed, glassmorphic, section-aware (detects dark/light sections via IDs: `section-hero`, `section-process`, `section-cta`)

---

## 4. File Structure

```
├── app/
│   ├── layout.tsx              # Root layout, fonts, OG metadata, JSON-LD, Analytics
│   ├── page.tsx                # Homepage — 10 sections, fetches hero+testimonials from DB
│   ├── globals.css             # Tailwind v4 @theme tokens + all animations + mobile fixes
│   ├── error.tsx               # Global error boundary
│   ├── loading.tsx             # Global loading spinner
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Auto-generated sitemap (static + DB slugs)
│   ├── robots.ts               # robots.txt (/admin blocked)
│   ├── og/route.tsx            # Dynamic OG image (Edge, ImageResponse)
│   ├── blog/
│   │   ├── page.tsx            # Blog listing — DB-powered with static fallback
│   │   └── [slug]/page.tsx     # Blog post — DB + static fallback, dynamic metadata
│   ├── projects/
│   │   ├── page.tsx            # Projects grid — DB-powered with static fallback
│   │   └── [slug]/page.tsx     # Case study — DB + static fallback, JSON-LD
│   ├── consult/
│   │   └── page.tsx            # Offer tiers + FAQ + form, Service JSON-LD
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout — checks auth, shows sidebar
│   │   ├── AdminSidebar.tsx    # "use client" — sidebar nav with sign out
│   │   ├── page.tsx            # Dashboard with quick links + setup notice
│   │   ├── login/page.tsx      # Login form (email + password)
│   │   ├── hero/page.tsx       # Edit hero section
│   │   ├── logos/page.tsx      # Logo slider CRUD
│   │   ├── testimonials/page.tsx # Testimonials CRUD
│   │   ├── projects/page.tsx   # Projects CRUD (full form)
│   │   ├── blog/page.tsx       # Blog posts CRUD (body editor + SEO)
│   │   ├── offers/page.tsx     # Consultation offers CRUD
│   │   ├── faq/page.tsx        # FAQ items CRUD
│   │   ├── submissions/page.tsx # Form submissions viewer + status management
│   │   ├── settings/page.tsx   # Site-wide settings
│   │   └── [stubs]/page.tsx    # about, insight, services, process, stats, problem-cards
│   └── api/
│       └── auth/[...nextauth]/route.ts  # NextAuth API handler
├── components/
│   ├── Navbar.tsx              # "use client" — scroll detection, dark/light switching
│   ├── Footer.tsx              # Server component
│   ├── ScrollReveal.tsx        # "use client" — IntersectionObserver animations
│   ├── HoverCard.tsx           # "use client" — hover style switching
│   ├── LogoSlider.tsx          # "use client" — CSS marquee animation
│   ├── ContactForm.tsx         # "use client" — calls submitContactFormFull server action
│   ├── BlogCard.tsx            # "use client" — FeaturedBlogCard + BlogPostCard
│   ├── ProjectCard.tsx         # "use client" — hover card
│   ├── OfferCards.tsx          # "use client" — 3 offer tier cards
│   └── admin/
│       └── AdminCard.tsx       # Shared admin UI: AdminInput, AdminSelect, AdminToggle,
│                               #   SaveButton, DeleteButton, SaveToast, PageHeader, StatusBadge
├── db/
│   ├── schema.ts               # All 16 Drizzle table definitions
│   └── index.ts                # Lazy Neon connection (safe at build time)
├── lib/
│   ├── auth.ts                 # NextAuth v5 config (env-var login + DB login)
│   ├── actions.ts              # All Server Actions (hero, logos, testimonials, projects,
│   │                           #   blog, offers, faq, form submissions, site settings)
│   ├── data.ts                 # Frontend data fetching (DB first → static fallback)
│   ├── resend.ts               # Email notification on form submission
│   └── utils.ts                # cn(), slugify(), formatDate()
├── middleware.ts               # Protects /admin/* routes via NextAuth JWT
├── drizzle.config.ts           # Drizzle Kit config (reads .env.local)
├── .npmrc                      # legacy-peer-deps=true (required for Vercel)
└── .env.example                # All required env vars documented
```

---

## 5. Database Schema (16 tables)

All defined in `db/schema.ts` using Drizzle ORM.

| Table | Purpose |
|---|---|
| `users` | Admin users (id, email, passwordHash, role) |
| `site_settings` | Global config (title, email, whatsapp, footer) |
| `hero` | Homepage hero section (eyebrow, heading, subheading, CTA, bg image) |
| `logos` | Logo slider items (name, imageUrl, link, sortOrder, published) |
| `problem_cards` | 3 problem agitation cards (icon, title, description) |
| `insight` | Insight section (eyebrow, heading, body, 2 mini-cards) |
| `service_cards` | 3 service cards (icon, title, description, ctaLink) |
| `process_steps` | 4 process steps (number, title, description) |
| `about` | About section (photo, bio, 3 badges) |
| `stats` | Stats row (number, label) |
| `testimonials` | Testimonial cards (stars, quote, author, role, photo) |
| `cta_section` | CTA section (heading, subheading, whatsappLink) |
| `projects` | Case studies (title, slug, category, challenge, approach, result, testimonial, tags, published) |
| `blog_posts` | Blog articles (title, slug, body, excerpt, category, tags, SEO fields, published) |
| `offers` | Consultation tiers (name, price, includes, guarantee, badge, published) |
| `faq` | FAQ items (question, answer, sortOrder, published) |
| `form_submissions` | Contact form submissions (all fields + status: new/contacted/closed) |

---

## 6. Environment Variables

Required in Vercel → Settings → Environment Variables:

```env
# Neon Database (from console.neon.tech)
DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# NextAuth
NEXTAUTH_SECRET=VWHv8Zvp3oHOOZgtsj/hlxN929Wkp3tZTOpjPXRM7oU=
NEXTAUTH_URL=https://hasibakash.vercel.app

# Admin login (used before any DB user exists)
ADMIN_EMAIL=hasib@tradefigur.com
ADMIN_PASSWORD=your-secure-password

# Resend email (from resend.com — optional, form still saves to DB without it)
RESEND_API_KEY=re_xxxxx
NOTIFICATION_EMAIL=hasib@tradefigur.com

# Cloudinary (configured but not yet used in upload widgets)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Local development:** Create `.env.local` in project root with same vars.

---

## 7. Current Known Issue — Admin Not Loading

**Symptom:** Site spins/loads but never resolves, especially on `/admin/login`

**Root cause:** NextAuth middleware hangs when `NEXTAUTH_SECRET` or `NEXTAUTH_URL` env vars are missing or incorrect in Vercel.

**Fix checklist:**
1. Go to Vercel → project → Settings → Environment Variables
2. Confirm `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `DATABASE_URL` all exist
3. After adding/changing ANY env var → go to Deployments → latest → Redeploy (uncheck "use build cache")
4. `NEXTAUTH_URL` must exactly match the deployment URL (e.g. `https://hasibakash.vercel.app`) — no trailing slash

**If homepage also doesn't load:**
- Check Vercel Function logs (Dashboard → Functions tab)
- The DB connection is lazy (won't crash without DATABASE_URL) but NextAuth initialization can block

---

## 8. How the CMS Works

1. Visit `https://hasibakash.vercel.app/admin/login`
2. Log in with `ADMIN_EMAIL` + `ADMIN_PASSWORD` from env vars
3. Navigate sidebar to manage any content type
4. Changes save via Server Actions → write to Neon → `revalidatePath()` clears Next.js cache → live site updates immediately

**Content that's fully editable via CMS:**
- Hero section copy
- Logo slider (add/remove/reorder)
- Testimonials (add/edit/delete)
- Projects / Case studies (full CRUD)
- Blog posts (full CRUD with body editor)
- Consultation offers (3 tiers — price, includes, guarantee)
- FAQ items
- Form submissions (view + status management)
- Site settings (email, WhatsApp, footer)

**Content still hardcoded (stub admin pages exist, need full forms built):**
- Problem cards, Insight section, Service cards, Process steps, About bio, Stats

---

## 9. Data Flow

```
Visitor fills form → ContactForm.tsx (client)
  → submitContactFormFull() server action
    → INSERT into form_submissions (Neon)
    → sendSubmissionNotification() (Resend email to Hasib)

Admin edits hero → /admin/hero (client form)
  → updateHero() server action
    → UPDATE hero table (Neon)
    → revalidatePath("/")
      → Next.js cache cleared → homepage refetches DB

Frontend page load → fetchHero() in lib/data.ts
  → db.select().from(hero) (Neon)
  → if DB error/empty → return static fallback
  → render in server component
```

---

## 10. Static Content Fallbacks

Every `lib/data.ts` function has a full static fallback. This means:
- The site works perfectly before DATABASE_URL is set
- If DB goes down, pages still render with hardcoded content
- No white screens or crashes from DB connectivity issues

---

## 11. Content Already Written (Static)

**Blog posts (6 complete articles):**
- "Why Your Ads Aren't Working (And It's Not the Ad)"
- "The State of Brand Strategy in Bangladesh"
- "Applying Hormozi's Offer Framework to Bangladeshi Businesses"
- "Should Founders Build a Personal Brand or a Company Brand?"
- "Why a New Logo Won't Fix Your Brand Problem"
- "Ries & Trout's Positioning Applied to the Bangladesh Market"

**Projects (4 case studies):**
- MotoVessel (Brand Strategy)
- DES — IIUC (Content Strategy)
- TradeFigur (Brand Strategy)
- Medical Authority Brand (Personal Branding)

All static content will be replaced by CMS content once DB is connected and populated.

---

## 12. What's NOT Done Yet

1. **Cloudinary upload widget** — env vars are set up but the actual upload button in admin forms hasn't been built. Currently admins paste Cloudinary URLs manually.
2. **Newsletter signup** — input exists on blog page but doesn't submit anywhere. Needs Resend audience integration.
3. **Homepage section stubs** — `/admin/problem-cards`, `/admin/insight`, `/admin/services`, `/admin/process`, `/admin/about`, `/admin/stats` show placeholder text. Need full edit forms (same pattern as hero/logos).
4. **Hasib's photo** — the about section shows "HA" monogram placeholder. Replace when photo is ready.
5. **Real favicons** — placeholder 1x1 PNGs. Replace with real branded icons.
6. **WhatsApp number** — hardcoded as `+8801XXXXXXXXX` throughout. Update in site settings once CMS is live.
7. **Custom domain** — currently on `hasibakash.vercel.app`. When custom domain is ready, update `NEXTAUTH_URL` in Vercel.

---

## 13. How to Run Locally

```bash
git clone https://github.com/hasibakash03/Hasib-Akash-portfolio.git
cd Hasib-Akash-portfolio
npm install
# Create .env.local with all env vars (see section 6)
npm run dev
# Visit http://localhost:3000
```

**To push DB schema changes:**
```bash
npx drizzle-kit push
```

**To generate migrations instead:**
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## 14. Key Decisions & Rationale

- **Next.js 16** — latest at build time
- **Neon over Supabase** — serverless Postgres without platform lock-in
- **Drizzle over Prisma** — lighter, type-safe, no generation step
- **NextAuth v5 beta** — needed for App Router compatibility; requires `--legacy-peer-deps`
- **No shadcn/ui** — design system is fully custom to match TradeFigur exactly
- **Static fallbacks in data.ts** — site never breaks if DB is down
- **All styles inline** — avoids Tailwind class conflicts with the custom design system
- **Server Actions for all mutations** — no separate API routes needed
- **`revalidatePath()` on every mutation** — instant cache clearing, no ISR delay

---

## 15. Persons & Context

- **Owner:** Hasib Akash — brand strategist, 21, Chattogram, Bangladesh
- **Agency:** TradeFigur (tradefigur.com) — his brand strategy agency
- **Other venture:** MotoVessel — automotive parts (case study client)
- **Strategic frameworks used:** Hormozi (value equation, offer design), Schwartz (awareness levels), Ries & Trout (positioning), Cialdini (persuasion), Blue Ocean Strategy
- **Target market:** Bangladeshi SME founders, 25-45, doing 5-50 lakh/month revenue
- **Competitor reference:** Tanmoy Dutta Digital (what we're positioned against)

---

*Handover document generated April 2026. All 5 build phases complete.*
*Phases: Foundation → Inner Pages → DB/Auth/CMS → CMS Integration → Polish/SEO*

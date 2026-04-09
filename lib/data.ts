/**
 * Data fetching helpers for frontend pages.
 * Each function tries the DB first, falls back to static defaults.
 * This means pages render perfectly before DATABASE_URL is set.
 */

import { cache } from "react";

// ── Hero ──────────────────────────────────────────────
export const fetchHero = cache(async () => {
  try {
    const { db, hero } = await import("@/db");
    const rows = await db.select().from(hero).limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return {
    eyebrow: "Brand Strategist & Growth Consultant",
    heading: "Most businesses don't have a marketing problem. They have a strategy problem.",
    subheading: "I help founders and businesses in Bangladesh build brands that actually convert — through positioning, offer design, and strategic clarity. Not more ads. Not more content. The right strategy first.",
    ctaText: "Book a Free Strategy Diagnostic →",
    ctaLink: "/consult",
    backgroundImageUrl: null,
  };
});

// ── Logos ─────────────────────────────────────────────
export const fetchLogos = cache(async () => {
  try {
    const { db, logos } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(logos).where(eq(logos.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return [
    { id: 1, companyName: "MotoVessel", logoImageUrl: null, link: null, sortOrder: 0, published: true },
    { id: 2, companyName: "TradeFigur", logoImageUrl: null, link: null, sortOrder: 1, published: true },
    { id: 3, companyName: "DES — IIUC", logoImageUrl: null, link: null, sortOrder: 2, published: true },
    { id: 4, companyName: "BrandCo", logoImageUrl: null, link: null, sortOrder: 3, published: true },
    { id: 5, companyName: "StartupBD", logoImageUrl: null, link: null, sortOrder: 4, published: true },
    { id: 6, companyName: "NextGen", logoImageUrl: null, link: null, sortOrder: 5, published: true },
    { id: 7, companyName: "MarketEdge", logoImageUrl: null, link: null, sortOrder: 6, published: true },
    { id: 8, companyName: "VentureHub", logoImageUrl: null, link: null, sortOrder: 7, published: true },
  ];
});

// ── Testimonials ──────────────────────────────────────
export const fetchTestimonials = cache(async () => {
  try {
    const { db, testimonials } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(testimonials).where(eq(testimonials.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return [
    { id: 1, stars: 5, quote: "Hasib completely reframed how we think about our positioning. Before working with him, we were running ads with no clear message. After his strategy session, we knew exactly who we were and who we were for.", authorName: "Rafiq Ahmed", authorRole: "Founder, E-commerce Brand", authorPhotoUrl: null, sortOrder: 0, published: true },
    { id: 2, stars: 5, quote: "The Brand Blueprint session was worth ten times what I paid. He didn't just give me tactics — he showed me why everything I'd been doing wasn't connecting, and what to do instead.", authorName: "Nadia Islam", authorRole: "CEO, Service Business", authorPhotoUrl: null, sortOrder: 1, published: true },
    { id: 3, stars: 5, quote: "I've hired digital marketers before and always felt like they were guessing. Working with Hasib felt like working with someone who understood what was wrong and had a clear framework to fix it.", authorName: "Tanvir Hossain", authorRole: "Founder, Tech Startup", authorPhotoUrl: null, sortOrder: 2, published: true },
  ];
});

// ── Projects ──────────────────────────────────────────
export const fetchPublishedProjects = cache(async () => {
  try {
    const { db, projects } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(projects).where(eq(projects.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null; // null = use static data from page
});

export const fetchProjectBySlug = cache(async (slug: string) => {
  try {
    const { db, projects } = await import("@/db");
    const { eq, and } = await import("drizzle-orm");
    const rows = await db.select().from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.published, true)))
      .limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return null;
});

// ── Blog Posts ────────────────────────────────────────
export const fetchPublishedBlogPosts = cache(async () => {
  try {
    const { db, blogPosts } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null; // null = use static data from page
});

export const fetchBlogPostBySlug = cache(async (slug: string) => {
  try {
    const { db, blogPosts } = await import("@/db");
    const { eq, and } = await import("drizzle-orm");
    const rows = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
      .limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return null;
});

// ── Offers ────────────────────────────────────────────
export const fetchPublishedOffers = cache(async () => {
  try {
    const { db, offers } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(offers).where(eq(offers.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null;
});

// ── FAQ ───────────────────────────────────────────────
export const fetchPublishedFaq = cache(async () => {
  try {
    const { db, faq } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(faq).where(eq(faq.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null;
});

// ── Site Settings ─────────────────────────────────────
export const fetchSiteSettings = cache(async () => {
  try {
    const { db, siteSettings } = await import("@/db");
    const rows = await db.select().from(siteSettings).limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return {
    siteTitle: "Hasib Akash",
    contactEmail: "hasib@tradefigur.com",
    whatsappNumber: "+8801XXXXXXXXX",
    footerText: "© 2026 Hasib Akash. All rights reserved.",
    socialLinks: {},
  };
});

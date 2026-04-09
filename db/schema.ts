import { pgTable, text, integer, boolean, timestamp, serial, jsonb } from "drizzle-orm/pg-core";

// ── Auth ──────────────────────────────────────────────
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ── Site Settings ─────────────────────────────────────
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteTitle: text("site_title").notNull().default("Hasib Akash"),
  contactEmail: text("contact_email").notNull().default("hasib@tradefigur.com"),
  whatsappNumber: text("whatsapp_number").notNull().default("+8801XXXXXXXXX"),
  socialLinks: jsonb("social_links").default({}),
  footerText: text("footer_text").default("© 2026 Hasib Akash. All rights reserved."),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Hero ──────────────────────────────────────────────
export const hero = pgTable("hero", {
  id: serial("id").primaryKey(),
  eyebrow: text("eyebrow").notNull().default("Brand Strategist & Growth Consultant"),
  heading: text("heading").notNull().default("Most businesses don't have a marketing problem. They have a strategy problem."),
  subheading: text("subheading").notNull().default("I help founders and businesses in Bangladesh build brands that actually convert."),
  ctaText: text("cta_text").notNull().default("Book a Free Strategy Diagnostic →"),
  ctaLink: text("cta_link").notNull().default("/consult"),
  backgroundImageUrl: text("background_image_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Logos ─────────────────────────────────────────────
export const logos = pgTable("logos", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  logoImageUrl: text("logo_image_url"),
  link: text("link"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

// ── Problem Cards ─────────────────────────────────────
export const problemCards = pgTable("problem_cards", {
  id: serial("id").primaryKey(),
  iconName: text("icon_name").notNull().default("Target"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ── Insight Section ───────────────────────────────────
export const insight = pgTable("insight", {
  id: serial("id").primaryKey(),
  eyebrow: text("eyebrow").notNull().default("The Insight"),
  heading: text("heading").notNull(),
  body: text("body").notNull(),
  card1Title: text("card1_title").notNull().default("Positioning before execution"),
  card1Desc: text("card1_desc").notNull(),
  card2Title: text("card2_title").notNull().default("Systems before tactics"),
  card2Desc: text("card2_desc").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Service Cards ─────────────────────────────────────
export const serviceCards = pgTable("service_cards", {
  id: serial("id").primaryKey(),
  iconName: text("icon_name").notNull().default("Target"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ctaLink: text("cta_link").notNull().default("/consult"),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ── Process Steps ─────────────────────────────────────
export const processSteps = pgTable("process_steps", {
  id: serial("id").primaryKey(),
  stepNumber: text("step_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

// ── About ─────────────────────────────────────────────
export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  photoUrl: text("photo_url"),
  heading: text("heading").notNull().default("Hasib Akash"),
  bioText: text("bio_text").notNull(),
  badge1Title: text("badge1_title").notNull().default("Framework-Driven"),
  badge1Desc: text("badge1_desc").notNull(),
  badge2Title: text("badge2_title").notNull().default("Bangladesh-First"),
  badge2Desc: text("badge2_desc").notNull(),
  badge3Title: text("badge3_title").notNull().default("Strategy Before Execution"),
  badge3Desc: text("badge3_desc").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Stats ─────────────────────────────────────────────
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  numberText: text("number_text").notNull(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ── Testimonials ──────────────────────────────────────
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  stars: integer("stars").notNull().default(5),
  quote: text("quote").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  authorPhotoUrl: text("author_photo_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

// ── CTA Section ───────────────────────────────────────
export const ctaSection = pgTable("cta_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("Ready to stop guessing and start growing?"),
  subheading: text("subheading").notNull(),
  whatsappLink: text("whatsapp_link").notNull().default("https://wa.me/8801XXXXXXXXX"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Projects ──────────────────────────────────────────
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  bannerUrl: text("banner_url"),
  clientLogoUrl: text("client_logo_url"),
  clientName: text("client_name").notNull(),
  year: text("year").notNull(),
  oneLiner: text("one_liner").notNull(),
  challenge: text("challenge").notNull(),
  approach: text("approach").notNull(),
  result: text("result").notNull(),
  resultMetrics: jsonb("result_metrics").default([]),
  testimonialQuote: text("testimonial_quote"),
  testimonialAuthor: text("testimonial_author"),
  testimonialRole: text("testimonial_role"),
  tags: jsonb("tags").default([]),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Blog Posts ────────────────────────────────────────
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  featuredImageUrl: text("featured_image_url"),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").default([]),
  readTime: text("read_time").notNull().default("5 min"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Offers ────────────────────────────────────────────
export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  tierName: text("tier_name").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  includes: jsonb("includes").default([]),
  guarantee: text("guarantee"),
  ctaText: text("cta_text").notNull().default("Apply Now →"),
  badgeText: text("badge_text"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

// ── FAQ ───────────────────────────────────────────────
export const faq = pgTable("faq", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
});

// ── Form Submissions ──────────────────────────────────
export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  businessName: text("business_name").notNull(),
  website: text("website"),
  revenueRange: text("revenue_range").notNull(),
  challenge: text("challenge").notNull(),
  tierInterest: text("tier_interest").notNull(),
  status: text("status").notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

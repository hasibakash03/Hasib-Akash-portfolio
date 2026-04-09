"use server";
import { db } from "@/db";
import {
  hero, logos, problemCards, insight, serviceCards, processSteps,
  about, stats, testimonials, ctaSection, projects, blogPosts,
  offers, faq, formSubmissions, siteSettings,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

// ── Hero ──────────────────────────────────────────────
export async function updateHero(data: {
  eyebrow: string; heading: string; subheading: string;
  ctaText: string; ctaLink: string; backgroundImageUrl?: string;
}) {
  await requireAdmin();
  const existing = await db.select().from(hero).limit(1);
  if (existing.length > 0) {
    await db.update(hero).set({ ...data, updatedAt: new Date() }).where(eq(hero.id, existing[0].id));
  } else {
    await db.insert(hero).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function getHero() {
  const rows = await db.select().from(hero).limit(1);
  return rows[0] || null;
}

// ── Site Settings ─────────────────────────────────────
export async function updateSiteSettings(data: {
  siteTitle: string; contactEmail: string; whatsappNumber: string; footerText: string;
}) {
  await requireAdmin();
  const existing = await db.select().from(siteSettings).limit(1);
  if (existing.length > 0) {
    await db.update(siteSettings).set({ ...data, updatedAt: new Date() }).where(eq(siteSettings.id, existing[0].id));
  } else {
    await db.insert(siteSettings).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function getSiteSettings() {
  const rows = await db.select().from(siteSettings).limit(1);
  return rows[0] || null;
}

// ── Logos ─────────────────────────────────────────────
export async function getLogos() {
  return db.select().from(logos).orderBy(logos.sortOrder);
}

export async function upsertLogo(data: { id?: number; companyName: string; logoImageUrl?: string; link?: string; sortOrder: number; published: boolean }) {
  await requireAdmin();
  if (data.id) {
    await db.update(logos).set(data).where(eq(logos.id, data.id));
  } else {
    await db.insert(logos).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function deleteLogo(id: number) {
  await requireAdmin();
  await db.delete(logos).where(eq(logos.id, id));
  revalidatePath("/");
  return { success: true };
}

// ── Testimonials ──────────────────────────────────────
export async function getTestimonials() {
  return db.select().from(testimonials).orderBy(testimonials.sortOrder);
}

export async function upsertTestimonial(data: { id?: number; stars: number; quote: string; authorName: string; authorRole: string; authorPhotoUrl?: string; sortOrder: number; published: boolean }) {
  await requireAdmin();
  if (data.id) {
    await db.update(testimonials).set(data).where(eq(testimonials.id, data.id));
  } else {
    await db.insert(testimonials).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: number) {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/");
  return { success: true };
}

// ── Projects ──────────────────────────────────────────
export async function getProjects() {
  return db.select().from(projects).orderBy(projects.createdAt);
}

export async function getProject(slug: string) {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return rows[0] || null;
}

export async function upsertProject(data: {
  id?: number; title: string; slug: string; category: string;
  thumbnailUrl?: string; bannerUrl?: string; clientLogoUrl?: string;
  clientName: string; year: string; oneLiner: string;
  challenge: string; approach: string; result: string;
  resultMetrics?: unknown; testimonialQuote?: string;
  testimonialAuthor?: string; testimonialRole?: string;
  tags?: unknown; published: boolean;
}) {
  await requireAdmin();
  if (data.id) {
    await db.update(projects).set({ ...data, updatedAt: new Date() }).where(eq(projects.id, data.id));
  } else {
    await db.insert(projects).values(data);
  }
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  return { success: true };
}

export async function deleteProject(id: number) {
  await requireAdmin();
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/projects");
  return { success: true };
}

// ── Blog Posts ────────────────────────────────────────
export async function getBlogPosts() {
  return db.select().from(blogPosts).orderBy(blogPosts.createdAt);
}

export async function getBlogPost(slug: string) {
  const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return rows[0] || null;
}

export async function upsertBlogPost(data: {
  id?: number; title: string; slug: string; featuredImageUrl?: string;
  excerpt: string; body: string; category: string; tags?: unknown;
  readTime: string; seoTitle?: string; seoDescription?: string;
  published: boolean; publishedAt?: Date;
}) {
  await requireAdmin();
  const payload = {
    ...data,
    publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt,
    updatedAt: new Date(),
  };
  if (data.id) {
    await db.update(blogPosts).set(payload).where(eq(blogPosts.id, data.id));
  } else {
    await db.insert(blogPosts).values(payload);
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  return { success: true };
}

export async function deleteBlogPost(id: number) {
  await requireAdmin();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/blog");
  return { success: true };
}

// ── Offers ────────────────────────────────────────────
export async function getOffers() {
  return db.select().from(offers).orderBy(offers.sortOrder);
}

export async function upsertOffer(data: {
  id?: number; tierName: string; price: string; description: string;
  includes?: unknown; guarantee?: string; ctaText: string;
  badgeText?: string; sortOrder: number; published: boolean;
}) {
  await requireAdmin();
  if (data.id) {
    await db.update(offers).set(data).where(eq(offers.id, data.id));
  } else {
    await db.insert(offers).values(data);
  }
  revalidatePath("/consult");
  return { success: true };
}

export async function deleteOffer(id: number) {
  await requireAdmin();
  await db.delete(offers).where(eq(offers.id, id));
  revalidatePath("/consult");
  return { success: true };
}

// ── FAQ ───────────────────────────────────────────────
export async function getFaq() {
  return db.select().from(faq).orderBy(faq.sortOrder);
}

export async function upsertFaqItem(data: {
  id?: number; question: string; answer: string; sortOrder: number; published: boolean;
}) {
  await requireAdmin();
  if (data.id) {
    await db.update(faq).set(data).where(eq(faq.id, data.id));
  } else {
    await db.insert(faq).values(data);
  }
  revalidatePath("/consult");
  return { success: true };
}

export async function deleteFaqItem(id: number) {
  await requireAdmin();
  await db.delete(faq).where(eq(faq.id, id));
  revalidatePath("/consult");
  return { success: true };
}

// ── Form Submissions ──────────────────────────────────
export async function getFormSubmissions() {
  return db.select().from(formSubmissions).orderBy(formSubmissions.createdAt);
}

export async function submitContactForm(data: {
  name: string; email: string; phone?: string; businessName: string;
  website?: string; revenueRange: string; challenge: string; tierInterest: string;
}) {
  await db.insert(formSubmissions).values(data);
  return { success: true };
}

export async function updateSubmissionStatus(id: number, status: string) {
  await requireAdmin();
  await db.update(formSubmissions).set({ status }).where(eq(formSubmissions.id, id));
  return { success: true };
}

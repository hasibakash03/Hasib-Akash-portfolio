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

// ── Enhanced form submission (Phase 4) ───────────────
export async function submitContactFormFull(data: {
  name: string; email: string; phone?: string; businessName: string;
  website?: string; revenueRange: string; challenge: string; tierInterest: string;
}) {
  // Save to DB
  try {
    await db.insert(formSubmissions).values(data);
  } catch (err) {
    console.error("DB insert error:", err);
    // Still try to send email even if DB fails
  }

  // Send Resend notification
  try {
    const { sendSubmissionNotification } = await import("@/lib/resend");
    await sendSubmissionNotification(data);
  } catch (err) {
    console.error("Email error:", err);
  }

  return { success: true };
}

// ── Problem Cards ─────────────────────────────────────
export async function getProblemCards() {
  return db.select().from(problemCards).orderBy(problemCards.sortOrder);
}

export async function upsertProblemCard(data: { id?: number; iconName: string; title: string; description: string; sortOrder: number }) {
  await requireAdmin();
  if (data.id) {
    await db.update(problemCards).set(data).where(eq(problemCards.id, data.id));
  } else {
    await db.insert(problemCards).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function deleteProblemCard(id: number) {
  await requireAdmin();
  await db.delete(problemCards).where(eq(problemCards.id, id));
  revalidatePath("/");
  return { success: true };
}

// ── Insight Section ───────────────────────────────────
export async function getInsight() {
  const rows = await db.select().from(insight).limit(1);
  return rows[0] || null;
}

export async function updateInsight(data: {
  eyebrow: string; heading: string; body: string;
  card1Title: string; card1Desc: string; card2Title: string; card2Desc: string;
}) {
  await requireAdmin();
  const existing = await db.select().from(insight).limit(1);
  if (existing.length > 0) {
    await db.update(insight).set({ ...data, updatedAt: new Date() }).where(eq(insight.id, existing[0].id));
  } else {
    await db.insert(insight).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

// ── Service Cards ─────────────────────────────────────
export async function getServiceCards() {
  return db.select().from(serviceCards).orderBy(serviceCards.sortOrder);
}

export async function upsertServiceCard(data: { id?: number; iconName: string; title: string; description: string; ctaLink: string; sortOrder: number }) {
  await requireAdmin();
  if (data.id) {
    await db.update(serviceCards).set(data).where(eq(serviceCards.id, data.id));
  } else {
    await db.insert(serviceCards).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function deleteServiceCard(id: number) {
  await requireAdmin();
  await db.delete(serviceCards).where(eq(serviceCards.id, id));
  revalidatePath("/");
  return { success: true };
}

// ── Process Steps ─────────────────────────────────────
export async function getProcessSteps() {
  return db.select().from(processSteps).orderBy(processSteps.stepNumber);
}

export async function upsertProcessStep(data: { id?: number; stepNumber: string; title: string; description: string }) {
  await requireAdmin();
  if (data.id) {
    await db.update(processSteps).set(data).where(eq(processSteps.id, data.id));
  } else {
    await db.insert(processSteps).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function deleteProcessStep(id: number) {
  await requireAdmin();
  await db.delete(processSteps).where(eq(processSteps.id, id));
  revalidatePath("/");
  return { success: true };
}

// ── About ─────────────────────────────────────────────
export async function getAbout() {
  const rows = await db.select().from(about).limit(1);
  return rows[0] || null;
}

export async function updateAbout(data: {
  photoUrl?: string; heading: string; bioText: string;
  badge1Title: string; badge1Desc: string;
  badge2Title: string; badge2Desc: string;
  badge3Title: string; badge3Desc: string;
}) {
  await requireAdmin();
  const existing = await db.select().from(about).limit(1);
  if (existing.length > 0) {
    await db.update(about).set({ ...data, updatedAt: new Date() }).where(eq(about.id, existing[0].id));
  } else {
    await db.insert(about).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

// ── Stats ─────────────────────────────────────────────
export async function getStats() {
  return db.select().from(stats).orderBy(stats.sortOrder);
}

export async function upsertStat(data: { id?: number; numberText: string; label: string; sortOrder: number }) {
  await requireAdmin();
  if (data.id) {
    await db.update(stats).set(data).where(eq(stats.id, data.id));
  } else {
    await db.insert(stats).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function deleteStat(id: number) {
  await requireAdmin();
  await db.delete(stats).where(eq(stats.id, id));
  revalidatePath("/");
  return { success: true };
}

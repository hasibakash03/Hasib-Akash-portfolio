import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXTAUTH_URL || "https://hasibakash.com";

const staticPosts = [
  "why-positioning-beats-ads",
  "bangladesh-market-sophistication",
  "hormozi-offer-design-bangladesh",
  "personal-brand-vs-company-brand",
  "why-logos-dont-fix-brands",
  "ries-trout-positioning-bangladesh",
];

const staticProjects = [
  "motoVessel-brand-identity",
  "des-iiuc-funnel",
  "tradefigur-brand",
  "doctor-personal-brand",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Try to get DB slugs
  let dbBlogSlugs: string[] = [];
  let dbProjectSlugs: string[] = [];
  
  try {
    const { db, blogPosts, projects } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const [posts, projs] = await Promise.all([
      db.select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt }).from(blogPosts).where(eq(blogPosts.published, true)),
      db.select({ slug: projects.slug, updatedAt: projects.updatedAt }).from(projects).where(eq(projects.published, true)),
    ]);
    dbBlogSlugs = posts.map(p => p.slug);
    dbProjectSlugs = projs.map(p => p.slug);
  } catch { /* No DB — use static */ }

  const allBlogSlugs = [...new Set([...staticPosts, ...dbBlogSlugs])];
  const allProjectSlugs = [...new Set([...staticProjects, ...dbProjectSlugs])];
  const now = new Date();

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/consult`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...allBlogSlugs.map(slug => ({ url: `${BASE_URL}/blog/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...allProjectSlugs.map(slug => ({ url: `${BASE_URL}/projects/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}

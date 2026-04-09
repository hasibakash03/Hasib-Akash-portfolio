"use client";
import { useState, useEffect, useTransition } from "react";
import { getBlogPosts, upsertBlogPost, deleteBlogPost } from "@/lib/actions";
import { AdminCard, AdminInput, AdminSelect, AdminToggle, SaveButton, DeleteButton, SaveToast, PageHeader, StatusBadge } from "@/components/admin/AdminCard";

type Post = {
  id?: number; title: string; slug: string; excerpt: string; body: string;
  category: string; tags: string; readTime: string;
  featuredImageUrl: string; seoTitle: string; seoDescription: string; published: boolean;
};

const blank = (): Post => ({ id: undefined, title: "", slug: "", excerpt: "", body: "", category: "Brand Strategy", tags: "", readTime: "5 min", featuredImageUrl: "", seoTitle: "", seoDescription: "", published: false });

const cats = ["Brand Strategy","Positioning","Personal Branding","Business Growth","Bangladesh Market"];
const acc = "hsl(275 70% 55%)";

export default function BlogAdmin() {
  const [items, setItems] = useState<Post[]>([]);
  const [form, setForm] = useState(blank());
  const [view, setView] = useState<"list"|"edit">("list");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const load = () => getBlogPosts().then(r => setItems(r.map(p => ({ id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt, body: p.body, category: p.category, tags: Array.isArray(p.tags) ? (p.tags as string[]).join(", ") : "", readTime: p.readTime, featuredImageUrl: p.featuredImageUrl || "", seoTitle: p.seoTitle || "", seoDescription: p.seoDescription || "", published: p.published }))));
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({
      ...p, [name]: value,
      ...(name === "title" && !p.id ? { slug: value.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/^-+|-+$/g,""), seoTitle: value } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await upsertBlogPost({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) });
    setLoading(false); setSaved(true); setView("list"); setForm(blank());
    load(); setTimeout(() => setSaved(false), 2500);
  };

  if (view === "edit") return (
    <div>
      <PageHeader title={form.id ? `Editing: ${form.title}` : "New Blog Post"} description="Write your article. Markdown is supported in the body."
        action={<button onClick={() => { setView("list"); setForm(blank()); }} style={{ padding: "0.6rem 1.25rem", background: "hsl(270 20% 95%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>← Back to list</button>}
      />
      <form onSubmit={handleSubmit}>
        <AdminCard title="Post Details">
          <AdminInput label="Title" name="title" value={form.title} onChange={ch} required placeholder="Why Your Ads Aren't Working" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            <AdminInput label="Slug" name="slug" value={form.slug} onChange={ch} required placeholder="why-your-ads-arent-working" />
            <AdminSelect label="Category" name="category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} options={cats.map(c => ({ value: c, label: c }))} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0 1rem" }}>
            <AdminInput label="Tags (comma separated)" name="tags" value={form.tags} onChange={ch} placeholder="Brand Strategy, Positioning, Ads" />
            <AdminInput label="Read Time" name="readTime" value={form.readTime} onChange={ch} placeholder="6 min" />
          </div>
          <AdminInput label="Excerpt (shown on listing page)" name="excerpt" value={form.excerpt} onChange={ch} required rows={3} placeholder="Before you optimize your creative…" />
          <AdminInput label="Featured Image URL (Cloudinary)" name="featuredImageUrl" value={form.featuredImageUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
        </AdminCard>
        <AdminCard title="Article Body" description="Write in plain text or Markdown. Use ## for H2 headings.">
          <AdminInput label="Body" name="body" value={form.body} onChange={ch} required rows={20} placeholder="Write your article here. Use ## for section headings..." />
        </AdminCard>
        <AdminCard title="SEO">
          <AdminInput label="SEO Title (optional — defaults to post title)" name="seoTitle" value={form.seoTitle} onChange={ch} placeholder="Why Your Ads Aren't Working | Hasib Akash" />
          <AdminInput label="SEO Description (optional)" name="seoDescription" value={form.seoDescription} onChange={ch} rows={2} placeholder="Before you optimize your creative, read this..." />
        </AdminCard>
        <AdminCard title="Publishing">
          <AdminToggle label="Published (visible on site)" checked={form.published} onChange={v => setForm(p => ({ ...p, published: v }))} name="published" />
        </AdminCard>
        <SaveButton loading={loading} label={form.id ? "Update Post" : "Publish Post"} />
      </form>
      {saved && <SaveToast message="Post saved." />}
    </div>
  );

  return (
    <div>
      <PageHeader title="Blog Posts" description="Manage your articles and insights."
        action={<button onClick={() => { setForm(blank()); setView("edit"); }} style={{ padding: "0.6rem 1.25rem", background: acc, color: "white", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ New Post</button>}
      />
      <AdminCard title="All Posts">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No posts yet. Write your first article.</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
              {["Title","Category","Read Time","Status","Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.625rem 0.875rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid hsl(270 20% 93%)" }}>
                  <td style={{ padding: "1rem 0.875rem", fontWeight: 700, color: "hsl(270 20% 12%)", fontSize: "0.9rem", maxWidth: 280 }}>{p.title}</td>
                  <td style={{ padding: "1rem 0.875rem", fontSize: "0.85rem", color: "hsl(270 15% 45%)" }}>{p.category}</td>
                  <td style={{ padding: "1rem 0.875rem", fontSize: "0.85rem", color: "hsl(270 15% 50%)" }}>{p.readTime}</td>
                  <td style={{ padding: "1rem 0.875rem" }}><StatusBadge status={p.published ? "published" : "draft"} /></td>
                  <td style={{ padding: "1rem 0.875rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => { setForm(p); setView("edit"); }} style={{ padding: "0.4rem 0.875rem", background: "hsl(270 40% 95%)", color: "hsl(275 70% 45%)", border: "1px solid hsl(270 30% 88%)", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Edit</button>
                      <DeleteButton onClick={() => p.id && startTransition(async () => { await deleteBlogPost(p.id!); load(); })} loading={isPending} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
      {saved && <SaveToast message="Post saved." />}
    </div>
  );
}

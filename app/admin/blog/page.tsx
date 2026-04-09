"use client";
import { useState, useEffect } from "react";
import { getBlogPosts, upsertBlogPost, deleteBlogPost } from "@/lib/actions";
import { AdminCard, AdminInput, AdminSelect, SaveButton, PageHeader, DeleteButton, Toggle } from "@/components/admin/AdminCard";

type B = { id: number; title: string; slug: string; excerpt: string; body: string; category: string; readTime: string; featuredImageUrl: string | null; seoTitle: string | null; seoDescription: string | null; published: boolean; createdAt: Date | null };
const blank = (): Omit<B, "id" | "createdAt"> & { id?: number } => ({ title: "", slug: "", excerpt: "", body: "", category: "Brand Strategy", readTime: "5 min", featuredImageUrl: "", seoTitle: "", seoDescription: "", published: false });
const cats = ["Brand Strategy", "Positioning", "Personal Branding", "Business Growth", "Bangladesh Market"];
function slugify(s: string) { return s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, ""); }

export default function BlogAdmin() {
  const [items, setItems] = useState<B[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getBlogPosts().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditing(p => {
      if (!p) return p;
      const u = { ...p, [name]: value };
      if (name === "title" && !p.id) u.slug = slugify(value);
      return u;
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editing) return;
    setLoading(true);
    await upsertBlogPost({
      ...editing,
      featuredImageUrl: editing.featuredImageUrl || undefined,
      seoTitle: editing.seoTitle || undefined,
      seoDescription: editing.seoDescription || undefined,
    });
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete this post?")) { await deleteBlogPost(id); load(); } };

  return (
    <div>
      <PageHeader title="Blog Posts" description="Write and manage articles." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ New Post</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? `Editing: ${editing.title}` : "New Blog Post"}>
          <form onSubmit={save}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Title" name="title" value={editing.title} onChange={ch} required placeholder="Why Your Ads Aren't Working..." />
              <AdminInput label="Slug (auto)" name="slug" value={editing.slug} onChange={ch} required placeholder="why-your-ads-arent-working" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminSelect label="Category" name="category" value={editing.category} onChange={ch} options={cats.map(c => ({ value: c, label: c }))} />
              <AdminInput label="Read Time" name="readTime" value={editing.readTime} onChange={ch} required placeholder="6 min" />
            </div>
            <AdminInput label="Featured Image URL (Cloudinary)" name="featuredImageUrl" value={editing.featuredImageUrl ?? ""} onChange={ch} placeholder="https://res.cloudinary.com/..." />
            <AdminInput label="Excerpt (shown on cards)" name="excerpt" value={editing.excerpt} onChange={ch} required rows={3} placeholder="A brief summary of the article..." />
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", marginBottom: "0.4rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Body (Markdown) *</label>
              <textarea name="body" value={editing.body} onChange={ch} required rows={20}
                style={{ width: "100%", padding: "0.875rem 1rem", border: "1px solid hsl(270 20% 85%)", borderRadius: "0.625rem", fontSize: "0.875rem", fontFamily: "monospace", outline: "none", color: "hsl(270 20% 12%)", background: "hsl(270 20% 99%)", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
                placeholder="## Introduction&#10;&#10;Your article content here...&#10;&#10;## Section Title&#10;&#10;More content..." />
              <p style={{ fontSize: "0.75rem", color: "hsl(270 15% 55%)", margin: "0.35rem 0 0" }}>Use ## for section headings. Separate paragraphs with blank lines.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="SEO Title (optional)" name="seoTitle" value={editing.seoTitle ?? ""} onChange={ch} placeholder="Why Your Ads Aren't Working | Hasib Akash" />
              <AdminInput label="SEO Description (optional)" name="seoDescription" value={editing.seoDescription ?? ""} onChange={ch} placeholder="Before you change your targeting..." />
            </div>
            <Toggle checked={editing.published} onChange={v => setEditing(p => p ? { ...p, published: v } : p)} label="Published (live on site)" />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Posts">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No posts yet.</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
              {["Title", "Category", "Read Time", "Status", "Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {items.map(b => (
                <tr key={b.id} style={{ borderBottom: "1px solid hsl(270 20% 93%)" }}>
                  <td style={{ padding: "0.75rem", fontSize: "0.9rem", fontWeight: 700, color: "hsl(270 20% 12%)", maxWidth: 280 }}>{b.title}</td>
                  <td style={{ padding: "0.75rem", fontSize: "0.82rem", color: "hsl(270 15% 50%)" }}>{b.category}</td>
                  <td style={{ padding: "0.75rem", fontSize: "0.82rem", color: "hsl(270 15% 50%)" }}>{b.readTime}</td>
                  <td style={{ padding: "0.75rem" }}><span style={{ padding: "0.2rem 0.6rem", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, background: b.published ? "hsl(140 50% 90%)" : "hsl(40 70% 90%)", color: b.published ? "hsl(140 60% 30%)" : "hsl(40 60% 30%)" }}>{b.published ? "Live" : "Draft"}</span></td>
                  <td style={{ padding: "0.75rem" }}><div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditing({ ...b, featuredImageUrl: b.featuredImageUrl ?? "", seoTitle: b.seoTitle ?? "", seoDescription: b.seoDescription ?? "" })} style={{ padding: "0.35rem 0.75rem", background: "hsl(270 30% 94%)", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 40% 40%)" }}>Edit</button>
                    <DeleteButton onDelete={() => del(b.id)} />
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
    </div>
  );
}

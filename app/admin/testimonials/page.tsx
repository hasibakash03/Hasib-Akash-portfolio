"use client";
import { useState, useEffect } from "react";
import { getTestimonials, upsertTestimonial, deleteTestimonial } from "@/lib/actions";
import { AdminCard, AdminInput, AdminSelect, SaveButton, PageHeader, DeleteButton, Toggle } from "@/components/admin/AdminCard";

type T = { id: number; stars: number; quote: string; authorName: string; authorRole: string; authorPhotoUrl: string | null; sortOrder: number; published: boolean };
const blank = (): Omit<T, "id"> & { id?: number } => ({ stars: 5, quote: "", authorName: "", authorRole: "", authorPhotoUrl: "", sortOrder: 0, published: true });

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getTestimonials().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setEditing(p => p ? { ...p, [e.target.name]: e.target.name === "stars" || e.target.name === "sortOrder" ? Number(e.target.value) : e.target.value } : p);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editing) return;
    setLoading(true);
    await upsertTestimonial({ ...editing, authorPhotoUrl: editing.authorPhotoUrl || undefined });
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete?")) { await deleteTestimonial(id); load(); } };

  return (
    <div>
      <PageHeader title="Testimonials" description="Manage social proof quotes on the homepage." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Testimonial</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? "Edit Testimonial" : "New Testimonial"}>
          <form onSubmit={save}>
            <AdminSelect label="Stars" name="stars" value={String(editing.stars)} onChange={ch} options={[5,4,3,2,1].map(n => ({ value: String(n), label: "★".repeat(n) }))} />
            <AdminInput label="Quote" name="quote" value={editing.quote} onChange={ch} required rows={4} placeholder="Working with Hasib completely changed how we approach..." />
            <AdminInput label="Author Name" name="authorName" value={editing.authorName} onChange={ch} required placeholder="Rafiq Ahmed" />
            <AdminInput label="Author Role" name="authorRole" value={editing.authorRole} onChange={ch} required placeholder="Founder, E-commerce Brand" />
            <AdminInput label="Author Photo URL (Cloudinary)" name="authorPhotoUrl" value={editing.authorPhotoUrl ?? ""} onChange={ch} placeholder="https://res.cloudinary.com/..." />
            <AdminInput label="Sort Order" name="sortOrder" type="number" value={String(editing.sortOrder)} onChange={ch} />
            <Toggle checked={editing.published} onChange={v => setEditing(p => p ? { ...p, published: v } : p)} label="Published" />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Testimonials">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No testimonials yet.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map(t => (
              <div key={t.id} style={{ border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "hsl(275 70% 55%)", fontSize: "0.9rem" }}>{"★".repeat(t.stars)}</span>
                    <span style={{ padding: "0.15rem 0.5rem", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 700, background: t.published ? "hsl(140 50% 90%)" : "hsl(0 20% 90%)", color: t.published ? "hsl(140 60% 30%)" : "hsl(0 50% 40%)" }}>{t.published ? "Live" : "Hidden"}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 35%)", margin: "0 0 0.5rem", fontStyle: "italic", lineHeight: 1.6 }}>&ldquo;{t.quote.slice(0, 120)}...&rdquo;</p>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "hsl(270 20% 20%)" }}>{t.authorName} · <span style={{ fontWeight: 500, color: "hsl(270 15% 50%)" }}>{t.authorRole}</span></div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button onClick={() => setEditing({ ...t, authorPhotoUrl: t.authorPhotoUrl ?? "" })} style={{ padding: "0.35rem 0.75rem", background: "hsl(270 30% 94%)", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 40% 40%)" }}>Edit</button>
                  <DeleteButton onDelete={() => del(t.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}

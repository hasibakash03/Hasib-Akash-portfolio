"use client";
import { useState, useEffect, useTransition } from "react";
import { getTestimonials, upsertTestimonial, deleteTestimonial } from "@/lib/actions";
import { AdminCard, AdminInput, AdminSelect, AdminToggle, SaveButton, DeleteButton, SaveToast, PageHeader } from "@/components/admin/AdminCard";

const blank = () => ({ id: undefined as number | undefined, stars: 5, quote: "", authorName: "", authorRole: "", authorPhotoUrl: "", sortOrder: 0, published: true });

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<ReturnType<typeof blank>[]>([]);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const acc = "hsl(275 70% 55%)";

  const load = () => getTestimonials().then(r => setItems(r.map(t => ({ id: t.id, stars: t.stars, quote: t.quote, authorName: t.authorName, authorRole: t.authorRole, authorPhotoUrl: t.authorPhotoUrl || "", sortOrder: t.sortOrder, published: t.published }))));
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await upsertTestimonial({ ...form, sortOrder: Number(form.sortOrder), stars: Number(form.stars) });
    setLoading(false); setSaved(true); setForm(blank()); setEditing(false);
    load(); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Testimonials" description="Manage social proof quotes on the homepage."
        action={<button onClick={() => { setForm(blank()); setEditing(true); }} style={{ padding: "0.6rem 1.25rem", background: acc, color: "white", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Testimonial</button>}
      />

      <AdminCard title="Current Testimonials">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No testimonials yet.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {items.map(t => (
              <div key={t.id} style={{ padding: "1.25rem", border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.5rem" }}>{"★".repeat(t.stars).split("").map((s, i) => <span key={i} style={{ color: acc, fontSize: "0.9rem" }}>{s}</span>)}</div>
                  <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 35%)", margin: "0 0 0.5rem", lineHeight: 1.65, fontStyle: "italic" }}>"{t.quote.substring(0, 120)}{t.quote.length > 120 ? "…" : ""}"</p>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "hsl(270 20% 20%)" }}>{t.authorName} · <span style={{ fontWeight: 500, color: "hsl(270 15% 50%)" }}>{t.authorRole}</span></div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button onClick={() => { setForm(t); setEditing(true); }} style={{ padding: "0.4rem 0.875rem", background: "hsl(270 40% 95%)", color: "hsl(275 70% 45%)", border: "1px solid hsl(270 30% 88%)", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Edit</button>
                  <DeleteButton onClick={() => t.id && startTransition(async () => { await deleteTestimonial(t.id!); load(); })} loading={isPending} />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {editing && (
        <AdminCard title={form.id ? "Edit Testimonial" : "Add Testimonial"}>
          <form onSubmit={handleSubmit}>
            <AdminInput label="Quote" name="quote" value={form.quote} onChange={ch} required rows={3} placeholder="Working with Hasib completely changed how we think about our brand…" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Author Name" name="authorName" value={form.authorName} onChange={ch} required placeholder="Rafiq Ahmed" />
              <AdminInput label="Author Role" name="authorRole" value={form.authorRole} onChange={ch} required placeholder="Founder, E-commerce Brand" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 1rem" }}>
              <AdminSelect label="Stars" name="stars" value={String(form.stars)} onChange={e => setForm(p => ({ ...p, stars: Number(e.target.value) }))} options={[5,4,3].map(n => ({ value: String(n), label: `${n} stars` }))} />
              <AdminInput label="Sort Order" name="sortOrder" value={String(form.sortOrder)} onChange={ch} type="number" />
              <div />
            </div>
            <AdminInput label="Author Photo URL (Cloudinary, optional)" name="authorPhotoUrl" value={form.authorPhotoUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
            <AdminToggle label="Published" checked={form.published} onChange={v => setForm(p => ({ ...p, published: v }))} name="published" />
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <SaveButton loading={loading} label={form.id ? "Update" : "Add Testimonial"} />
              <button type="button" onClick={() => setEditing(false)} style={{ padding: "0.75rem 1.5rem", background: "hsl(270 20% 95%)", color: "hsl(270 15% 45%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}
      {saved && <SaveToast message="Testimonial saved." />}
    </div>
  );
}

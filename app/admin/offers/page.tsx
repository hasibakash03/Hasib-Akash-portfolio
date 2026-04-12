"use client";
import { useState, useEffect } from "react";
import { getOffers, upsertOffer, deleteOffer } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader, DeleteButton, Toggle } from "@/components/admin/AdminCard";

type O = { id: number; tierName: string; price: string; description: string; includes: unknown; guarantee: string | null; ctaText: string; badgeText: string | null; sortOrder: number; published: boolean };
const blank = (): Omit<O, "id"> & { id?: number } => ({ tierName: "", price: "", description: "", includes: "", guarantee: "", ctaText: "Apply Now →", badgeText: "", sortOrder: 0, published: true });

export default function OffersAdmin() {
  const [items, setItems] = useState<O[]>([]);
  const [editing, setEditing] = useState<(Omit<O, "id" | "includes"> & { id?: number; includes: string }) | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getOffers().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditing(p => p ? { ...p, [e.target.name]: e.target.name === "sortOrder" ? Number(e.target.value) : e.target.value } : p);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editing) return;
    setLoading(true);
    const includesArr = editing.includes.split("\n").map(s => s.trim()).filter(Boolean);
    await upsertOffer({ ...editing, includes: includesArr, guarantee: editing.guarantee || undefined, badgeText: editing.badgeText || undefined });
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete offer?")) { await deleteOffer(id); load(); } };

  const toEditForm = (o: O) => ({ ...o, includes: Array.isArray(o.includes) ? (o.includes as string[]).join("\n") : "", guarantee: o.guarantee ?? "", badgeText: o.badgeText ?? "" });

  return (
    <div>
      <PageHeader title="Consultation Offers" description="Manage the 4 offer tiers on the consult page." action={
        <button onClick={() => setEditing({ ...blank(), includes: "" })} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Offer</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? `Editing: ${editing.tierName}` : "New Offer"}>
          <form onSubmit={save}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Tier Name" name="tierName" value={editing.tierName} onChange={ch} required placeholder="Strategy Diagnostic" />
              <AdminInput label="Price" name="price" value={editing.price} onChange={ch} required placeholder="FREE or 9,900৳" />
            </div>
            <AdminInput label="Description" name="description" value={editing.description} onChange={ch} required rows={3} placeholder="A 30-minute call where..." />
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", marginBottom: "0.4rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Includes (one item per line)</label>
              <textarea name="includes" value={editing.includes} onChange={ch} rows={6}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid hsl(270 20% 85%)", borderRadius: "0.625rem", fontSize: "0.9rem", fontFamily: "Urbanist,sans-serif", outline: "none", color: "hsl(270 20% 12%)", background: "white", resize: "vertical", boxSizing: "border-box" }}
                placeholder={"30-minute strategy call\nVerbal strategic diagnosis\n1-page written summary"} />
            </div>
            <AdminInput label="Guarantee (optional)" name="guarantee" value={editing.guarantee ?? ""} onChange={ch} placeholder="3+ actionable insights or full refund" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="CTA Button Text" name="ctaText" value={editing.ctaText} onChange={ch} required placeholder="Apply Now →" />
              <AdminInput label="Badge Text (optional)" name="badgeText" value={editing.badgeText ?? ""} onChange={ch} placeholder="MOST POPULAR" />
            </div>
            <AdminInput label="Sort Order" name="sortOrder" type="number" value={String(editing.sortOrder)} onChange={ch} />
            <Toggle checked={editing.published} onChange={v => setEditing(p => p ? { ...p, published: v } : p)} label="Published" />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Offers">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No offers yet.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map(o => (
              <div key={o.id} style={{ border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "hsl(270 20% 12%)" }}>{o.tierName} — <span style={{ color: "hsl(275 70% 45%)" }}>{o.price}</span></div>
                  <div style={{ fontSize: "0.82rem", color: "hsl(270 15% 50%)", marginTop: "0.2rem" }}>{o.description.slice(0, 80)}...</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, alignItems: "center" }}>
                  <span style={{ padding: "0.2rem 0.6rem", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, background: o.published ? "hsl(140 50% 90%)" : "hsl(0 20% 90%)", color: o.published ? "hsl(140 60% 30%)" : "hsl(0 50% 40%)" }}>{o.published ? "Live" : "Hidden"}</span>
                  <button onClick={() => setEditing(toEditForm(o))} style={{ padding: "0.35rem 0.75rem", background: "hsl(270 30% 94%)", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 40% 40%)" }}>Edit</button>
                  <DeleteButton onDelete={() => del(o.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}

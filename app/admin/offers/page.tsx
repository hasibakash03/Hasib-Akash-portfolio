"use client";
import { useState, useEffect, useTransition } from "react";
import { getOffers, upsertOffer, deleteOffer } from "@/lib/actions";
import { AdminCard, AdminInput, AdminToggle, SaveButton, DeleteButton, SaveToast, PageHeader } from "@/components/admin/AdminCard";

type Offer = { id?: number; tierName: string; price: string; description: string; includes: string; guarantee: string; ctaText: string; badgeText: string; sortOrder: number; published: boolean };
const blank = (): Offer => ({ id: undefined, tierName: "", price: "", description: "", includes: "", guarantee: "", ctaText: "Apply Now →", badgeText: "", sortOrder: 0, published: true });
const acc = "hsl(275 70% 55%)";

export default function OffersAdmin() {
  const [items, setItems] = useState<Offer[]>([]);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const load = () => getOffers().then(r => setItems(r.map(o => ({ id: o.id, tierName: o.tierName, price: o.price, description: o.description, includes: Array.isArray(o.includes) ? (o.includes as string[]).join("\n") : "", guarantee: o.guarantee || "", ctaText: o.ctaText, badgeText: o.badgeText || "", sortOrder: o.sortOrder, published: o.published }))));
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await upsertOffer({ ...form, sortOrder: Number(form.sortOrder), includes: form.includes.split("\n").map(l => l.trim()).filter(Boolean) });
    setLoading(false); setSaved(true); setForm(blank()); setEditing(false);
    load(); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Consultation Offers" description="Edit the three pricing tiers on the /consult page."
        action={<button onClick={() => { setForm(blank()); setEditing(true); }} style={{ padding: "0.6rem 1.25rem", background: acc, color: "white", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Offer</button>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {items.map(o => (
          <div key={o.id} style={{ background: "white", border: "1px solid hsl(270 20% 90%)", borderRadius: "1rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1 }}>{o.price}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "hsl(270 20% 12%)", marginTop: "0.2rem" }}>{o.tierName}</div>
              </div>
              {o.badgeText && <span style={{ padding: "0.2rem 0.6rem", background: acc, color: "white", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 700 }}>{o.badgeText}</span>}
            </div>
            <p style={{ fontSize: "0.8rem", color: "hsl(270 15% 45%)", lineHeight: 1.6, margin: "0 0 1rem" }}>{o.description.substring(0, 100)}{o.description.length > 100 ? "…" : ""}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => { setForm(o); setEditing(true); }} style={{ padding: "0.4rem 0.875rem", background: "hsl(270 40% 95%)", color: "hsl(275 70% 45%)", border: "1px solid hsl(270 30% 88%)", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Edit</button>
              <DeleteButton onClick={() => o.id && startTransition(async () => { await deleteOffer(o.id!); load(); })} loading={isPending} />
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <AdminCard title={form.id ? "Edit Offer" : "New Offer"}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Tier Name" name="tierName" value={form.tierName} onChange={ch} required placeholder="Strategy Diagnostic" />
              <AdminInput label="Price" name="price" value={form.price} onChange={ch} required placeholder="FREE or 9,900৳" />
            </div>
            <AdminInput label="Short Description" name="description" value={form.description} onChange={ch} required rows={2} placeholder="A 30-minute call where I analyze your brand…" />
            <AdminInput label="Includes (one item per line)" name="includes" value={form.includes} onChange={ch} rows={6} placeholder={"30-minute strategy call\nVerbal strategic diagnosis\n1-page written summary"} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Guarantee text (optional)" name="guarantee" value={form.guarantee} onChange={ch} placeholder="3+ actionable insights or full refund" />
              <AdminInput label="Badge text (optional)" name="badgeText" value={form.badgeText} onChange={ch} placeholder="MOST POPULAR" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="CTA Button Text" name="ctaText" value={form.ctaText} onChange={ch} required placeholder="Apply Now →" />
              <AdminInput label="Sort Order" name="sortOrder" value={String(form.sortOrder)} onChange={ch} type="number" />
            </div>
            <AdminToggle label="Published" checked={form.published} onChange={v => setForm(p => ({ ...p, published: v }))} name="published" />
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <SaveButton loading={loading} label={form.id ? "Update" : "Add Offer"} />
              <button type="button" onClick={() => setEditing(false)} style={{ padding: "0.75rem 1.5rem", background: "hsl(270 20% 95%)", color: "hsl(270 15% 45%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}
      {saved && <SaveToast message="Offer saved." />}
    </div>
  );
}

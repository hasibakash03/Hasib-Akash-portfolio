"use client";
import { useState, useEffect, useTransition } from "react";
import { getLogos, upsertLogo, deleteLogo } from "@/lib/actions";
import { AdminCard, AdminInput, AdminToggle, SaveButton, DeleteButton, SaveToast, PageHeader } from "@/components/admin/AdminCard";

const blank = () => ({ id: undefined as number | undefined, companyName: "", logoImageUrl: "", link: "", sortOrder: 0, published: true });

export default function LogosAdmin() {
  const [logos, setLogos] = useState<ReturnType<typeof blank>[]>([]);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const load = () => getLogos().then(r => setLogos(r.map(l => ({ id: l.id, companyName: l.companyName, logoImageUrl: l.logoImageUrl || "", link: l.link || "", sortOrder: l.sortOrder, published: l.published }))));
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await upsertLogo({ ...form, sortOrder: Number(form.sortOrder) });
    setLoading(false); setSaved(true); setForm(blank()); setEditing(false);
    load(); setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = (id: number) => {
    startTransition(async () => { await deleteLogo(id); load(); });
  };

  const acc = "hsl(275 70% 55%)";

  return (
    <div>
      <PageHeader title="Logo Slider" description="Manage the auto-scrolling logo strip on the homepage."
        action={<button onClick={() => { setForm(blank()); setEditing(true); }} style={{ padding: "0.6rem 1.25rem", background: acc, color: "white", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Logo</button>}
      />

      {/* List */}
      <AdminCard title="Current Logos">
        {logos.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No logos yet. Add one above.</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
              {["Order","Company","Link","Status","Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.625rem 0.875rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {logos.map(l => (
                <tr key={l.id} style={{ borderBottom: "1px solid hsl(270 20% 93%)" }}>
                  <td style={{ padding: "0.875rem", fontSize: "0.875rem", color: "hsl(270 15% 40%)" }}>{l.sortOrder}</td>
                  <td style={{ padding: "0.875rem", fontSize: "0.875rem", fontWeight: 600, color: "hsl(270 20% 15%)" }}>{l.companyName}</td>
                  <td style={{ padding: "0.875rem", fontSize: "0.8rem", color: "hsl(270 15% 50%)" }}>{l.link || "—"}</td>
                  <td style={{ padding: "0.875rem" }}>
                    <span style={{ padding: "0.2rem 0.6rem", background: l.published ? "hsl(140 50% 90%)" : "hsl(35 80% 93%)", color: l.published ? "hsl(140 60% 28%)" : "hsl(35 70% 35%)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" }}>
                      {l.published ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem", display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => { setForm(l); setEditing(true); }} style={{ padding: "0.4rem 0.875rem", background: "hsl(270 40% 95%)", color: "hsl(275 70% 45%)", border: "1px solid hsl(270 30% 88%)", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Edit</button>
                    <DeleteButton onClick={() => l.id && handleDelete(l.id)} loading={isPending} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>

      {/* Form */}
      {editing && (
        <AdminCard title={form.id ? "Edit Logo" : "Add Logo"}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Company Name" name="companyName" value={form.companyName} onChange={ch} required />
              <AdminInput label="Sort Order" name="sortOrder" value={String(form.sortOrder)} onChange={ch} type="number" />
            </div>
            <AdminInput label="Logo Image URL (Cloudinary)" name="logoImageUrl" value={form.logoImageUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
            <AdminInput label="Link (optional)" name="link" value={form.link} onChange={ch} placeholder="https://..." />
            <AdminToggle label="Published (show on site)" checked={form.published} onChange={v => setForm(p => ({ ...p, published: v }))} name="published" />
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <SaveButton loading={loading} label={form.id ? "Update Logo" : "Add Logo"} />
              <button type="button" onClick={() => setEditing(false)} style={{ padding: "0.75rem 1.5rem", background: "hsl(270 20% 95%)", color: "hsl(270 15% 45%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}
      {saved && <SaveToast message="Logo saved." />}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { getLogos, upsertLogo, deleteLogo } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader, DeleteButton, Toggle } from "@/components/admin/AdminCard";

type Logo = { id: number; companyName: string; logoImageUrl: string | null; link: string | null; sortOrder: number; published: boolean };
const blank = (): Omit<Logo, "id"> & { id?: number } => ({ companyName: "", logoImageUrl: "", link: "", sortOrder: 0, published: true });

export default function LogosAdmin() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getLogos().then(setLogos as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditing(p => p ? { ...p, [e.target.name]: e.target.value } : p);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editing) return;
    setLoading(true);
    await upsertLogo({ ...editing, logoImageUrl: editing.logoImageUrl || undefined, link: editing.link || undefined });
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete this logo?")) { await deleteLogo(id); load(); } };

  return (
    <div>
      <PageHeader title="Logo Slider" description="Manage logos that appear in the trust strip." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Logo</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? "Edit Logo" : "New Logo"}>
          <form onSubmit={save}>
            <AdminInput label="Company Name" name="companyName" value={editing.companyName} onChange={ch} required placeholder="MotoVessel" />
            <AdminInput label="Logo Image URL (Cloudinary)" name="logoImageUrl" value={editing.logoImageUrl ?? ""} onChange={ch} placeholder="https://res.cloudinary.com/..." />
            <AdminInput label="Link (optional)" name="link" value={editing.link ?? ""} onChange={ch} placeholder="https://..." />
            <AdminInput label="Sort Order" name="sortOrder" type="number" value={String(editing.sortOrder)} onChange={ch} />
            <Toggle checked={editing.published} onChange={v => setEditing(p => p ? { ...p, published: v } : p)} label="Published" />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Logos">
        {logos.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No logos yet. Add your first one.</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
                {["Company", "Order", "Status", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logos.map(l => (
                <tr key={l.id} style={{ borderBottom: "1px solid hsl(270 20% 93%)" }}>
                  <td style={{ padding: "0.75rem", fontSize: "0.9rem", fontWeight: 600, color: "hsl(270 20% 15%)" }}>{l.companyName}</td>
                  <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "hsl(270 15% 50%)" }}>{l.sortOrder}</td>
                  <td style={{ padding: "0.75rem" }}><span style={{ padding: "0.2rem 0.6rem", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, background: l.published ? "hsl(140 50% 90%)" : "hsl(0 20% 90%)", color: l.published ? "hsl(140 60% 30%)" : "hsl(0 50% 40%)" }}>{l.published ? "Live" : "Hidden"}</span></td>
                  <td style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditing({ ...l, logoImageUrl: l.logoImageUrl ?? "", link: l.link ?? "" })} style={{ padding: "0.35rem 0.75rem", background: "hsl(270 30% 94%)", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 40% 40%)" }}>Edit</button>
                    <DeleteButton onDelete={() => del(l.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
    </div>
  );
}

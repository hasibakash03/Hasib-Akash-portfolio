"use client";
import { useState, useEffect } from "react";
import { getStats, upsertStat, deleteStat } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader, DeleteButton } from "@/components/admin/AdminCard";

type Stat = { id: number; numberText: string; label: string; sortOrder: number };
const blank = (): Omit<Stat, "id"> & { id?: number } => ({ numberText: "", label: "", sortOrder: 0 });

export default function StatsAdmin() {
  const [items, setItems] = useState<Stat[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getStats().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditing(p => p ? { ...p, [e.target.name]: e.target.name === "sortOrder" ? Number(e.target.value) : e.target.value } : p);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (\!editing) return;
    setLoading(true);
    await upsertStat(editing as any);
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete this stat?")) { await deleteStat(id); load(); } };

  return (
    <div>
      <PageHeader title="Stats" description="The social proof numbers (15+, 3x, 100%)." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Stat</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? "Edit Stat" : "New Stat"}>
          <form onSubmit={save}>
            <AdminInput label="Number Text" name="numberText" value={editing.numberText} onChange={ch} required placeholder="15+" />
            <AdminInput label="Label" name="label" value={editing.label} onChange={ch} required placeholder="Businesses Consulted" />
            <AdminInput label="Sort Order" name="sortOrder" type="number" value={String(editing.sortOrder)} onChange={ch} />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Stats">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No stats yet. Click &ldquo;+ Add Stat&rdquo; to create one.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {items.map(item => (
              <div key={item.id} style={{ border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1, display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "hsl(275 70% 55%)", lineHeight: 1, minWidth: 60 }}>{item.numberText}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(270 15% 40%)" }}>{item.label}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button onClick={() => setEditing({ ...item })} style={{ padding: "0.35rem 0.75rem", background: "hsl(270 30% 94%)", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 40% 40%)" }}>Edit</button>
                  <DeleteButton onDelete={() => del(item.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}

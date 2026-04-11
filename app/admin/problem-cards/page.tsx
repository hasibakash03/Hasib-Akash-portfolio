"use client";
import { useState, useEffect } from "react";
import { getProblemCards, upsertProblemCard, deleteProblemCard } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader, DeleteButton } from "@/components/admin/AdminCard";

type PC = { id: number; iconName: string; title: string; description: string; sortOrder: number };
const blank = (): Omit<PC, "id"> & { id?: number } => ({ iconName: "Target", title: "", description: "", sortOrder: 0 });

export default function ProblemCardsAdmin() {
  const [items, setItems] = useState<PC[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getProblemCards().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditing(p => p ? { ...p, [e.target.name]: e.target.name === "sortOrder" ? Number(e.target.value) : e.target.value } : p);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (\!editing) return;
    setLoading(true);
    await upsertProblemCard(editing as any);
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete this card?")) { await deleteProblemCard(id); load(); } };

  return (
    <div>
      <PageHeader title="Problem Cards" description="The pain points shown in the Problem section." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Card</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? "Edit Card" : "New Card"}>
          <form onSubmit={save}>
            <AdminInput label="Icon Name (Lucide)" name="iconName" value={editing.iconName} onChange={ch} required placeholder="Target" />
            <AdminInput label="Title" name="title" value={editing.title} onChange={ch} required placeholder="No strategic foundation" />
            <AdminInput label="Description" name="description" value={editing.description} onChange={ch} required rows={3} placeholder="Describe the problem..." />
            <AdminInput label="Sort Order" name="sortOrder" type="number" value={String(editing.sortOrder)} onChange={ch} />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Problem Cards">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No cards yet. Click &ldquo;+ Add Card&rdquo; to create one.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {items.map(item => (
              <div key={item.id} style={{ border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(270 20% 12%)", marginBottom: "0.2rem" }}>{item.title} <span style={{ fontSize: "0.75rem", color: "hsl(270 15% 55%)", fontWeight: 500 }}>({item.iconName})</span></div>
                  <div style={{ fontSize: "0.82rem", color: "hsl(270 15% 45%)", lineHeight: 1.5 }}>{item.description.slice(0, 100)}{item.description.length > 100 ? "..." : ""}</div>
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

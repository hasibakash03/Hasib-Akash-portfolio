"use client";
import { useState, useEffect } from "react";
import { getFaq, upsertFaqItem, deleteFaqItem } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader, DeleteButton, Toggle } from "@/components/admin/AdminCard";

type F = { id: number; question: string; answer: string; sortOrder: number; published: boolean };
const blank = (): Omit<F, "id"> & { id?: number } => ({ question: "", answer: "", sortOrder: 0, published: true });

export default function FaqAdmin() {
  const [items, setItems] = useState<F[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getFaq().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditing(p => p ? { ...p, [e.target.name]: e.target.name === "sortOrder" ? Number(e.target.value) : e.target.value } : p);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editing) return;
    setLoading(true);
    await upsertFaqItem(editing);
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete FAQ item?")) { await deleteFaqItem(id); load(); } };

  return (
    <div>
      <PageHeader title="FAQ" description="Manage questions on the consult page." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Question</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? "Edit FAQ Item" : "New FAQ Item"}>
          <form onSubmit={save}>
            <AdminInput label="Question" name="question" value={editing.question} onChange={ch} required placeholder="What happens on the free diagnostic call?" />
            <AdminInput label="Answer" name="answer" value={editing.answer} onChange={ch} required rows={5} placeholder="We spend 30 minutes going through..." />
            <AdminInput label="Sort Order" name="sortOrder" type="number" value={String(editing.sortOrder)} onChange={ch} />
            <Toggle checked={editing.published} onChange={v => setEditing(p => p ? { ...p, published: v } : p)} label="Published" />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All FAQ Items">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No FAQ items yet.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {items.map(f => (
              <div key={f.id} style={{ border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(270 20% 12%)", marginBottom: "0.35rem" }}>Q: {f.question}</div>
                  <div style={{ fontSize: "0.82rem", color: "hsl(270 15% 48%)", lineHeight: 1.55 }}>{f.answer.slice(0, 120)}...</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, alignItems: "center" }}>
                  <span style={{ padding: "0.2rem 0.6rem", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, background: f.published ? "hsl(140 50% 90%)" : "hsl(0 20% 90%)", color: f.published ? "hsl(140 60% 30%)" : "hsl(0 50% 40%)" }}>{f.published ? "Live" : "Hidden"}</span>
                  <button onClick={() => setEditing(f)} style={{ padding: "0.35rem 0.75rem", background: "hsl(270 30% 94%)", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 40% 40%)" }}>Edit</button>
                  <DeleteButton onDelete={() => del(f.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}

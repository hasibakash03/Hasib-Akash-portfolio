"use client";
import { useState, useEffect } from "react";
import { getProcessSteps, upsertProcessStep, deleteProcessStep } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader, DeleteButton } from "@/components/admin/AdminCard";

type PS = { id: number; stepNumber: string; title: string; description: string };
const blank = (): Omit<PS, "id"> & { id?: number } => ({ stepNumber: "", title: "", description: "" });

export default function ProcessAdmin() {
  const [items, setItems] = useState<PS[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getProcessSteps().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditing(p => p ? { ...p, [e.target.name]: e.target.value } : p);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editing) return;
    setLoading(true);
    await upsertProcessStep(editing as any);
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete this step?")) { await deleteProcessStep(id); load(); } };

  return (
    <div>
      <PageHeader title="Process Steps" description="The step-by-step process shown on the homepage." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Step</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? "Edit Step" : "New Step"}>
          <form onSubmit={save}>
            <AdminInput label="Step Number / Label" name="stepNumber" value={editing.stepNumber} onChange={ch} required placeholder="01" />
            <AdminInput label="Title" name="title" value={editing.title} onChange={ch} required placeholder="Strategy Diagnostic" />
            <AdminInput label="Description" name="description" value={editing.description} onChange={ch} required rows={3} placeholder="A 30-minute call to understand..." />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Steps">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No steps yet. Click &ldquo;+ Add Step&rdquo; to create one.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {items.map(item => (
              <div key={item.id} style={{ border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1, display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "hsl(275 70% 55%)", color: "white", fontWeight: 900, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.stepNumber}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(270 20% 12%)", marginBottom: "0.15rem" }}>{item.title}</div>
                    <div style={{ fontSize: "0.82rem", color: "hsl(270 15% 45%)" }}>{item.description.slice(0, 100)}{item.description.length > 100 ? "..." : ""}</div>
                  </div>
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

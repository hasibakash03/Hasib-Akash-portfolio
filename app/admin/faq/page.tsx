"use client";
import { useState, useEffect, useTransition } from "react";
import { getFaq, upsertFaqItem, deleteFaqItem } from "@/lib/actions";
import { AdminCard, AdminInput, AdminToggle, SaveButton, DeleteButton, SaveToast, PageHeader } from "@/components/admin/AdminCard";

type Faq = { id?: number; question: string; answer: string; sortOrder: number; published: boolean };
const blank = (): Faq => ({ id: undefined, question: "", answer: "", sortOrder: 0, published: true });
const acc = "hsl(275 70% 55%)";

export default function FaqAdmin() {
  const [items, setItems] = useState<Faq[]>([]);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const load = () => getFaq().then(r => setItems(r.map(f => ({ id: f.id, question: f.question, answer: f.answer, sortOrder: f.sortOrder, published: f.published }))));
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await upsertFaqItem({ ...form, sortOrder: Number(form.sortOrder) });
    setLoading(false); setSaved(true); setForm(blank()); setEditing(false);
    load(); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="FAQ" description="Manage frequently asked questions on the /consult page."
        action={<button onClick={() => { setForm(blank()); setEditing(true); }} style={{ padding: "0.6rem 1.25rem", background: acc, color: "white", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ Add Question</button>}
      />

      <AdminCard title="FAQ Items">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No FAQ items yet.</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {items.map(f => (
              <div key={f.id} style={{ padding: "1.25rem", border: "1px solid hsl(270 20% 90%)", borderRadius: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(270 20% 12%)", marginBottom: "0.35rem" }}>{f.question}</div>
                    <div style={{ fontSize: "0.82rem", color: "hsl(270 15% 48%)", lineHeight: 1.6 }}>{f.answer.substring(0, 140)}{f.answer.length > 140 ? "…" : ""}</div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button onClick={() => { setForm(f); setEditing(true); }} style={{ padding: "0.4rem 0.875rem", background: "hsl(270 40% 95%)", color: "hsl(275 70% 45%)", border: "1px solid hsl(270 30% 88%)", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Edit</button>
                    <DeleteButton onClick={() => f.id && startTransition(async () => { await deleteFaqItem(f.id!); load(); })} loading={isPending} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {editing && (
        <AdminCard title={form.id ? "Edit Question" : "Add Question"}>
          <form onSubmit={handleSubmit}>
            <AdminInput label="Question" name="question" value={form.question} onChange={ch} required placeholder="What happens on the free diagnostic call?" />
            <AdminInput label="Answer" name="answer" value={form.answer} onChange={ch} required rows={4} placeholder="We spend 30 minutes going through your current brand…" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "0 1rem" }}>
              <AdminInput label="Sort Order" name="sortOrder" value={String(form.sortOrder)} onChange={ch} type="number" />
              <div />
            </div>
            <AdminToggle label="Published" checked={form.published} onChange={v => setForm(p => ({ ...p, published: v }))} name="published" />
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <SaveButton loading={loading} label={form.id ? "Update" : "Add Question"} />
              <button type="button" onClick={() => setEditing(false)} style={{ padding: "0.75rem 1.5rem", background: "hsl(270 20% 95%)", color: "hsl(270 15% 45%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}
      {saved && <SaveToast message="FAQ item saved." />}
    </div>
  );
}

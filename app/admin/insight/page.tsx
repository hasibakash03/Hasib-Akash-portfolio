"use client";
import { useState, useEffect } from "react";
import { getInsight, updateInsight } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader } from "@/components/admin/AdminCard";

export default function InsightAdmin() {
  const [form, setForm] = useState({ eyebrow: "The Insight", heading: "", body: "", card1Title: "", card1Desc: "", card2Title: "", card2Desc: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getInsight().then(d => {
      if (d) setForm({ eyebrow: d.eyebrow, heading: d.heading, body: d.body, card1Title: d.card1Title, card1Desc: d.card1Desc, card2Title: d.card2Title, card2Desc: d.card2Desc });
    });
  }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await updateInsight(form);
    setLoading(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Insight Section" description="The strategic insight block on the homepage." />
      <form onSubmit={handleSubmit}>
        <AdminCard title="Main Content">
          <AdminInput label="Eyebrow Label" name="eyebrow" value={form.eyebrow} onChange={ch} required placeholder="The Insight" />
          <AdminInput label="Heading" name="heading" value={form.heading} onChange={ch} required rows={3} placeholder="Strategy isn't what happens after the logo..." />
          <AdminInput label="Body Paragraph" name="body" value={form.body} onChange={ch} required rows={5} placeholder="Every brand decision flows from one strategic foundation..." />
        </AdminCard>
        <AdminCard title="Card 1">
          <AdminInput label="Card 1 Title" name="card1Title" value={form.card1Title} onChange={ch} required placeholder="Positioning before execution" />
          <AdminInput label="Card 1 Description" name="card1Desc" value={form.card1Desc} onChange={ch} required rows={3} placeholder="Before you run a single ad..." />
        </AdminCard>
        <AdminCard title="Card 2">
          <AdminInput label="Card 2 Title" name="card2Title" value={form.card2Title} onChange={ch} required placeholder="Systems before tactics" />
          <AdminInput label="Card 2 Description" name="card2Desc" value={form.card2Desc} onChange={ch} required rows={3} placeholder="Tactics without systems produce unpredictable results..." />
        </AdminCard>
        <SaveButton loading={loading} label={saved ? "Saved\!" : "Save Insight Section"} />
      </form>
    </div>
  );
}

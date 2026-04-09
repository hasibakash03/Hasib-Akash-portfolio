"use client";
import { useState, useEffect } from "react";
import { updateHero, getHero } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, SaveToast, PageHeader } from "@/components/admin/AdminCard";

export default function HeroAdmin() {
  const [form, setForm] = useState({ eyebrow: "", heading: "", subheading: "", ctaText: "", ctaLink: "", backgroundImageUrl: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getHero().then(h => { if (h) setForm({ eyebrow: h.eyebrow, heading: h.heading, subheading: h.subheading, ctaText: h.ctaText, ctaLink: h.ctaLink, backgroundImageUrl: h.backgroundImageUrl || "" }); });
  }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await updateHero(form);
    setLoading(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Hero Section" description="Edit the homepage hero copy and CTA." />
      <form onSubmit={handleSubmit}>
        <AdminCard title="Hero Content">
          <AdminInput label="Eyebrow" name="eyebrow" value={form.eyebrow} onChange={ch} required placeholder="Brand Strategist & Growth Consultant" />
          <AdminInput label="Heading (H1)" name="heading" value={form.heading} onChange={ch} required rows={3} placeholder="Most businesses don't have a marketing problem..." />
          <AdminInput label="Subheading" name="subheading" value={form.subheading} onChange={ch} required rows={3} placeholder="I help founders and businesses in Bangladesh..." />
          <AdminInput label="CTA Button Text" name="ctaText" value={form.ctaText} onChange={ch} required placeholder="Book a Free Strategy Diagnostic →" />
          <AdminInput label="CTA Link" name="ctaLink" value={form.ctaLink} onChange={ch} required placeholder="/consult" />
          <AdminInput label="Background Image URL (Cloudinary)" name="backgroundImageUrl" value={form.backgroundImageUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
        </AdminCard>
        <SaveButton loading={loading} />
      </form>
      {saved && <SaveToast message="Hero section saved." />}
    </div>
  );
}

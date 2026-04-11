"use client";
import { useState, useEffect } from "react";
import { getAbout, updateAbout } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader } from "@/components/admin/AdminCard";

export default function AboutAdmin() {
  const [form, setForm] = useState({
    photoUrl: "", heading: "Hasib Akash", bioText: "",
    badge1Title: "Framework-Driven", badge1Desc: "",
    badge2Title: "Bangladesh-First", badge2Desc: "",
    badge3Title: "Strategy Before Execution", badge3Desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAbout().then(d => {
      if (d) setForm({
        photoUrl: d.photoUrl ?? "", heading: d.heading, bioText: d.bioText,
        badge1Title: d.badge1Title, badge1Desc: d.badge1Desc,
        badge2Title: d.badge2Title, badge2Desc: d.badge2Desc,
        badge3Title: d.badge3Title, badge3Desc: d.badge3Desc,
      });
    });
  }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await updateAbout({ ...form, photoUrl: form.photoUrl || undefined });
    setLoading(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader title="About / Who I Am" description="The authority section on the homepage." />
      <form onSubmit={handleSubmit}>
        <AdminCard title="Profile">
          <AdminInput label="Photo URL (Cloudinary)" name="photoUrl" value={form.photoUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
          <AdminInput label="Name / Heading" name="heading" value={form.heading} onChange={ch} required placeholder="Hasib Akash" />
          <AdminInput label="Bio Paragraph" name="bioText" value={form.bioText} onChange={ch} required rows={6} placeholder="Your background, what you do, why you do it..." />
        </AdminCard>
        <AdminCard title="Credential Badge 1">
          <AdminInput label="Badge Title" name="badge1Title" value={form.badge1Title} onChange={ch} required placeholder="Framework-Driven" />
          <AdminInput label="Badge Description" name="badge1Desc" value={form.badge1Desc} onChange={ch} required rows={2} placeholder="Every recommendation is grounded in..." />
        </AdminCard>
        <AdminCard title="Credential Badge 2">
          <AdminInput label="Badge Title" name="badge2Title" value={form.badge2Title} onChange={ch} required placeholder="Bangladesh-First" />
          <AdminInput label="Badge Description" name="badge2Desc" value={form.badge2Desc} onChange={ch} required rows={2} placeholder="Built for the realities of the local market..." />
        </AdminCard>
        <AdminCard title="Credential Badge 3">
          <AdminInput label="Badge Title" name="badge3Title" value={form.badge3Title} onChange={ch} required placeholder="Strategy Before Execution" />
          <AdminInput label="Badge Description" name="badge3Desc" value={form.badge3Desc} onChange={ch} required rows={2} placeholder="I don't run ads until the strategy is clear..." />
        </AdminCard>
        <SaveButton loading={loading} label={saved ? "Saved\!" : "Save About Section"} />
      </form>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, PageHeader } from "@/components/admin/AdminCard";

export default function SettingsAdmin() {
  const [form, setForm] = useState({ siteTitle: "", contactEmail: "", whatsappNumber: "", footerText: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteSettings().then(d => {
      if (d) setForm({ siteTitle: d.siteTitle, contactEmail: d.contactEmail, whatsappNumber: d.whatsappNumber, footerText: d.footerText ?? "" });
    });
  }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await updateSiteSettings(form);
    setLoading(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Site Settings" description="Global settings applied across the site." />
      <form onSubmit={handleSubmit}>
        <AdminCard title="General">
          <AdminInput label="Site Title" name="siteTitle" value={form.siteTitle} onChange={ch} required placeholder="Hasib Akash" />
          <AdminInput label="Contact Email" name="contactEmail" value={form.contactEmail} onChange={ch} required type="email" placeholder="hasib@tradefigur.com" />
        </AdminCard>
        <AdminCard title="Contact & Social">
          <AdminInput label="WhatsApp Number (with country code)" name="whatsappNumber" value={form.whatsappNumber} onChange={ch} required placeholder="+8801XXXXXXXXX" />
        </AdminCard>
        <AdminCard title="Footer">
          <AdminInput label="Footer Copyright Text" name="footerText" value={form.footerText} onChange={ch} placeholder="© 2026 Hasib Akash. All rights reserved." />
        </AdminCard>
        <SaveButton loading={loading} label={saved ? "✓ Saved!" : "Save Settings"} />
      </form>

      <div style={{ marginTop: "2rem" }}>
        <AdminCard title="Environment Variables" description="Set these in Vercel → Project Settings → Environment Variables">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              { key: "DATABASE_URL", desc: "Neon PostgreSQL connection string" },
              { key: "NEXTAUTH_SECRET", desc: "Random 32+ char string for session encryption" },
              { key: "NEXTAUTH_URL", desc: "Your production URL (e.g. https://hasibakash.com)" },
              { key: "ADMIN_EMAIL", desc: "Your admin login email" },
              { key: "ADMIN_PASSWORD", desc: "Your admin login password" },
            ].map(({ key, desc }) => (
              <div key={key} style={{ display: "flex", gap: "1rem", padding: "0.75rem", background: "hsl(270 20% 97%)", borderRadius: "0.5rem", alignItems: "flex-start" }}>
                <code style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "hsl(275 70% 45%)", background: "hsl(270 60% 94%)", padding: "0.15rem 0.5rem", borderRadius: "0.25rem", whiteSpace: "nowrap", flexShrink: 0 }}>{key}</code>
                <span style={{ fontSize: "0.82rem", color: "hsl(270 15% 45%)" }}>{desc}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

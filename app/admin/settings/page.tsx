"use client";
import { useState, useEffect } from "react";
import { updateSiteSettings, getSiteSettings } from "@/lib/actions";
import { AdminCard, AdminInput, SaveButton, SaveToast, PageHeader } from "@/components/admin/AdminCard";

export default function SettingsAdmin() {
  const [form, setForm] = useState({ siteTitle: "Hasib Akash", contactEmail: "", whatsappNumber: "", footerText: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteSettings().then(s => { if (s) setForm({ siteTitle: s.siteTitle, contactEmail: s.contactEmail, whatsappNumber: s.whatsappNumber, footerText: s.footerText || "" }); });
  }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await updateSiteSettings(form);
    setLoading(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Site Settings" description="Global configuration for your site." />
      <form onSubmit={handleSubmit}>
        <AdminCard title="General">
          <AdminInput label="Site Title" name="siteTitle" value={form.siteTitle} onChange={ch} required />
          <AdminInput label="Contact Email" name="contactEmail" value={form.contactEmail} onChange={ch} required type="email" placeholder="hasib@tradefigur.com" />
          <AdminInput label="WhatsApp Number" name="whatsappNumber" value={form.whatsappNumber} onChange={ch} required placeholder="+8801XXXXXXXXX" />
          <AdminInput label="Footer Text" name="footerText" value={form.footerText} onChange={ch} placeholder="© 2026 Hasib Akash. All rights reserved." />
        </AdminCard>
        <SaveButton loading={loading} />
      </form>
      {saved && <SaveToast message="Settings saved." />}
    </div>
  );
}

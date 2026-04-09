"use client";
import { useState, useEffect, useTransition } from "react";
import { getProjects, upsertProject, deleteProject } from "@/lib/actions";
import { AdminCard, AdminInput, AdminSelect, AdminToggle, SaveButton, DeleteButton, SaveToast, PageHeader, StatusBadge } from "@/components/admin/AdminCard";

type Project = {
  id?: number; title: string; slug: string; category: string;
  clientName: string; year: string; oneLiner: string;
  thumbnailUrl: string; bannerUrl: string; clientLogoUrl: string;
  challenge: string; approach: string; result: string;
  testimonialQuote: string; testimonialAuthor: string; testimonialRole: string;
  tags: string; published: boolean;
};

const blank = (): Project => ({ id: undefined, title: "", slug: "", category: "Brand Strategy", clientName: "", year: new Date().getFullYear().toString(), oneLiner: "", thumbnailUrl: "", bannerUrl: "", clientLogoUrl: "", challenge: "", approach: "", result: "", testimonialQuote: "", testimonialAuthor: "", testimonialRole: "", tags: "", published: false });

const cats = ["Brand Strategy","Personal Branding","Business Systems","Content Strategy"];
const acc = "hsl(275 70% 55%)";

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState(blank());
  const [view, setView] = useState<"list"|"edit">("list");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const load = () => getProjects().then(r => setItems(r.map(p => ({ id: p.id, title: p.title, slug: p.slug, category: p.category, clientName: p.clientName, year: p.year, oneLiner: p.oneLiner, thumbnailUrl: p.thumbnailUrl || "", bannerUrl: p.bannerUrl || "", clientLogoUrl: p.clientLogoUrl || "", challenge: p.challenge, approach: p.approach, result: p.result, testimonialQuote: p.testimonialQuote || "", testimonialAuthor: p.testimonialAuthor || "", testimonialRole: p.testimonialRole || "", tags: Array.isArray(p.tags) ? (p.tags as string[]).join(", ") : "", published: p.published }))));
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({
      ...p, [name]: value,
      ...(name === "title" && !p.id ? { slug: value.toLowerCase().replace(/[^\w\s-]/g,"").replace(/[\s]+/g,"-").replace(/^-+|-+$/g,"") } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await upsertProject({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) });
    setLoading(false); setSaved(true); setView("list"); setForm(blank());
    load(); setTimeout(() => setSaved(false), 2500);
  };

  if (view === "edit") return (
    <div>
      <PageHeader title={form.id ? `Editing: ${form.title}` : "New Project"} description="Fill in all fields for the case study."
        action={<button onClick={() => { setView("list"); setForm(blank()); }} style={{ padding: "0.6rem 1.25rem", background: "hsl(270 20% 95%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>← Back to list</button>}
      />
      <form onSubmit={handleSubmit}>
        <AdminCard title="Basic Info">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            <AdminInput label="Title" name="title" value={form.title} onChange={ch} required placeholder="MotoVessel" />
            <AdminInput label="Slug" name="slug" value={form.slug} onChange={ch} required placeholder="motoVessel-brand-identity" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 1rem" }}>
            <AdminSelect label="Category" name="category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} options={cats.map(c => ({ value: c, label: c }))} />
            <AdminInput label="Client Name" name="clientName" value={form.clientName} onChange={ch} required placeholder="MotoVessel Automotive" />
            <AdminInput label="Year" name="year" value={form.year} onChange={ch} required placeholder="2025" />
          </div>
          <AdminInput label="One-Liner (shown on card)" name="oneLiner" value={form.oneLiner} onChange={ch} required placeholder="Repositioned an automotive parts brand..." />
        </AdminCard>
        <AdminCard title="Images (Cloudinary URLs)">
          <AdminInput label="Thumbnail URL" name="thumbnailUrl" value={form.thumbnailUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
          <AdminInput label="Banner URL" name="bannerUrl" value={form.bannerUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
          <AdminInput label="Client Logo URL" name="clientLogoUrl" value={form.clientLogoUrl} onChange={ch} placeholder="https://res.cloudinary.com/..." />
        </AdminCard>
        <AdminCard title="Case Study Content">
          <AdminInput label="Challenge — What they were facing" name="challenge" value={form.challenge} onChange={ch} required rows={5} />
          <AdminInput label="Approach — What we did" name="approach" value={form.approach} onChange={ch} required rows={5} />
          <AdminInput label="Result — What changed" name="result" value={form.result} onChange={ch} required rows={4} />
        </AdminCard>
        <AdminCard title="Testimonial">
          <AdminInput label="Quote" name="testimonialQuote" value={form.testimonialQuote} onChange={ch} rows={3} placeholder="Working with Hasib changed how we think about our brand…" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            <AdminInput label="Author Name" name="testimonialAuthor" value={form.testimonialAuthor} onChange={ch} placeholder="Rafiq Ahmed" />
            <AdminInput label="Author Role" name="testimonialRole" value={form.testimonialRole} onChange={ch} placeholder="Founder, MotoVessel" />
          </div>
        </AdminCard>
        <AdminCard title="Tags & Publishing">
          <AdminInput label="Tags (comma separated)" name="tags" value={form.tags} onChange={ch} placeholder="Brand Strategy, Positioning, Automotive" />
          <AdminToggle label="Published (visible on site)" checked={form.published} onChange={v => setForm(p => ({ ...p, published: v }))} name="published" />
        </AdminCard>
        <SaveButton loading={loading} label={form.id ? "Update Project" : "Create Project"} />
      </form>
      {saved && <SaveToast message="Project saved." />}
    </div>
  );

  return (
    <div>
      <PageHeader title="Projects" description="Manage your case studies."
        action={<button onClick={() => { setForm(blank()); setView("edit"); }} style={{ padding: "0.6rem 1.25rem", background: acc, color: "white", border: "none", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ New Project</button>}
      />
      <AdminCard title="All Projects">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No projects yet. Add your first case study.</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
              {["Title","Category","Client","Status","Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.625rem 0.875rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid hsl(270 20% 93%)" }}>
                  <td style={{ padding: "1rem 0.875rem", fontWeight: 700, color: "hsl(270 20% 12%)", fontSize: "0.9rem" }}>{p.title}</td>
                  <td style={{ padding: "1rem 0.875rem", fontSize: "0.85rem", color: "hsl(270 15% 45%)" }}>{p.category}</td>
                  <td style={{ padding: "1rem 0.875rem", fontSize: "0.85rem", color: "hsl(270 15% 50%)" }}>{p.clientName}</td>
                  <td style={{ padding: "1rem 0.875rem" }}><StatusBadge status={p.published ? "published" : "draft"} /></td>
                  <td style={{ padding: "1rem 0.875rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => { setForm(p); setView("edit"); }} style={{ padding: "0.4rem 0.875rem", background: "hsl(270 40% 95%)", color: "hsl(275 70% 45%)", border: "1px solid hsl(270 30% 88%)", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Edit</button>
                      <DeleteButton onClick={() => p.id && startTransition(async () => { await deleteProject(p.id!); load(); })} loading={isPending} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
      {saved && <SaveToast message="Project saved." />}
    </div>
  );
}

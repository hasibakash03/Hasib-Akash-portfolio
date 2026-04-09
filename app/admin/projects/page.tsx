"use client";
import { useState, useEffect } from "react";
import { getProjects, upsertProject, deleteProject } from "@/lib/actions";
import { AdminCard, AdminInput, AdminSelect, SaveButton, PageHeader, DeleteButton, Toggle } from "@/components/admin/AdminCard";

type P = { id: number; title: string; slug: string; category: string; clientName: string; year: string; oneLiner: string; challenge: string; approach: string; result: string; testimonialQuote: string | null; testimonialAuthor: string | null; testimonialRole: string | null; thumbnailUrl: string | null; tags: unknown; published: boolean };
const blank = (): Omit<P, "id"> & { id?: number } => ({ title: "", slug: "", category: "Brand Strategy", clientName: "", year: String(new Date().getFullYear()), oneLiner: "", challenge: "", approach: "", result: "", testimonialQuote: "", testimonialAuthor: "", testimonialRole: "", thumbnailUrl: "", tags: [], published: false });

const cats = ["Brand Strategy", "Personal Branding", "Business Systems", "Content Strategy"];

function slugify(s: string) { return s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, ""); }

export default function ProjectsAdmin() {
  const [items, setItems] = useState<P[]>([]);
  const [editing, setEditing] = useState<ReturnType<typeof blank> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getProjects().then(setItems as any);
  useEffect(() => { load(); }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditing(p => {
      if (!p) return p;
      const updated = { ...p, [name]: value };
      if (name === "title" && !p.id) updated.slug = slugify(value);
      return updated;
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editing) return;
    setLoading(true);
    await upsertProject({
      ...editing,
      thumbnailUrl: editing.thumbnailUrl || undefined,
      testimonialQuote: editing.testimonialQuote || undefined,
      testimonialAuthor: editing.testimonialAuthor || undefined,
      testimonialRole: editing.testimonialRole || undefined,
      tags: [],
    });
    setLoading(false); setEditing(null); load();
  };

  const del = async (id: number) => { if (confirm("Delete this project?")) { await deleteProject(id); load(); } };

  return (
    <div>
      <PageHeader title="Projects" description="Manage case studies." action={
        <button onClick={() => setEditing(blank())} style={{ padding: "0.6rem 1.25rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>+ New Project</button>
      } />

      {editing && (
        <AdminCard title={editing.id ? `Editing: ${editing.title}` : "New Project"}>
          <form onSubmit={save}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Title" name="title" value={editing.title} onChange={ch} required placeholder="MotoVessel" />
              <AdminInput label="Slug (auto)" name="slug" value={editing.slug} onChange={ch} required placeholder="motoVessel-brand" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminSelect label="Category" name="category" value={editing.category} onChange={ch} options={cats.map(c => ({ value: c, label: c }))} />
              <AdminInput label="Client Name" name="clientName" value={editing.clientName} onChange={ch} required placeholder="MotoVessel Automotive" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Year" name="year" value={editing.year} onChange={ch} required placeholder="2025" />
              <AdminInput label="Thumbnail URL (Cloudinary)" name="thumbnailUrl" value={editing.thumbnailUrl ?? ""} onChange={ch} placeholder="https://res.cloudinary.com/..." />
            </div>
            <AdminInput label="One-Liner (card description)" name="oneLiner" value={editing.oneLiner} onChange={ch} required placeholder="Repositioned an automotive brand..." />
            <AdminInput label="Challenge" name="challenge" value={editing.challenge} onChange={ch} required rows={5} placeholder="What the client was facing..." />
            <AdminInput label="Approach" name="approach" value={editing.approach} onChange={ch} required rows={6} placeholder="What we did and why..." />
            <AdminInput label="Result" name="result" value={editing.result} onChange={ch} required rows={5} placeholder="What changed..." />
            <AdminInput label="Testimonial Quote" name="testimonialQuote" value={editing.testimonialQuote ?? ""} onChange={ch} rows={3} placeholder="Working with Hasib..." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <AdminInput label="Testimonial Author" name="testimonialAuthor" value={editing.testimonialAuthor ?? ""} onChange={ch} placeholder="Rafiq Ahmed" />
              <AdminInput label="Testimonial Role" name="testimonialRole" value={editing.testimonialRole ?? ""} onChange={ch} placeholder="Founder, E-commerce Brand" />
            </div>
            <Toggle checked={editing.published} onChange={v => setEditing(p => p ? { ...p, published: v } : p)} label="Published (live on site)" />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <SaveButton loading={loading} />
              <button type="button" onClick={() => setEditing(null)} style={{ padding: "0.75rem 1.25rem", background: "hsl(270 20% 94%)", color: "hsl(270 15% 40%)", border: "none", borderRadius: "0.625rem", fontWeight: 600, cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>Cancel</button>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard title="All Projects">
        {items.length === 0 ? <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No projects yet.</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
              {["Title", "Category", "Client", "Status", "Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid hsl(270 20% 93%)" }}>
                  <td style={{ padding: "0.75rem", fontSize: "0.9rem", fontWeight: 700, color: "hsl(270 20% 12%)" }}>{p.title}</td>
                  <td style={{ padding: "0.75rem", fontSize: "0.82rem", color: "hsl(270 15% 50%)" }}>{p.category}</td>
                  <td style={{ padding: "0.75rem", fontSize: "0.82rem", color: "hsl(270 15% 50%)" }}>{p.clientName}</td>
                  <td style={{ padding: "0.75rem" }}><span style={{ padding: "0.2rem 0.6rem", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, background: p.published ? "hsl(140 50% 90%)" : "hsl(40 70% 90%)", color: p.published ? "hsl(140 60% 30%)" : "hsl(40 60% 30%)" }}>{p.published ? "Live" : "Draft"}</span></td>
                  <td style={{ padding: "0.75rem" }}><div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditing({ ...p, thumbnailUrl: p.thumbnailUrl ?? "", testimonialQuote: p.testimonialQuote ?? "", testimonialAuthor: p.testimonialAuthor ?? "", testimonialRole: p.testimonialRole ?? "" })} style={{ padding: "0.35rem 0.75rem", background: "hsl(270 30% 94%)", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 40% 40%)" }}>Edit</button>
                    <DeleteButton onDelete={() => del(p.id)} />
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
    </div>
  );
}

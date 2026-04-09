"use client";
import { useState, useEffect } from "react";
import { getFormSubmissions, updateSubmissionStatus } from "@/lib/actions";
import { AdminCard, PageHeader, StatusBadge } from "@/components/admin/AdminCard";

type S = { id: number; name: string; email: string; phone: string | null; businessName: string; revenueRange: string; challenge: string; tierInterest: string; status: string; createdAt: Date | null };

export default function SubmissionsAdmin() {
  const [items, setItems] = useState<S[]>([]);
  const [selected, setSelected] = useState<S | null>(null);

  const load = () => getFormSubmissions().then(setItems as any);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await updateSubmissionStatus(id, status);
    load();
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : p);
  };

  const newCount = items.filter(i => i.status === "new").length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 360px" : "1fr", gap: "1.5rem" }}>
      <div>
        <PageHeader title="Form Submissions" description={`${items.length} total · ${newCount} new`} />
        <AdminCard title="All Submissions">
          {items.length === 0 ? (
            <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No submissions yet. They'll appear here once someone fills the contact form.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
                {["Name", "Business", "Tier", "Revenue", "Status", "Date"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontSize: "0.72rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {items.map(s => (
                  <tr key={s.id} onClick={() => setSelected(s)} style={{ borderBottom: "1px solid hsl(270 20% 93%)", cursor: "pointer", background: selected?.id === s.id ? "hsl(270 60% 98%)" : "transparent" }}>
                    <td style={{ padding: "0.75rem", fontSize: "0.875rem", fontWeight: 700, color: "hsl(270 20% 12%)" }}>{s.name}</td>
                    <td style={{ padding: "0.75rem", fontSize: "0.82rem", color: "hsl(270 15% 40%)" }}>{s.businessName}</td>
                    <td style={{ padding: "0.75rem", fontSize: "0.78rem" }}><span style={{ padding: "0.2rem 0.6rem", background: "hsl(270 60% 94%)", borderRadius: 9999, fontWeight: 700, color: "hsl(275 70% 40%)" }}>{s.tierInterest}</span></td>
                    <td style={{ padding: "0.75rem", fontSize: "0.78rem", color: "hsl(270 15% 50%)" }}>{s.revenueRange}</td>
                    <td style={{ padding: "0.75rem" }}><StatusBadge status={s.status} /></td>
                    <td style={{ padding: "0.75rem", fontSize: "0.78rem", color: "hsl(270 15% 55%)" }}>{s.createdAt ? new Date(s.createdAt).toLocaleDateString("en-GB") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </AdminCard>
      </div>

      {selected && (
        <div>
          <PageHeader title="Detail" />
          <AdminCard title={selected.name}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { l: "Email", v: selected.email },
                { l: "Phone/WhatsApp", v: selected.phone ?? "—" },
                { l: "Business", v: selected.businessName },
                { l: "Revenue Range", v: selected.revenueRange },
                { l: "Tier Interest", v: selected.tierInterest },
              ].map(({ l, v }) => (
                <div key={l}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "hsl(270 15% 50%)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>{l}</div>
                  <div style={{ fontSize: "0.9rem", color: "hsl(270 20% 15%)", fontWeight: 600 }}>{v}</div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "hsl(270 15% 50%)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>Challenge</div>
                <div style={{ fontSize: "0.875rem", color: "hsl(270 15% 30%)", lineHeight: 1.7, background: "hsl(270 25% 96%)", padding: "0.875rem", borderRadius: "0.5rem" }}>{selected.challenge}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "hsl(270 15% 50%)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Update Status</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["new", "contacted", "closed"].map(st => (
                    <button key={st} onClick={() => updateStatus(selected.id, st)}
                      style={{ padding: "0.4rem 0.9rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", fontFamily: "Urbanist,sans-serif", background: selected.status === st ? "hsl(275 70% 55%)" : "hsl(270 20% 92%)", color: selected.status === st ? "white" : "hsl(270 15% 40%)" }}>
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <a href={`mailto:${selected.email}`} style={{ flex: 1, display: "block", textAlign: "center", padding: "0.65rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>Reply via Email</a>
                {selected.phone && <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "block", textAlign: "center", padding: "0.65rem", background: "hsl(140 60% 40%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>WhatsApp</a>}
              </div>
              <button onClick={() => setSelected(null)} style={{ padding: "0.5rem", background: "hsl(270 20% 94%)", border: "none", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", color: "hsl(270 15% 40%)" }}>Close</button>
            </div>
          </AdminCard>
        </div>
      )}
    </div>
  );
}

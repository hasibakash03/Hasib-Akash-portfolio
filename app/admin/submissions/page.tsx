"use client";
import { useState, useEffect, useTransition } from "react";
import { getFormSubmissions, updateSubmissionStatus } from "@/lib/actions";
import { AdminCard, PageHeader, StatusBadge } from "@/components/admin/AdminCard";

type Sub = {
  id: number; name: string; email: string; phone?: string | null; businessName: string;
  website?: string | null; revenueRange: string; challenge: string;
  tierInterest: string; status: string; notes?: string | null;
  createdAt: Date | null;
};

const acc = "hsl(275 70% 55%)";

export default function SubmissionsAdmin() {
  const [items, setItems] = useState<Sub[]>([]);
  const [selected, setSelected] = useState<Sub | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => getFormSubmissions().then(r => setItems(r as Sub[]));
  useEffect(() => { load(); }, []);

  const setStatus = (id: number, status: string) => {
    startTransition(async () => {
      await updateSubmissionStatus(id, status);
      load();
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
    });
  };

  const counts = { new: items.filter(i => i.status === "new").length, contacted: items.filter(i => i.status === "contacted").length, closed: items.filter(i => i.status === "closed").length };

  return (
    <div>
      <PageHeader title="Form Submissions" description="Incoming leads from the diagnostic application form." />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[{ label: "New", count: counts.new, color: "hsl(275 70% 55%)" }, { label: "Contacted", count: counts.contacted, color: "hsl(200 60% 45%)" }, { label: "Closed", count: counts.closed, color: "hsl(140 55% 38%)" }].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid hsl(270 20% 90%)", borderRadius: "0.875rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.count}</div>
            <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(270 15% 50%)", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: "1.5rem" }}>
        {/* Table */}
        <AdminCard title={`All Submissions (${items.length})`}>
          {items.length === 0 ? (
            <p style={{ color: "hsl(270 15% 55%)", fontSize: "0.875rem" }}>No submissions yet. When someone fills out the contact form, they'll appear here.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ borderBottom: "2px solid hsl(270 20% 90%)" }}>
                {["Name","Business","Tier","Revenue","Status","Date"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.625rem 0.875rem", fontSize: "0.72rem", fontWeight: 700, color: "hsl(270 15% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {items.map(s => (
                  <tr key={s.id} onClick={() => setSelected(s)} style={{ borderBottom: "1px solid hsl(270 20% 93%)", cursor: "pointer", background: selected?.id === s.id ? "hsl(270 60% 98%)" : "transparent" }}>
                    <td style={{ padding: "0.875rem", fontWeight: 700, fontSize: "0.875rem", color: "hsl(270 20% 12%)" }}>{s.name}</td>
                    <td style={{ padding: "0.875rem", fontSize: "0.85rem", color: "hsl(270 15% 40%)" }}>{s.businessName}</td>
                    <td style={{ padding: "0.875rem" }}>
                      <span style={{ padding: "0.2rem 0.6rem", background: "hsl(270 60% 95%)", color: "hsl(275 70% 40%)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>{s.tierInterest}</span>
                    </td>
                    <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "hsl(270 15% 50%)" }}>{s.revenueRange}</td>
                    <td style={{ padding: "0.875rem" }}><StatusBadge status={s.status} /></td>
                    <td style={{ padding: "0.875rem", fontSize: "0.78rem", color: "hsl(270 15% 55%)" }}>
                      {s.createdAt ? new Date(s.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </AdminCard>

        {/* Detail panel */}
        {selected && (
          <div style={{ background: "white", border: "1px solid hsl(270 20% 90%)", borderRadius: "1rem", padding: "1.5rem", alignSelf: "start", position: "sticky", top: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: 0 }}>Submission Detail</h3>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "hsl(270 15% 55%)" }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
              {[
                { l: "Name", v: selected.name },
                { l: "Email", v: selected.email },
                { l: "Phone", v: selected.phone || "—" },
                { l: "Business", v: selected.businessName },
                { l: "Website", v: selected.website || "—" },
                { l: "Revenue Range", v: selected.revenueRange },
                { l: "Tier Interest", v: selected.tierInterest },
              ].map(({ l, v }) => (
                <div key={l}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "hsl(270 15% 50%)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>{l}</div>
                  <div style={{ fontSize: "0.875rem", color: "hsl(270 20% 15%)", fontWeight: l === "Email" ? 600 : 400 }}>{v}</div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "hsl(270 15% 50%)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Challenge</div>
                <div style={{ fontSize: "0.875rem", color: "hsl(270 20% 20%)", lineHeight: 1.65 }}>{selected.challenge}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Update Status</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["new","contacted","closed"].map(st => (
                  <button key={st} onClick={() => setStatus(selected.id, st)} disabled={isPending} style={{ padding: "0.45rem 0.875rem", background: selected.status === st ? acc : "hsl(270 30% 95%)", color: selected.status === st ? "white" : "hsl(270 15% 40%)", border: "none", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", textTransform: "capitalize" }}>{st}</button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid hsl(270 20% 92%)", display: "flex", gap: "0.625rem" }}>
              <a href={`mailto:${selected.email}?subject=Re: Strategy Diagnostic Application`} style={{ flex: 1, display: "block", textAlign: "center", padding: "0.7rem", background: acc, color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>Email {selected.name.split(" ")[0]}</a>
              {selected.phone && <a href={`https://wa.me/${selected.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{ flex: 1, display: "block", textAlign: "center", padding: "0.7rem", background: "hsl(140 55% 40%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>WhatsApp</a>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

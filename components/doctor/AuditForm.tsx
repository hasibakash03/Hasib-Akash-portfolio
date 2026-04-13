"use client";
import { useState } from "react";
import { submitDoctorAuditForm } from "@/lib/actions";

type FormState = "idle" | "loading" | "success" | "error";

const inp: React.CSSProperties = {
  width: "100%",
  padding: "0.875rem 1.25rem",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "0.75rem",
  color: "white",
  fontFamily: "Urbanist, sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  boxSizing: "border-box",
};

const label: React.CSSProperties = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  marginBottom: "0.5rem",
};

export default function AuditForm() {
  const [st, setSt] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", phone: "", specialty: "", city: "", challenge: "",
  });

  const ch =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSt("loading");
    try {
      await submitDoctorAuditForm(form);
      setSt("success");
    } catch {
      setSt("error");
    }
  };

  /* ── Success state ── */
  if (st === "success") {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "hsl(275 70% 55%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 0 0 8px hsl(275 70% 55% / 0.2)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "white",
            margin: "0 0 0.75rem",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}
        >
          Application received. I&apos;ll be in touch within 24 hours on WhatsApp.
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            margin: "0 0 1.5rem",
          }}
        >
          While you wait — save this number:{" "}
          <a
            href="https://wa.me/8801560036454"
            style={{ color: "hsl(275 70% 78%)", fontWeight: 700, textDecoration: "none" }}
          >
            +8801560036454
          </a>
          . That&apos;s how I&apos;ll reach you.
        </p>
        <a
          href="https://wa.me/8801560036454"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.7rem 1.5rem",
            background: "hsl(140 55% 38%)",
            color: "white",
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Open WhatsApp →
        </a>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* Full Name */}
        <div>
          <label style={label}>Full Name *</label>
          <input
            type="text"
            required
            placeholder="Dr. Your Name"
            value={form.name}
            onChange={ch("name")}
            style={inp}
            onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(275 70% 65%)"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          />
        </div>

        {/* WhatsApp / Phone */}
        <div>
          <label style={label}>WhatsApp / Phone *</label>
          <input
            type="tel"
            required
            placeholder="+880 1X XX XXX XXX"
            value={form.phone}
            onChange={ch("phone")}
            style={inp}
            onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(275 70% 65%)"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          />
        </div>

        {/* Specialty */}
        <div>
          <label style={label}>Specialty *</label>
          <input
            type="text"
            required
            placeholder="e.g. Pediatrics, General Practice, Dermatology"
            value={form.specialty}
            onChange={ch("specialty")}
            style={inp}
            onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(275 70% 65%)"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          />
        </div>

        {/* City / District */}
        <div>
          <label style={label}>City / District *</label>
          <input
            type="text"
            required
            placeholder="e.g. Chittagong, Dhaka, Sylhet"
            value={form.city}
            onChange={ch("city")}
            style={inp}
            onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(275 70% 65%)"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          />
        </div>

        {/* Challenge */}
        <div>
          <label style={label}>Biggest Challenge Right Now *</label>
          <textarea
            required
            rows={4}
            placeholder="Describe what's holding your practice back. Be specific — the more detail you give, the more useful the audit will be."
            value={form.challenge}
            onChange={ch("challenge")}
            style={{ ...inp, resize: "vertical", minHeight: 110 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(275 70% 65%)"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          />
        </div>

        {/* Error message */}
        {st === "error" && (
          <div
            style={{
              padding: "0.875rem 1.1rem",
              background: "rgba(255,80,80,0.12)",
              border: "1px solid rgba(255,80,80,0.3)",
              borderRadius: "0.625rem",
              fontSize: "0.875rem",
              color: "rgba(255,180,180,0.95)",
              lineHeight: 1.6,
            }}
          >
            Something went wrong. Please WhatsApp me directly at{" "}
            <a
              href="https://wa.me/8801560036454"
              style={{ color: "white", fontWeight: 700, textDecoration: "underline" }}
            >
              01560036454
            </a>
            .
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={st === "loading"}
          style={{
            width: "100%",
            padding: "1rem",
            background: st === "loading" ? "hsl(275 70% 45%)" : "hsl(275 70% 55%)",
            color: "white",
            border: "none",
            borderRadius: 9999,
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.01em",
            cursor: st === "loading" ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            boxShadow: "0 4px 18px hsl(275 70% 55% / 0.35)",
          }}
        >
          {st === "loading" ? "Submitting…" : "Submit Application →"}
        </button>

        {/* Micro text */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.32)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          I review every application personally. You&apos;ll hear back within 24 hours.
        </p>
      </div>
    </form>
  );
}

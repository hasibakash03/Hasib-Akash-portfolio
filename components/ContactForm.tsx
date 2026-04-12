"use client";
import { useState } from "react";
import { submitContactFormFull } from "@/lib/actions";

export default function ContactForm({ tier }: { tier?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", business: "", website: "",
    revenue: "", challenge: "", tier: tier || "",
  });

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const sub = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactFormFull({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        businessName: form.business,
        website: form.website || undefined,
        revenueRange: form.revenue,
        challenge: form.challenge,
        tierInterest: form.tier,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
      <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Application received.</h3>
      <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>I review every application personally. You'll hear back within 24 hours.</p>
    </div>
  );

  if (status === "error") return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <p style={{ color: "hsl(0 70% 75%)", marginBottom: "1rem" }}>Something went wrong. Please try again or message on WhatsApp.</p>
      <button onClick={() => setStatus("idle")} style={{ padding: "0.75rem 1.5rem", background: "rgba(255,255,255,0.15)", color: "white", border: "none", borderRadius: "0.625rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif", fontWeight: 600 }}>Try again</button>
    </div>
  );

  return (
    <form onSubmit={sub} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>YOUR NAME *</label>
          <input name="name" value={form.name} onChange={ch} required placeholder="Hasib Akash" className="form-input" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>EMAIL *</label>
          <input name="email" type="email" value={form.email} onChange={ch} required placeholder="you@company.com" className="form-input" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>WHATSAPP / PHONE</label>
          <input name="phone" value={form.phone} onChange={ch} placeholder="+880 1X..." className="form-input" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>BUSINESS NAME *</label>
          <input name="business" value={form.business} onChange={ch} required placeholder="Your Company" className="form-input" />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>BUSINESS WEBSITE</label>
        <input name="website" value={form.website} onChange={ch} placeholder="yoursite.com (optional)" className="form-input" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>MONTHLY REVENUE *</label>
          <select name="revenue" value={form.revenue} onChange={ch} required className="form-input">
            <option value="">Select range...</option>
            <option value="pre">Pre-revenue</option>
            <option value="under1">Under 1 lakh/month</option>
            <option value="1-5">1–5 lakh/month</option>
            <option value="5-20">5–20 lakh/month</option>
            <option value="20-50">20–50 lakh/month</option>
            <option value="50+">50+ lakh/month</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>TIER INTEREST *</label>
          <select name="tier" value={form.tier} onChange={ch} required className="form-input">
            <option value="">Select tier...</option>
            <option value="audit">Cold Client Audit (Free)</option>
            <option value="blueprint">Brand Blueprint (9,900৳)</option>
            <option value="sprint">Cold Client Sprint (19,900৳)</option>
            <option value="fullstack">Full Stack (39,900৳)</option>
          </select>
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>BIGGEST GROWTH CHALLENGE *</label>
        <textarea name="challenge" value={form.challenge} onChange={ch} required
          placeholder="Tell me what's not working and what you've already tried..."
          rows={4} className="form-input" style={{ resize: "vertical" }} />
      </div>
      <button type="submit" disabled={status === "sending"} style={{
        padding: "1rem 2rem", background: status === "sending" ? "rgba(255,255,255,0.2)" : "hsl(275 70% 55%)",
        color: "white", borderRadius: 9999, fontWeight: 700, fontSize: "1rem",
        border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
        fontFamily: "Urbanist,sans-serif", letterSpacing: "0.02em",
      }}>
        {status === "sending" ? "Submitting…" : "Submit Application →"}
      </button>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", margin: 0 }}>
        I review every application personally. You'll hear back within 24 hours.
      </p>
    </form>
  );
}

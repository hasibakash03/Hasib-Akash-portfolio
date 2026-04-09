"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,hsl(270 60% 10%) 0%,hsl(275 65% 20%) 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontWeight: 900, fontSize: "1.3rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "white", marginBottom: "0.5rem" }}>Hasib Akash</div>
          <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>CMS Admin Panel</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "1.25rem", padding: "2.5rem", backdropFilter: "blur(16px)" }}>
          <h1 style={{ color: "white", fontSize: "1.3rem", fontWeight: 800, margin: "0 0 1.75rem", textAlign: "center" }}>Sign in</h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@tradefigur.com" className="form-input" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="form-input" />
            </div>
            {error && <p style={{ color: "hsl(0 70% 70%)", fontSize: "0.85rem", margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ marginTop: "0.5rem", padding: "0.875rem", background: loading ? "rgba(255,255,255,0.2)" : "hsl(275 70% 55%)", color: "white", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Urbanist,sans-serif" }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

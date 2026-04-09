import { auth } from "@/lib/auth";
import Link from "next/link";
import { FileText, FolderOpen, Inbox, Tag, HelpCircle, Settings, ArrowRight } from "lucide-react";

const acc = "hsl(275 70% 55%)";

const quickLinks = [
  { href: "/admin/blog", label: "Blog Posts", desc: "Write and manage articles", icon: FileText, color: "hsl(270 55% 90%)" },
  { href: "/admin/projects", label: "Projects", desc: "Add and edit case studies", icon: FolderOpen, color: "hsl(275 50% 90%)" },
  { href: "/admin/submissions", label: "Form Submissions", desc: "Review incoming leads", icon: Inbox, color: "hsl(280 45% 90%)" },
  { href: "/admin/offers", label: "Offers", desc: "Update consultation tiers", icon: Tag, color: "hsl(265 55% 90%)" },
  { href: "/admin/faq", label: "FAQ", desc: "Edit common questions", icon: HelpCircle, color: "hsl(272 50% 90%)" },
  { href: "/admin/settings", label: "Site Settings", desc: "Global site configuration", icon: Settings, color: "hsl(268 45% 90%)" },
];

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "hsl(270 20% 12%)", margin: "0 0 0.35rem", letterSpacing: "-0.02em" }}>Dashboard</h1>
        <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 50%)", margin: 0 }}>Welcome back. Manage your site content from here.</p>
      </div>

      {/* Setup notice if no DB */}
      <div style={{ background: "hsl(275 70% 97%)", border: "1px solid hsl(275 40% 85%)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(270 60% 35%)", marginBottom: "0.35rem" }}>⚡ Setup Required</div>
        <p style={{ fontSize: "0.85rem", color: "hsl(270 30% 45%)", margin: 0, lineHeight: 1.6 }}>
          Add your <code style={{ background: "hsl(270 40% 93%)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem", fontSize: "0.82rem" }}>DATABASE_URL</code>,{" "}
          <code style={{ background: "hsl(270 40% 93%)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem", fontSize: "0.82rem" }}>NEXTAUTH_SECRET</code>,{" "}
          <code style={{ background: "hsl(270 40% 93%)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem", fontSize: "0.82rem" }}>ADMIN_EMAIL</code>, and{" "}
          <code style={{ background: "hsl(270 40% 93%)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem", fontSize: "0.82rem" }}>ADMIN_PASSWORD</code> environment variables in Vercel, then run{" "}
          <code style={{ background: "hsl(270 40% 93%)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem", fontSize: "0.82rem" }}>npx drizzle-kit push</code> to create database tables.
        </p>
      </div>

      {/* Quick links */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1rem" }}>
        {quickLinks.map(({ href, label, desc, icon: Icon, color }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div style={{ background: "white", border: "1px solid hsl(270 20% 90%)", borderRadius: "1rem", padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = acc; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 30px hsl(270 60% 40%/0.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "hsl(270 20% 90%)"; el.style.transform = ""; el.style.boxShadow = ""; }}
            >
              <div style={{ width: 42, height: 42, borderRadius: "0.625rem", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} style={{ color: "hsl(270 50% 40%)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(270 20% 12%)", marginBottom: "0.2rem" }}>{label}</div>
                <div style={{ fontSize: "0.8rem", color: "hsl(270 15% 50%)" }}>{desc}</div>
              </div>
              <ArrowRight size={14} style={{ color: "hsl(270 15% 65%)", marginTop: 3 }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

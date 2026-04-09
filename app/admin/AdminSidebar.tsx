"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Image, Type, AlignLeft, Layers, List,
  MessageSquare, Star, Zap, FolderOpen, FileText, Tag,
  HelpCircle, Settings, LogOut, Inbox,
} from "lucide-react";

const acc = "hsl(275 70% 55%)";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/submissions", label: "Submissions", icon: Inbox },
    ],
  },
  {
    label: "Homepage",
    items: [
      { href: "/admin/hero", label: "Hero", icon: Image },
      { href: "/admin/logos", label: "Logo Slider", icon: Layers },
      { href: "/admin/problem-cards", label: "Problem Cards", icon: AlignLeft },
      { href: "/admin/insight", label: "Insight Section", icon: Type },
      { href: "/admin/services", label: "Service Cards", icon: Zap },
      { href: "/admin/process", label: "Process Steps", icon: List },
      { href: "/admin/about", label: "About", icon: MessageSquare },
      { href: "/admin/stats", label: "Stats", icon: Tag },
      { href: "/admin/testimonials", label: "Testimonials", icon: Star },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/projects", label: "Projects", icon: FolderOpen },
      { href: "/admin/blog", label: "Blog Posts", icon: FileText },
      { href: "/admin/offers", label: "Offers", icon: Tag },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ position: "fixed", top: 0, left: 0, width: 260, height: "100vh", background: "linear-gradient(180deg,hsl(270 60% 12%) 0%,hsl(275 55% 18%) 100%)", display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto" }}>
      {/* Logo */}
      <div style={{ padding: "1.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontWeight: 900, fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "white" }}>Hasib Akash</div>
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem", fontWeight: 500 }}>CMS Admin Panel</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {navGroups.map(group => (
          <div key={group.label}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", paddingLeft: "0.625rem", marginBottom: "0.4rem" }}>{group.label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {group.items.map(item => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href} style={{
                    display: "flex", alignItems: "center", gap: "0.625rem",
                    padding: "0.55rem 0.75rem", borderRadius: "0.625rem",
                    textDecoration: "none", fontSize: "0.875rem", fontWeight: active ? 700 : 500,
                    color: active ? "white" : "rgba(255,255,255,0.55)",
                    background: active ? "rgba(255,255,255,0.12)" : "transparent",
                    transition: "all 0.15s",
                  }}>
                    <Icon size={15} style={{ color: active ? acc : "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.55rem 0.75rem", borderRadius: "0.625rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.45)", fontFamily: "Urbanist,sans-serif" }}>
          <LogOut size={15} />Sign out
        </button>
      </div>
    </aside>
  );
}

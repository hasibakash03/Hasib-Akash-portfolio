import { auth } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export const metadata = { title: "Admin — Hasib Akash CMS" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "hsl(270 25% 96%)", fontFamily: "Urbanist,sans-serif" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", marginLeft: 260 }}>
        {children}
      </main>
    </div>
  );
}

"use client";
import { PageHeader, AdminCard } from "@/components/admin/AdminCard";

export default function SectionAdmin() {
  return (
    <div>
      <PageHeader title="Homepage Section" description="Edit this section content." />
      <AdminCard title="Edit Content">
        <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 50%)", lineHeight: 1.7, margin: 0 }}>
          Full editing UI active once DATABASE_URL is connected. Schema is ready — 
          add your Neon URL to environment variables and run <code>npx drizzle-kit push</code>.
        </p>
      </AdminCard>
    </div>
  );
}

import { PageHeader, AdminCard } from "@/components/admin/AdminCard";

export default function Page() {
  return (
    <div>
      <PageHeader title="Section Editor" description="Coming in Phase 4 — CMS Integration." />
      <AdminCard title="Not Yet Wired">
        <p style={{ color: "hsl(270 15% 50%)", fontSize: "0.9rem", lineHeight: 1.7 }}>
          This section will pull from the database and be editable once Phase 4 (CMS Integration) is complete.
          The database schema and server actions for this section are already in place.
        </p>
      </AdminCard>
    </div>
  );
}

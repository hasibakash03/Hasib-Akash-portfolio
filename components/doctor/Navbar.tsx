"use client";

export default function DoctorNavbar() {
  const handleAudit = () => {
    document.getElementById("audit-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "#0A1628",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.8rem 1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            fontSize: "1.15rem",
            letterSpacing: "0.04em",
            color: "white",
            userSelect: "none",
          }}
        >
          Hasib Akash
        </span>
        <button
          onClick={handleAudit}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#1D4ED8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#1A56DB"; }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.6rem 1.4rem",
            background: "#1A56DB",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "background 0.2s ease",
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
        >
          Book Free Audit →
        </button>
      </nav>
    </header>
  );
}

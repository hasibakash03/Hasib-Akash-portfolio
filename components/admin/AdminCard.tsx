"use client";
import React from "react";

const acc = "hsl(275 70% 55%)";

export function AdminCard({ children, title, description }: {
  children: React.ReactNode; title: string; description?: string;
}) {
  return (
    <div style={{ background: "white", border: "1px solid hsl(270 20% 90%)", borderRadius: "1rem", padding: "1.75rem", marginBottom: "1.5rem" }}>
      <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid hsl(270 20% 93%)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: "0 0 0.2rem" }}>{title}</h2>
        {description && <p style={{ fontSize: "0.82rem", color: "hsl(270 15% 50%)", margin: 0 }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", border: "1px solid hsl(270 20% 85%)",
  borderRadius: "0.625rem", fontSize: "0.9rem", fontFamily: "Urbanist,sans-serif",
  outline: "none", color: "hsl(270 20% 12%)", background: "white", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)",
  marginBottom: "0.4rem", letterSpacing: "0.05em", textTransform: "uppercase",
};

export function AdminInput({ label, name, value, onChange, type = "text", required, placeholder, rows }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string; required?: boolean; placeholder?: string; rows?: number;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={labelStyle}>{label}{required && " *"}</label>
      {rows ? (
        <textarea name={name} value={value} onChange={onChange} required={required}
          placeholder={placeholder} rows={rows} style={{ ...inputStyle, resize: "vertical" }} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange}
          required={required} placeholder={placeholder} style={inputStyle} />
      )}
    </div>
  );
}

export function AdminSelect({ label, name, value, onChange, options }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={labelStyle}>{label}</label>
      <select name={name} value={value} onChange={onChange}
        style={{ ...inputStyle, cursor: "pointer" }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function AdminToggle({ label, checked, onChange, name }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; name: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
      <button type="button" onClick={() => onChange(!checked)} style={{
        width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
        background: checked ? acc : "hsl(270 20% 82%)", position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}>
        <span style={{
          position: "absolute", top: 3, left: checked ? 23 : 3, width: 18, height: 18,
          borderRadius: "50%", background: "white", transition: "left 0.2s",
        }} />
      </button>
      <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(270 20% 25%)", cursor: "pointer" }}
        onClick={() => onChange(!checked)}>{label}</label>
    </div>
  );
}

export function SaveButton({ loading, label = "Save Changes" }: { loading: boolean; label?: string }) {
  return (
    <button type="submit" disabled={loading} style={{
      padding: "0.75rem 2rem", background: loading ? "hsl(270 20% 80%)" : acc,
      color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.9rem",
      border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Urbanist,sans-serif",
    }}>
      {loading ? "Saving…" : label}
    </button>
  );
}

export function DeleteButton({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={loading} style={{
      padding: "0.5rem 1rem", background: "hsl(0 60% 96%)", color: "hsl(0 65% 45%)",
      border: "1px solid hsl(0 50% 88%)", borderRadius: "0.5rem", fontWeight: 700,
      fontSize: "0.82rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif",
    }}>
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}

export function SaveToast({ message }: { message: string }) {
  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem", background: "hsl(270 60% 20%)",
      color: "white", padding: "0.875rem 1.5rem", borderRadius: "0.75rem",
      fontSize: "0.875rem", fontWeight: 600, zIndex: 1000,
      boxShadow: "0 8px 30px hsl(270 60% 20%/0.4)",
    }}>
      ✓ {message}
    </div>
  );
}

export function PageHeader({ title, description, action }: {
  title: string; description?: string; action?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
      <div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "hsl(270 20% 12%)", margin: "0 0 0.25rem", letterSpacing: "-0.02em" }}>{title}</h1>
        {description && <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 50%)", margin: 0 }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    new:       { bg: "hsl(275 70% 94%)", color: "hsl(275 70% 40%)" },
    contacted: { bg: "hsl(200 60% 92%)", color: "hsl(200 70% 30%)" },
    closed:    { bg: "hsl(140 50% 90%)", color: "hsl(140 60% 28%)" },
    published: { bg: "hsl(140 50% 90%)", color: "hsl(140 60% 28%)" },
    draft:     { bg: "hsl(35 80% 93%)",  color: "hsl(35 70% 35%)" },
  };
  const c = colors[status] || { bg: "hsl(270 20% 90%)", color: "hsl(270 20% 40%)" };
  return (
    <span style={{
      padding: "0.2rem 0.65rem", background: c.bg, color: c.color,
      borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.06em",
    }}>{status}</span>
  );
}

export function TableRow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <tr style={{ borderBottom: "1px solid hsl(270 20% 93%)", ...style }}>
      {children}
    </tr>
  );
}

export function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: "1rem 0.875rem", fontSize: "0.875rem", color: "hsl(270 15% 30%)", verticalAlign: "middle", ...style }}>
      {children}
    </td>
  );
}

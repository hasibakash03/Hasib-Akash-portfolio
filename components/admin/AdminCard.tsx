"use client";
import React from "react";

export function AdminCard({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) {
  return (
    <div style={{ background: "white", border: "1px solid hsl(270 20% 90%)", borderRadius: "1rem", padding: "1.75rem", marginBottom: "1.5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: "0 0 0.2rem" }}>{title}</h2>
        {description && <p style={{ fontSize: "0.82rem", color: "hsl(270 15% 50%)", margin: 0 }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", border: "1px solid hsl(270 20% 85%)", borderRadius: "0.625rem",
  fontSize: "0.9rem", fontFamily: "Urbanist,sans-serif", outline: "none", color: "hsl(270 20% 12%)",
  background: "white", boxSizing: "border-box",
};

export function AdminInput({ label, name, value, onChange, type = "text", required, placeholder, rows }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string; required?: boolean; placeholder?: string; rows?: number;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", marginBottom: "0.4rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}{required && " *"}
      </label>
      {rows ? (
        <textarea name={name} value={value} onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          required={required} placeholder={placeholder} rows={rows}
          style={{ ...inputStyle, resize: "vertical" }} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
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
      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "hsl(270 15% 45%)", marginBottom: "0.4rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</label>
      <select name={name} value={value} onChange={onChange} style={{ ...inputStyle }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function SaveButton({ loading, label = "Save Changes" }: { loading?: boolean; label?: string }) {
  return (
    <button type="submit" disabled={loading} style={{ padding: "0.75rem 2rem", background: loading ? "hsl(270 20% 80%)" : "hsl(275 70% 55%)", color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Urbanist,sans-serif" }}>
      {loading ? "Saving..." : label}
    </button>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
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
  const colors: Record<string, string> = { new: "hsl(275 70% 55%)", contacted: "hsl(200 70% 45%)", closed: "hsl(140 60% 40%)" };
  return (
    <span style={{ padding: "0.2rem 0.65rem", background: colors[status] ?? "hsl(270 20% 75%)", color: "white", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {status}
    </span>
  );
}

export function DeleteButton({ onDelete, label = "Delete" }: { onDelete: () => void; label?: string }) {
  return (
    <button type="button" onClick={onDelete}
      style={{ padding: "0.5rem 1rem", background: "hsl(0 60% 96%)", color: "hsl(0 65% 45%)", border: "1px solid hsl(0 50% 88%)", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", fontFamily: "Urbanist,sans-serif" }}>
      {label}
    </button>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
      <button type="button" onClick={() => onChange(!checked)} style={{
        width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
        background: checked ? "hsl(275 70% 55%)" : "hsl(270 20% 82%)",
        position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}>
        <span style={{
          position: "absolute", top: 3, left: checked ? 23 : 3, width: 18, height: 18,
          borderRadius: "50%", background: "white", transition: "left 0.2s",
        }} />
      </button>
      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(270 20% 20%)" }}>{label}</span>
    </div>
  );
}

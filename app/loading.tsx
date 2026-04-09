export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(270 30% 98%)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid hsl(270 20% 88%)", borderTopColor: "hsl(275 70% 55%)", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 55%)", fontFamily: "Urbanist, sans-serif", margin: 0 }}>Loading…</p>
      </div>
    </div>
  );
}

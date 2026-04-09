"use client";
const LOGOS = ["MotoVessel","TradeFigur","DES — IIUC","BrandCo","StartupBD","NextGen","MarketEdge","BuildRight","VentureHub","FounderHub"];
export default function LogoSlider() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div className="marquee-track" style={{ display: "flex", gap: "2.5rem", width: "max-content" }}>
        {doubled.map((name, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.65rem 1.75rem", borderRadius: "0.5rem", border: "1px solid hsl(270 20% 88%)", background: "white", whiteSpace: "nowrap", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(270 15% 55%)", flexShrink: 0 }}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

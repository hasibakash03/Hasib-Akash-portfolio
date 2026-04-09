import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Most businesses don't have a marketing problem. They have a strategy problem.";
  const type = searchParams.get("type") || "home";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0f0520 0%, #1a0a35 60%, #2a1450 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,63,190,0.3) 0%, transparent 70%)" }} />

        {/* Top — eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            padding: "8px 20px", borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.07)",
            fontSize: 14, fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "rgba(180,140,230,0.9)",
            display: "flex",
          }}>
            {type === "blog" ? "Brand Strategy Insight" : type === "project" ? "Case Study" : "Brand Strategist · Chattogram, Bangladesh"}
          </div>
        </div>

        {/* Middle — title */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "40px 0" }}>
          <h1 style={{
            fontSize: title.length > 60 ? 48 : 58,
            fontWeight: 900, color: "white", margin: 0,
            lineHeight: 1.1, letterSpacing: "-0.02em",
            maxWidth: 900,
          }}>
            {title.length > 80 ? title.substring(0, 80) + "…" : title}
          </h1>
        </div>

        {/* Bottom — brand */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Hasib Akash
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
              hasibakash.vercel.app
            </div>
          </div>
          <div style={{
            padding: "12px 24px", background: "hsl(275, 70%, 55%)",
            borderRadius: 9999, fontSize: 15, fontWeight: 700, color: "white", display: "flex",
          }}>
            Strategy-First Consulting →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

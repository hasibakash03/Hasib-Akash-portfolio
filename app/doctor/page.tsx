import type { Metadata } from "next";
import DoctorNavbar from "@/components/doctor/Navbar";

export const metadata: Metadata = {
  title: "Personal Brand Strategy for Doctors | Hasib Akash",
  description:
    "I help established doctors in Bangladesh build a personal brand that makes them the obvious choice — before a patient ever books an appointment. No paid ads. No content agency. Strategy first.",
  openGraph: {
    title: "Personal Brand Strategy for Doctors — Hasib Akash",
    description:
      "Stop being the best-kept secret. Build the brand that makes patients remember your name before they ever search for a doctor.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function DoctorPage() {
  return (
    <>
      {/* ── Page-scoped styles ─────────────────────────────── */}
      <style>{`
        @keyframes doc-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50%       { transform: translateX(-50%) translateY(9px); opacity: 1; }
        }
        .doc-scroll-indicator {
          animation: doc-bounce 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .doc-cta-btn:hover {
          background: hsl(275 70% 48%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px hsl(275 70% 55% / 0.45) !important;
        }
        .doc-cta-btn:active {
          transform: translateY(0) !important;
        }
      `}</style>

      <DoctorNavbar />

      <main>
        {/* ══════════════════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "hsl(270 60% 6%)",
            padding: "9rem 1.5rem 6rem",
          }}
        >
          {/* Deep radial glow — purple bloom behind content */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 90% 65% at 50% 42%, hsl(275 70% 28% / 0.42) 0%, transparent 68%)",
              pointerEvents: "none",
            }}
          />
          {/* Secondary accent glow — bottom-left */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "-5%",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, hsl(275 70% 55% / 0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Subtle dot-grid texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              pointerEvents: "none",
            }}
          />

          {/* ── Hero content ── */}
          <div
            style={{
              maxWidth: 800,
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Eyebrow */}
            <p
              className="hero-eyebrow"
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "hsl(275 70% 78%)",
                margin: "0 0 1.5rem",
              }}
            >
              For established doctors in Bangladesh
            </p>

            {/* H1 */}
            <h1
              className="hero-h1"
              style={{
                fontSize: "clamp(2.1rem, 5.5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "white",
                margin: "0 0 1.75rem",
              }}
            >
              Patients don&apos;t find the best doctor.{" "}
              <span
                style={{
                  color: "hsl(275 70% 76%)",
                  display: "inline",
                }}
              >
                They remember a familiar name.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="hero-sub"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.85,
                margin: "0 0 2.75rem",
                maxWidth: 620,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              I help established doctors in Bangladesh build a personal brand
              that makes them the obvious choice — before a patient ever books
              an appointment.{" "}
              <span style={{ color: "rgba(255,255,255,0.35)" }}>
                No paid ads. No content agency. Strategy first.
              </span>
            </p>

            {/* CTA group */}
            <div
              className="hero-cta"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <a
                href="#audit-form"
                className="doc-cta-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.9rem 2rem",
                  background: "hsl(275 70% 55%)",
                  color: "white",
                  borderRadius: 9999,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 18px hsl(275 70% 55% / 0.35)",
                  transition:
                    "background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease",
                }}
              >
                Book Your Free Audit →
              </a>

              {/* Micro reassurance text */}
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.32)",
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: "0.03em",
                }}
              >
                Free 30-minute call. No pitch. No obligation.
              </p>
            </div>
          </div>

          {/* ── Scroll indicator ── */}
          <div
            className="doc-scroll-indicator"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "2.25rem",
              left: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {/* Chevron down shape */}
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L10 10L19 1"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* ── Future sections will be added below this comment ── */}
        {/* id="audit-form" will be placed on the contact/booking section */}
      </main>
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const BASE_URL = process.env.NEXTAUTH_URL || "https://hasibakash.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5B2D8E",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hasib Akash — Brand Strategist & Growth Consultant",
    template: "%s — Hasib Akash",
  },
  description:
    "Brand strategist from Chattogram, Bangladesh. I help founders build brands that actually convert — through positioning, offer design, and strategic clarity.",
  keywords: [
    "brand strategy Bangladesh",
    "brand strategist Chittagong",
    "brand consultant Bangladesh",
    "positioning strategy",
    "TradeFigur",
    "Hasib Akash",
    "growth consultant Bangladesh",
    "business strategy Chittagong",
  ],
  authors: [{ name: "Hasib Akash", url: BASE_URL }],
  creator: "Hasib Akash",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Hasib Akash",
    title: "Hasib Akash — Brand Strategist & Growth Consultant",
    description:
      "Strategy-first consulting for founders who want to stop guessing. Based in Chattogram, Bangladesh.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Hasib Akash — Brand Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasib Akash — Brand Strategist & Growth Consultant",
    description: "Strategy-first consulting for founders who want to stop guessing.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@hasibakash",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

// Organization JSON-LD
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hasib Akash",
  url: BASE_URL,
  jobTitle: "Brand Strategist & Growth Consultant",
  worksFor: {
    "@type": "Organization",
    name: "TradeFigur",
    url: "https://tradefigur.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chattogram",
    addressCountry: "BD",
  },
  sameAs: [
    "https://tradefigur.com",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Urbanist — subset to latin, display=swap for performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap&subset=latin"
          rel="stylesheet"
        />
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

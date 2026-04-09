import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hasib Akash — Brand Strategist & Growth Consultant",
  description: "I help founders and businesses in Bangladesh build brands that actually convert — through positioning, offer design, and strategic clarity.",
  openGraph: {
    title: "Hasib Akash — Brand Strategist",
    description: "Strategy-first consulting for founders who want to stop guessing.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

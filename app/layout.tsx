import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CursorDot from "./components/CursorDot";

// One typeface across the whole site: Bricolage Grotesque (variable). It runs
// light in the hero; globals.css aliases --font-body to it so body and UI match.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});

const SITE = "https://www.krmzov.com";

// Outcome-led, niche-named, no job title (DESIGN.md voice rule).
const TITLE =
  "Gjorgi Krmzov. Automated account management systems for agencies";
const DESCRIPTION =
  "I automate the boring work agencies still do by hand. 15 systems, 50+ hours a week back. n8n + Claude.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s, Gjorgi Krmzov",
  },
  description: DESCRIPTION,
  keywords: [
    "AI automation",
    "agency automation",
    "n8n",
    "workflow automation",
    "Gjorgi Krmzov",
  ],
  authors: [{ name: "Gjorgi Krmzov" }],
  creator: "Gjorgi Krmzov",
  // Homepage only. /work/[slug] pages set their own canonical in
  // generateMetadata, otherwise this would be inherited (shallow merge).
  alternates: { canonical: "/" },
  // og/twitter images come from app/opengraph-image.tsx (1200x630, generated
  // at build); listing /gjorgi.png here too would emit duplicate image tags.
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Gjorgi Krmzov",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <CursorDot />
        <Analytics />
      </body>
    </html>
  );
}

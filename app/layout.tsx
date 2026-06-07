import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

// One typeface across the whole site: Bricolage Grotesque (variable). It runs
// light in the hero; globals.css aliases --font-body to it so body and UI match.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});

// TODO: swap for the real domain once chosen.
const SITE = "https://gjorgikrmzov.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Gjorgi Krmzov",
    template: "%s, Gjorgi Krmzov",
  },
  description:
    "I remove the manual work inside SEO agencies, so the same team handles more clients without new hires. Systems live in 14 days. You pay when it saves you hours.",
  keywords: [
    "AI automation",
    "SEO agency automation",
    "n8n",
    "workflow automation",
    "Gjorgi Krmzov",
  ],
  authors: [{ name: "Gjorgi Krmzov" }],
  creator: "Gjorgi Krmzov",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Gjorgi Krmzov",
    title: "Gjorgi Krmzov, Automation for SEO Agencies",
    description:
      "I remove the manual work inside SEO agencies. Systems live in 14 days. You pay when it saves you hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gjorgi Krmzov, Automation for SEO Agencies",
    description:
      "I remove the manual work inside SEO agencies. Systems live in 14 days. You pay when it saves you hours.",
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
      </body>
    </html>
  );
}

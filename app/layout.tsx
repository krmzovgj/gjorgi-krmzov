import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Gjorgi Krmzov, AI & Automation Engineer",
    template: "%s, Gjorgi Krmzov",
  },
  description: "I build automated systems that remove the manual work.",
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
    title: "Gjorgi Krmzov, AI & Automation Engineer",
    description:
      "I build automated systems that remove the manual work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gjorgi Krmzov, AI & Automation Engineer",
    description:
      "I build automated systems that remove the manual work.",
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
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Header from "../components/Header";
import AutomateFirst from "../components/AutomateFirst";
import Footer from "../components/Footer";

// The triage also lives inline on the homepage (#what-first). This page stays
// because it is linked from LinkedIn, and it renders the same component so
// there is only ever one of it to maintain.

const description =
  "Put in last month's demo requests and how many booked a call, and see what the ones that never booked are worth. Self serve, no email required.";

export const metadata: Metadata = {
  // Stated, not asked: the root layout's title.template appends ", Gjorgi
  // Krmzov" after this, and the h1's question mark would land as "call?,
  // Gjorgi". The og/twitter titles below stand alone, so they keep the question.
  title: "Demo requests that never booked a call",
  description,
  alternates: { canonical: "/hours" },
  openGraph: {
    type: "website",
    url: "/hours",
    siteName: "Gjorgi Krmzov",
    title: "How many of last month's demo requests never booked a call?",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "How many of last month's demo requests never booked a call?",
    description,
  },
};

export default function HoursPage() {
  return (
    <>
      <Header brandHref="/" />
      <main>
        <AutomateFirst standalone />
      </main>
      <Footer />
    </>
  );
}

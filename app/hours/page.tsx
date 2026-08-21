import type { Metadata } from "next";
import Header from "../components/Header";
import HoursCalculator from "../components/HoursCalculator";
import Footer from "../components/Footer";

// The calculator also lives inline on the homepage (#calculator). This page
// stays because it is linked from LinkedIn, and it renders the same component
// so there is only ever one calculator to maintain.

const description =
  "Add up the work your team still does by hand and see what it costs you a year. Self serve, no email required.";

export const metadata: Metadata = {
  // No trailing period: the root layout's title.template appends ", Gjorgi
  // Krmzov" after this, and a period there reads as a typo ("costs., Gjorgi").
  title: "What doing it by hand costs",
  description,
  alternates: { canonical: "/hours" },
  openGraph: {
    type: "website",
    url: "/hours",
    siteName: "Gjorgi Krmzov",
    title: "What doing it by hand costs.",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "What doing it by hand costs.",
    description,
  },
};

export default function HoursPage() {
  return (
    <>
      <Header brandHref="/" />
      <main>
        <HoursCalculator standalone />
      </main>
      <Footer />
    </>
  );
}

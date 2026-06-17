import type { Metadata } from "next";
import Header from "../components/Header";
import HoursCalculator from "../components/HoursCalculator";

const description =
  "Add the repetitive work your team does each week and watch what it costs you per year. A self-serve Hours Audit. No email required.";

export const metadata: Metadata = {
  title: "See where your hours go",
  description,
  alternates: { canonical: "/hours" },
  openGraph: {
    type: "website",
    url: "/hours",
    siteName: "Gjorgi Krmzov",
    title: "See where your hours go",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "See where your hours go",
    description,
  },
};

export default function HoursPage() {
  return (
    <>
      <Header brandHref="/" />
      <HoursCalculator />
    </>
  );
}

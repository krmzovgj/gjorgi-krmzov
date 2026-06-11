import type { ReactNode } from "react";
import Header from "../components/Header";

// Case studies previously rendered with no nav at all: no way home and no way
// to book. Brand-only nav here; the booking CTA sits in the case-study panel.
export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header brandHref="/" actions={false} />
      {children}
    </>
  );
}

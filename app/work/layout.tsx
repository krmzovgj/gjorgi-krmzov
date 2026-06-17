import type { ReactNode } from "react";

// Case studies render chrome-free: no nav, no brand mark. The only way out is
// the Close button in the case-study panel, which routes back to /#work.
export default function WorkLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

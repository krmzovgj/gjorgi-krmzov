import Reveal from "./Reveal";
import Words from "./Words";

// Controlled line breaks, same "kinetic value lines" pattern as the rest of
// the section: each entry is one authored line, not a paragraph left for the
// browser to wrap (that produced ragged, orphaned line ends). Break points
// are chosen to keep every line's length close (44-58 chars), not just to
// maximize width - a few very long lines next to a couple of short ones
// read as uneven even if none of them wrap badly.
const LINES = [
  "Pulling reports, chasing follow ups, moving data",
  "between tools. That work costs you payroll and clients.",
  "Before anything gets built, you see the math, what the",
  "system replaces, what it returns, and when it",
  "covers its cost. If it doesn't add up, I tell you.",
];

// The problem (first two lines) stays dimmed; the promise (last three) reads
// at full strength.
const DIM_COUNT = 2;

export default function Statement() {
  return (
    <section className="section wrap statement-sec">
      <div className="statement">
        {LINES.map((line, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p style={i < DIM_COUNT ? { color: "var(--text-dim)" } : undefined}>
              <Words text={line} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

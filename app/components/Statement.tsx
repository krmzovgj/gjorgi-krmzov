import Reveal from "./Reveal";
import Words from "./Words";

// Controlled line breaks, same "kinetic value lines" pattern as the rest of
// the section: each entry is one authored line, not a paragraph left for the
// browser to wrap (that produced ragged, orphaned line ends). Break points
// are chosen to keep every line's length close (44-58 chars), not just to
// maximize width - a few very long lines next to a couple of short ones
// read as uneven even if none of them wrap badly.
const LINES = [
  "Someone on your team spends their week pulling reports,",
  "chasing follow ups, and moving data between tools.",
  "Every new client adds 15 to 20 hours of that every",
  "month, and none of it lands on an invoice.",
  "I build systems that do the work instead, so the",
  "next client doesn't force the next hire.",
];

// The problem (first four lines) stays dimmed; the payoff (last two) reads
// at full strength.
const DIM_COUNT = 4;

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

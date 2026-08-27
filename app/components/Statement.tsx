import Reveal from "./Reveal";
import Words from "./Words";

// Two blocks: the problem (dimmed) and the promise (full strength).
//
// Each block's lines are authored break points, not sentences - chosen to keep
// every line's length close (44-58 chars) so the block reads even rather than
// ragged. Those breaks only hold at desktop widths; on a phone a 50-char line
// wraps anyway and strands one or two words on a line of its own. So on
// narrow screens the breaks are dropped (globals.css) and the text reflows as
// normal prose, which fills every line.
const BLOCKS: { dim: boolean; lines: string[] }[] = [
  {
    dim: true,
    lines: [
      "Onboarding new clients, chasing follow ups, the monthly",
      "report. That work costs you margin and clients.",
    ],
  },
  {
    dim: false,
    lines: [
      "Before anything gets built, you see the math, what",
      "the system replaces and what that job is costing",
      "you a year. If it doesn't add up, I tell you.",
    ],
  },
];

export default function Statement() {
  return (
    <section className="section wrap statement-sec">
      <div className="statement">
        {BLOCKS.map((block, i) => (
          <Reveal className="statement__block" key={i} delay={i * 0.08}>
            <p style={block.dim ? { color: "var(--text-dim)" } : undefined}>
              {block.lines.map((line, j) => (
                // The trailing space is collapsed while these are block-level
                // and separates the words once they go inline on mobile.
                <span className="statement__line" key={j}>
                  <Words text={line} />{" "}
                </span>
              ))}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

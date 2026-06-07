import Reveal from "./Reveal";
import Words from "./Words";

const LINES = [
  "Every new client adds manual work.",
  "So you hire, and your margins thin.",
  "I build systems that do the work instead.",
  "Your team takes on more.",
];

export default function Statement() {
  return (
    <section className="section wrap statement-sec">
      <div className="statement">
        {LINES.map((line, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p style={i < LINES.length - 1 ? { color: "var(--text-dim)" } : undefined}>
              <Words text={line} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

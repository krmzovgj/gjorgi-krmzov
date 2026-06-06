import Reveal from "./Reveal";
import Words from "./Words";

const LINES = [
  "It is never just one task.",
  "The hours pile up.",
  "Your best people do work no one bills for.",
  "I find that work and remove it.",
];

export default function Statement() {
  return (
    <section className="section wrap">
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

import Reveal from "./Reveal";
import Words from "./Words";

const LINES = [
  "Every new client adds more manual work for the same team.",
  "Do enough of it and you hire, or the team burns out.",
  "I build the systems that quietly do that work for you.",
  "So the same team can take on more clients without hiring.",
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

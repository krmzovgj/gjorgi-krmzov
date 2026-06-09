import Reveal from "./Reveal";
import Words from "./Words";

const LINES = [
  "Every new client adds 15 to 20 hours of work nobody bills.",
  "Do enough of it and you either hire or the team burns out.",
  "I build the system that does that work instead.",
  "So the same team takes on more clients without hiring.",
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

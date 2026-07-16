import Reveal from "./Reveal";
import Words from "./Words";

const LINES = [
  "Someone on your team spends their week pulling reports, chasing follow ups, and moving data between tools. Every new client adds 15 to 20 hours of that every month, and none of it lands on an invoice.",
  "I build systems that do the work instead, so the next client doesn't force the next hire.",
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

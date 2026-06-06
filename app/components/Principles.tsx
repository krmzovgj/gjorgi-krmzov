import Reveal from "./Reveal";
import Words from "./Words";

const PRINCIPLES = [
  "If you can't measure it, don't ship it.",
  "Boring fix, but it works.",
  "A working system beats a strategy deck.",
  "You pay when it saves you hours. Not before.",
];

export default function Principles() {
  return (
    <section className="section wrap" id="approach">
      <div className="section__head">
        <h2 className="section__title">How I work</h2>
      </div>

      <div>
        {PRINCIPLES.map((p, i) => (
          <Reveal key={i} delay={i * 0.06} className="principle">
            <span className="principle__num">{String(i + 1).padStart(2, "0")}</span>
            <p className="principle__text">
              <Words text={p} />
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

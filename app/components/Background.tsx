import Reveal from "./Reveal";
import Words from "./Words";

const STATS = [
  { n: "15", s: "Systems shipped in 4 months" },
  { n: "10+", s: "Hours a week gone on one system alone" },
  { n: "$24k+", s: "A year in link budget saved" },
  { n: "$0", s: "Upfront. You pay when it saves you hours" },
];

export default function Background() {
  return (
    <section className="section wrap" id="about">
      <div className="section__head">
        <h2 className="section__title">The background</h2>
      </div>

      <div className="about">
        <Reveal>
          <p className="about__lead">
            <Words text="A working system, not a strategy deck." />
          </p>
          <p
            className="about__note"
            style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            I build and run automation inside US SEO agencies. I find the manual
            work that piles up with every new client, and I remove it. You get a
            system your team uses, live in 14 days.
          </p>
        </Reveal>

        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.s} delay={i * 0.08} className="stat">
              <div className="stat__num">{s.n}</div>
              <div className="stat__label">{s.s}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    l: "Call",
    d: "A 30 minute call. You show me the manual work. I tell you what is automatable.",
  },
  {
    n: "02",
    l: "Scope",
    d: "We agree what the system does and when it is accepted. Written down before I build.",
  },
  { n: "03", l: "Build", d: "First working version in 7 days. Live in 14." },
  {
    n: "04",
    l: "Live",
    d: "It runs unattended. You pay when it saves you the hours we agreed on.",
  },
];

export default function Process() {
  return (
    <section className="section wrap" id="process">
      <div className="section__head">
        <h2 className="section__title">The process</h2>
      </div>

      <div className="bento" data-n="4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className="bcard bcard--step">
            <span className="bcard__step">{s.n}</span>
            <div className="bcard__top">
              <h3 className="bcard__name">{s.l}</h3>
              <p className="bcard__text">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

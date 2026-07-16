"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    n: "01",
    l: "Call",
    d: "30 minutes. You show me the manual work, I tell you what's automatable.",
  },
  {
    n: "02",
    l: "Scope",
    d: "We agree what the system does and what counts as done, written down before I build.",
  },
  { n: "03", l: "Build", d: "First working version in 7 days. Live in 14." },
  {
    n: "04",
    l: "Live",
    d: "It runs on its own. First 30 days, anything that breaks is mine to fix.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section wrap" id="process">
      <Reveal>
        <h2 className="section__title process__title">The Process</h2>
      </Reveal>

      <div className="timeline" ref={ref}>
        {STEPS.map((s, i) => (
          <div className="tstep" key={s.n}>
            {/* the rule draws left to right as the section enters */}
            <motion.span
              className="tstep__rule"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            />
            {/* IMPORTANT: this row must NOT have a transform/opacity of its own.
                Either one creates a stacking context that isolates the children's
                mix-blend, so the type would blend against the row's transparent
                backdrop and render white. Keep it a plain static element; the
                drawing rules above are the entry animation. */}
            <div className="tstep__row">
              {/* dark bar wipes in on hover; the type inverts over it */}
              <span className="tstep__fill" aria-hidden="true" />
              <span className="tstep__num">{s.n}</span>
              <h3 className="tstep__label">{s.l}</h3>
              <p className="tstep__desc">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, HandWaving } from "@phosphor-icons/react";
import { AUDIT_URL, withUtm } from "../config";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = "I build automated speed to lead systems for B2B SaaS.";

// Two sets of controlled line breaks for the same sentence, one shown at a
// time (globals.css). Wide lines hold one idea each: who builds it, what it
// is, who it's for. Narrow lines are shorter, which is what lets the phone
// size step up: at the wide breaks the longest line would nearly fill a 390px
// screen, so the type could not grow there without clipping.
type Segment = { text: string; emph?: boolean };

const WIDE: Segment[][] = [
  [{ text: "I build automated" }],
  [{ text: "speed to lead systems" }],
  [{ text: "for " }, { text: "B2B SaaS.", emph: true }],
];

const NARROW: Segment[][] = [
  [{ text: "I build" }],
  [{ text: "automated speed" }],
  [{ text: "to lead systems" }],
  [{ text: "for " }, { text: "B2B SaaS.", emph: true }],
];

// Each line is masked (overflow: hidden) and rises into place, staggered.
function renderLines(lines: Segment[][], yHidden: number | string) {
  return lines.map((segments, i) => (
    <span className="hero__line" key={i} aria-hidden="true">
      <motion.span
        initial={{ y: yHidden }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.06 }}
      >
        {segments.map((s, j) =>
          s.emph ? (
            <span className="hero__highlight" key={j}>
              {s.text}
            </span>
          ) : (
            s.text
          )
        )}
      </motion.span>
      {/* Lines are separate block elements, so without this the extracted text
          fuses them: "I build automatedspeed to leadsystems". That fused
          string was what Google was quoting in the search snippet. The space is
          collapsed visually because .hero__line is display: block. */}
      {" "}
    </span>
  ));
}

export default function Hero() {
  const reduce = useReducedMotion();
  // line-height is 0.6, so the glyphs are ~1.2em tall and overflow their line
  // box. The hidden offset must exceed the glyph height (not just the line box)
  // or their tops peek above the mask before the rise. ~240% clears them fully.
  const yHidden = reduce ? 0 : "240%";

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <motion.p className="hero__greeting" {...fadeUp(0.1)}>
          <span>
            {"I'm Gjorgi Krmzov"}
            {/* The accent's one small mark in the hero. */}
            <HandWaving className="hero__wave" size="1.1em" weight="duotone" aria-hidden="true" />
          </span>
        </motion.p>

        {/* The h1 carries the whole sentence for screen readers; both visual
            line sets are aria-hidden, so rendering two of them costs nothing
            in the accessibility tree. */}
        <h1 className="hero__title" aria-label={HEADLINE}>
          <span className="hero__lines hero__lines--wide">
            {renderLines(WIDE, yHidden)}
          </span>
          <span className="hero__lines hero__lines--narrow">
            {renderLines(NARROW, yHidden)}
          </span>
        </h1>

        {/* One row of actions that fades in as one: the button, then the
            call link. On phones the row wraps and the link sits under the
            button, both centred. */}
        <motion.div className="hero__foot" {...fadeUp(0.3)}>
          <a className="btn" href="#how" data-cursor="Start here">
            See how it works
            <ArrowRight size={16} weight="bold" />
          </a>
          <p className="hero__audit">
            <a
              href={withUtm(AUDIT_URL, "hero-audit")}
              target="_blank"
              rel="noopener"
              data-cursor="Let's talk"
            >
              Or book a 15 minute call
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { DoodleArrow } from "./Doodles";
import { AUDIT_URL, withUtm } from "../config";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = "I build automated account management systems for agencies.";

// Two sets of controlled line breaks for the same sentence, one shown at a
// time (globals.css). Wide lines run long enough to cross the portrait on
// purpose. Narrow lines are shorter, which is what lets the phone size step
// up: at the wide breaks the longest line nearly fills a 390px screen, so the
// type could not grow there without clipping.
type Segment = { text: string; emph?: boolean };

const WIDE: Segment[][] = [
  [{ text: "I build automated" }],
  [{ text: "account management" }],
  [{ text: "systems for " }, { text: "agencies.", emph: true }],
];

const NARROW: Segment[][] = [
  [{ text: "I build" }],
  [{ text: "automated account" }],
  [{ text: "management systems" }],
  [{ text: "for " }, { text: "agencies.", emph: true }],
];

// Each line is masked (overflow: hidden) and rises into place, staggered.
function renderLines(lines: Segment[][], yHidden: number | string) {
  return lines.map((segments, i) => (
    <span className="hero__line" key={i} aria-hidden="true">
      <motion.span
        initial={{ y: yHidden }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.5 + i * 0.08 }}
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
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section className="hero" id="top">
      {/* Morphs in (blur + scale + opacity, no rotation) only after the text
          has fully settled. */}
      <motion.img
        className="hero__portrait"
        src="/gjorgi.png"
        alt="Gjorgi Krmzov"
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 1.06, filter: "blur(26px)" }
        }
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: reduce ? 0.5 : 0.9, ease: EASE, delay: 0.1 }}
      />

      <div className="hero__content">
        <motion.p className="hero__greeting" {...fadeUp(0.4)}>
          <span>
            Hey,
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wave.svg" alt="" aria-hidden="true" className="hero__wave" />
          </span>
          <span>{"I'm Gjorgi Krmzov"}</span>
        </motion.p>

        {/* The h1 carries the whole sentence for screen readers; both visual
            line sets are aria-hidden, so rendering two of them costs nothing
            in the accessibility tree. On wide screens the lines deliberately
            cross the portrait - mix-blend-mode on .hero__title inverts the
            type over the photo, so the overlap stays legible. */}
        <h1 className="hero__title" aria-label={HEADLINE}>
          <span className="hero__lines hero__lines--wide">
            {renderLines(WIDE, yHidden)}
          </span>
          <span className="hero__lines hero__lines--narrow">
            {renderLines(NARROW, yHidden)}
          </span>
        </h1>

        <motion.div className="hero__foot" {...fadeUp(0.7)}>
          <a className="btn" href="#what-first" data-cursor="Start here">
            See what to automate first
            <ArrowRight size={16} weight="bold" />
          </a>
        </motion.div>

        <motion.p className="hero__audit" {...fadeUp(0.82)}>
          <a
            href={withUtm(AUDIT_URL, "hero-audit")}
            target="_blank"
            rel="noopener"
            data-cursor="Let's talk"
          >
            Or book the free 30 min mapping call
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
        </motion.p>
      </div>

      {/* hand-drawn arrow in the whitespace right of the CTAs, flipped so the
          head points up-right at "work" in the headline */}
      <motion.span className="hero__doodle" aria-hidden="true" {...fadeUp(0.95)}>
        <DoodleArrow />
      </motion.span>
    </section>
  );
}

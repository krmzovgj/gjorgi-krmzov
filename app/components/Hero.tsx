"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { BOOKING_URL } from "../config";

const EASE = [0.22, 1, 0.36, 1] as const;

// Controlled line breaks. On wide screens each line is masked and rises in;
// on small screens it simply wraps.
const LINES = [
  "I build the systems",
  "that remove manual work",
  "inside agencies.",
];

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
            Hey there
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wave.svg" alt="" aria-hidden="true" className="hero__wave" />
          </span>
          <span>{"I'm Gjorgi Krmzov"}</span>
        </motion.p>

        <h1
          className="hero__title"
          aria-label="I build the systems that remove manual work inside agencies."
        >
          {LINES.map((line, i) => (
            <span className="hero__line" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: yHidden }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.5 + i * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div className="hero__foot" {...fadeUp(0.7)}>
          <a
            className="btn"
            target="_blank"
            href={BOOKING_URL}
            data-cursor="Let's talk"
          >
            Book a 30 minute call
            <ArrowRight size={16} weight="bold" />
          </a>
          <a className="hero__link" href="#work" data-cursor="Work">
            My work
          </a>
        </motion.div>
      </div>
    </section>
  );
}

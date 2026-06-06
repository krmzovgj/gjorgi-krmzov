"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { BOOKING_URL } from "../config";

const EASE = [0.22, 1, 0.36, 1] as const;

// Controlled line breaks. On wide screens each line is masked and rises in;
// on small screens it simply wraps.
const LINES = ["I build automated systems", "that remove manual work."];

export default function Hero() {
  const reduce = useReducedMotion();
  const yHidden = reduce ? 0 : "165%";

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section className="hero" id="top">
      <motion.img
        className="hero__portrait"
        src="/gjorgi.png"
        alt="Gjorgi Krmzov"
        initial={{ opacity: 0, y: reduce ? 0 : 28, rotate: 7 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        transition={{ duration: 0.95, ease: EASE, delay: 0.2 }}
      />

      <div className="hero__content">
        <motion.p className="hero__greeting" {...fadeUp(0.05)}>
          <span>
            Hey there
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wave.svg" alt="" aria-hidden="true" className="hero__wave" />
          </span>
          <span>{"I'm Gjorgi Krmzov"}</span>
        </motion.p>

        <h1
          className="hero__title"
          aria-label="I build automated systems that remove manual work."
        >
          {LINES.map((line, i) => (
            <span className="hero__line" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: yHidden }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.16 + i * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div className="hero__foot" {...fadeUp(0.5)}>
          <a className="btn" href={BOOKING_URL}>
            Book a 30 minute call
            <ArrowRight size={16} weight="bold" />
          </a>
          <a className="hero__link" href="#work">
            My work
          </a>
        </motion.div>
      </div>
    </section>
  );
}

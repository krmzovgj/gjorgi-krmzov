"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { DoodleArrow } from "./Doodles";
import { AUDIT_URL, withUtm } from "../config";

const EASE = [0.22, 1, 0.36, 1] as const;

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

        <h1
          className="hero__title"
          aria-label="I automate the boring work agencies still do by hand."
        >
          <span className="hero__line" aria-hidden="true">
            <motion.span
              initial={{ y: yHidden }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.5 }}
            >
              I automate the <span className="hero__highlight">boring work</span>
            </motion.span>
          </span>
          <span className="hero__line" aria-hidden="true">
            <motion.span
              initial={{ y: yHidden }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.58 }}
            >
              agencies still
            </motion.span>
          </span>
          <span className="hero__line" aria-hidden="true">
            <motion.span
              initial={{ y: yHidden }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.66 }}
            >
              do by hand.
            </motion.span>
          </span>
        </h1>

        <motion.div className="hero__foot" {...fadeUp(0.7)}>
          <Link className="btn" href="/hours" data-cursor="See the math">
            See what it costs
            <ArrowRight size={16} weight="bold" />
          </Link>
          <a className="hero__link" href="#work" data-cursor="Work">
            My work
          </a>
        </motion.div>

        <motion.p className="hero__audit" {...fadeUp(0.82)}>
          <a
            href={withUtm(AUDIT_URL, "hero-audit")}
            target="_blank"
            rel="noopener"
            data-cursor="Let's talk"
          >
            Or book the free 15 min mapping call
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

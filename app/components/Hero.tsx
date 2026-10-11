"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Swoosh } from "./Doodles";
import { AUDIT_URL, withUtm } from "../config";
// The portrait as WebP at three widths, imported so the build serves each from
// a URL with the file's hash in it: every new photo gets a new address, so no
// cache (browsers, Google Images) can keep an old one. The browser picks the
// smallest that is sharp at its size (a phone gets ~40-110KB instead of the
// 1.8MB PNG). public/gjorgi.png stays as the source the link-preview card reads.
import portrait600 from "../assets/gjorgi-600.webp";
import portrait900 from "../assets/gjorgi-900.webp";
import portrait1160 from "../assets/gjorgi-1160.webp";

const PORTRAIT_SRCSET = `${portrait600.src} 600w, ${portrait900.src} 900w, ${portrait1160.src} 1160w`;
// Rendered width in each layout (globals.css): phone 88vw, tablet up to 62vw,
// desktop up to ~46vw.
const PORTRAIT_SIZES = "(max-width: 600px) 88vw, (max-width: 960px) 62vw, 46vw";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = "I build automated speed to lead systems for B2B SaaS.";

// Two sets of controlled line breaks for the same sentence, one shown at a
// time (globals.css). Wide lines run long enough to cross the portrait on
// purpose. Narrow lines are shorter, which is what lets the phone size step
// up: at the wide breaks the longest line nearly fills a 390px screen, so the
// type could not grow there without clipping.
type Segment = { text: string; emph?: boolean };

const WIDE: Segment[][] = [
  [{ text: "I build automated" }],
  [{ text: "speed to lead" }],
  [{ text: "systems for " }, { text: "B2B SaaS.", emph: true }],
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
  // The portrait animates in once it has actually loaded. Started on mount, the
  // animation could finish before the file arrived and the photo then popped in
  // with no fade. The ref catches a file that loaded before hydration.
  const [portraitReady, setPortraitReady] = useState(false);
  const portraitRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setPortraitReady(true);
  }, []);
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
      {/* Phones only: the part of the line that runs behind his head. Before
          the photo in the tree, so the photo paints over it. */}
      <motion.div
        className="hero__swoosh hero__swoosh--back"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={portraitReady ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.2 }}
      >
        <Swoosh layer="back" />
      </motion.div>
      {/* Morphs in (blur + scale + opacity, no rotation) as soon as it has
          loaded. */}
      <motion.img
        ref={portraitRef}
        className="hero__portrait"
        src={portrait900.src}
        srcSet={PORTRAIT_SRCSET}
        sizes={PORTRAIT_SIZES}
        width={portrait1160.width}
        height={portrait1160.height}
        alt="Gjorgi Krmzov"
        fetchPriority="high"
        onLoad={() => setPortraitReady(true)}
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 1.04, filter: "blur(12px)" }
        }
        animate={
          !portraitReady
            ? undefined
            : reduce
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: reduce ? 0.4 : 0.6, ease: EASE }}
      />
      {/* The line the photo sits on. A sibling laid over the photo's box, not
          inside it, so the photo's animation filter never touches it. */}
      <motion.div
        className="hero__swoosh"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={portraitReady ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.2 }}
      >
        <Swoosh layer="front" />
      </motion.div>

      <div className="hero__content">
        <motion.p className="hero__greeting" {...fadeUp(0.4)}>
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
          <a className="btn" href="#how" data-cursor="Start here">
            See how it works
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
        </motion.p>
      </div>

    </section>
  );
}

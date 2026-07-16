"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PROJECTS } from "../data/projects";
import WorkCard from "./WorkCard";
import Reveal from "./Reveal";
import { DoodleSpark } from "./Doodles";

const CATS = ["Outreach", "Content", "Reporting", "Ops"];
const EASE = [0.22, 1, 0.36, 1] as const;

// Index once at module scope so the objects keep stable identity across renders.
const INDEXED = PROJECTS.map((p, i) => ({ ...p, n: i + 1 }));

export default function SelectedWork() {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? INDEXED.filter((p) => p.cat === active) : INDEXED;

  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-120px" });

  // The cards stagger up ONCE on the first scroll-in. After that (or the moment
  // the user toggles a category) we hand off to a plain opacity+scale morph so
  // toggling is never dragged through the entrance's slide + stagger delay.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!inView || entered) return;
    const t = setTimeout(() => setEntered(true), 1000);
    return () => clearTimeout(t);
  }, [inView, entered]);

  const toggle = (c: string) => {
    setEntered(true); // any interaction => morph mode, not entrance mode
    setActive((prev) => (prev === c ? null : c));
  };

  return (
    <section className="section wrap" id="work">
      <div className="work-layout">
        <aside className="work-aside">
          <Reveal>
            <h2 className="section__title work-aside__title">
              My Work
              <DoodleSpark className="work-aside__spark" />
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="work-aside__line">
              {"I've built fifteen, these are the twelve with the best numbers."}
            </p>
          </Reveal>
          <Reveal className="work-aside__tags" delay={0.12}>
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                className={`work-tag${active === c ? " is-active" : ""}`}
                aria-pressed={active === c}
                onClick={() => toggle(c)}
              >
                {c}
              </button>
            ))}
          </Reveal>
        </aside>

        <div className="works-grid" ref={gridRef}>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, idx) => (
              <motion.div
                key={p.slug}
                className="works-grid__item"
                initial={
                  entered ? { opacity: 0, scale: 0.92 } : { opacity: 0, y: 32 }
                }
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: entered ? 0.32 : 0.55,
                  ease: EASE,
                  delay: entered ? 0 : idx * 0.05,
                }}
              >
                <Link
                  className="works-grid__link"
                  href={`/work/${p.slug}`}
                  data-cursor="Open"
                >
                  <WorkCard project={p} index={p.n} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

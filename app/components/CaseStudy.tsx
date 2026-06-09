"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "../data/projects";
import ToolIcon from "./ToolIcon";
import Reveal from "./Reveal";
import "./case-study.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  const tools = project.stack
    .split("/")
    .map((t) => t.trim())
    .filter(Boolean);

  const close = useCallback(() => {
    setExiting(true);
    window.setTimeout(() => router.push("/#work"), reduce ? 0 : 300);
  }, [router, reduce]);

  useEffect(() => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const hasMedia = !!project.media && project.media.length > 0;
  const hasDeliverables =
    !!project.deliverables && project.deliverables.length > 0;

  return (
    <motion.main
      className="cs"
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
    >
      <div className="cs__grid">
        {/* left: name + meta + cta, with close pinned to the bottom (sticky) */}
        <aside className="cs__meta">
          <motion.h1 className="cs__name" {...rise(0.05)}>
            {project.name}
          </motion.h1>

          <motion.dl className="cs__fields" {...rise(0.16)}>
            <div className="cs__field">
              <dt>Category</dt>
              <dd>
                <span className="cs__pill">{project.cat}</span>
              </dd>
            </div>
            <div className="cs__field">
              <dt>Stack</dt>
              <dd className="cs__tools">
                {tools.map((t) => (
                  <ToolIcon key={t} name={t} />
                ))}
              </dd>
            </div>
            {hasDeliverables && (
              <div className="cs__field">
                <dt>Deliverables</dt>
                <dd>
                  <div className="cs__pills">
                    {project.deliverables!.map((d) => (
                      <span className="cs__pill" key={d}>
                        {d}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            )}
          </motion.dl>

          {/* pinned to the bottom of the sticky panel on desktop */}
          <button className="cs__close" type="button" onClick={close}>
            Close
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 5 19 19M19 5 5 19"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </aside>

        {/* right: headline + description, then media */}
        <div className="cs__main">
          <div className="cs__intro">
            <motion.h2 className="cs__headline" {...rise(0.1)}>
              {project.headline}
            </motion.h2>
            <motion.div className="cs__body" {...rise(0.2)}>
              <p>{project.before}</p>
              <p>{project.built}</p>
              <p>{project.impact}</p>
            </motion.div>
          </div>

          {hasMedia && (
            <div className="cs__media">
              {project.media!.map((m, i) => (
                <Reveal key={m.src} delay={i * 0.05}>
                  <figure className="cs__media-item">
                    <div className="cs__frame">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.src}
                        alt={m.caption ?? project.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {m.caption && (
                      <figcaption className="cs__cap">{m.caption}</figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* very bottom: next project on the right */}
      <div className="cs__foot">
        <Link className="cs__next" href={`/work/${next.slug}`}>
          <span className="cs__next-tag">Next</span>
          {next.name}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </motion.main>
  );
}

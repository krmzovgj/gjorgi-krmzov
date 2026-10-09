"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowBendUpRight,
  CalendarCheck,
  ChartBar,
  ChatCircleText,
  ClipboardText,
  EnvelopeSimple,
  LinkSimple,
  NotePencil,
  VideoCamera,
  type IconProps,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";
import {
  JOURNEY,
  JOURNEY_NOTE,
  JOURNEY_SUB,
  JOURNEY_TITLE,
  type Art,
  type IconName,
} from "../data/journey";
import "./journey.css";

// One demo request, followed from the form to the call to Monday's report.
//
// Left: the steps with real timestamps. A line fills down the rail as the page
// scrolls, and the step crossing the middle of the screen is "now": its node
// turns accent, earlier steps go ink, later ones stay ghost grey (the same
// dim and bright idea as the statement above).
//
// Right, on desktop only: one pinned card with the page's own edge dots inside
// it. It shows the last 3 moments as one dim line each and the current one
// large under them, all in type, never a mock interface. The card's height
// follows its content on a soft spring. Phones get each moment inline under
// its step instead.
//
// Motion uses the site ease. The card height is the one animated size: it sits
// in a fixed height sticky frame, so nothing else on the page moves with it.
// Reduced motion turns all of it off (MotionConfig, and the line draws full).

const EASE = [0.22, 1, 0.36, 1] as const;
const HEIGHT_SPRING = { type: "spring", stiffness: 90, damping: 20, mass: 1 } as const;

const ICONS: Record<IconName, ComponentType<IconProps>> = {
  form: ClipboardText,
  email: EnvelopeSimple,
  note: NotePencil,
  followup: ArrowBendUpRight,
  calendar: CalendarCheck,
  reply: ChatCircleText,
  link: LinkSimple,
  call: VideoCamera,
  report: ChartBar,
};

function Icon({ name }: { name: IconName }) {
  const C = ICONS[name];
  return <C className="jr-icon" size={15} weight="regular" aria-hidden="true" />;
}

type State = "past" | "now" | "next";

export default function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [line, setLine] = useState({ top: 0, height: 0 });
  const [cardH, setCardH] = useState<number | "auto">("auto");

  // The line runs from the first node to the last one. Measured, because the
  // steps wrap to different heights at every width.
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const measure = () => {
      const nodes = el.querySelectorAll<HTMLElement>("[data-node]");
      if (nodes.length < 2) return;
      const box = el.getBoundingClientRect();
      const a = nodes[0].getBoundingClientRect();
      const b = nodes[nodes.length - 1].getBoundingClientRect();
      const top = a.top - box.top + a.height / 2;
      const bottom = b.top - box.top + b.height / 2;
      setLine({ top, height: Math.max(0, bottom - top) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // "Now" is the step crossing the middle of the viewport. Steps sit flush
  // against each other (spacing is padding inside each one), so the middle
  // always falls inside exactly one of them while the list is on screen.
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const crossing = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.step);
          if (e.isIntersecting) crossing.add(i);
          else crossing.delete(i);
        }
        if (crossing.size) {
          setActive(Math.max(...crossing));
          return;
        }
        const r = el.getBoundingClientRect();
        const mid = window.innerHeight / 2;
        if (r.top > mid) setActive(0);
        else if (r.bottom < mid) setActive(steps.length - 1);
      },
      { rootMargin: "-49.5% 0px -49.5% 0px" }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // The card's height follows what's inside it.
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The fill tip sits at the middle of the screen while the line passes it,
  // which is the same line that decides which step is "now".
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 260, damping: 42, mass: 0.35 });

  const stateOf = (i: number): State => (i < active ? "past" : i === active ? "now" : "next");
  const now = JOURNEY[active];

  return (
    <section className="jr" id="how" aria-labelledby="jr-title">
      <Reveal className="jr__head wrap">
        <h2 id="jr-title" className="jr__title">
          {JOURNEY_TITLE}
        </h2>
        <p className="jr__sub">{JOURNEY_SUB}</p>
      </Reveal>

      <div className="jr__body wrap">
        <div className="jr__grid">
          <div className="jr__timeline" ref={timelineRef}>
            <div
              className="jr__line"
              ref={lineRef}
              style={{ top: line.top, height: line.height }}
              aria-hidden="true"
            >
              <motion.span className="jr__fill" style={{ scaleY: reduce ? 1 : fill }} />
            </div>

            <ol className="jr__list">
              {JOURNEY.map((s, i) => (
                <li className="jr__step" data-step={i} data-state={stateOf(i)} key={i}>
                  <p className="jr__time">
                    <span className="jr__day">{s.day}</span>
                    <span className="jr__clock">{s.time}</span>
                  </p>
                  <span className="jr__node" data-node aria-hidden="true" />
                  <div className="jr__copy">
                    <p className="jr__text">{s.text}</p>
                    <div className="jr__art jr__art--inline jr-panel jr-dots" aria-hidden="true">
                      <Artwork art={s.art} icon={s.icon} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="jr__aside" aria-hidden="true">
            <MotionConfig reducedMotion="user">
              <div className="jr__stage">
                <motion.div
                  className="jr__card jr-panel jr-dots"
                  animate={{ height: cardH }}
                  transition={reduce ? { duration: 0 } : HEIGHT_SPRING}
                >
                  <div className="jr__inner" ref={innerRef}>
                    <div className="jr__log" data-long={active >= 3}>
                      <AnimatePresence initial={false} mode="popLayout">
                        {JOURNEY.slice(Math.max(0, active - 3), active).map((s) => (
                          <motion.p
                            className="jr__logline"
                            key={s.day + s.time + s.text}
                            layout="position"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{ duration: 0.6, ease: EASE }}
                          >
                            <span className="jr__logtime">{s.time}</span>
                            <Icon name={s.icon} />
                            <span className="jr__logtext">{shortOf(s.art)}</span>
                          </motion.p>
                        ))}
                      </AnimatePresence>
                    </div>
                    <motion.div
                      className="jr__now"
                      key={active}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.75, ease: EASE }}
                    >
                      <Artwork art={now.art} icon={now.icon} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </MotionConfig>
          </div>
        </div>

        <p className="jr__note">{JOURNEY_NOTE}</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
   The right side, in type. Each step shows the one thing a person would
   actually see in that moment: a line someone wrote (with a hanging opening
   quote), the booked time, Sarah's yes under Dan's question, the call time,
   or the report. No avatars, buttons or fake windows.
   --------------------------------------------------------------------- */

function By({ icon, children }: { icon?: IconName; children: string }) {
  return (
    <span className="jr-by">
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </span>
  );
}

function Quote({
  text,
  by,
  icon,
  size = "lg",
}: {
  text: string;
  by: string;
  icon?: IconName;
  size?: "lg" | "md";
}) {
  return (
    <figure className="jr-q" data-size={size}>
      <blockquote className="jr-q__text">
        <p>
          <span className="jr-q__mark">&ldquo;</span>
          {text}&rdquo;
        </p>
      </blockquote>
      <figcaption>
        <By icon={icon}>{by}</By>
      </figcaption>
    </figure>
  );
}

// One line per earlier moment, for the log above "now".
function shortOf(art: Art): string {
  switch (art.kind) {
    case "quote":
      return `“${art.text}”`;
    case "booked":
      return `Booked for ${art.when}`;
    case "reply":
      return `“${art.answer}”`;
    case "call":
      return `On the call at ${art.time}`;
    case "report":
      return art.title;
  }
}

function Artwork({ art, icon }: { art: Art; icon: IconName }) {
  switch (art.kind) {
    case "quote":
      return <Quote text={art.text} by={art.by} icon={icon} size={art.size} />;

    case "booked":
      return (
        <div className="jr-booked">
          <p className="jr-big">{art.when}</p>
          <By icon={icon}>{art.by}</By>
          <ul className="jr-struck">
            {art.struck.map((t) => (
              <li key={t}>
                <s>{t}</s>
              </li>
            ))}
          </ul>
        </div>
      );

    case "reply":
      return (
        <div className="jr-reply">
          <figure className="jr-reply__ask">
            <blockquote>
              <p>&ldquo;{art.ask}&rdquo;</p>
            </blockquote>
            <figcaption>
              <By icon={icon}>{art.askBy}</By>
            </figcaption>
          </figure>
          <Quote text={art.answer} by={art.answerBy} />
        </div>
      );

    case "call":
      return (
        <div className="jr-call">
          <p className="jr-big jr-big--xl">{art.time}</p>
          <By icon={icon}>{art.by}</By>
        </div>
      );

    case "report":
      return (
        <div className="jr-report">
          <p className="jr-report__title">
            <By icon={icon}>{art.title}</By>
          </p>
          <table>
            <thead>
              <tr>
                {art.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {art.rows.map((r, i) => (
                <tr key={i} data-mark={i === 0}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

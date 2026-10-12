"use client";

import { useRef, type ReactNode } from "react";
import { MotionConfig, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowsSplit,
  CalendarCheck,
  ClipboardText,
  Clock,
  EnvelopeSimple,
  Lightning,
  StopCircle,
  type IconProps,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";
import Reveal from "./Reveal";
import {
  BRIEF,
  CONTROL,
  FOLLOW_UPS,
  REPLY,
  STATS,
  SYSTEM_TITLE,
  WORKFLOW,
  type CellCopy,
  type FlowIcon,
} from "../data/system";
import "./system-grid.css";

// What happens when someone asks for a demo, as one framed grid: hairlines,
// a cross where they meet, two cells over a strip of numbers over two cells.
// Each big cell shows one real moment from How it works, set in type the way
// it would look on screen (an email, a sequence, a note, a workflow), faded
// out at the foot, with a centred title and one line under it.
//
// The moments are illustrations of the copy under them, so they are hidden
// from screen readers; the titles and lines carry the meaning.
//
// Motion: each cell's contents fade up once in view (Reveal). Inside, the
// reply lands a beat after the request, and the cancelled follow ups get
// struck through after she books. Reduced motion drops the movement.

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOW_ICONS: Record<FlowIcon, ComponentType<IconProps>> = {
  trigger: Lightning,
  email: EnvelopeSimple,
  wait: Clock,
  branch: ArrowsSplit,
  stop: StopCircle,
};

// Starts the moment's own animation when its cell scrolls into view.
function useOn() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "-120px" });
  return [ref, on] as const;
}

function Cell({
  area,
  copy,
  delay = 0,
  children,
}: {
  area: string;
  copy: CellCopy;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <article className={`sg-cell sg-cell--${area}`}>
      <Reveal className="sg-cell__inner" delay={delay}>
        <div className="sg-stage" aria-hidden="true">
          {children}
        </div>
        <h3 className="sg-cell__title">{copy.title}</h3>
        <p className="sg-cell__text">{copy.text}</p>
      </Reveal>
    </article>
  );
}

function ReplyArt() {
  const [ref, on] = useOn();
  const { request: r, email: e } = REPLY;
  return (
    <div className="sg-reply" ref={ref}>
      <div className="sg-card sg-note">
        <ClipboardText className="sg-ico" size={15} weight="duotone" />
        <span className="sg-strong">{r.label}</span>
        <span className="sg-muted sg-note__from">{r.from}</span>
        <time className="sg-time">{r.time}</time>
      </div>
      <motion.div
        className="sg-card sg-mail"
        initial={{ opacity: 0, y: 18 }}
        animate={on ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
      >
        <div className="sg-mail__head">
          <span className="sg-avatar sg-avatar--ink">Y</span>
          <span className="sg-mail__who">
            <span className="sg-strong">{e.from}</span>
            <span className="sg-muted">to {e.to}</span>
          </span>
          <time className="sg-time">{e.time}</time>
        </div>
        <p className="sg-mail__subject">{e.subject}</p>
        <p className="sg-mail__body">{e.body}</p>
        <span className="sg-mail__action">
          {e.action}
          <ArrowRight size={12} weight="bold" />
        </span>
      </motion.div>
    </div>
  );
}

function FollowUpArt() {
  const [ref, on] = useOn();
  let struck = 0;
  return (
    <div className="sg-card sg-seq" ref={ref}>
      <div className="sg-card__head">
        <span className="sg-strong">Follow ups</span>
        <span className="sg-muted">{FOLLOW_UPS.who}</span>
      </div>
      <ol className="sg-seq__list">
        {FOLLOW_UPS.rows.map((row) => {
          const order = row.state === "cancelled" ? struck++ : 0;
          return (
            <li className={`sg-seq__row is-${row.state}`} key={row.when}>
              <span className="sg-seq__node" />
              <span className="sg-seq__what">
                {row.what}
                {row.state === "cancelled" && (
                  <motion.span
                    className="sg-strike"
                    initial={{ scaleX: 0 }}
                    animate={on ? { scaleX: 1 } : undefined}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.7 + order * 0.18 }}
                  />
                )}
              </span>
              <time className="sg-time">{row.when}</time>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function BriefArt() {
  return (
    <div className="sg-card sg-brief">
      <div className="sg-brief__head">
        <span className="sg-avatar">{BRIEF.initials}</span>
        <span className="sg-brief__who">
          <span className="sg-strong">{BRIEF.name}</span>
          <span className="sg-muted">{BRIEF.company}</span>
        </span>
        <span className="sg-brief__when">
          <CalendarCheck size={14} weight="duotone" />
          {BRIEF.when}
        </span>
      </div>
      <dl className="sg-brief__rows">
        {BRIEF.rows.map((row) => (
          <div className="sg-brief__row" key={row.key}>
            <dt className="sg-muted">{row.key}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FlowArt() {
  return (
    <div className="sg-card sg-flow">
      <div className="sg-card__head">
        <span className="sg-strong">{WORKFLOW.name}</span>
        <span className="sg-status">{WORKFLOW.status}</span>
      </div>
      <ol className="sg-flow__steps">
        {WORKFLOW.steps.map((step) => {
          const Icon = FLOW_ICONS[step.icon];
          return (
            <li className="sg-flow__step" key={step.text}>
              <span className="sg-flow__ico">
                <Icon size={13} weight="duotone" />
              </span>
              <span>{step.text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function SystemGrid() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="section sg" aria-labelledby="sg-title">
        <div className="wrap">
          <Reveal>
            <h2 id="sg-title" className="section__title sg__title">
              {SYSTEM_TITLE}
            </h2>
          </Reveal>

          <div className="sg-grid">
            <Cell area="reply" copy={REPLY.copy}>
              <ReplyArt />
            </Cell>
            <Cell area="follow" copy={FOLLOW_UPS.copy} delay={0.08}>
              <FollowUpArt />
            </Cell>

            {STATS.map((stat, i) => (
              <div className={`sg-cell sg-cell--stat sg-cell--stat${i + 1}`} key={stat.value}>
                <Reveal className="sg-stat" delay={i * 0.06}>
                  <p className="sg-stat__value">{stat.value}</p>
                  <p className="sg-stat__label">{stat.label}</p>
                </Reveal>
              </div>
            ))}
            <div className="sg-cell sg-cell--control">
              <Reveal className="sg-control" delay={0.12}>
                <h3 className="sg-control__title">{CONTROL.title}</h3>
                <p className="sg-control__text">{CONTROL.text}</p>
              </Reveal>
            </div>

            <Cell area="brief" copy={BRIEF.copy}>
              <BriefArt />
            </Cell>
            <Cell area="flow" copy={WORKFLOW.copy} delay={0.08}>
              <FlowArt />
            </Cell>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

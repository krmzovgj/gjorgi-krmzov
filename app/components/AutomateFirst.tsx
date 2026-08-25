"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { AUDIT_URL, LINKEDIN_URL, withUtm } from "../config";
import Reveal from "./Reveal";
import "./automate-first.css";

const EASE = [0.22, 1, 0.36, 1] as const;

// How long each job takes by hand, per client per month. These two numbers
// ARE the tool: everything on screen is derived from them and the client
// count, which is why no second input is needed.
const HRS_PER_REPORT = 1.5;
const HRS_CHASING_PER_CLIENT_MONTH = 0.5;

const MONTHS = 12;
const WORKING_DAY = 8;

// Onboarding is deliberately absent. It is one time per signed client, so
// being honest about it needs its own input, and that input is the friction.
// It stays in the offer, not in the tool.
//
// One label per job, used by the tick row AND the result row, so the two can
// never drift apart. `name` is the short form for the recommendation.
const JOBS = [
  {
    id: "chasing",
    label: "Chasing clients for access, files and approvals",
    name: "chasing",
    rate: HRS_CHASING_PER_CLIENT_MONTH,
  },
  {
    id: "reporting",
    label: "The monthly client report",
    name: "the monthly report",
    rate: HRS_PER_REPORT,
  },
] as const;

const ALL_ON = Object.fromEntries(JOBS.map((j) => [j.id, true]));

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
// Whole hours read as hours; a stray .5 keeps its half.
const num = (n: number) => (n % 1 === 0 ? String(n) : n.toFixed(1));

// Rendered inline on the homepage and as the whole of /hours. Standalone it
// owns the page's h1; inline the hero owns it and this steps down to h2.
export default function AutomateFirst({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Title = standalone ? "h1" : "h2";
  const Sub = standalone ? "h2" : "h3";

  const reduce = useReducedMotion();
  const [picked, setPicked] = useState<Record<string, boolean>>(ALL_ON);
  const [clients, setClients] = useState("12");

  const n = Math.max(0, Math.round(Number(clients) || 0));

  // Biggest first, so the rows and the recommendation agree.
  const rows = JOBS.filter((j) => picked[j.id])
    .map((j) => ({ ...j, hrs: n * j.rate * MONTHS }))
    .sort((a, b) => b.hrs - a.hrs);

  const total = rows.reduce((sum, r) => sum + r.hrs, 0);
  const days = total / WORKING_DAY;

  // With one row there is nothing to compare, so naming a winner would only
  // restate the single row above it.
  const lead = rows.length > 1 && total > 0 ? rows[0] : null;

  const booking = rows.length
    ? `${withUtm(AUDIT_URL, "what-first")}&notes=${encodeURIComponent(
        `By hand: ${rows.map((r) => `${r.name} ${num(r.hrs)}h`).join(", ")}. ` +
          `${num(total)}h a year across ${n} ${plural(n, "client", "clients")}.` +
          (lead ? ` Starting with ${lead.name}.` : "")
      )}`
    : withUtm(AUDIT_URL, "what-first");

  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE },
  };

  return (
    <section className="af" id="what-first">
      <Reveal className="af__head wrap">
        <Title className="af__title">What should you automate first?</Title>
      </Reveal>

      <div className="af__body wrap">
        <div className="af__grid">
          <div className="af__ask">
            <Sub className="af__q">Which of these still happens by hand?</Sub>

            <div className="af__opts">
              {JOBS.map((job) => (
                <label className="af-opt" key={job.id}>
                  <input
                    type="checkbox"
                    className="af-opt__input"
                    checked={!!picked[job.id]}
                    onChange={() =>
                      setPicked((p) => ({ ...p, [job.id]: !p[job.id] }))
                    }
                  />
                  <span className="af-opt__box" aria-hidden="true">
                    <Check size={15} weight="bold" />
                  </span>
                  <span className="af-opt__label">{job.label}</span>
                </label>
              ))}
            </div>

            {/* The only thing they have to type. Everything scales off it, and
                the result recalculates as they go - there is nothing to submit. */}
            <label className="af-count" htmlFor="af-clients">
              <span className="af-count__label">How many clients do you have?</span>
              <span className="af-count__control">
                <input
                  id="af-clients"
                  className="af-count__input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={clients}
                  onChange={(e) => setClients(e.target.value)}
                />
              </span>
            </label>
          </div>

          <aside className="af__out" aria-live="polite">
            <div className="af__figure">
              <p className="af__out-label label">By hand, every year</p>
              <p className="af__total" aria-label={`${num(total)} hours a year`}>
                {num(total)}
                <span className="af__total-unit">
                  {plural(total, "hour", "hours")}
                </span>
              </p>
              <p className="af__days">
                {num(days)} {plural(days, "working day", "working days")}
              </p>
            </div>

            {rows.length > 0 ? (
              <motion.div key={rows.map((r) => r.id).join()} {...fade}>
                <dl className="af-break">
                  {rows.map((r) => (
                    <div className="af-break__row" key={r.id}>
                      <dt className="af-break__job">{r.label}</dt>
                      {/* The working, in the same period as the number beside
                          it. Nothing to convert, and the assumption is visible
                          without a separate note about assumptions. */}
                      <dd className="af-break__work">
                        {`${n} ${plural(n, "client", "clients")} × ${r.rate} hrs × ${MONTHS} months`}
                      </dd>
                      <dd className="af-break__hrs">{num(r.hrs)} h</dd>
                    </div>
                  ))}
                </dl>

                {lead && (
                  <p className="af__verdict">
                    <strong>Start with {lead.name}.</strong> It&apos;s{" "}
                    {num(lead.hrs)} of those {num(total)} hours.
                  </p>
                )}
              </motion.div>
            ) : (
              <p className="af__verdict">
                Tick one back on to see where the year goes.
              </p>
            )}

            <div className="af__cta">
              <a
                className="btn"
                href={booking}
                target="_blank"
                rel="noopener"
                data-cursor="Let's talk"
              >
                Book 30 minutes
                <ArrowRight size={16} weight="bold" />
              </a>
              <p className="af__carry">
                Your answers come with the booking, so the call starts here
                instead of at the beginning.
              </p>
              <a
                className="af__dm"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                data-cursor="Connect"
              >
                or DM me
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

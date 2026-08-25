"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { AUDIT_URL, LINKEDIN_URL, withUtm } from "../config";
import Reveal from "./Reveal";
import "./automate-first.css";

const EASE = [0.22, 1, 0.36, 1] as const;

// How long each job takes by hand. These rates ARE the tool: everything on
// screen is derived from them, so they are the one thing worth arguing about.
// Deliberately conservative, so the total reads as a floor rather than a
// stretch.
const HOURS = {
  // Kickoff, access, folders, tools. Once per client, not monthly.
  onboardingEach: 4,
  // Twenty minutes a client a month, spread over the chasing nobody logs.
  chasingPerClientMonth: 1 / 3,
  // The pull is quick. Assembly, checking and the summary are the rest.
  reportPerClientMonth: 1.5,
};

const WORKING_DAY = 8;
const MONTHS = 12;

// One label per job, used by the tick row AND the breakdown row, so the two
// never drift apart. `name` is the short form for the sentence.
const JOBS = [
  {
    id: "onboarding",
    label: "Onboarding a new client",
    name: "onboarding",
    // One time per new client, so it has no monthly figure to show.
    oneOff: true,
    yearly: (clients: number, newClients: number) =>
      newClients * HOURS.onboardingEach,
    monthly: () => 0,
  },
  {
    id: "chasing",
    label: "Chasing clients for access, files and approvals",
    name: "chasing",
    oneOff: false,
    yearly: (clients: number) =>
      clients * HOURS.chasingPerClientMonth * MONTHS,
    monthly: (clients: number) => clients * HOURS.chasingPerClientMonth,
  },
  {
    id: "reporting",
    label: "The monthly client report",
    name: "the monthly report",
    oneOff: false,
    yearly: (clients: number) => clients * HOURS.reportPerClientMonth * MONTHS,
    monthly: (clients: number) => clients * HOURS.reportPerClientMonth,
  },
] as const;

const round = (n: number) => Math.round(n);
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

// Everything starts ticked. An empty tool says nothing, and unticking what
// you already automated is less work than ticking what you have not.
const ALL_ON = Object.fromEntries(JOBS.map((j) => [j.id, true]));

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
  const [newClients, setNewClients] = useState("6");

  const num = (v: string) => Math.max(0, Math.round(Number(v) || 0));
  const nClients = num(clients);
  const nNew = num(newClients);

  const rows = JOBS.filter((j) => picked[j.id]).map((j) => ({
    ...j,
    hrs: j.yearly(nClients, nNew),
    perMonth: j.monthly(nClients),
  }));

  const total = rows.reduce((sum, r) => sum + r.hrs, 0);
  const days = total / WORKING_DAY;

  // The biggest number wins, not a fixed running order. That arithmetic is
  // what makes the recommendation worth printing: with three ticks and no
  // breakdown, naming a winner was just repeating the input back.
  const lead = rows.reduce(
    (max, r) => (r.hrs > (max?.hrs ?? -1) ? r : max),
    undefined as (typeof rows)[number] | undefined
  );

  const verdict =
    !lead || total === 0
      ? null
      : rows.length === 1
        ? `Start with ${lead.name}. That is ${round(lead.hrs)} hours a year.`
        : `Start with ${lead.name}. It is ${round(lead.hrs)} of those ${round(
            total
          )} hours.`;

  // Carries the answers to the booking, so the call opens on their numbers
  // instead of on "so what do you do?".
  const booking = lead
    ? `${withUtm(AUDIT_URL, "what-first")}&notes=${encodeURIComponent(
        `By hand: ${rows.map((r) => `${r.name} ${round(r.hrs)}h`).join(", ")}. ` +
          `${round(total)}h a year across ${nClients} ${plural(
            nClients,
            "client",
            "clients"
          )}, ${nNew} new last year. Starting with ${lead.name}.`
      )}`
    : withUtm(AUDIT_URL, "what-first");

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE, delay: reduce ? 0 : delay },
  });

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

            {/* Last year, not next year: a number they can look up beats one
                they invent, and it is the same input either way. */}
            <label className="af-count af-count--tight" htmlFor="af-new">
              <span className="af-count__label">
                How many new clients did you take on last year?
              </span>
              <span className="af-count__control">
                <input
                  id="af-new"
                  className="af-count__input"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={newClients}
                  onChange={(e) => setNewClients(e.target.value)}
                />
              </span>
            </label>
          </div>

          <aside className="af__out" aria-live="polite">
            <p className="af__out-label label">By hand, every year</p>
            <p className="af__total" aria-label={`${round(total)} hours a year`}>
              {round(total)}
              <span className="af__total-unit">
                {plural(round(total), "hour", "hours")}
              </span>
            </p>
            <p className="af__days">
              {days % 1 === 0 ? days : days.toFixed(1)}{" "}
              {plural(days, "working day", "working days")}
            </p>

            {rows.length > 0 ? (
              <motion.div key={rows.map((r) => r.id).join()} {...fade()}>
                <dl className="af-break">
                  {rows.map((r) => (
                    <div className="af-break__row" key={r.id}>
                      <dt className="af-break__job">{r.label}</dt>
                      <dd className="af-break__rate">
                        {r.oneOff
                          ? `one time, ${nNew} ${plural(nNew, "client", "clients")}`
                          : `${round(r.perMonth)} h/mo`}
                      </dd>
                      <dd className="af-break__hrs">{round(r.hrs)} h</dd>
                    </div>
                  ))}
                </dl>

                {verdict && <p className="af__verdict">{verdict}</p>}
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
                Book the 30 min mapping call
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

"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { AUDIT_URL, LINKEDIN_URL, withUtm } from "../config";
import Reveal from "./Reveal";
import "./automate-first.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const MONTHS = 12;
const WORKING_DAY = 8;

// Sanity rails. Values are clamped for the maths and normalised on blur, so
// a half typed number never snaps under the cursor.
const LIMITS = {
  clients: { min: 1, max: 500 },
  rate: { min: 5, max: 500 },
  hours: { min: 0, max: 24 },
};

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
    hours: "0.5",
  },
  {
    id: "reporting",
    label: "The monthly client report",
    name: "the monthly report",
    hours: "1.5",
  },
] as const;

const ALL_ON = Object.fromEntries(JOBS.map((j) => [j.id, true]));
const DEFAULT_HOURS = Object.fromEntries(JOBS.map((j) => [j.id, j.hours]));
const HOURS_KEY = "af.hours";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
// Whole numbers read whole; a stray half keeps its half.
const num = (n: number) => (n % 1 === 0 ? String(n) : String(Number(n.toFixed(2))));
const clamp = (n: number, { min, max }: { min: number; max: number }) =>
  Math.min(max, Math.max(min, n));

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
  const [rate, setRate] = useState("35");
  const [hours, setHours] = useState<Record<string, string>>(DEFAULT_HOURS);

  // Read after mount, not during render, so the server HTML and the first
  // client pass agree. Their edited assumptions then survive moving between
  // / and /hours. This is the one sanctioned reason to set state from an
  // effect: adopting a value that only exists on the client, once, so the
  // cascade the rule guards against cannot happen.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(HOURS_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setHours((h) => ({ ...h, ...JSON.parse(saved) }));
    } catch {
      // Private mode or storage disabled. Defaults are fine.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(HOURS_KEY, JSON.stringify(hours));
    } catch {
      // Nothing to do; the tool works either way.
    }
  }, [hours]);

  const nClients = clamp(Number(clients) || 0, { min: 0, max: LIMITS.clients.max });
  const nRate = clamp(Number(rate) || 0, { min: 0, max: LIMITS.rate.max });

  // Biggest first, so the rows and the recommendation agree.
  const rows = JOBS.filter((j) => picked[j.id])
    .map((j) => {
      const hrsEach = clamp(Number(hours[j.id]) || 0, LIMITS.hours);
      const hrs = nClients * hrsEach * MONTHS;
      return { ...j, hrsEach, hrs, dollars: hrs * nRate };
    })
    .sort((a, b) => b.dollars - a.dollars);

  const totalHours = rows.reduce((sum, r) => sum + r.hrs, 0);
  const totalDollars = rows.reduce((sum, r) => sum + r.dollars, 0);
  const days = totalHours / WORKING_DAY;

  // Nothing ticked, or no client count to scale by, and there is no number
  // to show yet.
  const ready = rows.length > 0 && nClients >= LIMITS.clients.min;
  // With one row there is nothing to compare, so naming a winner would only
  // restate the single row above it.
  const lead = ready && rows.length === JOBS.length ? rows[0] : null;

  const booking = ready
    ? `${withUtm(AUDIT_URL, "what-first")}&notes=${encodeURIComponent(
        `By hand: ${rows
          .map((r) => `${r.name} ${money.format(r.dollars)}`)
          .join(", ")}. ` +
          `${money.format(totalDollars)} a year (${num(
            totalHours
          )}h at ${money.format(nRate)}/h) across ${nClients} ${plural(
            nClients,
            "client",
            "clients"
          )}.` +
          (lead ? ` Starting with ${lead.name}.` : "")
      )}`
    : withUtm(AUDIT_URL, "what-first");

  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE },
  };

  // Normalise into range once they leave the field, never mid-keystroke.
  const settle =
    (
      set: (v: string) => void,
      limits: { min: number; max: number },
      fallback: string
    ) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      const raw = e.target.value.trim();
      if (raw === "") return set(fallback === "" ? "" : fallback);
      set(num(clamp(Number(raw) || limits.min, limits)));
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

            {/* Everything scales off these two, and the result recalculates as
                they type. There is nothing to submit. */}
            <label className="af-count" htmlFor="af-clients">
              <span className="af-count__label">How many clients do you have?</span>
              <span className="af-count__control">
                <input
                  id="af-clients"
                  className="af-count__input"
                  type="number"
                  inputMode="numeric"
                  min={LIMITS.clients.min}
                  max={LIMITS.clients.max}
                  step="1"
                  value={clients}
                  onChange={(e) => setClients(e.target.value)}
                  onBlur={settle(setClients, LIMITS.clients, "")}
                />
              </span>
            </label>

            <label className="af-count" htmlFor="af-rate">
              <span className="af-count__label">What&apos;s an hour worth to you?</span>
              <span className="af-count__control">
                <span className="af-count__prefix" aria-hidden="true">
                  $
                </span>
                <input
                  id="af-rate"
                  className="af-count__input"
                  type="number"
                  inputMode="numeric"
                  min={LIMITS.rate.min}
                  max={LIMITS.rate.max}
                  step="1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  onBlur={settle(setRate, LIMITS.rate, "35")}
                  aria-label="What's an hour worth to you, in dollars"
                />
              </span>
            </label>
          </div>

          <aside className="af__out" aria-live="polite">
            {ready ? (
              <>
                <div className="af__figure">
                  <p className="af__out-label label">By hand, every year</p>
                  <p className="af__total">{money.format(totalDollars)}</p>
                  <p className="af__days">
                    {num(totalHours)} {plural(totalHours, "hour", "hours")} &middot;{" "}
                    {num(days)} {plural(days, "working day", "working days")}
                  </p>
                </div>

                <motion.div key={rows.map((r) => r.id).join()} {...fade}>
                  <dl className="af-break">
                    {rows.map((r) => (
                      <div className="af-break__row" key={r.id}>
                        <dt className="af-break__job">{r.label}</dt>
                        {/* The working, in the same period as the figure beside
                            it. The hours are editable because a number built on
                            their own assumption is one they will believe. */}
                        <dd className="af-break__work">
                          {nClients} {plural(nClients, "client", "clients")} &times;{" "}
                          <input
                            className="af-hrs"
                            type="number"
                            inputMode="decimal"
                            min={LIMITS.hours.min}
                            max={LIMITS.hours.max}
                            step="0.5"
                            value={hours[r.id]}
                            style={{
                              width: `${String(hours[r.id] ?? "").length + 0.7}ch`,
                            }}
                            onChange={(e) =>
                              setHours((h) => ({ ...h, [r.id]: e.target.value }))
                            }
                            onBlur={settle(
                              (v) => setHours((h) => ({ ...h, [r.id]: v })),
                              LIMITS.hours,
                              r.hours
                            )}
                            aria-label={`Hours a month per client for ${r.label}`}
                          />{" "}
                          hrs &times; {MONTHS} months &times; {money.format(nRate)}
                        </dd>
                        <dd className="af-break__money">
                          {money.format(r.dollars)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {lead && (
                    <p className="af__verdict">
                      <strong>Start with {lead.name}.</strong> It&apos;s{" "}
                      {money.format(lead.dollars)} of those{" "}
                      {money.format(totalDollars)}.
                    </p>
                  )}
                </motion.div>

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
              </>
            ) : (
              <p className="af__prompt">Tick what still happens by hand.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { AUDIT_URL, LINKEDIN_URL, withUtm } from "../config";
import Reveal from "./Reveal";
import "./hours.css";

const EASE = [0.22, 1, 0.36, 1] as const;

// The repetitive work an agency loses a week to. Eight named buckets plus a
// catch-all, so the total reads honest rather than padded. Defaults land the
// page on a real, non-zero number (the value is the point, no email gate).
const FIELDS = [
  { id: "reports", label: "Client reports and updates", value: 2 },
  { id: "followups", label: "Follow-ups (leads, clients, invoices)", value: 3 },
  { id: "intake", label: "Lead intake and replies", value: 2 },
  { id: "onboarding", label: "Onboarding new clients", value: 2 },
  { id: "content", label: "Content, docs, and proposals", value: 3 },
  { id: "dataentry", label: "Data entry and moving between tools", value: 4 },
  { id: "scheduling", label: "Scheduling and reminders", value: 1 },
  { id: "support", label: "Answering the same questions / support", value: 2 },
  { id: "other", label: "Other repetitive work", value: 0 },
] as const;

// One full-time person's working year, used for the "share of a hire" line.
const FT_YEAR_HOURS = 2080;
const WEEKS = 52;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const decimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const fmtMoney = (n: number) => money.format(Math.round(n));
const fmtHours = (n: number) => decimal.format(Math.round(n));
const fmtPct = (n: number) => `${Math.round(n)}%`;

// A number that counts up or down whenever its target changes. The text is
// driven off a MotionValue (no per-frame React state), so it tweens smoothly in
// either direction. On mount mv already equals value, so there is no entrance
// count; only real changes animate. Honors reduced motion.
function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (latest) => format(latest));

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.7, ease: EASE });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return <motion.span>{text}</motion.span>;
}

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export default function HoursCalculator() {
  const [hours, setHours] = useState<Record<string, string>>(() =>
    Object.fromEntries(FIELDS.map((f) => [f.id, String(f.value)]))
  );
  const [rate, setRate] = useState("30");

  const rateNum = num(rate);
  const perField = FIELDS.map((f) => ({ ...f, hrs: num(hours[f.id]) }));

  const weekly = perField.reduce((sum, f) => sum + f.hrs, 0);
  const yearlyHours = weekly * WEEKS;
  const costPerYear = yearlyHours * rateNum;
  const shareOfHire = (yearlyHours / FT_YEAR_HOURS) * 100;

  // Biggest leak: the bucket with the most hours (first wins on a tie).
  const leak = perField.reduce((max, f) => (f.hrs > max.hrs ? f : max), perField[0]);
  const leakCost = leak.hrs * WEEKS * rateNum;
  const hasHours = weekly > 0;

  return (
    <main className="hours">
      <Reveal className="hours__head wrap">
        <h1 className="hours__title">See where your hours go.</h1>
        <p className="hours__lead">
          Every agency loses a day or two each week to work that just repeats.
          Put in the rough hours your team spends. The cost updates as you type.
          No email, no catch.
        </p>
      </Reveal>

      <section className="hours__calc wrap">
        <div className="hours__grid">
          <div className="hours__inputs">
            <h2 className="hours__sub">Your week, in hours</h2>
            <div className="hours__fields">
              {FIELDS.map((f) => (
                <div className="hf" key={f.id}>
                  <label className="hf__label" htmlFor={`hf-${f.id}`}>
                    {f.label}
                  </label>
                  <div className="hf__control">
                    <input
                      id={`hf-${f.id}`}
                      className="hf__input"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      value={hours[f.id]}
                      onChange={(e) =>
                        setHours((h) => ({ ...h, [f.id]: e.target.value }))
                      }
                    />
                    <span className="hf__unit">h/wk</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hf hf--rate">
              <label className="hf__label" htmlFor="hf-rate">
                What an hour of that time costs you
              </label>
              <div className="hf__control">
                <span className="hf__prefix">$</span>
                <input
                  id="hf-rate"
                  className="hf__input"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <span className="hf__unit">/hr</span>
              </div>
            </div>
          </div>

          <aside className="hours__result">
            <p className="hours__result-label label">
              <span className="hours__dot" aria-hidden="true" />
              Cost per year
            </p>
            <p
              className="hours__cost"
              aria-label={`${fmtMoney(costPerYear)} per year`}
            >
              <AnimatedNumber value={costPerYear} format={fmtMoney} />
            </p>
            <p className="hours__caption">
              At {fmtMoney(rateNum)} an hour, every year.
            </p>

            <dl className="hours__stats">
              <div>
                <dt>Hours a year</dt>
                <dd>
                  <AnimatedNumber value={yearlyHours} format={fmtHours} />
                </dd>
              </div>
              <div>
                <dt>Of a full-time hire</dt>
                <dd>
                  <AnimatedNumber value={shareOfHire} format={fmtPct} />
                </dd>
              </div>
            </dl>

            {hasHours ? (
              <p className="hours__leak">
                Start with <strong>{leak.label}</strong>. On its own that is
                about <strong>{fmtMoney(leakCost)}</strong> a year.
              </p>
            ) : (
              <p className="hours__leak">
                Add a few hours above to see your biggest leak.
              </p>
            )}

            <div className="hours__cta">
              <a
                className="btn"
                href={withUtm(AUDIT_URL, "hours")}
                target="_blank"
                rel="noopener"
                data-cursor="Let's talk"
              >
                Map the real version, 15 minutes
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                className="hours__dm"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                data-cursor="Connect"
              >
                Or DM me your hours
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

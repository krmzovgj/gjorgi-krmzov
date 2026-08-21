"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
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

// Rendered in two places: inline on the homepage (a section under the
// statement) and as the whole of /hours, which is linked from LinkedIn. The
// only difference is heading level - standalone it owns the page's h1, inline
// the page's h1 is the hero and this steps down to h2.
export default function HoursCalculator({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Title = standalone ? "h1" : "h2";
  const Sub = standalone ? "h2" : "h3";

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
    // Always a section, never a <main>: the page around it owns that.
    // #calculator is the homepage hero CTA's scroll target.
    <section className="hours" id="calculator">
      <Reveal className="hours__head wrap">
        <Title className="hours__title">What manual work costs you</Title>
      </Reveal>

      <div className="hours__calc wrap">
        <div className="hours__grid">
          <div className="hours__inputs">
            <Sub className="hours__sub">Your week, in hours</Sub>
            <div className="hours__fields">
              {FIELDS.map((f) => (
                // The whole row is the label, so a press anywhere on it (the
                // text, the pill, the gap) focuses the hours input.
                <label className="hf" key={f.id} htmlFor={`hf-${f.id}`}>
                  <span className="hf__label">{f.label}</span>
                  <span className="hf__control">
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
                  </span>
                </label>
              ))}
            </div>

            <label className="hf hf--rate" htmlFor="hf-rate">
              <span className="hf__label">
                What an hour of that time costs you
              </span>
              <span className="hf__control">
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
              </span>
            </label>
          </div>

          <aside className="hours__result">
            <p className="hours__result-label label">Cost per year</p>
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
                {"Start with "}
                <strong>{leak.label}</strong>
                {". On its own that's about "}
                <strong>{fmtMoney(leakCost)}</strong>
                {" a year."}
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
                Book the 30 min mapping call
                <ArrowRight size={16} weight="bold" />
              </a>
              <a
                className="hours__dm"
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

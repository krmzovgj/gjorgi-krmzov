"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { AUDIT_URL, LINKEDIN_URL, withUtm } from "../config";
import Reveal from "./Reveal";
import "./automate-first.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const MONTHS = 12;

// Sanity rails. Values are clamped for the maths and normalised on blur, so a
// half typed number never snaps under the cursor.
const LIMITS = {
  requests: { min: 1, max: 100000 },
  close: { min: 0, max: 10 },
  value: { min: 1, max: 10000000 },
};

// "If 1 in N of those booked." 1 in 10 is the default.
const ONE_IN = [10, 5, 4] as const;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
// Digits out of whatever was typed, so "12,000" and "12000" are the same.
const digits = (s: string) => Number(s.replace(/\D/g, "")) || 0;
const has = (s: string) => /\d/.test(s);
const commas = (n: number) => n.toLocaleString("en-US");
// Calls are the one figure that can be fractional (84 a year / 10 = 8.4). It is
// always a multiple of 0.2 or 0.25 from a multiple of 12, so one decimal is
// exact and the working printed below it reproduces from what it shows.
const oneDecimal = (n: number) => String(Number(n.toFixed(1)));

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  maxLength: number;
  prefix?: string;
  wide?: boolean;
};

// One row of the form. The grey placeholder is the worked example, so the
// section is legible before anyone has typed a number.
function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  maxLength,
  prefix,
  wide,
}: FieldProps) {
  return (
    <label className="af-count" htmlFor={id}>
      <span className="af-count__label">{label}</span>
      <span className="af-count__control">
        {prefix && (
          <span className="af-count__prefix" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          className={`af-count__input${wide ? " af-count__input--wide" : ""}`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      </span>
    </label>
  );
}

// Rendered inline on the homepage and as the whole of /hours. Standalone it
// owns the page's h1; inline the hero owns it and this steps down to h2.
export default function AutomateFirst({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Title = standalone ? "h1" : "h2";

  const reduce = useReducedMotion();
  // Empty on load: the grey placeholders are the example, not a default.
  const [requests, setRequests] = useState("");
  const [booked, setBooked] = useState("");
  const [close, setClose] = useState("");
  const [value, setValue] = useState("");
  const [oneIn, setOneIn] = useState<number>(10);

  const nRequests = clamp(digits(requests), 0, LIMITS.requests.max);
  // Booked can't be more than came in.
  const nBooked = Math.min(digits(booked), nRequests);
  const nClose = clamp(digits(close), LIMITS.close.min, LIMITS.close.max);
  const nValue = clamp(digits(value), 0, LIMITS.value.max);

  const hasLost = nRequests >= LIMITS.requests.min && has(booked);
  const missed = nRequests - nBooked;
  const year = missed * MONTHS;
  const calls = year / oneIn;
  // Integer arithmetic until the very last step, so a result that lands
  // exactly on .5 rounds the same way every time.
  const customers = Math.round((year * nClose) / (oneIn * 10));
  const total = customers * nValue;
  const hasGain =
    hasLost && missed > 0 && has(close) && nValue >= LIMITS.value.min;
  // The button only appears when there is something to book a call about.
  const worthACall = hasGain && customers >= 1;

  const notes = `${nRequests} demo ${plural(
    nRequests,
    "request",
    "requests"
  )} last month, ${nBooked} booked a call. ${nClose} in 10 calls become customers, each paying ${money.format(
    nValue
  )} a year.`;
  const booking = worthACall
    ? `${withUtm(AUDIT_URL, "what-first")}&notes=${encodeURIComponent(notes)}`
    : withUtm(AUDIT_URL, "what-first");

  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE },
  };

  // Normalise into range once they leave a field, never mid-keystroke.
  const settle = () => {
    const r = digits(requests);
    setRequests(r >= LIMITS.requests.min ? String(Math.min(r, LIMITS.requests.max)) : "");
    if (has(booked)) {
      const cap = r >= LIMITS.requests.min ? Math.min(r, LIMITS.requests.max) : LIMITS.requests.max;
      setBooked(String(Math.min(digits(booked), cap)));
    }
    if (has(close)) {
      setClose(String(clamp(digits(close), LIMITS.close.min, LIMITS.close.max)));
    }
    const v = digits(value);
    setValue(v >= LIMITS.value.min ? commas(Math.min(v, LIMITS.value.max)) : "");
  };

  return (
    <section className="af" id="what-first">
      <Reveal className="af__head wrap">
        <Title className="af__title">
          How many of last month&apos;s demo requests never booked a call?
        </Title>
      </Reveal>

      <div className="af__body wrap">
        <div className="af__grid">
          <div className="af__fields">
            <Field
              id="af-requests"
              label="How many demo requests came in last month?"
              placeholder="50"
              maxLength={6}
              value={requests}
              onChange={(v) => setRequests(v.replace(/\D/g, ""))}
              onBlur={settle}
            />
            <Field
              id="af-booked"
              label="How many of them booked a call?"
              placeholder="30"
              maxLength={6}
              value={booked}
              onChange={(v) => setBooked(v.replace(/\D/g, ""))}
              onBlur={settle}
            />
            <Field
              id="af-close"
              label="Out of 10 calls, how many become customers?"
              placeholder="2"
              maxLength={2}
              value={close}
              onChange={(v) => setClose(v.replace(/\D/g, ""))}
              onBlur={settle}
            />
            <Field
              id="af-value"
              label="What does a customer pay you a year?"
              prefix="$"
              placeholder="12,000"
              maxLength={10}
              wide
              value={value}
              onChange={(v) => setValue(v.replace(/[^\d,]/g, ""))}
              onBlur={settle}
            />
          </div>

          <aside className="af__out" aria-live="polite">
            {!hasLost ? (
              <p className="af__prompt">Put in last month&apos;s numbers.</p>
            ) : (
              <>
                <motion.div className="af__block" key="lost" {...fade}>
                  <p className="af__out-label label">Last month</p>
                  <p className="af__headline">
                    {missed > 0 ? (
                      <>
                        <strong>{commas(missed)}</strong> demo{" "}
                        {plural(missed, "request", "requests")} never booked a
                        call.
                      </>
                    ) : (
                      "All of them booked a call, so you don't need this."
                    )}
                  </p>
                </motion.div>

                {hasGain && (
                  <motion.div className="af__block" key="gain" {...fade}>
                    <label className="af__out-label label af__pick" htmlFor="af-onein">
                      If
                      <select
                        id="af-onein"
                        className="af-select"
                        value={oneIn}
                        onChange={(e) => setOneIn(Number(e.target.value))}
                      >
                        {ONE_IN.map((n) => (
                          <option key={n} value={n}>
                            1 in {n}
                          </option>
                        ))}
                      </select>
                      of those booked
                    </label>
                    <p className="af__headline">
                      {customers >= 2 && (
                        <>
                          About <strong>{commas(customers)}</strong> more
                          customers a year, paying you{" "}
                          <strong>{money.format(total)}</strong> a year between
                          them.
                        </>
                      )}
                      {customers === 1 && (
                        <>
                          About <strong>1</strong> more customer a year, paying
                          you <strong>{money.format(total)}</strong> a year.
                        </>
                      )}
                      {customers === 0 &&
                        "Less than 1 more customer a year, so you don't need this yet."}
                    </p>
                    <p className="af__working">
                      {`${commas(missed)} a month x ${MONTHS} = ${commas(
                        year
                      )} a year. ${commas(year)} x 1 in ${oneIn} = ${oneDecimal(
                        calls
                      )} ${plural(calls, "call", "calls")}, and ${oneDecimal(
                        calls
                      )} ${plural(
                        calls,
                        "call",
                        "calls"
                      )} x ${nClose} in 10 = about ${customers} ${plural(
                        customers,
                        "customer",
                        "customers"
                      )}.`}
                    </p>
                  </motion.div>
                )}

                {worthACall && (
                  <div className="af__cta">
                    <a
                      className="btn"
                      href={booking}
                      target="_blank"
                      rel="noopener"
                      data-cursor="Let's talk"
                    >
                      Book 15 minutes
                      <ArrowRight size={16} weight="bold" />
                    </a>
                    <p className="af__carry">
                      I&apos;ll have these numbers on the call.
                    </p>
                    <a
                      className="af__dm"
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="Connect"
                    >
                      or message me on LinkedIn
                    </a>
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

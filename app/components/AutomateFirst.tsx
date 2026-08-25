"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { AUDIT_URL, LINKEDIN_URL, withUtm } from "../config";
import Reveal from "./Reveal";
import "./automate-first.css";

const EASE = [0.22, 1, 0.36, 1] as const;

// Array order IS the recommendation precedence: the first ticked job wins, so
// onboarding beats chasing beats reporting. That covers all seven
// combinations without a lookup table.
const JOBS = [
  {
    id: "onboarding",
    short: "onboarding",
    label: "Setting up a new client",
    lead: "Start with onboarding.",
    verdict: () =>
      "Fastest to build, and it pays back on every client you sign from here.",
  },
  {
    id: "chasing",
    short: "chasing access and approvals",
    label: "Chasing clients for access, files and approvals",
    lead: "Start with chasing.",
    verdict: (clients: number) =>
      `Cheapest of the three, and it stops someone holding ${clients} ${
        clients === 1 ? "client" : "clients"
      } in their head.`,
  },
  {
    id: "reporting",
    short: "the monthly report",
    label: "The monthly client report",
    lead: "Start with reporting.",
    verdict: () =>
      "The data pull is the easy half. The assembly, the checking and the summary are where the time goes.",
  },
] as const;

const DEFAULT_CLIENTS = "12";

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
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [clients, setClients] = useState(DEFAULT_CLIENTS);

  const toggle = (id: string) =>
    setPicked((p) => ({ ...p, [id]: !p[id] }));

  const lead = JOBS.find((j) => picked[j.id]);
  const count = Math.max(1, Math.round(Number(clients) || 0));

  // Without this the answers would die in the browser: the reader would fill
  // three things in and arrive at the booking as a stranger. Cal prefills its
  // notes field from the query string, so the answers travel with the booking
  // and the call opens on them instead of on "so what do you do?".
  const chosen = JOBS.filter((j) => picked[j.id]);
  const booking = lead
    ? `${withUtm(AUDIT_URL, "what-first")}&notes=${encodeURIComponent(
        `Still by hand: ${chosen.map((j) => j.short).join(", ")}. ` +
          `${count} ${count === 1 ? "client" : "clients"}. ` +
          `Fixing first: ${lead.short}.`
      )}`
    : withUtm(AUDIT_URL, "what-first");

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay: reduce ? 0 : delay },
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
                    onChange={() => toggle(job.id)}
                  />
                  <span className="af-opt__box" aria-hidden="true">
                    <Check size={15} weight="bold" />
                  </span>
                  <span className="af-opt__label">{job.label}</span>
                </label>
              ))}
            </div>

            {/* Only worth asking once something is ticked, and it only feeds
                the chasing verdict, so it stays out of the way until then. */}
            {lead && (
              <motion.label className="af-count" htmlFor="af-clients" {...reveal(0.05)}>
                <span className="af-count__label">How many clients?</span>
                <span className="af-count__control">
                  <input
                    id="af-clients"
                    className="af-count__input"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1"
                    value={clients}
                    onChange={(e) => setClients(e.target.value)}
                  />
                </span>
              </motion.label>
            )}
          </div>

          <aside className="af__out" aria-live="polite">
            {lead ? (
              <motion.div key={lead.id} {...reveal(0)}>
                <p className="af__out-label label">Fix this first</p>
                <p className="af__lead">{lead.lead}</p>
                <p className="af__why">{lead.verdict(count)}</p>

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
              </motion.div>
            ) : (
              <p className="af__empty">
                Tick whichever still happens by hand. I&apos;ll tell you which
                one to fix first.
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

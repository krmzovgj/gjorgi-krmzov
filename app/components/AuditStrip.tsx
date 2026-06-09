import Reveal from "./Reveal";
import { AUDIT_URL } from "../config";

// Thin full-width band between the statement and the work grid. The free
// lead-gen offer (15 min Hours Audit), separate from the 30 min call.
export default function AuditStrip() {
  return (
    <section className="audit" id="audit">
      <Reveal className="audit__inner wrap">
        <div className="audit__text">
          <p className="audit__lead">Free this month: the Hours Audit.</p>
          <p className="audit__desc">
            15 minutes on a call. I map where your team&apos;s week goes,
            what&apos;s automatable, and roughly how many hours you&apos;d get
            back. Doing 5 free while I build case studies.
          </p>
        </div>
        <a
          className="btn audit__cta"
          href={AUDIT_URL}
          target="_blank"
          rel="noreferrer"
          data-cursor="Let's talk"
        >
          Get your Hours Audit
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}

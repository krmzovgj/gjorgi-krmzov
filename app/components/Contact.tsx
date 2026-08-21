import Words from "./Words";
import Reveal from "./Reveal";
import { AUDIT_URL, BOOKING_URL, withUtm } from "../config";

export default function Contact() {
  return (
    <section className="contact wrap" id="contact">
      <Reveal>
        <h2 className="contact__cta">
          <Words text="Let's automate the boring work" />
        </h2>
        <div className="contact__actions">
          <a
            className="btn"
            href={withUtm(BOOKING_URL, "contact")}
            target="_blank"
            rel="noopener"
            data-cursor="Let's talk"
          >
            Book a 30 minute call
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
          <p className="contact__alt">
            The{" "}
            <a
              className="contact__alt-link"
              href={withUtm(AUDIT_URL, "contact-audit")}
              target="_blank"
              rel="noopener"
              data-cursor="Let's talk"
            >
              mapping call
            </a>{" "}
            is 30 minutes, free, and by the end you know what doing it by
            hand costs.
          </p>
          <a
            className="contact__email"
            href="mailto:gjorgi@krmzov.com"
            data-cursor="Say hi"
          >
            gjorgi@krmzov.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}

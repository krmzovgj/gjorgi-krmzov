import Words from "./Words";
import Reveal from "./Reveal";
import { BOOKING_URL } from "../config";

export default function Contact() {
  return (
    <section className="contact wrap" id="contact">
      <Reveal>
        <h2 className="contact__cta">
          <Words text="Let's remove the manual work" />
        </h2>
        <div className="contact__actions">
          <a
            className="btn"
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
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
          <a
            className="contact__email"
            href="mailto:krmzovgj@gmail.com"
            data-cursor="Say hi"
          >
            krmzovgj@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}

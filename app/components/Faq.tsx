import Reveal from "./Reveal";
import FaqList from "./FaqList";
import { FAQS } from "../data/faq";

// Server component on purpose: the schema below is crawler data, so it belongs
// in the HTML that ships, not in the client bundle. Only the accordion itself
// is interactive, and that lives in FaqList.
//
// Rendered as a plain <script>, not next/script, per the Next.js JSON-LD guide:
// this is structured data, not executable code. `<` is escaped for the same
// reason the guide gives.
const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section className="section wrap" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      {/* One centred column: heading over the list, both on the same axis. */}
      <div className="faq__inner">
        <Reveal>
          <h2 className="section__title faq__title">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <FaqList />
        </Reveal>
      </div>
    </section>
  );
}

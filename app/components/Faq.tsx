import Reveal from "./Reveal";

// The objections that come up on every call, answered in the open. No
// accordion: the answers are three sentences each, and hiding them behind a
// click would be a landing-page reflex, not an editorial one. Hairline rows,
// question left, answer right, same grammar as the calculator's breakdown.
//
// One source for both the markup and the FAQPage schema below, so the two can
// never drift apart.
const FAQS = [
  {
    q: "What do I actually get out of this?",
    a: "Take the report. Today someone spends a day a month pulling numbers into it. After the build it's sitting there finished on the 1st, they read it, maybe fix a sentence, send it. That day stops being anyone's job.",
  },
  {
    q: "Why not just buy a tool for this?",
    a: "Keep the tools, they do the data half well. What they don't do is your half, the checking, the writing, the sending, the way your agency does it. I build that part on top of what you already pay for.",
  },
  {
    q: "Will clients notice it's automated?",
    a: "No, nothing goes to a client without a person reading it first. Your clients get the same report they always got. The difference is nobody spent a day making it.",
  },
  {
    q: "What happens when it breaks?",
    a: "First 30 days, anything that breaks is mine to fix. After that you keep me on to watch it, or your team owns it, it's all documented and it's all yours.",
  },
  {
    q: "Do you need access to our tools?",
    a: "Yes. View access where reading is enough, edit access where the system actually does something, sending a report needs sending rights. You get the exact list before anything starts and you can pull it any time.",
  },
  {
    q: "Is my agency too small for this?",
    a: "Under about 5 clients, probably. The math stops working and I'll tell you that on the call. Past that, every client you add makes the by-hand version more expensive.",
  },
  {
    q: "Is account management the only thing you automate?",
    a: "No. My own outbound and content system run the same way. This is the lead offer because it's where agencies lose the most hours they can't bill, if your repetitive job is something else, bring that one to the call.",
  },
];

// Rendered as a plain <script>, not next/script: this is data for crawlers,
// not executable code. `<` is escaped per the Next.js JSON-LD guide.
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

      <Reveal>
        <h2 className="section__title faq__title">Questions</h2>
      </Reveal>

      <div className="faq__list">
        {FAQS.map((f, i) => (
          // Reveal renders the row itself, so the grid lives on the motion
          // element and there is no extra wrapper between list and row.
          <Reveal
            className="faq-item"
            key={f.q}
            // Capped, or the last rows would still be waiting half a second
            // after they are already on screen.
            delay={Math.min(i, 4) * 0.06}
          >
            <h3 className="faq-item__q">{f.q}</h3>
            <p className="faq-item__a">{f.a}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

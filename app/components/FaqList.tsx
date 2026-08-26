"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FAQS } from "../data/faq";

// Radix's Accordion primitive, the same one shadcn's accordion wraps. It is
// headless, so all of the look below is ours; what it brings is the behaviour
// that is tedious to get right by hand: roles and aria-expanded/aria-controls
// wired both ways, arrow-key and Home/End roving focus, and it keeps a closing
// panel mounted until its animation ends so the collapse can be seen.
//
// type="single" + collapsible: one answer open at a time, and clicking the open
// one shuts it. The first is open by default so the section does not land as a
// wall of closed rows.
//
// Accordion.Header renders an h3, which keeps the section at one h2 and seven
// h3s, the same outline as before.
export default function FaqList() {
  return (
    <Accordion.Root
      className="faq__list"
      type="single"
      collapsible
      defaultValue={FAQS[0].q}
    >
      {FAQS.map((f) => (
        <Accordion.Item className="faq-item" key={f.q} value={f.q}>
          <Accordion.Header className="faq-item__head">
            <Accordion.Trigger className="faq-item__q">
              <span className="faq-item__q-text">{f.q}</span>
              {/* Two hairline bars; the upright one collapses on open, so the
                  plus becomes a minus on a transform alone. */}
              <span className="faq-item__mark" aria-hidden="true" />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="faq-item__panel">
            <p className="faq-item__a">{f.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

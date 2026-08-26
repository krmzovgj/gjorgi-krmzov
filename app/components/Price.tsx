import Reveal from "./Reveal";

// Type on the canvas, nothing around it. No card, border, tint, shadow,
// included-list, tier table or savings line: the calculator above is the
// anchor, so this block carries no persuasion of its own on purpose.
export default function Price() {
  return (
    <section className="section wrap" id="price">
      <Reveal>
        <h2 className="section__title price__title">The price</h2>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="price__lead">One build. $5,000, fixed.</p>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="price__note">
          That&apos;s one of the jobs above, scoped on the call.
        </p>
        <p className="price__note">
          Anything bigger than one job gets its own price.
        </p>
      </Reveal>
    </section>
  );
}

import Reveal from "./Reveal";

// Type on the canvas, nothing around it. No card, border, tint, shadow,
// included-list, tier table or savings line: the calculator above is the
// anchor, so this block carries no persuasion of its own on purpose.
//
// Two columns: the copy reads left on the site's section heading, the figure
// fills the right half. Source order is the phone order.
export default function Price() {
  return (
    <section className="section wrap" id="price">
      <Reveal>
        <div className="price">
          <div className="price__copy">
            <h2 className="section__title">One build, fixed.</h2>

            <p className="price__note">
              That&apos;s one of the jobs above, scoped on the call.
            </p>
            <p className="price__note">
              Anything bigger than one job gets its own price.
            </p>
          </div>

          {/* Its own container, so the figure can be sized as a share of this
              column rather than of the viewport, and fills it at any width. */}
          <div className="price__figure-col">
            <p className="price__figure">$5,000</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

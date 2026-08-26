import Reveal from "./Reveal";
import { DoodleUnderline } from "./Doodles";

// Type on the canvas, nothing around it. No card, border, tint, shadow,
// included-list, tier table or savings line: the calculator above is the
// anchor, so this block carries no persuasion of its own on purpose.
//
// The figure is the display element, set at the calculator's total size and
// right aligned, so the section rhymes with the rows above it. DOM order is
// the mobile order; the desktop grid places the figure to the right.
export default function Price() {
  return (
    <section className="section wrap" id="price">
      <Reveal>
        <div className="price">
          <p className="price__eyebrow label">The price</p>

          <p className="price__figure">
            $5,000
            <DoodleUnderline className="price__mark" />
          </p>

          <div className="price__body">
            <p className="price__lead">One build, fixed.</p>
            <p className="price__note">
              That&apos;s one of the jobs above, scoped on the call.
            </p>
            <p className="price__note">
              Anything bigger than one job gets its own price.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { PROJECTS } from "../data/projects";
import Reveal from "./Reveal";
import Tile from "./Tile";

const CATS = ["Outreach", "Reporting", "Ops"];

export default function SelectedWork() {
  return (
    <section className="work-sec" id="work">
      <div className="work-grid">
        <aside className="work-aside">
          <h2 className="section__title">Selected work</h2>
          <p className="work-aside__line">
            Systems shipped inside US SEO agencies, grouped by where they save
            the most time and money.
          </p>
          <div className="work-tags">
            {CATS.map((c) => (
              <span className="tag" key={c}>
                {c}
              </span>
            ))}
          </div>
        </aside>

        <div className="tiles">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Tile project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

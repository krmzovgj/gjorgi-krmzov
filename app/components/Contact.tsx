import Words from "./Words";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="contact wrap" id="contact">
      <Reveal>
        <h2 className="contact__cta">
          <Words text="Let's remove the manual work" />
        </h2>
        <div>
          <a className="contact__email" href="mailto:krmzovgj@gmail.com">
            krmzovgj@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}

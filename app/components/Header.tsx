import { BOOKING_URL } from "../config";

export default function Header() {
  return (
    <nav className="nav" aria-label="Primary">
      <a className="nav__brand" href="#top" aria-label="Gjorgi Krmzov, home">
        gk
      </a>
      <a className="btn btn--sm nav__cta" href={BOOKING_URL}>
        Book a call
      </a>
    </nav>
  );
}

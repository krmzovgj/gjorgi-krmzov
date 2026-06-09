"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LinkedinLogo } from "@phosphor-icons/react";
import { LINKEDIN_URL } from "../config";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  // Scroll-linked + reversible, scale only (no opacity): the name is squeezed
  // flat while the footer is below, expands vertically to 100% as you scroll to
  // the bottom, and squeezes back as you scroll away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [-0.5, 1]);

  return (
    <footer className="footer wrap" ref={ref}>
      <div className="footer__bar">
        <a
          className="footer__social"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedinLogo size={28} weight="duotone" />
        </a>
        <span className="footer__copy">&copy; 2026</span>
      </div>

      {/* One line, full section width; squeezes open/shut vertically on scroll. */}
      <div className="footer__name" aria-label="Gjorgi Krmzov">
        <motion.span
          aria-hidden="true"
          style={{ scaleY, transformOrigin: "bottom" }}
        >
          KRMZOV
        </motion.span>
      </div>
    </footer>
  );
}

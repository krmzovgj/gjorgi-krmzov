"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./cursor-dot.css";

// A small dot that trails the real cursor (the OS cursor stays visible). Over any
// element with a data-cursor attribute it expands into a label pill ("Open").
// Animates size, never transform: scale, so it never blurs. Fine pointers only.
export default function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 800, damping: 45, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 800, damping: 45, mass: 0.25 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el =
        e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div className="cursor-dot" style={{ x: sx, y: sy }} aria-hidden="true">
      <span className={`cursor-dot__inner${label ? " is-label" : ""}`}>
        <span className="cursor-dot__text">{label}</span>
      </span>
    </motion.div>
  );
}

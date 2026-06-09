"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./cursor-blend.css";

// A circle that follows the pointer and inverts whatever is behind it
// (mix-blend-mode: difference). Only on real pointers; respects reduced motion.
export default function CursorBlend() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.3 });
  const scale = useSpring(1, { stiffness: 450, damping: 32 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-blend-cursor");

    const sel = "a, button, [role='button'], input, textarea, select, label, summary, .btn";
    const interactive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest(sel);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      if (interactive(e.target)) scale.set(2.4);
    };
    const out = (e: MouseEvent) => {
      if (interactive(e.target)) scale.set(1);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      document.documentElement.classList.remove("has-blend-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [x, y, scale]);

  return (
    <motion.div
      className="cursor-blend"
      style={{ x: sx, y: sy, scale }}
      hidden={!enabled}
      aria-hidden="true"
    />
  );
}

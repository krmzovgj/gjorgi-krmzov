"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

// The single, consistent reveal used across the whole site. Framer driven,
// triggered by useInView (reliable px margin), with a safety timer so content
// can never stay hidden if the observer misfires.
export default function Reveal({ children, delay = 0, y = 26, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setForced(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const show = inView || forced;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: EASE, delay: show ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

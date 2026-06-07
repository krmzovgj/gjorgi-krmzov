"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Project } from "../data/projects";
import ToolIcon from "./ToolIcon";

const SPRING = { stiffness: 170, damping: 17, mass: 0.45 };

// Square tile. The whole card eases toward the cursor (a small translate plus a
// subtle 3D tilt) while hovered, then springs back to rest on leave.
export default function WorkCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Pointer position relative to the card centre, normalised to -0.5..0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const x = useTransform(sx, [-0.5, 0.5], [-11, 11]);
  const y = useTransform(sy, [-0.5, 0.5], [-11, 11]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  const tools = project.stack
    .split("/")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <motion.article
      ref={ref}
      className="work-card"
      data-cat={project.cat}
      data-index={index}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduce
          ? undefined
          : { x, y, rotateX, rotateY, transformStyle: "preserve-3d" }
      }
    >
      <div className="work-card__top">
        <span className="work-card__idx">{String(index).padStart(2, "0")}</span>
        <span className="work-card__cat">{project.cat}</span>
      </div>

      <div className="work-card__bottom">
        <h3 className="work-card__name">{project.name}</h3>
        <p className="work-card__metric">{project.metric}</p>

        <div className="work-card__foot">
          <span className="work-card__tools">
            {tools.map((t) => (
              <ToolIcon key={t} name={t} />
            ))}
          </span>
          <svg
            className="work-card__arrow"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

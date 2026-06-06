"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import ToolChips from "./ToolChips";
import type { Project } from "../data/projects";

const T = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

// Morphing tile: the card fills with black on hover, the label inverts, and the
// result and stack rise into view. One consistent Framer interaction.
export default function Tile({ project }: { project: Project }) {
  return (
    <motion.article
      className="tile"
      tabIndex={0}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{ rest: { backgroundColor: "#eeeef0" }, hover: { backgroundColor: "#0e0e0f" } }}
      transition={T}
    >
      <div className="tile__head">
        <motion.span
          className="tile__tag"
          variants={{ rest: { color: "#56565a" }, hover: { color: "rgba(255,255,255,0.55)" } }}
          transition={T}
        >
          {project.cat}
        </motion.span>
        <motion.span
          className="tile__arrow"
          variants={{
            rest: { opacity: 0, x: -6, color: "#0e0e0f" },
            hover: { opacity: 1, x: 0, color: "#ffffff" },
          }}
          transition={T}
        >
          <ArrowUpRight size={20} weight="bold" />
        </motion.span>
      </div>

      <div className="tile__body">
        <motion.h3
          className="tile__name"
          variants={{ rest: { color: "#0e0e0f" }, hover: { color: "#ffffff" } }}
          transition={T}
        >
          {project.name}
        </motion.h3>
        <motion.div
          className="tile__detail"
          variants={{ rest: { opacity: 0, y: 10 }, hover: { opacity: 1, y: 0 } }}
          transition={T}
        >
          <span className="tile__metric">{project.metric}</span>
          <ToolChips stack={project.stack} dark />
        </motion.div>
      </div>
    </motion.article>
  );
}

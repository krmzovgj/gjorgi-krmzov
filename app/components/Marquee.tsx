"use client";

import { motion } from "framer-motion";

// Real tools, not decoration. Quiet continuous band.
const TOOLS = ["n8n", "Claude", "OpenAI", "Make", "Slack", "Gmail", "Notion", "Airtable"];

export default function Marquee() {
  const list = [...TOOLS, ...TOOLS];
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee__track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {list.map((t, i) => (
          <span className="marquee__item" key={i}>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

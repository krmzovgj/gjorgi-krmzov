"use client";

import {
  TreeStructure,
  Robot,
  Lightning,
  Database,
  ChartLineUp,
  Funnel,
} from "@phosphor-icons/react";

// Stacked, slightly overlapping chips. Spread apart on hover.
const ICONS = [TreeStructure, Robot, Lightning, Database, ChartLineUp, Funnel];

export default function TechStack() {
  return (
    <div className="techstack" aria-hidden="true">
      {ICONS.map((Icon, i) => (
        <span className="techstack__chip" key={i}>
          <Icon size={24} weight="bold" />
        </span>
      ))}
    </div>
  );
}

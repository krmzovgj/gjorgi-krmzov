"use client";

import type { ComponentType } from "react";
import {
  TreeStructure,
  Robot,
  Database,
  Code,
  EnvelopeSimple,
  SlackLogo,
  Megaphone,
  MagnifyingGlass,
  MapPin,
  GoogleLogo,
  CreditCard,
  Briefcase,
  Phone,
  Plugs,
  RedditLogo,
  Article,
  LinkSimple,
  Cube,
  type IconProps,
} from "@phosphor-icons/react";

// Map a tool name to a Phosphor icon (real brand logos where they exist).
function iconFor(tool: string): ComponentType<IconProps> {
  const t = tool.toLowerCase();
  if (t.includes("n8n")) return TreeStructure;
  if (t.includes("supabase") || t.includes("airtable") || t.includes("postgres"))
    return Database;
  if (
    t.includes("claude") ||
    t.includes("gpt") ||
    t.includes("llm") ||
    t.includes("perplexity") ||
    t.includes("undetectable")
  )
    return Robot;
  if (t.includes("next")) return Code;
  if (t.includes("gmail") || t.includes("mail")) return EnvelopeSimple;
  if (t.includes("slack")) return SlackLogo;
  if (t.includes("qwoted")) return Megaphone;
  if (t.includes("algolia")) return MagnifyingGlass;
  if (t.includes("brightlocal")) return MapPin;
  if (t.includes("google") || t.includes("sheets") || t.includes("docs"))
    return GoogleLogo;
  if (t.includes("stripe")) return CreditCard;
  if (t.includes("upwork")) return Briefcase;
  if (t.includes("twilio")) return Phone;
  if (t.includes("mcp")) return Plugs;
  if (t.includes("reddit") || t.includes("crowdreply") || t.includes("cowork"))
    return RedditLogo;
  if (t.includes("wordpress")) return Article;
  if (t.includes("backlink") || t.includes("link")) return LinkSimple;
  return Cube;
}

// Overlapping, non-rotated tool chips for a project's stack.
export default function ToolChips({
  stack,
  dark = false,
}: {
  stack: string;
  dark?: boolean;
}) {
  const icons = stack
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(iconFor);
  const unique = icons.filter((ic, i) => icons.indexOf(ic) === i);

  return (
    <div className={`chips ${dark ? "chips--dark" : ""}`} aria-hidden="true">
      {unique.map((Icon, i) => (
        <span className="chip" key={i}>
          <Icon size={20} weight="duotone" />
        </span>
      ))}
    </div>
  );
}

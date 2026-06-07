// Local, self-hosted icons (no external CDN). Unmapped tools fall back to text.
const ICONS: Record<string, string> = {
  n8n: "n8n",
  Claude: "claude",
  "Next.js": "nextdotjs",
  Supabase: "supabase",
  Gmail: "gmail",
  Airtable: "airtable",
  Slack: "slack",
  MCP: "modelcontextprotocol",
  WordPress: "wordpress",
  Sheets: "googlesheets",
  "Google Drive": "googledrive",
};

export default function ToolIcon({ name }: { name: string }) {
  const file = ICONS[name];

  return (
    <span className="work-card__tool" title={name}>
      {file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/icons/${file}.svg`} alt={name} width={18} height={18} />
      ) : (
        <span className="work-card__tool-text">{name.slice(0, 3)}</span>
      )}
    </span>
  );
}

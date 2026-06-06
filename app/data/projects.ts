// Six strongest systems. All client and company identifiers removed.

export type Project = {
  slug: string;
  cat: string;
  name: string;
  metric: string;
  stack: string;
  before: string;
  built: string;
  impact: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "ai-pr-link-earning",
    cat: "Outreach",
    name: "AI PR & Link Earning",
    metric: "$24k to $60k a year in link budget saved",
    stack: "n8n / Claude",
    before:
      "Earned media was fully manual. Check the platform daily, match opportunities to clients, draft pitches in the expert's voice, humanize past AI detection, submit. 30 to 45 minutes per client. At 20 clients that is a full time job nobody was doing.",
    built:
      "Four n8n workflows in an orchestrator and worker pattern. A scout hits the PR platform's API directly, Claude scores opportunities against expert profiles and logs the good ones, a drafter writes the pitches and runs them past AI detection. Only the final form submit stays manual.",
    impact:
      "The full 20 client roster scouted and drafted in under 15 minutes, unattended. 10+ hours a week of manual work gone. One earned placement per client per month at $200 to $500 in equivalent paid link value is $24,000 to $60,000 a year in link budget saved.",
  },
  {
    slug: "cold-email-engine",
    cat: "Outreach",
    name: "Cold Email Engine",
    metric: "A paid tool replaced, bill flat at any volume",
    stack: "Next.js / Supabase / Gmail",
    before:
      "Outreach ran through a paid cold email tool. Limited control, reply detection on their schedule, no way to wire it into the rest of the stack.",
    built:
      "A full custom outreach engine. A Next.js dashboard for the UI, Supabase for the queue, schedule and audit logs, n8n proxying Gmail sends across multiple accounts. The send path runs 13 steps with a race free atomic claim. Inbox watchers classify every inbound as reply, bounce or auto responder and stop the sequence the second someone replies. Leads are verified so it sends zero bounces.",
    impact:
      "Replaced the paid tool entirely. Database triggers cut execution count by 10x and it runs fully autonomous, zero manual triggers. Adding an inbox costs a seat and nothing else, so volume goes up while the bill stays flat.",
  },
  {
    slug: "keyword-ranking-reports",
    cat: "Reporting",
    name: "Keyword Ranking Reports",
    metric: "5 to 10 hours a month gone",
    stack: "n8n / Airtable",
    before:
      "Someone spent 5 to 10 hours a month pulling ranking reports by hand for 10+ clients, one client and one location at a time.",
    built:
      "An n8n workflow pulls the client list, triggers the ranking reports, dedupes the data and writes a clean sheet per client.",
    impact:
      "5 to 10 hours of manual reporting a month, gone. A full workweek every month across the client roster.",
  },
  {
    slug: "link-reclamation",
    cat: "Outreach",
    name: "Link Reclamation",
    metric: "$200 to $500 saved per catch",
    stack: "n8n / Slack",
    before:
      "Clients pay real money for backlinks. When those links break, rankings slip and nobody notices until it shows up in a report weeks later.",
    built:
      "A monthly automated scan of full backlink profiles. It flags broken links, notifies the team and re-checks every 7 days until they are fixed.",
    impact:
      "Every broken link is $200 to $500 of paid link value walking out the door. One catch per client per month pays for the entire system. Pure n8n, zero AI.",
  },
  {
    slug: "ai-visibility-tracker",
    cat: "Reporting",
    name: "AI Visibility Tracker",
    metric: "A paid tool replaced, new revenue line",
    stack: "n8n / Claude",
    before:
      "Clients had no visibility into whether they show up in AI search. Some were being hallucinated about. The agency was paying a third party tool for the data.",
    built:
      "A scheduled system that tracks AI presence, position and citations across the top language models and outputs a readable report per client.",
    impact:
      "Replaced the paid subscription and opened a new recurring revenue line from the same client base.",
  },
  {
    slug: "revenue-attribution",
    cat: "Ops",
    name: "Revenue Attribution",
    metric: "Decisions on revenue, not lead count",
    stack: "n8n / MCP / Claude",
    before:
      "No way to connect ad spend to closed won revenue without manually pulling CSVs and joining them in a spreadsheet. Lead data in one place, ad data in another.",
    built:
      "An MCP server that exposes the lead platform's endpoints as tools the model can call directly: closed won attribution, won reports, calls, transcripts. It pairs with the ad data so one prompt joins spend with booked revenue per ad.",
    impact:
      "Ask which ads closed deals last month and get a real answer in seconds. Ad spend decisions move from lead count to booked revenue per creative.",
  },
];

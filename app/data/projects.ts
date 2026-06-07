// Real systems shipped inside US SEO agencies. Client and company names removed.

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
    slug: "cold-email-engine",
    cat: "Outreach",
    name: "Email Outreach Engine",
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
    slug: "reddit-comment-engine",
    cat: "Outreach",
    name: "Reddit Comment Engine",
    metric: "5+ hours a week per client, gone",
    stack: "n8n / Claude",
    before:
      "Finding relevant Reddit threads, drafting on-brand replies, and posting them took 5+ hours a week per client. Manual and repetitive.",
    built:
      "A two-part system. n8n searches Reddit, surfaces relevant threads, and drafts on-brand replies. An automation submits the approved comments and logs them.",
    impact:
      "5+ hours a week per client, gone. Across the roster, that is a full-time hire replaced by a scheduled workflow. Every comment is free traffic, and the threads keep ranking for months.",
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
    cat: "Ops",
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
    slug: "guest-post-engine",
    cat: "Content",
    name: "Guest Post Engine",
    metric: "Same cost per post at any volume",
    stack: "n8n / Claude",
    before:
      "Writing guest posts was manual, piece by piece. Brief the writer, draft the article, match the host site's tone, verify the backlink lands in the right place, revise. An hour or more per post, across a full link-building roster.",
    built:
      "An n8n workflow triggered by a web form. It takes a brief, fetches the host site, runs a Claude style analysis, then generates and humanizes the article. A quality gate checks the rest: word count in range, the client backlink placed once in the middle third, clean structure, and an AI score above 6.5. Posts that pass land in a formatted doc, the rest route to review.",
    impact:
      "One form submission, one ready-to-send doc. No writing time, no tone matching, no backlink hunting through drafts. Every client covered at the same cost per post, whatever the volume.",
  },
  {
    slug: "page-copy-pipeline",
    cat: "Content",
    name: "Page Copy Pipeline",
    metric: "More clients, no new writing hours",
    stack: "n8n / Claude",
    before:
      "Writing and briefing a page took hours per piece. A manual process that did not scale with client volume.",
    built:
      "A two-stage n8n pipeline. The team enters a brief in a web dashboard, the first workflow returns a draft, and the second improves it into a publish-ready version. Nobody needs workflow access.",
    impact:
      "Adding a client no longer adds writing hours. The pipeline handles the volume, so headcount stays flat while output goes up.",
  },
  {
    slug: "backlink-vetting",
    cat: "Outreach",
    name: "Backlink Vetting",
    metric: "4+ hours per outreach batch, now seconds",
    stack: "n8n / Slack",
    before:
      "25 minutes of manual checking per client before every outreach batch. Recommend a link from a site that already links to the client and you look like you do not know what you are doing.",
    built:
      "An automated pre-outreach check. It flags existing backlink relationships before the team sends anything.",
    impact:
      "25 minutes across 10+ clients is 4+ hours per outreach batch, now seconds. The team never pitches a site that already links to the client, and one bad recommendation kills credibility.",
  },
];

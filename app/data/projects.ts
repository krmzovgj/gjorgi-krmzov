// Real systems shipped inside agencies. Client and company names removed.

export type Project = {
  slug: string;
  cat: string;
  name: string;
  headline: string;
  metric: string;
  stack: string;
  deliverables?: string[];
  before: string;
  built: string;
  impact: string;
  // Optional. Dashboard snapshot first, then n8n workflows. When empty, the case
  // study reads as a clean text-led page (no placeholders).
  media?: { src: string; caption?: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "cold-email-engine",
    cat: "Outreach",
    name: "Email Outreach Engine",
    headline: "A cold email engine built into the agency dashboard",
    metric: "Adding inboxes costs just a Gmail seat",
    stack: "Next.js / Supabase / Gmail / n8n",
    deliverables: ["Cold email engine", "Sending dashboard", "Reply tagging"],
    before:
      "Outreach ran on a paid tool like Instantly, or the team just found addresses and sent from Gmail by hand. The paid tools bill you per inbox and per seat, so the cost goes up every time you add a sending account. Doing it by hand ate hours on finding emails, spacing out the sends, tracking replies, and figuring out which inbound was a real answer versus a bounce.",
    built:
      "It's a cold email engine that lives inside the agency dashboard, running on Next.js, Supabase, and the Gmail API. It runs multiple inboxes through OAuth with daily caps and rotation, finds and verifies prospect emails through Anymail Finder, and sends sequences of three messages on randomized gaps inside set send windows so the timing looks human. It does the follow up on its own and stops the second someone replies. Every inbound gets tagged as a reply, a bounce, or an autoresponder using a mix of rules and an LLM, and dead addresses drop out on their own. The team runs all of it from one screen.",
    impact:
      "Now adding an inbox just costs a Gmail seat, so the team can send more without the vendor bill going up every time. The send logic, the caps, and the tagging rules are ours to tune now, instead of being stuck with whatever a vendor lets us change. And nobody has to sit there running sequences and sorting inboxes by hand anymore.",
    media: [
      { src: "/work-media/outreach-dashboard.png", caption: "Dashboard" },
    ],
  },
  {
    slug: "ai-visibility-tracker",
    cat: "Reporting",
    name: "AI Visibility Tracker",
    headline: "Tracking whether clients show up in AI search",
    metric: "Paid tool dropped, now a revenue line",
    stack: "n8n / Claude / Sheets",
    deliverables: ["AI search tracking", "Client reports"],
    before:
      "Clients had no real way to know whether they were showing up in AI search. A few of them were actually getting hallucinated about, which is worse than being invisible. On top of all that, the agency was paying a third party every month just to get the data.",
    built:
      "It's a scheduled run in n8n that checks each client across the top language models and looks at three things, whether they show up at all, where they land, and what gets cited about them. Claude reads through the results and makes sense of them. Then it writes the whole thing up as a clean report for each client.",
    impact:
      "It replaced the paid subscription, so that monthly cost went away. The bigger thing is what it turned into. The agency now sells the reporting as its own recurring line to the same clients it already works with, so something they used to pay for is now something they get paid for.",
    media: [
      { src: "/work-media/ai-brand-visibility-dashboard.png", caption: "Dashboard" },
      { src: "/work-media/ai-brand-visibility-n8n.png", caption: "n8n workflow" },
    ],
  },
  {
    slug: "reddit-comment-engine",
    cat: "Outreach",
    name: "Reddit Comment Engine",
    headline: "Finds the right Reddit threads and drafts the replies",
    metric: "5+ hours a week saved per client",
    stack: "n8n / Claude / Sheets / Slack",
    deliverables: ["Thread discovery", "Reply automation"],
    before:
      "For every client we were spending 5+ hours a week on Reddit. Someone had to dig through threads to find the ones actually worth answering, write a reply that sounded like the client and not a bot, then go post it. It was all by hand and it was the same repetitive work every week.",
    built:
      "n8n searches Reddit and pulls out the threads that are actually worth replying to, then it uses Claude to draft a reply in the client voice. The draft shows up for us in Slack so someone can read it over. Once it's approved, n8n posts the comment and logs it in Sheets so we have a record of what went out.",
    impact:
      "That 5+ hours a week per client is gone now. Across the whole roster it adds up to roughly one person's worth of time back. The comments stick around too. The threads keep ranking, so people are still finding them months after we posted.",
    media: [
      { src: "/work-media/reddit-thread-discovery-n8n.png", caption: "Thread discovery (n8n)" },
      { src: "/work-media/reddit-comment-submission-n8n.png", caption: "Comment submission (n8n)" },
    ],
  },
  {
    slug: "revenue-attribution",
    cat: "Ops",
    name: "Revenue Attribution",
    headline: "Which ads actually closed deals, not just leads",
    metric: "Ad spend tied to booked revenue",
    stack: "n8n / MCP / Claude",
    deliverables: ["MCP server", "Attribution reporting"],
    before:
      "Tying ad spend to closed won revenue used to mean pulling CSVs by hand and joining them in a spreadsheet. The lead data sat in one place and the ad data in another, so somebody had to reconcile the two before any of it made sense. Nobody had time for that, so most months it just did not happen.",
    built:
      "I built an MCP server that gives the model the lead platform's own endpoints as tools it can call. That covers closed won attribution, won reports, calls, and transcripts. You pair that with the ad data, and then one prompt joins the spend to the booked revenue for each ad.",
    impact:
      "Now you can ask which ads closed deals last month and get a real answer back in seconds. You end up looking at each ad by the revenue it actually booked instead of just the number of leads it brought in.",
  },
  {
    slug: "blog-content-pipeline",
    cat: "Content",
    name: "Blog Content Pipeline",
    headline: "Finished posts without briefing a writer",
    metric: "No more freelance writer invoices",
    stack: "n8n / Claude / Google Docs / Google Drive / Slack",
    deliverables: ["Content pipeline", "WordPress publishing", "Article schema"],
    before:
      "Our blog posts, page copy, and guest posts came from a mix of outside freelancers and writing it in house. Every piece meant briefing a writer, waiting on a draft, then editing it back into shape. Outsourced posts ran $100 to $300+ each, and when we wrote in house we traded that bill for hours nobody was charging the client for.",
    built:
      "I built a two stage pipeline on n8n and Claude that runs from the dashboard, so anyone on the team can start it without coming to me. Stage one pulls the latest post from the destination site to match its voice, researches the outline, then writes the piece section by section with internal links and cited sources. Stage two does an editorial pass with fresh research and ships a WordPress ready version with a table of contents, key takeaways, and FAQ and Article schema. The same engine handles blog posts, page copy, and guest posts.",
    impact:
      "A piece that used to get briefed out or written by hand now drafts and gets optimized in a few minutes, and anyone on the team can start it. When we take on more clients we just run it more. We are not paying freelancers for the work and nobody is hiring a writer to keep up.",
    media: [
      { src: "/work-media/blog-content-draft-dashboard.png", caption: "Draft dashboard" },
      { src: "/work-media/blog-content-optimize-dashboard.png", caption: "Optimize dashboard" },
      { src: "/work-media/blog-content-draft-n8n.png", caption: "Draft workflow (n8n)" },
      { src: "/work-media/blog-content-optimize-n8n.png", caption: "Optimize workflow (n8n)" },
    ],
  },
  {
    slug: "keyword-ranking-reports",
    cat: "Reporting",
    name: "Keyword Ranking Reports",
    headline: "Ranking reports, no longer a manual job",
    metric: "5 to 10 hours a month back",
    stack: "n8n / Airtable / Sheets / Slack",
    deliverables: ["Ranking automation", "Client reports"],
    before:
      "Once a month someone on the team sat down and pulled ranking reports by hand for more than 10 clients. They went one client at a time, and within each client one location at a time, copying the numbers out as they went. The whole thing took 5 to 10 hours every month and nobody enjoyed it.",
    built:
      "An n8n workflow pulls the client list, runs the ranking reports, dedupes the data, and writes a clean sheet for each client. It does the same passes the person was doing by hand, just without anyone sitting there clicking through clients and locations.",
    impact:
      "Now nobody spends those 5 to 10 hours a month pulling reports. The sheets get built and land on time, and the person who used to do it got that time back to spend on actual client work.",
    media: [
      { src: "/work-media/keyword-ranking-dashboard.png", caption: "Dashboard" },
      { src: "/work-media/keyword-ranking-n8n.png", caption: "n8n workflow" },
    ],
  },
  {
    slug: "review-engine",
    cat: "Ops",
    name: "Review Engine",
    headline: "A review tool I rebuilt on Twilio",
    metric: "$6,000 a year saved",
    stack: "Twilio / n8n / Sheets",
    deliverables: ["Review routing", "Twilio system"],
    before:
      "We were paying $500 a month for a tool that ran our client feedback and sent out review requests. It did the job, but we had almost no control over how it worked, and the bill showed up every month whether we used it much or not.",
    built:
      "So I built our own version on Twilio. When a client is happy, they get sent to leave a Google review. When someone is unhappy, we catch that privately before they post anything public. Once it was running, there was no ongoing cost.",
    impact:
      "That works out to $6,000 a year saved, and it rolls out to every new client for free now that it is built. The review side is the part that matters most to me. Happy clients leave a Google review without us asking, so reviews go up and the local rankings tend to follow.",
    media: [
      { src: "/work-media/review-gen-n8n.png", caption: "n8n workflow" },
    ],
  },
  {
    slug: "link-reclamation",
    cat: "Ops",
    name: "Link Reclamation",
    headline: "Catching broken backlinks before they cost rankings",
    metric: "$200 to $500 saved per broken link",
    stack: "n8n / Slack",
    deliverables: ["Backlink monitoring", "Slack alerts"],
    before:
      "Clients pay real money for backlinks, and those links don't always stay up. When one breaks, rankings start to slip, but nobody on the team is sitting there checking link by link. So it usually goes unnoticed until it lands in a report weeks later, and by then the rankings have already taken the hit.",
    built:
      "I built a monthly scan that runs through the whole backlink profile and finds the ones that are broken. When it catches one, it pings the team in Slack so somebody actually sees it. Then it keeps checking that link every 7 days until it's fixed, so nothing gets lost after the first alert.",
    impact:
      "A broken link is somewhere between $200 and $500 of paid link value gone. If it catches even one a month for a client, that already covers what the whole thing costs to run. It's all built in n8n and there's no AI in it anywhere. Not a fancy build, but it does the job.",
    media: [
      { src: "/work-media/link-reclamation-orchestrator.png", caption: "Orchestrator (n8n)" },
      { src: "/work-media/link-reclamation-worker.png", caption: "Worker (n8n)" },
    ],
  },
  {
    slug: "guest-post-engine",
    cat: "Content",
    name: "Guest Post Engine",
    headline: "Turns a brief into a guest post ready to send",
    metric: "Same cost per post at any volume",
    stack: "n8n / Claude / Google Docs / Google Drive / Slack",
    deliverables: ["Guest post pipeline", "Quality gate"],
    before:
      "Guest posts got written one at a time. You brief the writer, wait for a draft, then check it against the host site so the tone matches, make sure the client backlink landed in the right spot, and send it back for revisions. That was an hour or more on every single post, and we were doing it across the whole link building roster.",
    built:
      "It is an n8n workflow that starts from a web form. It takes the brief, reads the host site, runs a Claude pass on the tone so the writing fits, then drafts the article and cleans up the phrasing so it reads like a person wrote it. After that a quality gate does the checking I used to do by hand. It confirms the word count is in range, the client backlink shows up once in the middle third, the structure is clean, and the AI score comes in above 6.5. Anything that clears the gate lands in a formatted doc, and anything that does not gets routed to a person.",
    impact:
      "One form submission turns into a doc that is ready to send. Nobody spends an hour writing it, matching the tone, or digging through a draft to find where the backlink ended up. Every client on the roster gets covered, and a post costs about the same whether we run a few or a lot of them.",
    media: [
      { src: "/work-media/guest-post-dashboard.png", caption: "Dashboard" },
      { src: "/work-media/guest-post-n8n1.png", caption: "Workflow, part 1 (n8n)" },
      { src: "/work-media/guest-post-n8n2.png", caption: "Workflow, part 2 (n8n)" },
    ],
  },
  {
    slug: "retention-analysis",
    cat: "Reporting",
    name: "Retention Analysis",
    headline: "Six years of payment data, down to the churn month",
    metric: "Found the month clients churn",
    stack: "n8n / Stripe / Airtable / Sheets",
    deliverables: ["Churn analysis", "LTV model"],
    before:
      "Six years of payment data was split between Stripe and Upwork, and nobody had ever pulled it together. There was no single view of what a client was worth over their lifetime, when they tended to churn, or how long they usually stayed. So deciding which clients to prioritize was basically a gut call.",
    built:
      "I used n8n to pull the whole payment history out of both Stripe and Upwork into one Airtable base. Then I tagged every client with their lifetime value, how long they had been around, and whether they had churned. Once that was in place I ran a cohort analysis in Sheets to find the month where a client either drops off or settles in for the long run.",
    impact:
      "The cohort analysis surfaced the exact month where a client either churns or stays for the long run. That one number tells the agency which clients to call and when to call them. Before this, retention was guesswork, and now there is a real number to act on.",
  },
  {
    slug: "page-copy-pipeline",
    cat: "Content",
    name: "Page Copy Pipeline",
    headline: "A brief turned into a publish ready page",
    metric: "More clients, no extra writing hours",
    stack: "n8n / Claude / Google Docs / Google Drive / Slack",
    deliverables: ["Copy pipeline", "Brief to page"],
    before:
      "Writing and briefing a single page used to run hours a piece. It was all manual, and that was fine when there were a handful of clients. As the client count grew, the process just stopped keeping up.",
    built:
      "It's a two stage pipeline in n8n. The team drops a brief into a dashboard, the first workflow comes back with a draft, and the second one rewrites that draft into a publish ready version. Nobody on the team needs access to the workflow itself, they just work off the dashboard.",
    impact:
      "So now the agency can take on a client without putting more writing hours on anyone's plate. The pipeline takes the extra volume, so output goes up even though the writing headcount stays where it is.",
    media: [
      { src: "/work-media/page-copy-dashboard.png", caption: "Dashboard" },
      { src: "/work-media/page-copy-draft-n8n.png", caption: "Draft workflow (n8n)" },
      { src: "/work-media/page-copy-optimize-n8n.png", caption: "Optimize workflow (n8n)" },
    ],
  },
  {
    slug: "backlink-vetting",
    cat: "Outreach",
    name: "Backlink Vetting",
    headline: "Flags any site that already links to the client",
    metric: "25 min per client, now seconds",
    stack: "n8n / Slack",
    deliverables: ["Outreach checks", "Duplicate flagging"],
    before:
      "Before every outreach batch, someone on the team spent about 25 minutes per client checking sites by hand. What you're trying to avoid is recommending a site that already links to the client. When that happens, you look like you don't know what you're doing.",
    built:
      "I built an automatic check in n8n that runs before outreach goes out and flags any site that already links to the client. If a site is already linking, it gets pulled before anyone pitches it, so nothing gets pitched twice.",
    impact:
      "At 25 minutes across 10+ clients, that's 4+ hours of checking per batch, and now it takes seconds. The team also never pitches a site that already links to the client, and one bad call is all it takes to lose credibility.",
    media: [
      { src: "/work-media/backlink-vetting-profilecheck.png", caption: "Profile check (n8n)" },
    ],
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

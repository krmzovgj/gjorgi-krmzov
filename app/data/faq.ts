// One source for the accordion markup and the FAQPage schema, so the two can
// never drift apart. Kept next to projects.ts per the DESIGN.md content rule.
export const FAQS = [
  {
    q: "We already have an auto reply. Can't we just add a booking link?",
    a: "You can. A link only gets the people who were going to book anyway, and my job is getting the rest onto a call with you.",
  },
  {
    q: "Our SDRs screen every request first. Does this go around them?",
    a: "No. You tell me who qualifies, like company size or a work email. Those requests get a link to book with whoever you pick, an SDR or an AE, and the rest go to your SDRs like they do now.",
  },
  {
    q: "Who writes the emails our leads get?",
    a: "I draft them in setup and you approve every one.",
  },
  {
    q: "Do you need access to our CRM?",
    a: "Yes. I need edit access to the parts I build, like workflows and sequences, and view access to your contacts and demo form. I test all of it on fake requests before a real one goes through.",
  },
  {
    q: "We're not on HubSpot or Salesforce. Does it still work?",
    a: "Yes, if your CRM has an API, like Pipedrive or Zoho. Part of it then runs on my side instead of inside your CRM.",
  },
  {
    q: "Is my company too small for this?",
    a: "Yes, if you get fewer than about 10 demo requests a month. Your team can answer that many by hand.",
  },
  {
    q: "What does it cost?",
    a: "It's a one time setup and then a monthly fee. You pay half the setup to start and the rest after it's running as agreed based on the service agreement. The monthly depends on how many demo requests you get, so I'll give you the number on the call.",
  },
];

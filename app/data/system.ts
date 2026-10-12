// "What happens when someone asks you for a demo": the framed grid under the
// statement. Every line here is a moment from data/journey.ts or an answer from
// data/faq.ts, so the grid and the sections around it never disagree. Sarah
// Lin and Northwind are the same made up lead as in How it works.

export const SYSTEM_TITLE = "What happens when someone asks you for a demo";

export type CellCopy = { title: string; text: string };

// Top left: the request and the reply a minute later.
export const REPLY = {
  copy: {
    title: "She hears back in a minute",
    text: "Sarah asks for a demo at 2:14 and has an email from your inbox at 2:15, with a link to book a call.",
  } satisfies CellCopy,
  request: {
    label: "Demo request",
    time: "2:14 PM",
    from: "Sarah Lin",
  },
  email: {
    from: "You",
    to: "Sarah Lin",
    time: "2:15 PM",
    subject: "Your demo",
    body: "Hi Sarah, happy to walk you through pricing for 12. Here's my calendar, pick any time that works.",
    action: "Pick a time",
  },
};

// Top right: the follow ups, and the ones that never go out once she books.
export type FollowUp = {
  when: string;
  what: string;
  state: "sent" | "booked" | "cancelled";
};

export const FOLLOW_UPS = {
  copy: {
    title: "The follow ups stop when she books",
    text: "If she hasn't booked by the next morning she gets a follow up. Once she books Friday at 10, the rest never go out.",
  } satisfies CellCopy,
  who: "Sarah Lin",
  rows: [
    { when: "Tue 2:15 PM", what: "First reply", state: "sent" },
    { when: "Wed 9:00 AM", what: "Follow up", state: "sent" },
    { when: "Wed 11:32 AM", what: "Booked Fri, 10:00 AM", state: "booked" },
    { when: "Fri 9:00 AM", what: "Follow up", state: "cancelled" },
    { when: "Next Tue", what: "Follow up", state: "cancelled" },
  ] satisfies FollowUp[],
};

// Middle row: two numbers straight from the story, and who stays in charge.
export const STATS = [
  { value: "1 min", label: "from her request to your reply" },
  { value: "1 hr", label: "before the call, she gets the link to join" },
];

export const CONTROL: CellCopy = {
  title: "You approve every email first",
  text: "You also decide who gets a link to book, like company size or a work email. Everyone else goes to your SDRs like they do now.",
};

// Bottom left: the note you get before the call.
export const BRIEF = {
  copy: {
    title: "You know who she is before the call",
    text: "You get a note on what her company sells and what she asked for, from her form and her company's website.",
  } satisfies CellCopy,
  name: "Sarah Lin",
  company: "Northwind",
  initials: "SL",
  when: "Fri, 10:00 AM",
  rows: [
    { key: "Sells", value: "Inventory software to wholesalers" },
    { key: "Asked for", value: "Pricing for a team of 12" },
    { key: "Source", value: "Her form and Northwind's website" },
  ],
};

// Bottom right: where it runs.
export type FlowIcon = "trigger" | "email" | "wait" | "branch" | "stop";

export const WORKFLOW = {
  copy: {
    title: "I build it inside your CRM",
    text: "It runs as workflows in your HubSpot or Salesforce, and I test it on fake requests before a real one goes through.",
  } satisfies CellCopy,
  name: "Demo request follow up",
  status: "Active",
  steps: [
    { icon: "trigger", text: "Demo form submitted" },
    { icon: "email", text: "Reply from your inbox" },
    { icon: "wait", text: "Wait until 9 AM next day" },
    { icon: "branch", text: "Not booked yet, follow up" },
    { icon: "stop", text: "Booked, stop the sequence" },
  ] satisfies { icon: FlowIcon; text: string }[],
};

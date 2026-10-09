// One demo request followed from the form to the call to Monday's email.
// Every line on the section lives here: the step sentences on the left and
// the words shown on the right (what Sarah wrote, what Dan sent, her reply,
// my Monday email) and the icon for each moment. Sarah, Dan, Northwind and
// the others are made up examples of the reader's own lead and rep.

export const JOURNEY_TITLE = "How it works";

export const JOURNEY_SUB = "Sarah asks you for a demo on a Tuesday afternoon.";

export const JOURNEY_NOTE =
  "If she'd missed the call, she'd have gotten a link to pick a new time. Every weekday I also send a test request through your form, so you hear from me first if anything breaks.";

// What the right side shows for each step. All type, no mock interface:
// a line someone wrote or the time something landed.
export type Art =
  // Something a person wrote, set as a quote, with who and when under it.
  | { kind: "quote"; text: string; by: string; size?: "lg" | "md" }
  // The booked slot, with the follow ups that won't go out struck through.
  | { kind: "booked"; when: string; struck: string[]; by: string }
  // Dan asks, Sarah answers. Her answer is the big line.
  | { kind: "reply"; ask: string; askBy: string; answer: string; answerBy: string }
  // The call itself: the time, large.
  | { kind: "call"; time: string; by: string };

// The small icon shown with each moment on the right (Phosphor, in Journey.tsx).
export type IconName =
  | "form"
  | "email"
  | "note"
  | "followup"
  | "calendar"
  | "reply"
  | "link"
  | "call"
  | "report";

export type Step = {
  day: string;
  time: string;
  text: string;
  icon: IconName;
  art: Art;
};

export const JOURNEY: Step[] = [
  {
    day: "Tuesday",
    time: "2:14 PM",
    text: "Sarah, a warm lead, fills out your demo form.",
    icon: "form",
    art: {
      kind: "quote",
      text: "Can we see pricing for a team of\u00a012?",
      by: "Sarah Lin from Northwind, on your demo form",
    },
  },
  {
    day: "Tuesday",
    time: "2:15 PM",
    text: "A minute later she has an email from Dan on your team with a link to book a call.",
    icon: "email",
    art: {
      kind: "quote",
      text: "Hi Sarah, happy to walk you through pricing for\u00a012. Here's my calendar, pick any time that works.",
      by: "Dan, 41 seconds after she asked",
      size: "md",
    },
  },
  {
    day: "Tuesday",
    time: "2:15 PM",
    text: "Dan gets a note on who she is and what she asked.",
    icon: "note",
    art: {
      kind: "quote",
      text: "Sarah's at Northwind, they're 84 people and sell inventory software to wholesalers. She wants pricing for a team of\u00a012.",
      by: "Dan's note, from her form and Northwind's website",
      size: "md",
    },
  },
  {
    day: "Wednesday",
    time: "9:00 AM",
    text: "She hasn't booked by the next morning, so Dan follows up.",
    icon: "followup",
    art: {
      kind: "quote",
      text: "Hi Sarah, in case my email got buried yesterday, here's my calendar again.",
      by: "Dan, Wednesday at 9:00 AM",
      size: "md",
    },
  },
  {
    day: "Wednesday",
    time: "11:32 AM",
    text: "She books Friday at 10, so the rest of the follow ups never go out.",
    icon: "calendar",
    art: {
      kind: "booked",
      when: "Friday, 10:00 AM",
      struck: ["Follow up on Friday", "Follow up next Tuesday"],
      by: "On Dan's calendar",
    },
  },
  {
    day: "Thursday",
    time: "10:00 AM",
    text: "The day before, Dan asks her to confirm, and she replies yes.",
    icon: "reply",
    art: {
      kind: "reply",
      ask: "Still good for tomorrow at 10? Reply yes and you're all set.",
      askBy: "Dan, Thursday at 10:00 AM",
      answer: "Yes, see you then.",
      answerBy: "Sarah, 10:41 AM",
    },
  },
  {
    day: "Friday",
    time: "9:00 AM",
    text: "She gets the link to join an hour before the call.",
    icon: "link",
    art: {
      kind: "quote",
      text: "Here's the link for 10:00, see you soon.",
      by: "Dan, Friday at 9:00 AM",
    },
  },
  {
    day: "Friday",
    time: "10:00 AM",
    text: "Sarah and Dan are on the call.",
    icon: "call",
    art: {
      kind: "call",
      time: "10:00",
      by: "Sarah and Dan, Friday",
    },
  },
  {
    day: "Monday",
    time: "8:00 AM",
    text: "You see how fast she heard back and that she showed up.",
    icon: "report",
    art: {
      kind: "quote",
      text: "Last week Sarah heard back in 41 seconds and showed up, and so did Omar, and Jess is booked for Thursday.",
      by: "From me, Monday at 8:00 AM",
      size: "md",
    },
  },
];

// Single Cal.com event behind every "book a call" CTA across the site.
export const BOOKING_URL = "https://cal.com/gjorgi-krmzov/30min";

// Kept as a named alias so per-placement UTM attribution still reads clearly;
// it now points at the same call as BOOKING_URL.
export const AUDIT_URL = "https://cal.com/gjorgi-krmzov/30min";

// Behind every LinkedIn link on the site (nav, footer, the calculator's
// "or DM me"), so the handle only ever changes here.
export const LINKEDIN_URL = "https://www.linkedin.com/in/krmzov/";

// Tags an outbound Cal link with the CTA that was clicked. Cal stores query
// params on the booking, so a booked call traces back to its exact placement.
export const withUtm = (url: string, placement: string) =>
  `${url}?utm_source=site&utm_medium=cta&utm_content=${placement}`;

// Single Cal.eu event behind every "book a call" CTA across the site.
export const BOOKING_URL = "https://cal.eu/gjorgi-krmzov/hours";

// Kept as a named alias so per-placement UTM attribution still reads clearly;
// it now points at the same call as BOOKING_URL.
export const AUDIT_URL = "https://cal.eu/gjorgi-krmzov/hours";

// TODO: confirm the real LinkedIn handle, then swap this one value.
export const LINKEDIN_URL = "https://www.linkedin.com/in/krmzovgj/";

// Tags an outbound Cal link with the CTA that was clicked. Cal stores query
// params on the booking, so a booked call traces back to its exact placement.
export const withUtm = (url: string, placement: string) =>
  `${url}?utm_source=site&utm_medium=cta&utm_content=${placement}`;

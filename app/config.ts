// Single place to wire the booking links (both verified live on Cal.eu).
export const BOOKING_URL = "https://cal.eu/gjorgi-krmzov/30min";

// 15 minute free Hours Audit. Separate Cal event from the 30 min build/scoping
// call so bookings are attributable per offer.
export const AUDIT_URL = "https://cal.eu/gjorgi-krmzov/hours-audit";

// TODO: confirm the real LinkedIn handle, then swap this one value.
export const LINKEDIN_URL = "https://www.linkedin.com/in/krmzovgj/";

// Tags an outbound Cal link with the CTA that was clicked. Cal stores query
// params on the booking, so a booked call traces back to its exact placement
// (which offer is already covered by the two separate events above).
export const withUtm = (url: string, placement: string) =>
  `${url}?utm_source=site&utm_medium=cta&utm_content=${placement}`;

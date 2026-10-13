# Design system: Gjorgi Krmzov portfolio

The hero is the reference implementation. Every section follows it. When in doubt,
match the hero (`app/components/Hero.tsx` + the `.hero` block in `app/globals.css`).

## Principles
- Editorial, not "landing page." Big type and negative space do the work.
- Restraint over decoration. Remove elements before adding them.
- One idea per section, stated plainly in real words.

## Color (tokens in `globals.css :root`)
- Canvas `--bg #ffffff`, surfaces `--bg-2 #f6f6f7`
- Ink `--text #0e0e0f`, dim `--text-dim #56565a`, hairlines `--line` / `--line-strong`
- Accent `--accent #ba2c13`, used ONLY as a tiny mark. Never large fills, never on
  big type.
- Imagery is black and white, with one exception: the hero portrait runs in
  colour (Gjorgi's call, 2026-09-01). Everything else stays mono.

## Typography
- ONE family: Bricolage Grotesque (variable). `--font-display` and `--font-body`
  both resolve to it.
- Display is LIGHT. Big statements use weight 350-400, very tight leading
  (0.6-0.95), tight tracking (about -0.03em). Never heavy or black.
- Body / UI: weight 400-500, leading about 1.4, measure 45-75ch.
- No uppercase labels in new work. The footer keeps its own.
- Giant statements use controlled line breaks + masked line-rise. For the very
  largest type, `font-optical-sizing: none` keeps line widths predictable.
- Type scale lives in clamp tokens (`--fs-*`). Line-height and tracking follow
  size, they are not separate rules.

## Layout and space
- Generous negative space. The hero is centred (Gjorgi's call, 2026-10-13), and
  the sections below it stay anchored to one left edge.
- Alignment: centre only short display lines. Text blocks stay left aligned, and
  a centred column of left aligned text is fine.
- The How it works card is the only card on the site.
- Gutters `--pad-x`, vertical rhythm `--section-y`, max width `--maxw` (1920px).
- Full-bleed only where it earns it.

## Motion
- Ease `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease`), duration 0.6-0.9s.
- The hero entrance runs 0.7s for the headline lines and 0.5s for the fades,
  readable within about 1s.
- Patterns: masked line-rise (headings), fade-up (support), blur + scale + opacity
  morph (media). Sequence the text first, media after.
- Animate ONLY `transform` / `opacity` / `filter` (GPU compositor). Never animate
  layout props (width, top, height, etc.).
- Reveal on scroll once (`useInView`, or the `Reveal` component which has a
  visibility safety timer so text can never get stranded hidden).
- `prefers-reduced-motion` fallback on EVERY animation (`useReducedMotion`). Lenis
  smooth scroll is already disabled under reduced motion.

## Signature devices
- A dot grid behind the whole page (`body::after`, under the content), full
  through the middle and fading out slightly toward the left and right sides.
- `mix-blend-mode: difference` for type / logo that crosses B&W imagery: it
  auto-inverts (dark on light, light on dark).
- Minimal fixed nav: text `gk` logo (blend) + one CTA. `.nav` is `display: contents`
  so the logo blends against the page behind it.

## Hero
- Centred, no photo for now. The headline runs on 3 lines above 760px and 4 at
  760px and below. It fills the first screen with its content centred, and the
  statement starts below the fold (Gjorgi's call, 2026-10-13).
- `Hero.tsx` and the `.hero` block stay the reference implementation.

## Kill-list (never reintroduce)
- No em dashes anywhere. Use periods or commas.
- No pulsing / "pinging" dots.
- No badges, pill rows, or eyebrow role-labels as decoration.
- No generic AI hero: no badge or pill above the headline, no sub line under it,
  no two equal buttons, no scribbles or arrows. The hero is a centred headline
  with one button and one text link.
- No framed or bento grids, no stat strips like "1 min", no mock UI cards
  outside How it works, no decorative lines or scribbles around the photo.
- No placeholder / v1 / lorem content. Real copy only, from `app/data` + the offer.

## Accessibility
- Split or masked text: `aria-label` on the element, `aria-hidden` on the visual
  spans.
- Keep `:focus-visible` outlines. Verify contrast where type crosses imagery.
- Honor reduced motion everywhere.

## Performance
- `mix-blend-mode` plus large images is GPU-heavy and hangs headless screenshots.
  Use blend sparingly (one hero instance) and verify those in the live browser or
  via computed styles, not screenshots.
- Size and optimize images; prefer transform / opacity / filter for animation.

## Content
- Single source of truth: `app/data/projects.ts` (+ layout metadata). Real metrics
  only.
- Every "book a call" CTA points at one Cal.com event via `BOOKING_URL` /
  `AUDIT_URL` in `app/config.ts`. Change the event in one place, not per CTA,
  and keep the duration in the copy in step with the event.

## Voice and positioning
- Lead with the client's OUTCOME, never a job title. Do NOT label him an "AI and
  automation engineer" (or any title); say what he delivers ("automated systems
  that remove the manual work", "your team takes on more").
- Voice reference: Nick Saraev (nicksaraev.com). Direct, concrete, money and time
  focused, no fluff or guru-speak. Second person ("you / your team").
- Back every claim with real numbers from `app/data` and the offer.

## Section status
- [x] Nav, Hero (reference implementation)
- [x] Statement (outcome-led copy)
- [x] Selected Work (4-column compact cards, type-only; media slot can be added later)
- [ ] Process
- [ ] Background / About
- [ ] Principles
- [ ] Contact
- [ ] Footer (giant wordmark)

Redesign top-down, one section per step, to this system.

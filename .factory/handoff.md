# Handoff — Timezone Slot Proof v1

## What shipped

A complete static, local-first booking-hours validator built with Vite and vanilla TypeScript.

- Accepts weekly working hours with multiple windows, day selection, duration, interval, start date, and up to five IANA invitee timezones.
- Imports availability-only ICS files in-browser. `VEVENT` and `AVAILABLE`, timed values, UTC/TZID values, one-off windows, and weekly `RRULE` with `BYDAY`, `INTERVAL`, `COUNT`, and `UNTIL` are supported.
- Generates up to 30,000 valid meeting starts across the next 18 months and projects each instant into every selected zone.
- Detects skipped spring-forward source times, repeated fall-back source times, invitee wall-time shifts, and offset changes that preserve wall time.
- Presents an attention ledger, summary counts, filterable/paginated matrix, complete CSV, print/PDF, and a configuration-only review link.
- Stores the last weekly configuration in local storage. ICS content is never persisted or included in a link.
- Includes explicit initial, loading, validation-error, ICS-error, result, no-anomaly, truncation, and offline states.
- Includes an offline service worker, web app manifest, Azure Static Web Apps routing/security headers, privacy and terms pages, robots file, and sitemap.

## Visual system and assets

The required brutalist concrete-and-moss system is recorded in `.factory/design.md`, including palette, typography, spacing, interaction, responsive, and reduced-motion policies.

The hero illustration was generated specifically for this product with `/opt/fleet/lib/gen-image.sh` using the factory-image deployment on 2026-08-27. The source PNG and prompt sidecar are in `assets/src/`; responsive 720 px and 1280 px WebP exports are in `public/assets/`. Visual review found no text artifacts, logos, people, brands, or misleading UI. The mobile asset is 47,592 bytes and the large asset is 184,706 bytes, both below the 300 KB image budget.

## Run and deploy

```sh
npm install
npm test
npm run build
npm run preview
```

Factory build command: `npm run build`

Deploy directory: `./dist` (`dist/index.html` is present at the root).

## Verification — 2026-08-27

- `npm test`: 3 files, 10 tests passed. Seeded cases cover the 2026 New York spring gap, New York fall fold, temporary US/UK cross-zone shifts, IANA half-hour offsets, ICS parsing/expansion, recurrence rejection, and 18-month range behavior.
- `npm run build`: passed from the lockfile; Vite 7 production build generated `dist/`.
- Production initial JS: 26,360 bytes raw / 10.10 KB gzip (budget: 200 KB).
- Production CSS: 20,300 bytes raw / 5.30 KB gzip (budget: 50 KB).
- Factory `verify-url.sh`: passed at desktop and 390 px; title, `lang`, one `h1`, main landmark, image alt, button labels, and console errors all clean. Recorded load: 554 ms on the local preview.
- Playwright workflow: invalid-zone recovery, full 6,272-start weekly proof, problem filtering, 390 px layout, and 16-start ICS import all passed; zero page-level horizontal overflow and zero console/page errors. The wide matrix intentionally scrolls inside its labelled region.
- axe-core 4.13 in Playwright: zero WCAG 2 A/AA violations on both the initial form and rendered results.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.0 s, LCP 1.4 s, total blocking time 10 ms, CLS 0. INP is not produced for a synthetic no-interaction navigation run.
- `/privacy/` and `/terms/`: both return their dedicated documents from the production preview.

## Privacy and accessibility

There are no third-party runtime fonts, scripts, analytics, calendar credentials, or network APIs. All schedule and ICS work happens locally. Native form controls, visible 3 px focus states, a skip link, ordered headings/landmarks, live error/status regions, minimum 44 px targets, status text in addition to color, table semantics, reduced-motion handling, and mobile layouts are included.

## Known boundaries

- An ICS file must use one common valid IANA timezone. All-day events and daily/monthly/yearly recurrences are rejected with an actionable message; availability can be re-exported as one-off or weekly timed windows.
- Results use the IANA data shipped by the visitor's browser, so the exact data version is browser-dependent.
- This is a configuration proof, not an audit of Calendly, Cal.com, SavvyCal, or any other scheduler. It cannot see provider overrides, busy calendars, buffers, limits, or stale provider timezone data.
- Very dense configurations are capped at 30,000 starts and labelled as truncated; users can narrow hours or increase the interval.

## Suggested next steps

- Add exception-date and holiday inputs without requiring calendar OAuth.
- Add DAILY/MONTHLY RRULE expansion if real availability exports demonstrate demand.
- Add an optional import mapping preset for common scheduler availability exports.

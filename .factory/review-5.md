# Adversarial first-read review 5 — PASS

**Reviewed:** 2026-08-28 UTC  
**Live URL:** <https://timezone-slot-proof.sociobot.in>  
**Contexts:** fresh Chromium at 390 × 844 and 1440 × 1000; clean clone at `/tmp/timezone-slot-proof-review5-bJEhyb`  
**Verdict:** **PASS**

No blocking, high, medium, or minor findings remain. The live product is clear, tryable, and scoped honestly for the booking-hours job in the brief.

## Cold first screen

Before scrolling, I understood this as a check that shows whether weekly booking hours appear correctly across time zones when clocks change. It is for independent professionals who publish booking links. I should click **“Try it with sample data”** first; it says **“See a five-zone daylight-saving check right away.”**

All three answers were available in the first 390 px and desktop screens, from:

- “Check booking hours across time zones”
- “For independent professionals with booking links. Check how weekly booking hours appear before daylight saving changes.”
- “Try it with sample data” / “See a five-zone daylight-saving check right away.”

The live home page had no console errors and no horizontal overflow at either viewport. Its concrete/moss palette, industrial type, proof-board grid, and original scheduling-slab image agree with `.factory/design.md` and are distinct from a generic SaaS template.

## Copy audit

All complete landing-page and README sentences are ≤22 words. No banned marketing adjective appeared. Current UI terms are consistent: **booking hours**, **booking-hours range**, **bookable time**, **client time zone**, **calendar file**, and **check**. Labels/control fragments were also checked: result-naming verbs are used for `Try it with sample data`, `Check booking hours`, `Export CSV`, `Copy review link`, `Print or save as PDF`, and `Show clock changes`. Headings make sense independently.

### Landing page and populated demo

| Words | Sentence |
| ---: | --- |
| 5 | Check booking hours across time zones |
| 6 | For independent professionals with booking links. |
| 10 | Check how weekly booking hours appear before daylight saving changes. |
| 9 | See a five-zone daylight-saving check right away. |
| 5 | Sample needs no calendar login |
| 5 | Sample runs in this browser |
| 5 | Export the check as CSV |
| 6 | Your booking hours stay in this browser. |
| 9 | The check uses your browser’s time-zone rules. |
| 9 | Use the time zone set on your booking page. |
| 7 | The check covers the next 18 months. |
| 12 | Use a calendar export with availability entries. The file stays in this browser. |
| 11 | Use names such as America/New_York. Add up to five client time zones. |
| 9 | Compare this check with your booking page before publishing. |
| 13 | Run a check to see bookable times, clock-change flags, and a CSV export. |
| 8 | Add the weekly times that people can book. |
| 11 | See each bookable time in the client time zones you choose. |
| 9 | Clock-change flags show shifted, skipped, and repeated bookable times. |
| 10 | Download the full check to compare with your booking page. |
| 17 | It checks the hours you enter. It does not read your scheduler, calendar, overrides, or busy times. |
| 7 | Demo — sample data, nothing is saved. |
| 10 | This five-zone check is separate from your own booking hours. |
| 3 | Sample booking-hours check |
| 3 | Shared booking-hours check |
| 4 | Read-only weekly booking-hours check. |
| 7 | It opens with the shared booking hours. |
| 5 | It contains no calendar file. |
| 7 | 22 bookable times need a closer look. |
| 12 | 158 bookable times tested across 5 client time zones over 18 months. |
| 9 | Download every generated bookable time, not just rows shown. |
| 7 | First flagged bookable times, in chronological order. |
| 9 | The local time moved +60 minutes after clocks changed. |
| 9 | The local time moved -60 minutes after clocks changed. |
| 9 | This local time occurs twice when clocks move back. |
| 11 | The meeting ends during a time skipped when clocks move forward. |
| 5 | 22 rows in this view |
| 3 | Projected bookable times. |
| 7 | Time-zone abbreviations appear under each local time. |
| 3 | Unavailable local time |
| 11 | How these booking hours appear using your browser’s current time-zone rules. |
| 9 | Compare the CSV with your booking page before publishing. |

### README

| Words | Sentence |
| ---: | --- |
| 12 | Check booking hours across time zones before daylight saving surprises a client. |
| 8 | It is for independent professionals with booking links. |
| 6 | Try the five-zone sample at `https://timezone-slot-proof.sociobot.in/?demo=1`. |
| 7 | The sample starts with a completed check. |
| 8 | It is separate from your saved booking hours. |
| 8 | Add weekly booking hours or a calendar file. |
| 10 | Check up to five client time zones for 18 months. |
| 7 | Mark shifted, skipped, and repeated bookable times. |
| 11 | Export every generated bookable time as CSV or print it. |
| 12 | Copy a read-only weekly booking-hours check that opens with its result. |
| 7 | This tool checks the hours you enter. |
| 11 | It does not read your scheduler, calendar, overrides, or busy times. |
| 5 | Requires Node.js 20 or newer. |
| 8 | `npm run build` is the factory build command. |
| 13 | It writes the deployable static site to `./dist`, with `dist/index.html` at its root. |
| 13 | `npm test` builds the site, runs unit tests, and runs the browser suite. |
| 6 | It includes every claim in `.factory/claims.json`. |
| 7 | The suite also checks static deployment headers. |
| 15 | For a browser smoke test, serve the build and run the factory verifier if available. |
| 7 | The sample check makes no third-party requests. |
| 9 | Weekly booking hours can be saved in this browser. |
| 12 | Calendar-file contents stay in the open page and never enter review links. |
| 4 | See Privacy and Terms. |
| 1 | MIT. |
| 2 | See LICENSE. |

No copy flags and no unlisted claim-like sentence remain. The retained operational statements map to the tested claims below.

## Demo and sandbox

The visible home action opens `/?demo=1` in one click. The first mobile viewport is already a populated check: **Bookable times tested** was visible at y=700 in an 844 px viewport. The sample is a realistic Sunday 01:30–02:30 New York booking-hours range projected into London, Kolkata, Sydney, Tokyo, and São Paulo. It shows 158 tested bookable times plus shifted, skipped, and repeated rows.

The persistent banner is **“Demo — sample data, nothing is saved.”** and includes **Reset demo** and **Start for real**. With real storage pre-seeded as `timezone-slot-proof:config=REAL_VALUE`, loading and resetting live `/demo` left `REAL_VALUE` unchanged; exit returned to `/`. No `demo:` key appeared because the documented demo namespace is in memory. The live request capture contained only the product origin. A cache-warmed live offline reload still showed the populated check.

## Claims and clean-clone verification

I read `.factory/claims.json`, installed the clean clone, and ran every exact listed command. All passed. A final complete `npm test` passed (16 unit/deployment tests and 16 browser tests).

| Claim id | Result |
| --- | --- |
| `demo-isolation` | PASS — `npm test -- --grep @claim:demo-isolation` |
| `dst-check` | PASS — `npm test -- --grep @claim:dst-check` |
| `csv-export` | PASS — `npm test -- --grep @claim:csv-export` |
| `review-link` | PASS — `npm test -- --grep @claim:review-link` |
| `local-only` | PASS — `npm test -- --grep @claim:local-only` |
| `no-login` | PASS — `npm test -- --grep @claim:no-login` |
| `offline-demo` | PASS — `npm test -- --grep @claim:offline-demo` |
| `normal-config-local` | PASS — `npm test -- --grep @claim:normal-config-local` |
| `calendar-file-local` | PASS — `npm test -- --grep @claim:calendar-file-local` |
| `normal-range-and-timezone-rules` | PASS — `npm test -- --grep @claim:normal-range-and-timezone-rules` |
| `no-scheduler-access` | PASS — `npm test -- --grep @claim:no-scheduler-access` |
| `print-export` | PASS — `npm test -- --grep @claim:print-export` |

These tests assert observable outputs, including exact 158/18/2/2 sample values, every CSV data row, a matching populated read-only review link, no third-party requests, offline reload, storage isolation, calendar-file non-persistence, a known normal-flow conversion, and browser print invocation.

## Structure, accessibility, and links

- `/`, `/demo`, `/privacy/`, `/terms/`, and the missing-route view have route-appropriate titles, descriptions, canonical links, OG/Twitter metadata, favicon, 180 px touch icon, one h1, `lang=en`, and one main landmark. The product social SVG is 1200 × 630.
- `/not-a-real-route` returns HTTP 404 with a designed **Page not found** h1 and a way home. (The browser’s expected failed-resource notice for the intentionally 404 document is not a normal-route console error.)
- Forward navigation focuses `#demo-route-title`; Back focuses `#hero-title` and announces “Home loaded.”
- The shared header/footer, skip link, Privacy/Terms links, Param Factory attribution, and build id are present on all audited routes. Every discovered internal navigation target returned HTTP 200.
- Live Axe WCAG 2 A/AA scans returned zero violations on home, demo, Privacy, Terms, and 404. The live 390 px document width was exactly 390 px.
- CSP, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin` were returned by the live host.

## Earlier finding confirmation

I read `review-1.md`–`review-4.md`, `polish-1.md`–`polish-4.md`, and the previous handoff. The following confirms every previous finding in source and on the live site, rather than accepting earlier fixed labels.

| Earlier ids | Confirmed current state |
| --- | --- |
| F-1-1 | Fixed: the first mobile screen names the audience, job, and first action. |
| F-1-2 | Fixed: both demo URLs show an isolated, populated five-zone sample with banner, reset, and exit. |
| F-1-3 | Fixed: 12 exact tagged claim entries exist and all commands passed in the clean clone. |
| F-1-4, F-2-1 | Fixed: `/demo` is real and a missing route is branded HTTP 404. |
| F-1-5, F-3-2 | Fixed: all public routes share the shell, skip link, live region, and heading-focus behavior. |
| F-1-6 | Fixed: every audited route has route-specific metadata. |
| F-1-7, F-1-8, F-3-3, F-4-2 | Fixed: visitor copy uses plain booking-hours and clock-change language; the exposed specialist terms are absent. |
| F-1-9, F-2-2 | Fixed: primary, filter, and export controls name their outcomes. |
| F-1-10, F-1-11 | Fixed: README opening/build copy is under the cap. |
| F-1-12, F-4-3 | Fixed: terms are standardised across UI, generated result, README, and copy audit. |
| F-1-13, F-1-14, F-1-19, F-1-22, F-1-30, F-1-36, F-1-41, F-1-42, F-4-4 | Fixed: five zones, 18 months, exact states/counts, and normal conversion have exact assertions. |
| F-1-15, F-1-16, F-1-17 | Fixed: no-login, browser-only traffic, and complete CSV each have an observable claim test. |
| F-1-18, F-1-24, F-1-48, F-1-49, F-1-50 | Fixed: normal storage, in-memory demo, local calendar-file handling, review-link exclusion, and same-origin traffic are tested/documented. |
| F-1-20, F-1-21, F-1-45 | Fixed: cache-warmed offline demo, 390 px layout, and touch-target behavior are tested and live-verified. |
| F-1-23, F-1-40, F-1-46 | Fixed: parser and unsupported-file implementation promises are absent from visitor copy. |
| F-1-25, F-1-26, F-1-27, F-1-28, F-1-29, F-1-32, F-1-33, F-1-34, F-1-37, F-1-38, F-1-43, F-1-47 | Fixed: only the narrow tested scheduler/browser scope remains; unsupported, deterministic, free, and algorithm marketing is removed. |
| F-1-31, F-1-44, F-4-1, F-4-5 | Fixed: CSV is complete, print calls the browser print action, and review links reopen matching read-only weekly checks without calendar contents. |
| F-1-35, F-1-39 | Fixed: README names the audience/job and uses plain input language. |
| P2-1 | Fixed: hashed assets have immutable cache headers. |
| P3-1 | Fixed: validation summary is focusable and announced. |
| P3-2 | Fixed: suggested client zones are distinct, as unit-tested. |
| F-3-1 | Fixed: a completed result is in the first 390 px demo viewport. |
| F-3-4, F-3-5, F-3-6 | Fixed: normal range/rules, scheduler scope, and print each have exact claims/tests. |
| F-3-7, F-4-7 | Fixed: Demo and Privacy remain visible and focusable in the phone header; target tests pass. |
| F-4-6 | Fixed: direct demo navigation focuses the route h1. |

## Missed leverage

No extra AI, sync, or import/export capability is implied by the brief. This is a deterministic local configuration check; AI would be decorative and conflict with the offline/privacy-first job. The useful implied capabilities are present: weekly-hour entry, calendar-file import, CSV/PDF output, and a configuration-only review link. No provider keys or AI runtime calls were found.

## Findings

None.

## What would make this perfect

No product change is identified. Keep the existing claim, demo, metadata, and mobile route/focus checks passing on future releases.

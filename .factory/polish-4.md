# Polish round 4 — repair record

**Candidate repaired:** `15d788906a7df9e9462ced43f5afdee36e6fdbd7`  
**Reviews and prior repairs read:** `review-1.md` through `review-4.md`; `polish-1.md` through `polish-3.md`  
**Repair commit:** `461d796b56fccef65e0c58cd10264f4ece494141`

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained the named audience, job headline, and first action above the phone fold. | Mobile route test; `evidence-polish-4/demo-mobile.png`; live cold check. |
| F-1-2 | Retained the isolated five-zone `?demo=1` and `/demo` sample with banner, reset, exit, and in-memory data. | `@claim:demo-isolation`, `@claim:offline-demo`; demo screenshot; live cold check. |
| F-1-3 | Expanded the inventory to twelve exact tagged browser claim tests. | `.factory/claims.json`; clean-clone commands. |
| F-1-4 | Retained explicit `/demo` rewrite and branded HTTP 404 override. | `src/deployment.test.mjs`; route test; live status check. |
| F-1-5 | Retained shared shell, skip links, route announcements, and heading focus; added usable phone navigation. | Route/mobile test; all-route Axe sweep; live route check. |
| F-1-6 | Retained route-specific title, canonical, OG, Twitter, favicon, and touch icon metadata. | `src/deployment.test.mjs`; live head check. |
| F-1-7 | Retained plain booking-hours, bookable-times, calendar-file, and CSV wording. | Copy audit; copy browser test. |
| F-1-8 | Replaced the remaining visitor-facing `DST` control with **Show clock changes**. | Copy browser test; demo screenshot; live demo check. |
| F-1-9 | Retained result-naming sample and setup actions. | Route test; live landing check. |
| F-1-10 | Retained the split, under-22-word README introduction. | `.factory/copy-audit.md`. |
| F-1-11 | Retained the split, under-22-word README verification explanation. | `.factory/copy-audit.md`. |
| F-1-12 | Replaced range/start vocabulary with **booking-hours range**, **bookable times tested**, **first flagged bookable times**, and **Bookable-time table**. | Copy browser test; copy audit terminology table; live demo check. |
| F-1-13 | Retained measured five-zone, 18-month sample scope. | `@claim:dst-check`. |
| F-1-14 | Strengthened the sample assertion to exact shifted, skipped, and repeated values and matching ledger entries. | `@claim:dst-check`. |
| F-1-15 | Retained the scoped no-login sample fact and test. | `@claim:no-login`. |
| F-1-16 | Retained same-origin browser-only demo traffic. | `@claim:local-only`. |
| F-1-17 | Strengthened CSV export from existence to exact every-row equality. | `@claim:csv-export`. |
| F-1-18 | Retained normal booking-hours local storage without demo leakage. | `@claim:normal-config-local`. |
| F-1-19 | Retained a known browser time-zone conversion in normal flow. | `@claim:normal-range-and-timezone-rules`. |
| F-1-20 | Retained cache-warmed offline demo reload. | `@claim:offline-demo`. |
| F-1-21 | Retained usable local offline calculation. | `@claim:offline-demo`. |
| F-1-22 | Retained exact 18-month generated range. | `@claim:dst-check`; `@claim:normal-range-and-timezone-rules`. |
| F-1-23 | Kept parser implementation detail out of visitor copy. | Copy audit; ICS unit tests. |
| F-1-24 | Retained in-memory calendar-file handling and disabled review links for calendar files. | `@claim:calendar-file-local`. |
| F-1-25 | Retained exact scheduler-access scope. | `@claim:no-scheduler-access`. |
| F-1-26 | Retained concrete CSV comparison guidance. | Copy audit; live demo check. |
| F-1-27 | Retained task guidance instead of algorithm marketing. | Copy audit. |
| F-1-28 | Retained browser time-zone-rule wording and conversion test. | `@claim:normal-range-and-timezone-rules`. |
| F-1-29 | Kept unsupported comparison promises removed. | Copy audit. |
| F-1-30 | Retained only measured clock-change labels. | `@claim:dst-check`. |
| F-1-31 | Made **Copy review link** open a populated, read-only weekly result and registered an exact claim. | `@claim:review-link`; `evidence-polish-4/review-link.png`; live shared-link check. |
| F-1-32 | Kept deterministic-proof marketing removed. | Copy audit. |
| F-1-33 | Retained the tested scheduler-access scope wording. | `@claim:no-scheduler-access`. |
| F-1-34 | Kept untested free/local-first marketing removed. | Copy audit. |
| F-1-35 | Retained README audience and job wording. | Copy audit. |
| F-1-36 | Retained README sample range and zone wording. | `@claim:dst-check`. |
| F-1-37 | Retained normal and calendar-file scheduler-flow coverage. | `@claim:no-scheduler-access`. |
| F-1-38 | Kept deterministic wording removed. | Copy audit. |
| F-1-39 | Retained plain README input wording. | Copy audit. |
| F-1-40 | Kept parser-detail README promises removed. | Copy audit; ICS unit tests. |
| F-1-41 | Retained normal-flow range and conversion assertion. | `@claim:normal-range-and-timezone-rules`. |
| F-1-42 | Added exact sample state counts and ledger assertions. | `@claim:dst-check`. |
| F-1-43 | Kept unsupported offset marketing removed. | Copy audit. |
| F-1-44 | Retained observable CSV and print actions; CSV now proves completeness. | `@claim:csv-export`; `@claim:print-export`. |
| F-1-45 | Retained offline behavior and added/kept complete 390 px target checks. | `@claim:offline-demo`; mobile route test. |
| F-1-46 | Kept parser scope out of visitor promises. | Copy audit; ICS unit tests. |
| F-1-47 | Retained tested no-scheduler scope. | `@claim:no-scheduler-access`. |
| F-1-48 | Retained browser-local traffic assertions. | `@claim:local-only`. |
| F-1-49 | Updated demo documentation for reset, exit, storage separation, and weekly review links. | `.factory/demo.md`; `@claim:demo-isolation`; `@claim:review-link`. |
| F-1-50 | Retained narrow, testable sample request scope. | `@claim:local-only`. |
| F-2-1 | Retained real SWA 404 status/rewrite configuration. | Deployment unit test; live missing-route check. |
| F-2-2 | Updated the remaining filter verb to **Show clock changes**. | Copy browser test. |
| P2-1 | Retained immutable cache headers for hashed assets. | `src/deployment.test.mjs`; live asset-head check. |
| P3-1 | Retained focusable, announced validation summary. | Browser validation flow. |
| P3-2 | Retained unique suggested client time zones. | `src/core/zones.test.ts`. |
| F-3-1 | Retained demo-first result and made the route heading visible without layout shift. | 390 px route test; `demo-mobile.png`; Lighthouse CLS 0. |
| F-3-2 | Retained the same proof-board shell; phone header now retains Demo and Privacy. | Mobile shell test; `privacy-mobile.png`; live route check. |
| F-3-3 | Retained booking-hours result/error language and removed remaining mixed output terms. | Copy browser test; copy audit. |
| F-3-4 | Retained normal five-zone, 18-month, known-conversion claim. | `@claim:normal-range-and-timezone-rules`. |
| F-3-5 | Retained no-scheduler-access claim across normal and calendar-file paths. | `@claim:no-scheduler-access`. |
| F-3-6 | Retained the observable browser print action. | `@claim:print-export`. |
| F-3-7 | Retained 44 px targets and added visible, focusable mobile navigation assertions. | Mobile shell test. |
| F-4-1 | Rebuilt review links as `#review=` links that generate the matching completed weekly result, hide editing controls, preserve calendar-file exclusion, and focus the shared-check h1. | `@claim:review-link`; `review-link.png`; live shared-link check. |
| F-4-2 | Replaced **Show DST changes** with **Show clock changes**; `dst` remains internal only. | Copy browser test; live demo check. |
| F-4-3 | Standardised all remaining user-facing range, bookable-time, and table labels. | Copy browser test; copy audit; live demo check. |
| F-4-4 | Made the daylight-saving claim assert 158/18/2/2 plus shifted, skipped, and repeated ledger rows. | `@claim:dst-check`. |
| F-4-5 | Registered **Export every generated bookable time as CSV** and asserted CSV data rows equal the generated count. | `@claim:csv-export`. |
| F-4-6 | Added a visible route h1 to demo mode, dynamically demoted the later hero heading, and focus the h1 on entry and Back. | Route test; `demo-mobile.png`; live demo check. |
| F-4-7 | Replaced the hidden mobile nav with compact visible Demo and Privacy links on home, demo, legal, and 404 routes. | Mobile shell test; `privacy-mobile.png`; live route check. |

## Local verification before deployment

- `npm test`: 16 unit/deployment tests and 16 Playwright tests passed.
- Each of the twelve commands in `.factory/claims.json` is run independently from a clean clone after the repair commit.
- `verify-url.sh` on the production build: one h1, `lang=en`, main landmark, image alt text, labelled buttons, and no console errors. Evidence: `evidence-polish-4/verify-local/verify.json`.
- Playwright Axe WCAG 2 A/AA: zero violations on `/`, `/demo`, `/privacy/`, `/terms/`, and 404.
- Lighthouse mobile `/?demo=1`: performance 99, accessibility 100, best practices 100, SEO 100; LCP 1.4 s, TBT 140 ms, CLS 0. Evidence: `evidence-polish-4/lighthouse-demo-mobile.json`.
- Screenshots: `evidence-polish-4/demo-mobile.png`, `privacy-mobile.png`, `not-found-mobile.png`, and `review-link.png`.

## Live verification

- Deployed Static Web Apps deployment `5c38ccbc-fea7-4fa6-9aa5-6de40fefc43c` to <https://timezone-slot-proof.sociobot.in>.
- A fresh mobile Chromium context passed the landing action, demo banner/reset/exit, visible demo h1 focus, 158/18/2/2 metrics, all three ledger states, clock-change filter, every-row CSV, review-link reopening, 44 px Demo/Privacy nav, and read-only shared view.
- Fresh live checks passed for `/` (200), `/demo` (200), `/privacy/` (200), `/terms/` (200), and `/no-such-proof` (404). Every checked route had one h1, `lang="en"`, main, and zero WCAG 2 A/AA Axe violations.
- Live verifier evidence: `evidence-polish-4/verify-live/verify.json`; screenshots: `live/live-demo-mobile.png`, `live/live-review-link.png`, `live/live-privacy-mobile.png`, and `live/live-not-found-mobile.png`.

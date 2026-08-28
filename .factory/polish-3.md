# Polish round 3 — complete repair record

**Candidate repaired:** `3188445965d32e31c9dec761ca441f3becb3688b`  
**Reviews read and repaired:** `review-1.md`, `review-2.md`, `review-3.md`, `polish-1.md`, and `polish-2.md`  
**Repair commits:** `25b923ccb49d36c50b4b405a3d53a3903696a8af`, `13e87b07edaafb7d32f5625440dff78f79794bb0`

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the named audience and booking-hours job in the first mobile screen. | `routes, titles, focus, mobile layout, metadata, and accessibility work`; `evidence-polish-3/demo-mobile.png` |
| F-1-2 | Kept `/demo` and `?demo=1` isolated; demo now opens on the completed check with banner, reset, and exit controls. | `@claim:demo-isolation`; mobile screenshot; `/demo` and `/?demo=1` live checks |
| F-1-3 | Expanded the claim inventory to eleven exact, tagged claim tests. | `.factory/claims.json`; all eleven clean-clone commands pass |
| F-1-4 | Kept the explicit `/demo` SWA rewrite and branded 404 override. | `src/deployment.test.mjs`; live `/demo` and missing-route checks |
| F-1-5 | Replaced the partial legal/404 shell with the exact proof-board header, four-link navigation, footer, skip link, and route focus treatment; Back now restores the visible demo result heading. | static shell and routing browser tests; `privacy-mobile.png`; live Back check |
| F-1-6 | Retained title, canonical, OG, Twitter, favicon, and apple-touch metadata on every route. | deployment metadata test; live route-head check |
| F-1-7 | Kept plain booking-hours, bookable-times, calendar-file, and CSV wording. | `.factory/copy-audit.md`; copy browser test |
| F-1-8 | Replaced exposed result and validation jargon with booking-time language. | `result and error copy stays in booking-hours language` |
| F-1-9 | Retained result-naming demo and real-setup actions. | routing browser test; live landing check |
| F-1-10 | Retained the split, under-22-word README introduction. | `.factory/copy-audit.md` |
| F-1-11 | Retained the split, under-22-word README verification explanation. | `.factory/copy-audit.md` |
| F-1-12 | Retained **booking hours**, **bookable times**, **client time zones**, and **check** as the visitor vocabulary. | terminology table; copy browser test |
| F-1-13 | Kept the measured sample range and zones claim. | `@claim:dst-check` |
| F-1-14 | Kept shifted, skipped, and repeated sample states as a measured claim. | `@claim:dst-check` |
| F-1-15 | Kept the no-login statement with an auth-control assertion. | `@claim:no-login` |
| F-1-16 | Kept the same-origin browser-only demo statement. | `@claim:local-only` |
| F-1-17 | Kept the observable CSV export statement. | `@claim:csv-export` |
| F-1-18 | Kept normal configuration separate from demo storage. | `@claim:demo-isolation`; `@claim:normal-config-local` |
| F-1-19 | Kept browser time-zone behavior with a known normal-flow conversion. | `@claim:normal-range-and-timezone-rules` |
| F-1-20 | Kept offline use only with a cache-warmed offline reload. | `@claim:offline-demo` |
| F-1-21 | Kept local offline calculation only with the same observable reload. | `@claim:offline-demo` |
| F-1-22 | Kept the 18-month statement as a measured output. | `@claim:dst-check`; `@claim:normal-range-and-timezone-rules` |
| F-1-23 | Left parser implementation detail out of visitor copy. | copy audit; ICS unit tests |
| F-1-24 | Kept calendar files local and excluded from review links. | `@claim:calendar-file-local` |
| F-1-25 | Added an exact no-scheduler-access contract for the retained scope statement. | `@claim:no-scheduler-access` |
| F-1-26 | Kept result guidance concrete and observable. | routing and copy browser tests |
| F-1-27 | Kept task guidance rather than algorithm marketing. | `.factory/copy-audit.md` |
| F-1-28 | Kept browser time-zone wording with a known conversion assertion. | `@claim:normal-range-and-timezone-rules` |
| F-1-29 | Kept the unsupported comparison promise removed. | copy audit |
| F-1-30 | Kept only tested clock-change labels. | `@claim:dst-check` |
| F-1-31 | Kept full CSV and calendar-file review-link protection. | `@claim:csv-export`; `@claim:calendar-file-local` |
| F-1-32 | Kept deterministic-proof marketing removed. | copy audit |
| F-1-33 | Replaced the scope assertion with the exact scheduler-access claim. | `@claim:no-scheduler-access` |
| F-1-34 | Kept free/local-first marketing removed. | copy audit |
| F-1-35 | Kept the README audience and job opening. | copy audit |
| F-1-36 | Kept the tested five-zone, 18-month sample description. | `@claim:dst-check` |
| F-1-37 | Added no-scheduler-access coverage for the retained scheduler wording. | `@claim:no-scheduler-access` |
| F-1-38 | Kept deterministic-proof wording removed. | copy audit |
| F-1-39 | Kept the README input wording plain. | copy audit |
| F-1-40 | Kept parser-detail README promises removed. | ICS unit tests; copy audit |
| F-1-41 | Added a normal-flow browser time-zone-rule claim and test. | `@claim:normal-range-and-timezone-rules` |
| F-1-42 | Kept shifted, skipped, and repeated output measured. | `@claim:dst-check` |
| F-1-43 | Kept unsupported offset-marketing removed. | copy audit |
| F-1-44 | Added the missing print action claim beside CSV export. | `@claim:csv-export`; `@claim:print-export` |
| F-1-45 | Kept tested offline behavior and added complete 390 px target/overflow coverage. | `@claim:offline-demo`; routing and mobile-target browser tests |
| F-1-46 | Kept parser scope out of visitor promises. | ICS unit tests; copy audit |
| F-1-47 | Added exact no-scheduler-access coverage for retained scope wording. | `@claim:no-scheduler-access` |
| F-1-48 | Kept browser-local sample behavior with request interception. | `@claim:local-only` |
| F-1-49 | Documented in-memory demo isolation, reset, exit, and separate normal storage. | `.factory/demo.md`; `@claim:demo-isolation` |
| F-1-50 | Kept the narrower sample request scope and tested it. | `@claim:local-only` |
| F-2-1 | Kept the real SWA 404 override with no navigation fallback. | deployment metadata test; live missing-route check |
| F-2-2 | Kept verb-named filters and print action. | routing browser test |
| P2-1 | Kept immutable caching for hashed assets. | `src/deployment.test.mjs` |
| P3-1 | Kept the focusable validation summary. | source and browser validation check |
| P3-2 | Kept unique suggested client time zones. | `src/core/zones.test.ts` |
| F-3-1 | Made demo mode a document-start route mode, hid non-demo sections until the populated check is ready, and placed results before explanation. | mobile routing test asserts `Starts tested` in the 390 × 844 viewport; `demo-mobile.png` |
| F-3-2 | Unified home, demo, Privacy, Terms, and 404 markup/style around `.site-header`, wordmark mark, four links, footer mark, and build footer. | static shell test; `privacy-mobile.png`; live route check |
| F-3-3 | Renamed result labels to **Check complete**, **Clock changes**, **Bookable time problems**, and **Booking-time table**; rewrote time-zone errors. | `result and error copy stays in booking-hours language`; copy audit |
| F-3-4 | Added exact normal-range-and-timezone-rules claim, with five zones, 18-month dates, and New York→London assertion. | `@claim:normal-range-and-timezone-rules` |
| F-3-5 | Added exact no-scheduler-access claim covering normal and calendar-file flows. | `@claim:no-scheduler-access` |
| F-3-6 | Added print-export claim and observable `window.print` assertion. | `@claim:print-export` |
| F-3-7 | Made all visible mobile links and buttons at least 44 × 44 px, including legal/footer routes. | `every mobile link and button has a 44px target and every route uses the shared shell` |

## Verification

- Full local suite: 16 unit/deployment tests and 14 browser tests passed.
- Final fresh clone at `/tmp/timezone-slot-proof-final-O9WSe5`: all eleven commands in `.factory/claims.json` passed independently, then the full suite passed.
- Accessibility: Playwright Axe WCAG 2 A/AA scan has zero violations; `verify-url.sh` found one h1, main, language, labelled controls, image alt text, and no console errors.
- Mobile Lighthouse on `/?demo=1`: Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**; LCP **1.5 s**, TBT **80 ms**, CLS **0**. Report: `evidence-polish-3/lighthouse-demo-mobile.json`.
- Screenshots: `evidence-polish-3/demo-mobile.png`, `evidence-polish-3/privacy-mobile.png`, and `evidence-polish-3/not-found-mobile.png`.
- Live cold verification after Static Web Apps deployment `79c36930-30c9-45c0-a7b3-3e24f0ab6175`: `/` and `/?demo=1` load at 390 px without console errors; `Starts tested` is in the initial viewport; `/demo` has its own title and populated banner; Privacy has the exact shared shell and h1 focus; Back restores `#check-complete-heading`; `/this-route-must-not-exist` returns HTTP 404 with its own title/h1. Screenshots: `live-demo-mobile.png`, `live-privacy-mobile.png`, `live-not-found-mobile.png`.

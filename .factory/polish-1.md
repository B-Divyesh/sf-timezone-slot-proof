# Polish round 1 — all review findings resolved

**Candidate repaired:** `e04cb7f4c4241681e1707271d16b33108aba204d`  
**Review repaired:** `0c02438f5d2633f7222edf732152e89658043317`  
**Repair commit:** recorded in `.factory/handoff.md`

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Rewrote the first screen for independent professionals with booking links. | `routes, titles, focus, mobile layout, metadata, and accessibility work`; `evidence/demo-mobile.png` |
| F-1-2 | Added direct `/demo` and `?demo=1` in-memory sample, persistent banner, reset, start-real, and demo contract. | `@claim:demo-isolation`; `evidence/demo-mobile.png`; `/demo` |
| F-1-3 | Added claim inventory and one tagged Playwright test per retained claim. | `.factory/claims.json`; all `@claim:*` tests |
| F-1-4 | Added truthful `/demo` routing, branded unknown-route UI, and static `404.html` response override. | route browser test; `evidence/not-found.png`; `/no-such-proof` |
| F-1-5 | Added shared legal shell, skip links, legal navigation, focused legal h1, and route announcement. | route browser test; `/privacy/`; `/terms/` |
| F-1-6 | Added per-route metadata, canonical URLs, OG/Twitter fields, 1200×630 original SVG card, and apple icon. | route browser test; static head review |
| F-1-7 | Replaced jargon and vague export copy with booking-hours, bookable-times, and CSV wording. | `.factory/copy-audit.md`; mobile screenshot |
| F-1-8 | Moved standards language out of the primary task flow and renamed context-free headings. | `.factory/copy-audit.md`; browser accessibility test |
| F-1-9 | Made “Try it with sample data” the hero action and labelled the real setup action accurately. | route browser test; `/` |
| F-1-10 | Split and rewrote dense README opening copy. | `.factory/copy-audit.md`; `README.md` |
| F-1-11 | Split and rewrote dense README verification copy. | `.factory/copy-audit.md`; `README.md` |
| F-1-12 | Standardised booking hours, client time zones, bookable times, and check. | terminology table in `.factory/copy-audit.md` |
| F-1-13 | Replaced the old untestable hero sentence with the sample check claim. | `@claim:dst-check` |
| F-1-14 | Retained DST-state promise only through the sample check claim. | `@claim:dst-check` |
| F-1-15 | Retained no-login fact with an explicit auth-flow assertion. | `@claim:no-login` |
| F-1-16 | Retained browser-local fact with origin-capture assertion. | `@claim:local-only` |
| F-1-17 | Retained CSV export with downloaded header and row-count assertion. | `@claim:csv-export` |
| F-1-18 | Replaced storage promise with isolated demo contract and storage assertion. | `@claim:demo-isolation` |
| F-1-19 | Replaced standards claim with browser time-zone wording; seeded DST result exercises it. | `@claim:dst-check` |
| F-1-20 | Retained offline promise only with an offline demo reload assertion. | `@claim:offline-demo` |
| F-1-21 | Reworded local-run statement and prove it through the same offline reload. | `@claim:offline-demo` |
| F-1-22 | Retained 18-month range only in the observable demo summary. | `@claim:dst-check` |
| F-1-23 | Removed detailed ICS parser promise from visitor copy. | copy audit; existing ICS unit suite |
| F-1-24 | Reworded file handling; local-only network capture covers the demo flow. | `@claim:local-only` |
| F-1-25 | Replaced scheduler guarantee wording with a short scope statement. | `README.md`; no scheduler claim retained |
| F-1-26 | Replaced empty-state promise with plain result description. | route browser test |
| F-1-27 | Replaced algorithm claim with plain task guidance. | copy audit |
| F-1-28 | Replaced IANA projection claim with plain time-zone guidance. | copy audit |
| F-1-29 | Removed unhelpful comparison claim. | copy audit |
| F-1-30 | Retained only observable daylight-saving state claim. | `@claim:dst-check` |
| F-1-31 | Retained CSV export with complete-file assertion; removed unsupported link promise from copy. | `@claim:csv-export` |
| F-1-32 | Removed deterministic-browser-data marketing claim. | copy audit |
| F-1-33 | Replaced long negative claim with a short scope statement. | `README.md` |
| F-1-34 | Removed free/local-first marketing claim from footer. | footer review; `@claim:local-only` |
| F-1-35 | Rewrote README opening around the user and job. | `README.md` |
| F-1-36 | Replaced with explicit five-zone, 18-month, DST claim. | `@claim:dst-check` |
| F-1-37 | Removed broad integration claim; no-login remains tested. | `@claim:no-login` |
| F-1-38 | Removed untestable deterministic proof wording. | copy audit |
| F-1-39 | Simplified README to visitor task language. | `README.md` |
| F-1-40 | Removed detailed parser claim from README. | existing `src/core/ics.test.ts` |
| F-1-41 | Removed standards-specific README claim. | copy audit |
| F-1-42 | Retained detected-state result claim. | `@claim:dst-check` |
| F-1-43 | Removed offset-highlight wording not retained in copy. | copy audit |
| F-1-44 | Retained CSV only with a browser download assertion. | `@claim:csv-export` |
| F-1-45 | Replaced broad README promise with tested browser suite coverage. | route browser test; `@claim:offline-demo` |
| F-1-46 | Removed scope statement from README; parser rejection remains unit-tested. | `src/core/ics.test.ts` |
| F-1-47 | Replaced broad exclusions with a short scope statement. | `README.md` |
| F-1-48 | Retained local-run privacy fact with request interception. | `@claim:local-only` |
| F-1-49 | Documented normal versus demo storage precisely; demo test protects real key. | `.factory/demo.md`; `@claim:demo-isolation` |
| F-1-50 | Replaced broad runtime claim with same-origin demo-flow assertion. | `@claim:local-only` |
| P2-1 | Preserved immutable `/assets/*` cache rule. | `src/deployment.test.mjs` |
| P3-1 | Preserved focusable validation summary. | source audit; `#form-errors tabindex="-1"` |
| P3-2 | Preserved unique suggested invitee zones. | `src/core/zones.test.ts` |

## Verification evidence

- `npm test`: 14 unit/deployment tests and 7 browser tests passed.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence`: passed; no console errors, one h1, main landmark, image alt text, labelled controls.
- Browser test includes Axe WCAG 2 A/AA scan with zero violations, 390 px width check, routing/title/focus checks, and offline demo reload.
- Screenshots: `.factory/evidence/demo-mobile.png`, `.factory/evidence/not-found.png`.

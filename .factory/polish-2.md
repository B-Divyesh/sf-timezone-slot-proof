# Polish round 2 — zero-finding repair record

**Candidate repaired:** `e965bcb4f69d1d629fbaf8bc488526290832710d`  
**Reviews repaired:** `review-1.md`, `review-2.md` at `46a2801f635113914307205d7e67f2427df59c30`  
**Repair commit:** recorded in `handoff.md`

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the user and job in the first-screen lede. | `routes, titles, focus, mobile layout, metadata, and accessibility work`; `evidence-polish-2/demo-mobile.png` |
| F-1-2 | Primary action now opens `?demo=1`; sample is in-memory with banner, Reset demo, and Start for real. | `@claim:demo-isolation`; `@claim:dst-check`; `/?demo=1` |
| F-1-3 | Retained the claim inventory and added the two missing privacy claims. | `.factory/claims.json`; all eight `@claim:*` commands |
| F-1-4 | `/demo` has an explicit static rewrite; undefined paths use the 404 override. | deployment metadata test; `evidence-polish-2/not-found.png` |
| F-1-5 | Added `pageshow` Back/Forward heading focus and polite announcements to app and legal pages. | routing browser test uses `page.goBack()` from Demo and Privacy |
| F-1-6 | Added static Demo head generation, 404 OG/Twitter fields, and SPA OG/Twitter updates. | `src/deployment.test.mjs`; `dist/demo/index.html` head assertions |
| F-1-7 | Preserved plain booking-hours, bookable-times, and CSV copy. | `.factory/copy-audit.md` |
| F-1-8 | Preserved plain primary-task wording and contextual help. | `.factory/copy-audit.md`; Axe browser scan |
| F-1-9 | Kept the result-naming sample action and accurate real setup action. | routing browser test; `/?demo=1` |
| F-1-10 | Kept the split README product introduction. | `.factory/copy-audit.md` |
| F-1-11 | Kept the split README build explanation. | `.factory/copy-audit.md` |
| F-1-12 | Standardised visitor copy to **client time zone** and **bookable time**; renamed internal UI labels too. | terminology audit; routing browser test |
| F-1-13 | Retained five-zone, 18-month sample outcome as a claim. | `@claim:dst-check` |
| F-1-14 | Retained shifted, skipped, and repeated outcomes as a claim. | `@claim:dst-check` |
| F-1-15 | Retained no-login fact with an explicit auth-control check. | `@claim:no-login` |
| F-1-16 | Retained demo browser-local request scope. | `@claim:local-only` |
| F-1-17 | Retained CSV export with a downloaded content assertion. | `@claim:csv-export` |
| F-1-18 | Added normal weekly-configuration storage and request-scope claim. | `@claim:normal-config-local` |
| F-1-19 | Retained browser time-zone behavior through seeded DST output. | `@claim:dst-check` |
| F-1-20 | Retained offline use only with an offline reload assertion. | `@claim:offline-demo` |
| F-1-21 | Retained local offline check only with the same cached reload assertion. | `@claim:offline-demo` |
| F-1-22 | Retained 18-month range only as measured demo output. | `@claim:dst-check` |
| F-1-23 | Removed parser-detail visitor promise; parser behavior remains unit-tested. | `src/core/ics.test.ts` |
| F-1-24 | Added full calendar-file input, no-upload, no-storage, and no-review-link test. | `@claim:calendar-file-local` |
| F-1-25 | Retained the short scheduler scope statement. | `.factory/copy-audit.md` |
| F-1-26 | Retained observable result wording. | routing browser test |
| F-1-27 | Retained only task guidance, not algorithm marketing. | `.factory/copy-audit.md` |
| F-1-28 | Retained browser time-zone wording, not standards jargon. | `.factory/copy-audit.md` |
| F-1-29 | Removed the unhelpful comparison promise. | copy audit |
| F-1-30 | Retained only tested clock-change labels. | `@claim:dst-check` |
| F-1-31 | Retained complete CSV export; calendar-file links are disabled. | `@claim:csv-export`; `@claim:calendar-file-local` |
| F-1-32 | Removed deterministic-proof marketing. | copy audit |
| F-1-33 | Kept a short scope statement rather than a broad exclusion promise. | `.factory/copy-audit.md` |
| F-1-34 | Removed free/local-first footer marketing. | footer review; `@claim:local-only` |
| F-1-35 | Kept README audience/job opening. | `.factory/copy-audit.md` |
| F-1-36 | Retained the tested five-zone, 18-month DST sample description. | `@claim:dst-check` |
| F-1-37 | Retained only the tested no-login assertion. | `@claim:no-login` |
| F-1-38 | Removed deterministic proof wording. | copy audit |
| F-1-39 | Simplified README input language. | `.factory/copy-audit.md` |
| F-1-40 | Removed parser-detail README promise. | `src/core/ics.test.ts` |
| F-1-41 | Removed standards-specific README wording. | copy audit |
| F-1-42 | Retained detected-state result claim. | `@claim:dst-check` |
| F-1-43 | Removed unsupported offset-highlight marketing. | copy audit |
| F-1-44 | Retained CSV only with download evidence. | `@claim:csv-export` |
| F-1-45 | Retained tested offline and responsive behavior. | routing browser test; `@claim:offline-demo` |
| F-1-46 | Removed scope promise from visitor README; parser rejection stays unit-tested. | `src/core/ics.test.ts` |
| F-1-47 | Kept short scope wording. | README/copy audit |
| F-1-48 | Retained browser-local sample behavior with request interception. | `@claim:local-only` |
| F-1-49 | Documented normal/in-memory demo storage precisely. | `.factory/demo.md`; `@claim:demo-isolation` |
| F-1-50 | Narrowed README and Privacy to the tested sample request claim. | `@claim:local-only` |
| F-2-1 | Removed blanket navigation fallback and configured the SWA 404 status override. | deployment test asserts no fallback and `{ statusCode: 404 }` |
| F-2-2 | Renamed filters and print action with verbs. | routing browser test; sample screenshot |
| P2-1 | Preserved immutable cache headers for hashed assets. | `src/deployment.test.mjs` |
| P3-1 | Preserved focusable validation summary. | source and browser suite |
| P3-2 | Preserved unique suggested client time zones. | `src/core/zones.test.ts` |

## Evidence

- `npm test`: 15 unit/deployment tests and 9 browser tests passed, including the Playwright Axe WCAG 2 A/AA scan with zero violations.
- Every listed claim command is run from a fresh clone after commit; output is recorded in `handoff.md`.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence-polish-2`: passed, with title, language, one h1, main landmark, labelled controls, alt text, and no console errors.
- Screenshots: `evidence-polish-2/demo-mobile.png` and `evidence-polish-2/not-found.png`.
- Static route-head evidence: `dist/demo/index.html` contains Demo title, canonical, OG title, and Twitter title; `dist/404.html` contains its own matching metadata.
- Live cold recheck after deployment: `https://timezone-slot-proof.sociobot.in/?demo=1` returned 200 with the banner, Reset demo, Start for real, a five-zone result, 390 px width, preserved real storage, no demo storage keys, and no app-console errors. `/privacy/` focused its h1; Back focused `#hero-title`; `/this-route-must-not-exist` returned 404 with its own title and h1. Screenshot: `evidence-polish-2/live-demo-mobile.png`.

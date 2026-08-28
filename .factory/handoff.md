# Timezone Slot Proof — polish 3 handoff

## Delivered

- Repaired release candidate `3188445965d32e31c9dec761ca441f3becb3688b` using every finding in reviews 1–3 and polish records 1–2.
- Demo routes now choose their result-first layout before first paint. `/demo` and `?demo=1` show the completed five-zone check in the initial 390 px viewport, with the persistent isolated-sample banner, Reset demo, and Start for real.
- Unified the landing, demo, Privacy, Terms, and 404 pages around the concrete-and-moss proof-board shell. Legal/404 pages now have the shared wordmark, four-link navigation, footer, touch targets, metadata, and focused headings.
- Replaced result/error jargon with booking-hours language. Added exact normal range/time-zone-rule, scheduler-access, and print-export claim contracts and tests.
- Added pre-paint route mode to avoid demo layout shift. Mobile Lighthouse reports 100/100/100/100 with LCP 1.5 s, TBT 80 ms, and CLS 0.

## Commits and deployment

- Product repairs: `25b923ccb49d36c50b4b405a3d53a3903696a8af` and `13e87b07edaafb7d32f5625440dff78f79794bb0` on `main`.
- Pushed to `origin/main`.
- Deployed the built static artifact with `/opt/fleet/lib/deploy-static.sh timezone-slot-proof dist`.
- Final Azure Static Web Apps deployment: `79c36930-30c9-45c0-a7b3-3e24f0ab6175` to `https://timezone-slot-proof.sociobot.in`.

## Verification

- `npm test`: passed — 16 unit/deployment tests and 14 Playwright browser tests.
- Final clean clone: `/tmp/timezone-slot-proof-final-O9WSe5`; `npm ci`, every one of the 11 `claims.json` commands, and the full `npm test` suite passed.
- Claim IDs exercised independently: `demo-isolation`, `dst-check`, `csv-export`, `local-only`, `no-login`, `offline-demo`, `normal-config-local`, `calendar-file-local`, `normal-range-and-timezone-rules`, `no-scheduler-access`, and `print-export`.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence-polish-3`: passed (title, lang, one h1, main, alt text, labels, no console errors).
- Live `verify-url.sh https://timezone-slot-proof.sociobot.in .factory/evidence-polish-3`: passed, 696 ms load, no console errors.
- Playwright Axe WCAG 2 A/AA scan: zero violations. Mobile target regression checks every visible link and button at ≥44 × 44 px.
- Lighthouse mobile demo report: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.5 s, TBT 80 ms, CLS 0. See `.factory/evidence-polish-3/lighthouse-demo-mobile.json`.
- Live cold check: home is 390 px wide; `?demo=1` has banner/reset/start-real and an in-viewport Starts tested metric; direct `/demo` has demo title and result; Privacy focuses h1 with the shared shell; Back focuses `#check-complete-heading`; unknown URL is HTTP 404 with its route title/h1; no app-console errors.

## Evidence and docs

- Complete finding-by-finding map: `.factory/polish-3.md`.
- Demo contract: `.factory/demo.md`.
- Copy and terminology audit: `.factory/copy-audit.md`.
- Screenshots: `.factory/evidence-polish-3/demo-mobile.png`, `privacy-mobile.png`, `not-found-mobile.png`, `live-demo-mobile.png`, `live-privacy-mobile.png`, and `live-not-found-mobile.png`.

## Run locally

```sh
npm ci
npm test
npm run build
npm run preview
```

## Known gaps

None.

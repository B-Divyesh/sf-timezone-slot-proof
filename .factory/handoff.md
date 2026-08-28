# Timezone Slot Proof — polish round 4 handoff

## Delivered

- Repaired release candidate `15d788906a7df9e9462ced43f5afdee36e6fdbd7` in commit `461d796b56fccef65e0c58cd10264f4ece494141`.
- Made **Copy review link** a real completed weekly check: the URL contains only weekly configuration, opens the matching result, is read-only, and never carries calendar-file content.
- Removed remaining `DST`, `window`, and `starts` visitor vocabulary. Results now consistently use clock changes, booking-hours ranges, and bookable times.
- Strengthened claims: sample state counts and ledger rows are exact; CSV data rows must equal every generated bookable time; the new review-link capability has its own claim and test.
- Added a visible demo route h1 with route focus, retained the populated result in the first 390 px viewport, and kept compact Demo and Privacy navigation visible and keyboard-reachable on phone routes.
- Kept the concrete-and-moss proof-board visual system, static Vite artifact class, local-first demo/storage model, legal routes, metadata, HTTP 404, and original asset provenance.
- Updated the catalog description, demo contract, copy audit, claim inventory, and complete finding map in `.factory/polish-4.md`.

## Deployment

- Static Web Apps deployment: `5c38ccbc-fea7-4fa6-9aa5-6de40fefc43c`.
- Live URL: <https://timezone-slot-proof.sociobot.in>.
- Repair commit was pushed to `origin/main` before deployment.

## Verification

- Local `npm test`: passed — 16 unit/deployment tests and 16 Playwright tests.
- Fresh clone: `/tmp/timezone-slot-proof-polish4-TUDSVb`; `npm ci`, every one of the 12 exact `.factory/claims.json` commands, and a final full `npm test` all passed. The full fresh-clone suite also reported 16 unit/deployment and 16 Playwright tests.
- Local verifier: `verify-url.sh http://127.0.0.1:4173` passed with one h1, `lang=en`, main, image alt text, labelled buttons, and no console errors. Evidence: `evidence-polish-4/verify-local/verify.json`.
- Local Axe WCAG 2 A/AA sweep passed on home, demo, Privacy, Terms, and 404. The same fresh live browser sweep passed on those routes.
- Lighthouse mobile demo: performance **99**, accessibility **100**, best practices **100**, SEO **100**; LCP **1.4 s**, TBT **140 ms**, CLS **0**. Evidence: `evidence-polish-4/lighthouse-demo-mobile.json`.
- Live cold check passed for landing, `?demo=1`, `/demo`, Privacy, Terms, shared review link, and the branded 404. The live browser check verified 200/200/200/200/404 responses, one h1/main/lang on each route, exact 158/18/2/2 sample metrics, CSV completeness, h1 focus, 44 px mobile navigation, and zero Axe violations.
- Live verifier: `verify-url.sh https://timezone-slot-proof.sociobot.in` passed with no console errors. Evidence: `evidence-polish-4/verify-live/verify.json`.
- The deployed hashed JavaScript asset matched the local production build by SHA-256: `index-D5GiiDbd.js` = `8dc6b347e55bc8fa86d0ed3919a572508866e38a2ad3c58560af4fc2629c5bef`.

## Evidence

- Local mobile: `evidence-polish-4/demo-mobile.png`, `privacy-mobile.png`, `not-found-mobile.png`, `review-link.png`.
- Live mobile: `evidence-polish-4/live/live-demo-mobile.png`, `live-review-link.png`, `live-privacy-mobile.png`, `live-not-found-mobile.png`.
- Full finding map: `.factory/polish-4.md`.

## Known gaps

None.

---

# Review 5 handoff — 2026-08-28

## Delivered

- Performed an independent, read-only adversarial first-read review of the live product at 390 px and desktop.
- Added `.factory/review-5.md`; no product code, assets, deployment configuration, or live state was changed.

## Verification

- Fresh clone: `/tmp/timezone-slot-proof-review5-bJEhyb`; ran `npm ci`.
- Ran all 12 exact commands in `.factory/claims.json`; all passed.
- Final `npm test` passed: 16 unit/deployment tests and 16 browser tests.
- Live checks passed for `/`, `/demo`, `/privacy/`, `/terms/`, and an HTTP 404: metadata, one h1/main/lang, shared shell, focus restoration, headers, links, and mobile width.
- Live Axe WCAG 2 A/AA scans had zero violations on those routes.
- Live demo verification confirmed populated first viewport, banner/reset/exit, preserved pre-seeded real storage, same-origin-only requests, and cache-warmed offline reload.

## Result

Review 5 verdict: **PASS**. No known gaps or findings remain. Preserve the current claim and browser checks on later changes.

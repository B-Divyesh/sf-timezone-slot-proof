# Timezone Slot Proof — polish round 2 handoff

## Delivered

- Repaired every finding in `review-1.md` and `review-2.md`; the complete id-to-change map is in `polish-2.md`.
- Made `/?demo=1` the one-click sample path. It is isolated in memory, has persistent sample-data controls, and never reads or writes normal configuration.
- Added `normal-config-local` and `calendar-file-local` claims with real browser flows. The calendar path imports a fixture, checks network methods/origins, and proves contents cannot enter storage or review links.
- Added direct static Demo metadata, complete 404 social metadata, explicit `/demo` rewrite, honest SWA 404 configuration, Back/Forward heading focus, route announcements, action-named controls, and one visitor vocabulary.
- Updated README, legal privacy language, demo contract, copy audit, catalog description, and evidence screenshots without changing the concrete-and-moss identity.

## Verification

- Repair commit: `c9441bb22b07582b8f07d3c86030d9913ce9b779` (pushed to `origin/main`).
- `npm test` passed: 15 Vitest unit/deployment tests and 9 Playwright browser tests.
- The browser suite includes `@axe-core/playwright` WCAG 2 A/AA with zero violations, 390 px width, route title/focus checks, offline reload, same-origin request capture, CSV download, and demo reset.
- Clean clone: `/tmp/timezone-slot-proof-clean-bEooO1`, after `npm ci`, passed every declared command: `@claim:demo-isolation`, `@claim:dst-check`, `@claim:csv-export`, `@claim:local-only`, `@claim:no-login`, `@claim:offline-demo`, `@claim:normal-config-local`, and `@claim:calendar-file-local`.
- `npm run build` produces `dist/`, including `dist/demo/index.html` with raw Demo title/canonical/OG/Twitter metadata and `dist/404.html` with matching 404 metadata.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence-polish-2` passed: title, `lang=en`, one h1, main landmark, alt text, labelled buttons, and no console errors. Screenshots: `evidence-polish-2/demo-mobile.png`, `evidence-polish-2/not-found.png`, and `evidence-polish-2/live-demo-mobile.png`.
- The standalone Axe CLI could not start its unconfigured Selenium Chrome binary in this worker. The pinned Playwright Axe check passed in the full browser suite instead.

## Run locally

```sh
npm ci
npm test
npm run build
npm run preview
```

## Deployment

Deployed through `/opt/fleet/lib/deploy-static.sh timezone-slot-proof dist` using the work-order static configuration. The existing Static Web App `sf-timezone-slot-proof` was reused. Cold live recheck passed at `https://timezone-slot-proof.sociobot.in/?demo=1`: HTTP 200, Demo title/metadata, banner/reset/start controls, completed five-zone result, preserved seeded normal storage, no demo storage keys, 390 px width, and no app-console errors. `/privacy/` focus and Back focus passed. An unknown URL returned HTTP 404 with the branded 404 title and h1.

## Known gaps

None.

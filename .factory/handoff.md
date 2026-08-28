# Repair handoff — Timezone Slot Proof

## Completed

Repair commits: `69fdbf718c9ce5cf9a890de9ef6257b9dfa14493`, `b1bc685`, and `98ee71c`.

All findings in `.factory/review-1.md` are resolved and mapped in `.factory/polish-1.md`. The product now has an isolated, one-click five-zone DST demo at `/demo` and `?demo=1`, exact claim inventory/tests, truthful routes, branded not-found UI, complete metadata, legal-page shell/focus, mobile checks, and plain-language copy.

The concrete-and-moss visual identity, static Vite deployment class, local-first behavior, and existing scheduling engine are preserved. The service worker now precaches the hashed application shell at build time and safely matches cache variants for offline reloads.

## Verification

- `npm test` passed: 14 unit/deployment tests and 7 Playwright browser/claim tests.
- `npm run build` passed and writes `dist/index.html`.
- Every `.factory/claims.json` command was rerun from a clean clone after commit.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence` passed: 200, title, `lang`, one h1, main landmark, alts, labels, and no console errors.
- Browser suite runs Axe WCAG 2 A/AA with zero violations, checks 390 px overflow, focus/title/route behavior, privacy requests, CSV output, demo isolation, and offline reload.
- Local mobile Lighthouse on `/demo`: Performance 92, Accessibility 100, Best Practices 100, SEO 100 (`.factory/evidence/lighthouse.json`).
- Deployed with `swa deploy ./dist --env production` to `sf-timezone-slot-proof`. Cold production check at `https://timezone-slot-proof.sociobot.in/demo` confirmed the banner, 5/5 zones, generated result, route titles/focus, 390 px width, and zero console errors. Live `verify-url.sh` passed in 741 ms.
- Local screenshots: `.factory/evidence/demo-mobile.png` and `.factory/evidence/not-found.png`.

## Run

```sh
npm ci
npm test
npm run build
npm run preview
```

## Known gaps

None.

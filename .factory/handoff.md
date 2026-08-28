# Timezone Slot Proof — adversarial review 4 handoff

## Delivered

- Wrote `.factory/review-4.md` with a **FAIL** verdict and seven concrete findings.
- Did not modify product code or deployment configuration.
- Rechecked every finding from reviews 1–3 and polish records 1–3 against the live site and current source.

## Verification performed

- Fresh Chromium cold reads at 390 × 844 and 1440 × 1000.
- Live demo, first viewport, Reset, Start for real, real-storage isolation, same-origin traffic, and offline reload.
- Live route/metadata/link/status crawl for Home, Demo, Privacy, Terms, 404, social image, icons, robots, and sitemap.
- Back focus, reduced motion, mobile overflow, and 44 px target checks.
- Playwright Axe WCAG 2 A/AA scans across all local routes: zero violations.
- Live `verify-url.sh`: passed.
- `npm test`: passed — 16 unit/deployment tests and 14 Playwright tests.
- Clean clone `/tmp/timezone-slot-proof-review4-clean`: `npm ci` and all 11 exact commands from `.factory/claims.json` passed independently.
- Local/live HTML, hashed JS, and hashed CSS SHA-256 values matched.

## Findings left for repair

- Blockers: misleading/untested review link (reopened F-1-31), remaining `DST` jargon (reopened F-1-8), and inconsistent `window`/`starts` vocabulary (reopened F-1-12).
- High: `dst-check` does not assert marked state values; CSV completeness copy lacks an exact claim/equality test.
- Medium: Demo focuses an h2 instead of its route h1; the 390 px header hides all primary navigation.

## Reproduce

```sh
npm ci
npm test
/opt/fleet/lib/verify-url.sh https://timezone-slot-proof.sociobot.in /tmp/timezone-slot-proof-review4/verify-live
```

No deployment was performed.

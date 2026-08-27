# Handoff — Timezone Slot Proof repair

**Release:** `085af29` — deployed 2026-08-27 as Azure Static Web Apps **Standard** to <https://timezone-slot-proof.sociobot.in>.

## What changed

- Repaired the production deployment cache contract in `public/staticwebapp.config.json`.
  - `/assets/*` (including Vite content-hashed JS and CSS) now returns `Cache-Control: public, max-age=31536000, immutable`.
  - Global document policy and `/sw.js` return `Cache-Control: public, max-age=0, must-revalidate`; this includes root, privacy, terms, and manifest responses.
  - Existing CSP, `nosniff`, referrer, and permissions headers remain in force.
- Fixed the error-summary recovery path: `#form-errors` has `tabindex="-1"`, so the existing `showErrors()` focus call now works for keyboard users.
- Fixed the duplicate invitee-zone default: added rows select the first unused useful suggestion (Sydney, then Tokyo), with a fallback to supported IANA zones.
- Added regressions for unique zone suggestions and for the emitted build artifact/cache header contract. `npm test` now builds first, then confirms hashed JS/CSS references and the exact SWA cache policies in `dist/staticwebapp.config.json`.

## Run and verify

```sh
npm ci
npm test
npm run build
npm run preview -- --host 127.0.0.1
/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence
```

Factory deploy command used:

```sh
/opt/fleet/lib/deploy-static.sh timezone-slot-proof dist
```

## Verification — 2026-08-27

- Clean `npm ci`: passed, 57 packages audited, 0 vulnerabilities.
- `npm test`: passed — production build plus 5 test files / 14 tests. This retains the existing seeded timezone/DST and ICS coverage and adds deployment/cache and zone-selection checks.
- `npm run build`: passed; `dist/` contains `index.html`, emitted SWA configuration, `index-BjV7PF2a.js` (26.57 KB raw / 10.16 KB gzip), and `index-BjNtAFfK.css` (20.30 KB raw / 5.30 KB gzip), all within static product budgets.
- Local browser: factory `verify-url.sh` passed (title, language, one h1, main, image alt text, button labels, and no console errors). The service worker controlled the page after reload; an offline reload retained the title, main landmark, and validator form.
- Usability/accessibility: Playwright confirmed invalid submission focuses `#form-errors`; two added invitee zones become `Australia/Sydney` and `Asia/Tokyo`, with no duplicate. Playwright Axe reported 0 WCAG 2 A/AA violations initially and after the validation error.
- Live browser: `verify-url.sh https://timezone-slot-proof.sociobot.in .factory/evidence` passed in 659 ms with no console errors. Live Playwright Axe reported 0 WCAG 2 A/AA violations.
- Live header check passed for root, JS, CSS, worker, privacy, terms, and manifest. Root/legal/manifest/worker return `public, max-age=0, must-revalidate`; hashed JS/CSS return `public, max-age=31536000, immutable`. HTTPS and the existing CSP/HSTS/`nosniff`/referrer/permissions headers are present.
- The independent pre-repair mobile Lighthouse baseline was Performance 100, Accessibility 100, Best Practices 100, SEO 100 (FCP 1.0 s, LCP 1.4 s, TBT 20 ms, CLS 0). This repair adds no shipped runtime dependency; the current emitted JS remains 10.16 KB gzip.

## Privacy and behavior

This remains a local-first static tool: no third-party runtime requests, tracking, calendar credentials, or uploaded ICS data. Weekly configuration can use local storage; imported ICS contents are not persisted or included in review links. The validated timezone, DST, ICS, CSV, PWA/offline, and security behavior is unchanged.

## Known boundaries and next steps

- ICS v1 requires one valid IANA timezone and supports timed one-off/weekly availability; all-day and daily/monthly/yearly recurrences are rejected with guidance.
- Results use the visitor browser's IANA timezone data and are a configuration check, not a guarantee of third-party scheduler behavior.
- Dense configurations are capped at 30,000 starts.
- Future work: exception-date/holiday support, broader ICS recurrence support, and scheduler-specific import mappings.

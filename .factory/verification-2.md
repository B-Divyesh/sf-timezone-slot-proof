# Independent verification 2 — PASS

**Candidate:** `a4dda9fa0e10db06c5d773f672890b9ad1a19e7e` (`docs: record cache repair verification`)
**Verified:** 2026-08-27 UTC
**Production URL:** <https://timezone-slot-proof.sociobot.in>
**Scope:** independent static-web acceptance verification against `.factory/brief.json` and the factory work order. Product source was not modified.

## Verdict

**PASS.** The candidate builds and tests cleanly, performs the stated scheduling-proof job end to end, meets the local-first/privacy contract, and the deployed product is byte-for-byte the candidate build for the application shell and all shipped runtime assets.

No product defects were found.

| Severity | Defects |
| --- | --- |
| Blocker | None |
| Critical | None |
| High | None |
| Medium | None |
| Low | None |

## Reproducible local evidence

Clean checkout was already at the candidate with no pre-existing worktree changes.

```sh
npm ci
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

- `npm ci`: passed; 57 packages audited, 0 vulnerabilities.
- `npm test`: passed. It runs the production typecheck/build and all 5 Vitest files: **14/14 tests passed**. Coverage includes IANA projection, spring gap, fall fold, cross-zone shifts, 18-month range, ICS recurrence/rejection, invitee-zone defaults, and emitted SWA cache rules.
- `npm run build`: passed (`tsc --noEmit` plus Vite). No separate lint script exists in `package.json`; the build's TypeScript check is the repository's available static check.
- Bundle budgets: initial JS is 26.57 KB raw / **10.16 KB gzip**; CSS is 20.30 KB raw / **5.30 KB gzip**; responsive hero is 47.59 KB at 720 px and 184.71 KB at 1280 px. All are within the factory static-web budgets.
- Mobile Lighthouse against the production build (Chromium, local preview): Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**. FCP 1.0 s, LCP 1.4 s, TBT 80 ms, speed index 1.0 s, CLS 0.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 <temporary-dir>` passed: title, `lang`, one h1, main landmark, labelled controls, image alt text, and no console errors.

## End-to-end product checks

Playwright/Chromium exercised the rendered production build rather than calling core functions directly.

- Normal weekly proof: host `America/New_York`, from `2026-01-01`, invitees `Europe/London`, `Asia/Kolkata`, and `Australia/Sydney` generated 6,240 starts and correctly surfaced 720 shifted starts around offset changes.
- Spring boundary: Sunday `02:00–03:30` in New York generated explicit missing-slot ledger entries for `2026-03-08T02:00` and `02:30`; the 18-month result reported 4 skipped starts.
- Fall boundary: Sunday `01:00–02:30` from `2026-10-01` reported 4 repeated starts, including the two `2026-11-01` 01:xx wall times. Cross-zone offset changes remained marked.
- Invalid input and recovery: an invalid host timezone plus duplicate invitee zone produced clear errors, moved keyboard focus to `#form-errors`, then successfully generated a proof after correction.
- Five-zone boundary: adding two zones produced distinct `Australia/Sydney` and `Asia/Tokyo` rows; count reached `5 / 5` and Add invitee zone disabled.
- Weekly export/share: CSV download completed (972,798 bytes, correctly headed matrix); copied review link contained `#proof=` configuration and no ICS text.
- ICS: a timed `VEVENT` with `TZID=America/New_York` and weekly `RRULE` imported and generated a proof. Copy review link was disabled with the stated local-only explanation; persisted local storage did not contain ICS content. A malformed/empty ICS returned `No VEVENT or AVAILABLE windows were found in this file.` and left the page usable.
- PWA: after service-worker activation and reload, the page was controlled by `/sw.js`; an offline reload retained title, main landmark, validator form, and the visible offline status. The worker uses a versioned cache, `skipWaiting`, `clients.claim`, and cleanup of old cache names.

## Browser, accessibility, privacy, and responsive checks

- Desktop (1440 px) and mobile (390 px) were visually inspected. The 390 px page has `scrollWidth === 390`, 16 px body text, no horizontal overflow, and the intentionally stacked layout preserves the form, proof states, exports, and legal links.
- Keyboard-only smoke test reached skip link, navigation, radio inputs, form controls, add/remove controls, submit, results controls, and legal links. Focus has the designed `#244e63` 3 px solid outline with 3 px offset.
- With `prefers-reduced-motion: reduce`, computed transitions reduce to `1e-05s`; no looping motion is present.
- Axe Core WCAG 2 A/AA scan of the local initial page found **0 violations**. A second scan while the validation error was displayed also found **0 violations**; therefore serious/critical findings are zero.
- Browser console and page-error listeners were empty for desktop, 390 px mobile, normal proof, invalid/recovery, ICS, PWA/offline, and live normal proof.
- Captured first-load requests were same-origin only: root, hashed JS, hashed CSS, and the responsive hero image. Source audit found no analytics, beacon, OAuth, calendar credentials, or third-party runtime scripts. Weekly configuration is the only application local-storage value; ICS is held only in page memory and excluded from persisted state and review links.
- The privacy and terms pages exist, accurately describe this behavior, have standalone title/lang/main/h1 structure, and are linked from the product footer.

## Production deployment evidence

Fresh live browser proof reproduced the normal weekly result exactly: 6,240 starts / 720 shifted, with no console or page errors. `verify-url.sh` passed against the live URL (719 ms).

The live app is the candidate, not a stale or deployment-only variant:

| File | SHA-256 (local build and live response) |
| --- | --- |
| `index.html` | `c670a4d20f896da656c8ccc056dc77d170de3d8d5b5ff31e86fdfe66d6abe7a1` |
| `assets/index-BjV7PF2a.js` | `c2f56ca8fee983cf5ec42df5be0e15e2bff2a1a3252ba573cca973f1e6d202cd` |
| `assets/index-BjNtAFfK.css` | `6d7e20aa5c1d68c9b85ee1ff7713cd7ec98430f32a69cb8b207bc4afe8f379d4` |
| `assets/time-slab-720.webp` | `297cfd7c7ed5ce59594b6348581bd6c8921b74c81a2449b87de90ffb81d6d2d4` |
| `assets/time-slab-1280.webp` | `6fa45bd7b5d8b00097e60912f32865d7811b5a4b4327eca0f1977107facad99d` |
| `sw.js` | `38b934b77d0511dfccd867b86f3aade41581c921493f94daef3cb5c25333ff45` |

Live cache/security response policies passed for root, JS, CSS, service worker, manifest, privacy, and terms:

- documents, manifest, and `sw.js`: `Cache-Control: public, max-age=0, must-revalidate`;
- hashed JS/CSS: `Cache-Control: public, max-age=31536000, immutable`;
- HTTPS/HSTS, `nosniff`, strict-origin referrer policy, restrictive camera/microphone/geolocation permissions policy, and self-only CSP are present.

The CSP correctly prevented an attempt to inject Axe into the live page; this is expected enforcement. Local Axe findings apply to the byte-identical application assets above.

## Notes

The product intentionally remains a configuration proof, not a promise of third-party scheduler behavior. Current IANA timezone behavior comes from the visitor browser, consistent with the researched brief. No follow-up product work is required for this candidate.

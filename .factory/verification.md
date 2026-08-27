# Independent verification — FAIL

**Work order:** `timezone-slot-proof-verify-1`  
**Candidate:** `2778ab73fb6549841e4afe4d6a3c0ebfeb903d02` (`origin/main` resolved to this SHA)  
**Production URL:** https://timezone-slot-proof.sociobot.in  
**Verified:** 2026-08-27 UTC  
**Verdict:** **FAIL** — see `P2-1`; the deployed static asset cache policy does not meet the factory performance contract.

## Deployment identity

The live deployment is the candidate, not an older or divergent build. SHA-256 matched fresh `dist/` output for:

- `index.html`: `82d59c6ad97d307039d1c2e61d2a87fc4c018be55a009616b105e74082cae6f2`
- `assets/index-hTWl9FdE.js`, `assets/index-BjNtAFfK.css`, both WebP hero variants, `sw.js`, `privacy/index.html`, and `terms/index.html`: all exact matches.

## Local build and automated checks

Performed from the clean candidate checkout:

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 54 packages audited, 0 vulnerabilities |
| `npm test` | Passed: 3 files, 10 tests |
| `npm run build` | Passed: `tsc --noEmit` and Vite production build |
| Lint | No lint script/configuration is provided |
| Factory `verify-url.sh http://127.0.0.1:4173 .factory/evidence` | Passed: HTTP 200, 640 ms load, title/lang/one h1/main/alts/button labels valid, no console errors |
| axe-core WCAG 2 A/AA, initial form and rendered results | 0 violations; 0 serious/critical |
| Lighthouse mobile, production preview | Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.0 s, LCP 1.4 s, TBT 20 ms, CLS 0 |

Production output is 26,357 B JS (10.10 KB gzip), 20,300 B CSS (5.30 KB gzip), and a 47,592 B mobile hero image; all are within the stated budgets.

## End-to-end evidence

- Weekly-hours proof: a five-zone New York configuration rendered 6,272 starts and 720 shifted/DST-seam rows; CSV download completed successfully.
- DST boundary proof: New York Sundays 01:30–03:30 from 2026-03-01 generated 316 starts, including 6 missing spring-gap/end slots, 1 repeated fall-fold slot, and 24 shifted rows. The ledger correctly named the invalid wall times and projected cross-zone shifts.
- Invalid-input recovery: an unsupported `Invalid/Zone` produced the explicit validation message; correcting it produced the matrix.
- ICS: a future New York `VEVENT` spanning the 2027 spring transition imported locally and generated four starts, flagging the two nonexistent 02:00/02:30 starts and the start whose end falls in the gap. The ICS review-link button was disabled; imported contents did not enter local storage.
- Privacy: browser request capture for local and live runs found no third-party requests, console errors, or page errors. The only application storage observed was `timezone-slot-proof:config`; copied weekly review links contained configuration after `#proof=`, not ICS text. Source inspection found no analytics, credentials, or runtime network API.
- Desktop and 390 px mobile: no page-level horizontal overflow; mobile primary action was 50 px tall. The wide result matrix is intentionally internally scrollable.
- Keyboard/reduced motion: Tab reached the skip link with a visible `3px solid rgb(36, 78, 99)` ring; Enter moved to `#main`; keyboard arrow navigation selected the ICS radio. Form focus is a 3 px blueprint ring with 3 px offset. With reduced motion, result animation/transition duration computed to `0.01ms`.
- PWA: the preview service worker activated and controlled the page after reload; an offline reload retained the title, main, and form. A same-origin synthetic service-worker update (only cache version changed, no product files modified) activated and reduced caches from v1+v2 to v2 only.
- Live policy checks: root, JS, CSS, service worker, manifest, privacy, and terms returned HTTPS 200 with CSP, `nosniff`, HSTS, referrer policy, and camera/microphone/geolocation Permissions-Policy headers. Live 390 px navigation had no external requests or console/page errors.

## Defects

### P2-1 — hashed production assets are not long-lived immutable cached (release blocker)

**Evidence:** live `GET /assets/index-hTWl9FdE.js` and `GET /assets/index-BjNtAFfK.css` both return `Cache-Control: public, must-revalidate, max-age=30`. Their names are content-hashed, yet the deployment gives them the same 30-second policy as HTML, `sw.js`, and legal pages.

**Impact:** every normal revisit after 30 seconds must revalidate the JS/CSS bundle. This fails the factory performance requirement for long-lived immutable caching of hashed static assets and makes the stated static-web caching quality gate unmet, despite the small bundle and working service worker.

**Required resolution:** configure the deploy host/static-web configuration to send a long-lived immutable policy (for example, `public, max-age=31536000, immutable`) for `/assets/*` hashed artifacts, while retaining a short/no-cache policy for HTML and `sw.js`; redeploy and recheck actual response headers.

### P3-1 — validation summary cannot receive the focus the code requests

**Evidence:** after invalid-zone submission, `showErrors()` calls `#form-errors.focus()`, but the div has no `tabindex`; the active element did not become the error summary. The alert is still exposed with `role="alert"` and the user can correct the field, so this did not trigger an axe issue.

**Impact:** keyboard users do not land on the validation summary after submit, reducing recovery clarity.

### P3-2 — adding two invitee zones without editing inserts duplicate defaults

**Evidence:** pressing “Add invitee zone” twice creates two `Australia/Sydney` inputs, then the form blocks submission with the duplicate-zone error. Editing the fifth zone to `Asia/Tokyo` recovers and the five-zone proof succeeds.

**Impact:** recoverable friction in the advertised five-zone path.

## Retest command set

```sh
npm ci
npm test
npm run build
npm run preview -- --host 127.0.0.1
/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence
```

After the cache configuration is changed, inspect the live headers directly:

```sh
curl -sSI https://timezone-slot-proof.sociobot.in/assets/index-hTWl9FdE.js
curl -sSI https://timezone-slot-proof.sociobot.in/assets/index-BjNtAFfK.css
```

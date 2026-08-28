# Review 2 handoff — Timezone Slot Proof

## Completed

Performed the requested adversarial, no-code-change review of the live product and repository. Wrote `.factory/review-2.md`; no product source, dependency, or deployment configuration was changed.

## Verification

- Fresh Chromium checks: 390 × 844 and 1440 × 1000 cold landing, direct demo, legal routes, 404 route, link crawl, Back navigation, console/page errors, and mobile width.
- Fresh-clone claim commands passed for `demo-isolation`, `dst-check`, `csv-export`, `local-only`, `no-login`, and `offline-demo`.
- `npm test` passed in the reviewed checkout: 14 unit/deployment tests and 7 browser tests.
- Verified live hashed asset caching is immutable.

## Remaining work

Review verdict is **FAIL**. The report records a Back-button focus failure, incomplete route social metadata, soft-404 status behavior, mixed terminology/control labels, and unlisted privacy claims for normal configuration, calendar files, and the README-wide no-third-party promise.

## Run

```sh
npm ci
npm test
npm run build
```

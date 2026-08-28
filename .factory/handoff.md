# Timezone Slot Proof — adversarial review 3 handoff

## Work completed

- Performed a read-only live review at 390 px and desktop, plus source/history inspection. No product code was changed.
- Wrote `.factory/review-3.md` with the complete cold-read result, copy audit, demo/sandbox evidence, claims results, route/link checks, and earlier-finding retest map.
- Created a clean clone at `/tmp/timezone-slot-proof-review3-1jM0Io`, installed dependencies, ran every command listed in `.factory/claims.json`, then ran the full suite.

## Verification

- Every listed claim command passed: `demo-isolation`, `dst-check`, `csv-export`, `local-only`, `no-login`, `offline-demo`, `normal-config-local`, and `calendar-file-local`.
- `npm test` passed in the clean clone: 15 unit/deployment tests and 9 Playwright tests.
- Live checks confirmed direct `/demo`, route-specific metadata, focus on forward/Back navigation, canonical/OG/Twitter/favicon data, a branded HTTP 404, all defined internal links/assets returning 200, and immutable hashed asset caching.

## Known gaps

The review verdict is **FAIL**. The blocking work is documented in `review-3.md`: phone demo results are below the first viewport after the sample action; the legal/404 header shell differs from the app shell; and specialist result/error vocabulary remains. It also records unlisted normal-mode/scheduler/print claims and sub-44px mobile link targets.

## Run locally

```sh
npm ci
npm test
npm run build
npm run preview
```

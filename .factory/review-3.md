# Adversarial first-read review 3 — FAIL

**Reviewed:** 2026-08-28 UTC  
**Live URL:** <https://timezone-slot-proof.sociobot.in>  
**Contexts:** fresh Chromium at 390 × 844 and 1440 × 1000; fresh clean clone at `/tmp/timezone-slot-proof-review3-1jM0Io`

## Verdict

**FAIL.** The cold landing page is clear and the declared tests pass, but the required one-click demo does not put the populated product in the first phone viewport. The shared route shell is still inconsistent, output copy introduces unexplained terms, several live claims have no exact claim/test entry, and links miss the required 44 px touch target.

## Cold first read

Before scrolling, I understood the product as a way to check whether weekly booking hours appear at the intended time in other time zones around daylight saving. It is for **independent professionals with booking links**. I would click **“Try it with sample data”** first, expecting a five-zone check immediately.

All three answers are visible at 390 px and desktop. The exact supporting text is **“For independent professionals with booking links. Check how weekly booking hours appear before daylight saving changes.”** and **“See a five-zone daylight-saving check right away.”** No first-screen clarity finding is raised.

The concrete/moss proof-board image, slab rules, stamped result treatment, and restrained moss/amber palette are recognisably product-specific and match `.factory/design.md`; this is not a generic SaaS surface. The cold mobile document was exactly 390 px wide and had no application console or page errors.

## Findings

### F-3-1 — BLOCKING — the one-click phone demo does not show the sample check in its first viewport

**Location / evidence:** Fresh 390 × 844 visit to `/`, activate **“Try it with sample data.”** The resulting `/?demo=1` viewport contains the demo banner, headline, lede, both hero actions, and trust line. It does **not** contain the populated proof, result summary, table, or a sample time. The first visible result is below the hero. The page instead focuses `#hero-title` after `setupDemo(false)` in `src/main.ts`.

**Why this fails:** The action promise says **“See a five-zone daylight-saving check right away.”** The demo contract requires the first screen after that click to already look like the product in use with realistic sample data. On the required phone context, the visitor sees a labelled landing page again and must scroll before receiving proof that the tool works. A populated DOM below the fold is not an immediately shown demo.

**Concrete fix:** Make `/demo` and `?demo=1` place the generated result in the initial viewport on mobile: for example, focus/scroll the populated `#results` into view after the persistent banner, or use a compact demo-first route with the proof summary before the explanatory hero. Keep the banner and its **Reset demo** / **Start for real** controls visible. Add a 390 px browser test that clicks the hero action and asserts a result datum such as **“158 starts tested”** has a bounding box within the viewport without a user scroll.

### F-3-2 — BLOCKING — the earlier shared-shell repair remains only partial (reopens F-1-5)

**Location / evidence:** `/` and `/demo` use the branded `header.site-header` with the TZ mark, **Demo / Check hours / Method**, and **LOCAL ONLY** badge. `/privacy/`, `/terms/`, and the 404 instead use `public/legal.css` and a different header with a text-only wordmark and **Demo / Check hours / Privacy**. The footer and header typography/layout also differ. This is visible live and in `index.html` versus `public/privacy/index.html`, `public/terms/index.html`, and `public/404.html`.

**Why this fails:** The required skeleton says the header is consistent on every route and includes the product navigation and Privacy. A visitor arriving through a legal or missing URL sees what looks like a related but separate site. This is a partial repair of F-1-5 even though forward and Back heading focus now work.

**Concrete fix:** Use one shared header/footer component or exact shared markup/styles on `/`, `/demo`, `/privacy/`, `/terms/`, and 404. Include the same wordmark treatment and a consistent, ≤4-link navigation that includes Demo, Check hours, Method, and Privacy as appropriate. Retain the existing skip link, focused route heading, and live announcement. Add raw route-shell assertions, not only title/focus assertions.

### F-3-3 — BLOCKING — result and error copy reintroduce unexplained specialist terms (reopens F-1-8)

**Location / quotes:** The populated sample shows **“DST SEAMS”**, **“Attention ledger”**, **“Test matrix”**, **“PROOF GENERATED”**, and **“configuration proof.”** An invalid time-zone entry produces **“is not a supported IANA working timezone.”**

**Why this fails:** These are the terms a visitor meets while using the product, not implementation details. “DST seams,” “ledger,” “matrix,” “configuration proof,” and “IANA” do not explain what action or result is involved. This contradicts the recorded visitor vocabulary (`bookable times`, `client time zone`, `clock-change flag`, `check`) and means F-1-8 is not fully fixed.

**Concrete fix:** Rename **“DST seams”** to **“Clock changes”**, **“Attention ledger”** to **“Bookable time problems”**, **“Test matrix”** to **“Booking-time table”**, **“PROOF GENERATED”** to **“CHECK COMPLETE”**, and **“configuration proof”** to **“booking-hours check.”** Replace the validation message with **“Enter a time-zone name such as America/New_York.”** Add these result/error templates to `.factory/copy-audit.md` and a copy snapshot test.

### F-3-4 — HIGH — normal-mode range and time-zone-rule promises have no exact listed claim

**Location / quotes:** Landing validator help says **“The check uses your browser’s time-zone rules.”** and **“The check covers the next 18 months.”** README says **“Check up to five client time zones for 18 months.”**

**Why this fails:** `dst-check` is explicitly limited to **“The sample check”** in `.factory/claims.json`. Its test loads only `/demo`. The normal weekly-flow test checks storage and requests but does not assert the first/last generated dates or a known browser-zone conversion. These normal-mode statements are claim-like visitor promises without an entry that names and tests them.

**Concrete fix:** Add a `normal-range-and-timezone-rules` claim, list all three locations, and test a normal weekly fixture from a clean browser context. Assert five selected client zones, an 18-month first/last date span, and expected DST conversion output. Alternatively scope the visible statements explicitly to the sample check.

### F-3-5 — HIGH — the scheduler-access promise is an unlisted claim

**Location / quotes:** Landing caveat and README: **“It does not read your scheduler, calendar, overrides, or busy times.”**

**Why this fails:** This is a privacy/integration assertion a booking-link owner can rely on. No `.factory/claims.json` entry describes it. `no-login` proves that the demo has no login controls; it does not prove the stated absence of scheduler, calendar, override, and busy-time access across normal and calendar-file flows.

**Concrete fix:** Add a `no-scheduler-access` claim and a browser test covering normal and calendar-file checks: assert no provider/auth controls or requests, no credential fields, and no external origin. If that scope cannot be made testable, replace the sentence with the narrower tested statement **“This check uses only the hours you enter.”**

### F-3-6 — HIGH — README promises print export without a claim or observable test

**Location / quote:** README, “What v1 includes”: **“Export the full check as CSV or print it.”**

**Why this fails:** `csv-export` only claims and tests a CSV download. There is no `print` claim and no test that invokes or observes the print action. The visible **“Print or save as PDF”** action makes this a product promise, not explanatory wording.

**Concrete fix:** Either remove **“or print it”** and the print action, or add a `print-export` claim with a browser test that stubs `window.print`, activates **“Print or save as PDF,”** and verifies it is called from a populated demo result.

### F-3-7 — MEDIUM — phone links do not meet the required 44 px touch-target size

**Location / evidence:** At 390 px, landing footer **Privacy**, **Terms**, and **Back to top** links have 24 px-high boxes. On Privacy and Terms, the text wordmark is 32 px high and primary/footer links are 27 px high. The required minimum is 44 px.

**Why this fails:** These are the actions a phone visitor needs to reach legal information or recover their place, yet their targets are materially smaller than the stated mobile accessibility baseline.

**Concrete fix:** Give header/footer links an inline-flex 44 px minimum height with sufficient horizontal padding, preserve visible focus styles, and add a mobile bounding-box assertion for every enabled link/button.

## Copy audit

Word counts split on spaces; punctuation and path-like strings count as part of one word. No audited landing or README sentence exceeds 22 words. The flags are F-3-3 through F-3-6; controls use action verbs after the prior repair (**Try**, **Set up**, **Check**, **Export**, **Copy**, **Print**, **Show**, **Reset**, **Start**).

### Landing page sentences

| Words | Sentence |
| ---: | --- |
| 7 | Demo — sample data, nothing is saved. |
| 10 | This five-zone check is separate from your own booking hours. |
| 6 | For independent professionals with booking links. |
| 10 | Check how weekly booking hours appear before daylight saving changes. |
| 7 | See a five-zone daylight-saving check right away. |
| 3 | Five time zones. |
| 3 | One clock change. |
| 2 | Check it. |
| 7 | Your booking hours stay in this browser. |
| 7 | The check uses your browser’s time-zone rules. |
| 3 | Offline and ready. |
| 6 | The check runs in this browser. |
| 8 | Keep this tab open to export a result. |
| 9 | Use the time zone set on your booking page. |
| 7 | The check covers the next 18 months. |
| 7 | Use a calendar export with availability entries. |
| 6 | The file stays in this browser. |
| 3 | No file selected. |
| 5 | Use names such as America/New_York. |
| 7 | Add up to five client time zones. |
| 9 | Compare this check with your booking page before publishing. |
| 13 | Run a check to see bookable times, clock-change flags, and a CSV export. |
| 8 | Add the weekly times that people can book. |
| 11 | See each bookable time in the client time zones you choose. |
| 9 | Clock-change flags show shifted, skipped, and repeated bookable times. |
| 10 | Download the full check to compare with your booking page. |
| 6 | It checks the hours you enter. |
| 11 | It does not read your scheduler, calendar, overrides, or busy times. |
| 8 | Check booking hours across time zones before publishing. |
| 6 | Hero imagery generated for this product. |

Dynamic result templates were also checked: **“158 starts tested across 5 client time zones over 18 months.”** (12), **“22 bookable times need a closer look.”** (8), **“Download every row, not just the rows below.”** (8), **“Calendar-file contents stay local and are not added to review links.”** (11), and **“Compare the CSV against your scheduler’s preview before publishing.”** (10). Their terminology flags are F-3-3 and F-3-5.

### README sentences

| Words | Sentence |
| ---: | --- |
| 12 | Check booking hours across time zones before daylight saving surprises a client. |
| 8 | It is for independent professionals with booking links. |
| 6 | Try the five-zone sample at `/demo`. |
| 7 | The sample starts with a completed check. |
| 8 | It is separate from your saved booking hours. |
| 8 | Add weekly booking hours or a calendar file. |
| 10 | Check up to five client time zones for 18 months. |
| 7 | Mark shifted, skipped, and repeated bookable times. |
| 9 | Export the full check as CSV or print it. |
| 7 | This tool checks the hours you enter. |
| 11 | It does not read your scheduler, calendar, overrides, or busy times. |
| 5 | Requires Node.js 20 or newer. |
| 8 | `npm run build` is the factory build command. |
| 13 | It writes the deployable static site to `./dist`, with `dist/index.html` at its root. |
| 13 | `npm test` builds the site, runs unit tests, and runs the browser suite. |
| 6 | It includes every claim in `.factory/claims.json`. |
| 7 | The suite also checks static deployment headers. |
| 15 | For a browser smoke test, serve the build and run the factory verifier if available. |
| 7 | The sample check makes no third-party requests. |
| 9 | Weekly booking hours can be saved in this browser. |
| 12 | Calendar-file contents stay in the open page and never enter review links. |
| 4 | See Privacy and Terms. |
| 1 | MIT. |
| 2 | See LICENSE. |

## Demo and sandbox check

- The first landing action reaches `/?demo=1` in one click. The sample is realistic: a Sunday `01:30–02:30` New York window, five client zones, 18 months, and shifted/skipped/repeated results.
- The persistent banner reads **“Demo — sample data, nothing is saved.”** Reset restored the exact sample. **Start for real** returns to `/`.
- In a fresh context, no local-storage keys were created during the demo. A separate fresh-context run seeded `timezone-slot-proof:config` before `/demo`; the declared isolation test confirmed it remains unchanged.
- Network capture of the live demo observed only `https://timezone-slot-proof.sociobot.in` requests. The declared offline claim was exercised by its clean-clone browser test, which warmed the service worker, set the context offline, reloaded `/demo`, and retained the result.
- F-3-1 remains blocking because the populated check is not shown in the first phone viewport after entry.

## Claims and clean-clone test evidence

Read `.factory/claims.json` and ran every declared command from the clean clone after `npm ci`. All eight commands passed; each run also passed the 15 unit/deployment tests. `npm test` then passed in full: 15 unit/deployment tests and 9 Playwright tests.

| Claim | Result |
| --- | --- |
| `demo-isolation` | PASS — pre-seeded real configuration unchanged; Reset restores the five-zone fixture. |
| `dst-check` | PASS — 18 months, five zones, and shifted/skipped/repeated labels. |
| `csv-export` | PASS — timestamped CSV download with header and more than 120 rows. |
| `local-only` | PASS — demo calculation requests only its own origin. |
| `no-login` | PASS — no account, credential, OAuth, or calendar-login control. |
| `offline-demo` | PASS — controlled service worker, offline reload, and visible result. |
| `normal-config-local` | PASS — normal weekly result saved under the documented key with same-origin GETs only. |
| `calendar-file-local` | PASS — calendar fixture remains out of storage and URLs; review link disabled; same-origin GETs only. |

F-3-4 through F-3-6 are unlisted claims despite these passes. No declared command failed.

## Structure, links, and history retest

- `/`, `/demo`, `/privacy/`, `/terms/`, `/404.html`, and an arbitrary missing route were checked cold. Each has `lang="en"`, one h1, a main landmark, description, canonical, OG/Twitter title, favicon, and its expected route title. The missing route returns HTTP 404 with the designed page. The app routes correctly, and forward and Back navigation focus and announce the destination heading.
- The live crawl returned 200 for every defined internal route and asset; an arbitrary missing path returned 404. Hashed JavaScript is `Cache-Control: public, max-age=31536000, immutable`.
- The site has no AI runtime feature. The brief does not imply one: calendar-file import, CSV export, review link, and print are already the relevant leverage. No provider key or external model endpoint appears in the product.
- The full earlier record (`review-1.md`, `review-2.md`, `polish-1.md`, `polish-2.md`, and the prior handoff) was read. The exact retest status follows.

| Earlier finding | Retest |
| --- | --- |
| F-1-1 | Fixed: user, job, and first action are all in the first mobile screen. |
| F-1-2 | Reopened by F-3-1: sample data exists but is not immediately visible after the phone entry action. |
| F-1-3 | Fixed: claim inventory exists and every listed clean-clone command passes. New unlisted claims are F-3-4–F-3-6. |
| F-1-4, F-2-1 | Fixed: `/demo` is real and an unknown path returns branded HTTP 404. |
| F-1-5 | Reopened by F-3-2: route focus is fixed, but the shared shell remains inconsistent. |
| F-1-6 | Fixed: raw Demo and 404 heads have route-specific canonical, OG, Twitter, favicon, and titles. |
| F-1-7 | Fixed in the hero: input and CSV output are described plainly. |
| F-1-8 | Reopened by F-3-3: specialist result/error terms remain exposed. |
| F-1-9 | Fixed: the sample and setup actions name their outcomes. |
| F-1-10, F-1-11 | Fixed: the README audit has no sentence over 22 words. |
| F-1-12 | Fixed: current inputs/results use `client time zone` and `bookable time`. |
| F-1-13–F-1-17 | Fixed for their retained sample/login/export claims; matching declared tests pass. |
| F-1-18, F-1-24, F-1-50 | Fixed: normal weekly storage, calendar-file privacy, and sample third-party-request scope have separate declarations/tests. |
| F-1-19–F-1-23 | Retained sample/offline claims pass; normal-mode scope gap is raised separately as F-3-4. |
| F-1-25–F-1-30 | Scope/result guidance is otherwise present; the unlisted scheduler-access assertion is raised as F-3-5. |
| F-1-31, F-1-44 | CSV is tested. The additional print promise is unlisted and raised as F-3-6. |
| F-1-32–F-1-43, F-1-45–F-1-49 | Fixed or removed as stated; current browser/unit suite passes. |
| F-2-2 | Fixed: filters use `Show …`; print uses an action phrase. |
| P2-1, P3-1, P3-2 | Fixed: immutable hashed assets, focusable validation summary, and unique suggested client zones are present and tested. |

## What would make this perfect

Open the demo directly on an in-viewport populated result, unify the route shell, replace the remaining implementation vocabulary with booking-time language, make every retained normal-mode/integration/print statement a precisely scoped claim with an observable clean-state test, and expand legal/navigation touch targets to 44 px. Repeat this full cold mobile, sandbox, claims, route, and copy audit after those changes.

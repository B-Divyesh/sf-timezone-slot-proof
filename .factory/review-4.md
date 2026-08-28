# Adversarial first-read review 4 — FAIL

**Reviewed:** 2026-08-28 UTC

**Live:** <https://timezone-slot-proof.sociobot.in>

**Candidate:** `15d788906a7df9e9462ced43f5afdee36e6fdbd7`

**Contexts:** fresh Chromium at 390 × 844 and 1440 × 1000; clean clone at `/tmp/timezone-slot-proof-review4-clean`

## Verdict

**FAIL.** The first screen is clear, the populated demo is immediately visible, and all 11 listed claim commands pass. Seven findings remain: three earlier copy/share findings are incomplete, two claims are not fully tested, and the mobile route shell misses two required behaviors. PASS requires zero findings and no untested claim.

## Cold first read

Before scrolling at 390 px, I understood this as **a tool that checks booking hours in other time zones before daylight saving changes them**. It is for **independent professionals who publish booking links**. I would click **“Try it with sample data”** first; the adjacent sentence says it will show a five-zone check immediately.

The exact supporting text is **“Check booking hours across time zones,” “For independent professionals with booking links. Check how weekly booking hours appear before daylight saving changes,”** and **“See a five-zone daylight-saving check right away.”** The 1440 px first screen gives the same answers. The mobile document width was 390 px. Both cold contexts had one h1, a main landmark, and no application console/page errors.

## Findings

### F-4-1 / F-1-31 — BLOCKING — “Copy review link” does not open a review and remains unlisted

**Quote/location:** result toolbar, **“Copy review link”**; toast, **“Review link copied. It contains configuration only.”**

I generated a normal weekly check and opened its copied link in a fresh context. The destination had `#results[hidden]`, the empty result, and **“Shared weekly-hours configuration loaded. Run the proof to verify it.”** The recipient must find and activate **“Check booking hours.”** No claim entry/test covers link creation, contents, or reopening.

“Review link” names a result, but the link supplies only setup. This is the incomplete portion of earlier F-1-31 and misses the brief’s useful sharing path.

**Fix:** Make the link open an already-populated, read-only check. Add a `review-link` claim/test that verifies the same zones, dates, counts, and absence of calendar-file contents. Otherwise rename it **“Copy setup link”** and say **“The recipient must run the check.”**

### F-4-2 / F-1-8 — BLOCKING — daylight-saving jargon remains

**Quote/location:** result filter, **“Show DST changes.”** Elsewhere the same concept is **“daylight saving,” “clock changes,”** and **“clock-change flags.”**

The earlier specialist-language finding is only partly fixed. “DST” is unexplained and breaks the recorded visitor vocabulary.

**Fix:** Use **“Show clock changes”** everywhere visitor-facing; retain `dst` only internally.

### F-4-3 / F-1-12 — BLOCKING — equivalent concepts still have conflicting names

**Quotes:** **“Weekly booking hours”** versus **“+ Add window”**; **“bookable times”** versus **“Starts tested,” “First flagged starts,”** and **“Booking-time table.”**

The visitor must infer that a window is a booking-hours range and a start is a bookable time. This contradicts the repository terminology table.

**Fix:** Use **“Add booking-hours range,” “Bookable times tested,” “First flagged bookable times,”** and **“Bookable-time table.”** Add a copy assertion rejecting visitor-facing `window` and `start` for these concepts.

### F-4-4 — HIGH — `dst-check` checks labels, not the claimed states

**Claim:** “The sample check shows 18 months of booking hours in five client time zones and marks daylight-saving changes.”

The test asserts that **“Shifted,” “Skipped,”** and **“Repeated”** are visible. Those metric labels remain visible when values are zero. It does not assert non-zero values or flagged rows. Live currently shows 18, 2, and 2, but the test would not catch their disappearance.

**Fix:** Assert the seeded values (or independently derived non-zero values) and at least one matching shifted, missing, and repeated row/ledger item.

### F-4-5 — HIGH — “Download every row” is unlisted and incompletely tested

**Quote/location:** export bar, **“Download every row, not just the rows below.”**

`csv-export` checks the filename, header, and more than 120 lines. It never compares CSV rows with the visible result count (158 in the sample).

**Fix:** Claim **“Export every generated bookable time as CSV”** and assert `CSV data rows === Starts tested`. Otherwise rewrite the UI as **“Download the check as CSV.”**

### F-4-6 — MEDIUM — Demo focuses an h2 instead of the route h1

Entering `/?demo=1` or `/demo` focuses `#check-complete-heading`, an `<h2>`. The sole h1, **“Check booking hours across time zones,”** comes later in the demo route’s reordered visual sequence.

**Fix:** Make the demo-first result the route h1, or add and focus a visible demo h1 before it while retaining the metric in the first viewport. Test the focused element’s tag and heading order.

### F-4-7 — MEDIUM — the 390 px header removes all primary navigation

**Location:** `src/styles.css`, `.site-header nav { display: none; }`. The phone header contains only the wordmark; Demo, Check hours, Method, and Privacy have no replacement.

On Privacy, Terms, and 404, a phone visitor must scroll to the footer or return home to reach another route. Counting hidden links does not verify usable navigation.

**Fix:** Keep compact visible links or add an accessible menu with focus management and 44 px targets. Assert that at least Demo and Privacy are visible and keyboard-operable on every route.

## Copy audit

Counts split on spaces; hyphenated terms and URLs count once. Repeated dates/times/table cells are data. Navigation, headings, and controls follow the sentence tables.

### Landing and populated demo

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 7 | Demo — sample data, nothing is saved. | — |
| 10 | This five-zone check is separate from your own booking hours. | — |
| 6 | Check booking hours across time zones | — |
| 6 | For independent professionals with booking links. | — |
| 10 | Check how weekly booking hours appear before daylight saving changes. | — |
| 7 | See a five-zone daylight-saving check right away. | — |
| 3 | No calendar login | — |
| 4 | Runs in this browser | — |
| 5 | Export the check as CSV | — |
| 3 | Five time zones. | — |
| 3 | One clock change. | — |
| 2 | Check it. | — |
| 7 | Your booking hours stay in this browser. | — |
| 7 | The check uses your browser’s time-zone rules. | — |
| 3 | Offline and ready. | — |
| 6 | The check runs in this browser. | — |
| 8 | Keep this tab open to export a result. | — |
| 9 | Use the time zone set on your booking page. | — |
| 7 | The check covers the next 18 months. | — |
| 7 | Use a calendar export with availability entries. | — |
| 6 | The file stays in this browser. | — |
| 3 | No file selected. | — |
| 5 | Use names such as America/New_York. | — |
| 7 | Add up to five client time zones. | — |
| 9 | Compare this check with your booking page before publishing. | — |
| 13 | Run a check to see bookable times, clock-change flags, and a CSV export. | — |
| 8 | Add the weekly times that people can book. | — |
| 11 | See each bookable time in the client time zones you choose. | — |
| 9 | Clock-change flags show shifted, skipped, and repeated bookable times. | — |
| 10 | Download the full check to compare with your booking page. | — |
| 6 | It checks the hours you enter. | — |
| 11 | It does not read your scheduler, calendar, overrides, or busy times. | — |
| 8 | Check booking hours across time zones before publishing. | — |
| 4 | Built by Param Factory. | — |
| 6 | Hero imagery generated for this product. | — |
| 7 | 22 bookable times need a closer look. | — |
| 11 | 158 starts tested across 5 client time zones over 18 months. | F-4-3 |
| 8 | Download every row, not just the rows below. | F-4-5 |
| 6 | First flagged starts, in chronological order. | F-4-3 |
| 9 | The local time moved +60 minutes after clocks changed. | — |
| 9 | The local time moved -60 minutes after clocks changed. | — |
| 9 | This local time occurs twice when clocks move back. | — |
| 11 | The meeting ends during a time skipped when clocks move forward. | — |
| 5 | 22 rows in this view | — |
| 3 | Projected bookable times. | — |
| 7 | Time-zone abbreviations appear under each local time. | — |
| 3 | Unavailable local time | — |
| 11 | How these booking hours appear using your browser’s current time-zone rules. | — |
| 9 | Compare the CSV with your booking page before publishing. | — |

No sentence exceeds 22 words and no banned marketing adjective appears.

### README

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 12 | Check booking hours across time zones before daylight saving surprises a client. | — |
| 8 | It is for independent professionals with booking links. | — |
| 6 | Try the five-zone sample at `https://timezone-slot-proof.sociobot.in/?demo=1`. | — |
| 7 | The sample starts with a completed check. | — |
| 8 | It is separate from your saved booking hours. | — |
| 8 | Add weekly booking hours or a calendar file. | — |
| 10 | Check up to five client time zones for 18 months. | — |
| 7 | Mark shifted, skipped, and repeated bookable times. | F-4-4 test gap |
| 9 | Export the full check as CSV or print it. | — |
| 7 | This tool checks the hours you enter. | — |
| 11 | It does not read your scheduler, calendar, overrides, or busy times. | — |
| 5 | Requires Node.js 20 or newer. | — |
| 8 | `npm run build` is the factory build command. | — |
| 13 | It writes the deployable static site to `./dist`, with `dist/index.html` at its root. | — |
| 13 | `npm test` builds the site, runs unit tests, and runs the browser suite. | — |
| 6 | It includes every claim in `.factory/claims.json`. | — |
| 7 | The suite also checks static deployment headers. | — |
| 15 | For a browser smoke test, serve the build and run the factory verifier if available. | — |
| 7 | The sample check makes no third-party requests. | — |
| 9 | Weekly booking hours can be saved in this browser. | — |
| 12 | Calendar-file contents stay in the open page and never enter review links. | — |
| 4 | See Privacy and Terms. | — |
| 1 | MIT. | — |
| 2 | See LICENSE. | — |

No README sentence exceeds 22 words. Developer terms stay in the development section.

### Headings and actions

- Headings make sense out of context except the terminology issue in **“Booking-time table”** (F-4-3).
- Actions begin with verbs: **Try, Set up, Reset, Start, Add, Check, Export, Copy, Print, Show, Previous, Next, Go**. The semantic problem with **“Copy review link”** is F-4-1.
- **“Show DST changes”** is the jargon flag (F-4-2). **“Add window”** is the inconsistent-input flag (F-4-3).

## Demo and sandbox

- One click at 390 px opened `/?demo=1`; **Starts tested** was at y=661–675 inside the 844 px first viewport.
- The realistic sample showed New York Sunday `01:30–02:30`, five zones, 158 starts, 18 shifted, 2 skipped, and 2 repeated starts.
- The persistent banner, Reset, and Start for real were present. Changing zone 1 then resetting restored London and `5 / 5`.
- A seeded real `timezone-slot-proof:config` value remained byte-for-byte unchanged; no `demo:` key was written. Start for real restored the real value.
- Live traffic contained same-origin GETs only. A warmed `/demo` reloaded offline with the result.

## Claims audit

Every command was run exactly as listed after `npm ci` in the clean clone. All exited 0.

| Claim | Result/evidence |
| --- | --- |
| `demo-isolation` | PASS — seeded real storage unchanged; Reset exercised. |
| `dst-check` | PASS command, incomplete assertion — see F-4-4. |
| `csv-export` | PASS command, narrower than live copy — see F-4-5. |
| `local-only` | PASS — only preview origin observed. |
| `no-login` | PASS — no auth/login controls. |
| `offline-demo` | PASS — controlled offline reload retained the result. |
| `normal-config-local` | PASS — expected key and same-origin GETs. |
| `calendar-file-local` | PASS — fixture absent from storage/URL; link disabled. |
| `normal-range-and-timezone-rules` | PASS — five zones, exact range, known conversion. |
| `no-scheduler-access` | PASS — normal/file flows contacted no scheduler. |
| `print-export` | PASS — print function invoked. |

Unlisted/incomplete live claims are the review-link capability (F-4-1) and **“Download every row”** (F-4-5). No listed command failed.

## Structure and accessibility

- Home, Demo, Privacy, Terms, and unknown routes returned 200/200/200/200/404 as expected.
- Each has its route title, description, canonical, OG/Twitter data, icons, `lang="en"`, one h1, main, skip link, shared visual shell, and designed 404. Raw Demo/404 responses contain route metadata.
- Every internal link/hash target was crawled; none was dead. Back restored Demo result focus and then home h1 focus.
- At 390 px, all visible actions were at least 44 × 44 px; reduced motion was near zero; no overflow occurred.
- Axe WCAG 2 A/AA scans found zero violations on all local routes. Local and live HTML/JS/CSS hashes matched. `verify-url.sh` passed live in 774 ms.
- JS is 30.77 KB raw / 11.27 KB gzip. No third-party fonts/scripts, analytics, credentials, or AI endpoints were found.
- F-4-6 and F-4-7 cover the remaining route-structure issues.

The concrete/moss proof-board art, slab rules, registration marks, and restrained state colors match `.factory/design.md` and are not a generic SaaS template.

## Earlier-finding retest

Every earlier review, polish record, verification, and handoff was read. “Fixed” means confirmed live and in current code/tests.

| Earlier IDs | Result |
| --- | --- |
| F-1-1 | Fixed: audience/job/action are above the mobile fold. |
| F-1-2 | Fixed: one-click populated isolated demo works. |
| F-1-3 | Fixed inventory/commands; new test gaps are F-4-4/F-4-5. |
| F-1-4 | Fixed: real Demo route and HTTP 404. |
| F-1-5 | Fixed exact shell/focus defect; new issues are F-4-6/F-4-7. |
| F-1-6 | Fixed: route metadata is complete. |
| F-1-7 | Fixed: hero input/output wording is plain. |
| F-1-8 | **Reopened as F-4-2:** `DST` remains visitor-facing. |
| F-1-9 | Fixed: hero actions name outcomes. |
| F-1-10 | Fixed: README opening is below 22 words. |
| F-1-11 | Fixed: README build copy is below 22 words. |
| F-1-12 | **Reopened as F-4-3:** input/output terms still conflict. |
| F-1-13 | Fixed: sample range/zones are exercised. |
| F-1-14 | Fixed live; assertion weakness is F-4-4. |
| F-1-15 | Fixed: no-login test passes. |
| F-1-16 | Fixed: browser-local sample test passes. |
| F-1-17 | Fixed CSV creation; completeness is F-4-5. |
| F-1-18 | Fixed: normal storage test passes. |
| F-1-19 | Fixed: browser-zone conversion passes. |
| F-1-20 | Fixed: offline demo reload passes. |
| F-1-21 | Fixed: offline calculation remains usable. |
| F-1-22 | Fixed: exact 18-month range asserted. |
| F-1-23 | Fixed: parser-detail promise absent. |
| F-1-24 | Fixed: calendar-file privacy test passes. |
| F-1-25 | Fixed: scheduler scope is tested. |
| F-1-26 | Fixed: result guidance is concrete. |
| F-1-27 | Fixed: algorithm marketing absent. |
| F-1-28 | Fixed: browser time-zone wording. |
| F-1-29 | Fixed: unsupported comparison removed. |
| F-1-30 | Fixed live; test weakness is F-4-4. |
| F-1-31 | **Reopened as F-4-1:** review-link capability is not a review and is untested. |
| F-1-32 | Fixed: deterministic-proof marketing absent. |
| F-1-33 | Fixed: scheduler-access claim exact/tested. |
| F-1-34 | Fixed: free/local-first footer claim absent. |
| F-1-35 | Fixed: README names audience/job. |
| F-1-36 | Fixed: sample zones/range observed. |
| F-1-37 | Fixed: scheduler flows tested. |
| F-1-38 | Fixed: deterministic wording absent. |
| F-1-39 | Fixed: README input wording plain. |
| F-1-40 | Fixed: parser detail absent from README. |
| F-1-41 | Fixed: normal zone-rule claim tested. |
| F-1-42 | Fixed live; test weakness is F-4-4. |
| F-1-43 | Fixed: offset marketing absent. |
| F-1-44 | Fixed CSV/print actions; completeness is F-4-5. |
| F-1-45 | Fixed: offline/mobile behavior passes. |
| F-1-46 | Fixed: parser scope claim absent. |
| F-1-47 | Fixed: no-scheduler scope tested. |
| F-1-48 | Fixed: request interception passes. |
| F-1-49 | Fixed: demo/real storage documented and isolated. |
| F-1-50 | Fixed: third-party wording scoped to sample. |
| F-2-1 | Fixed: unknown route returns branded 404 status. |
| F-2-2 | Fixed for action verbs; abbreviation remains F-4-2. |
| P2-1 | Fixed: hashed assets use immutable caching. |
| P3-1 | Fixed: validation summary is focusable. |
| P3-2 | Fixed: suggested zones are unique. |
| F-3-1 | Fixed: result metric is in first demo viewport. |
| F-3-2 | Fixed shared visual shell; mobile navigation is F-4-7. |
| F-3-3 | Fixed exact quoted jargon; remaining abbreviation is F-4-2. |
| F-3-4 | Fixed: normal range/rules claim passes. |
| F-3-5 | Fixed: scheduler-access claim passes. |
| F-3-6 | Fixed: print action tested. |
| F-3-7 | Fixed: visible mobile targets meet 44 px. |

## Missed leverage

AI would be decorative for this deterministic calculation; no AI feature or provider key is present. Import, CSV, and print exist. The obvious missing leverage is a genuine shareable review; F-4-1 specifies the result-first behavior already implied by the brief and button.

## What would make this perfect

Make the review link open the completed check. Strengthen DST and CSV tests to assert outcomes. Use one plain vocabulary, focus the Demo h1, and retain usable header navigation at 390 px. Then rerun every clean-clone claim command and this full live checklist.

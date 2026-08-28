# Adversarial first-read review 2 — FAIL

**Reviewed:** 2026-08-28 UTC  
**Live URL:** <https://timezone-slot-proof.sociobot.in>  
**Contexts:** fresh Chromium at 390 × 844 and 1440 × 1000; fresh clone for claim commands

## Verdict

**FAIL.** The job, intended user, and first action are clear in the first mobile screen, and the sample proves the core interaction immediately. However, Back navigation loses keyboard focus, three privacy promises are not represented by an exact claim/test, direct route metadata is incomplete, and the terminology table is not followed. A pass requires zero findings.

## Cold first read

Before scrolling at 390 px, I understood this as: **a tool for independent professionals to check whether their booking hours change in other time zones around daylight saving.** It is for **people with booking links**, and the first click is **“Try it with sample data”** to see a five-zone daylight-saving check. All three answers are visible without scrolling. The desktop view communicates the same task.

The first screen has a visible primary action, accompanying result note, and three plain facts. The product opens `/demo` directly into a populated 18-month, five-zone result with shifted, skipped, and repeated examples. The persistent banner reads **“Demo — sample data, nothing is saved.”** Reset restores the fixture. A real `timezone-slot-proof:config` value seeded before visiting `/demo` remained unchanged, and the demo created no real or `demo:` local-storage value. The sample made same-origin requests only.

The visual identity is distinct: the concrete proof-board image, moss/amber state palette, slab borders, and compressed labels implement the recorded visual thesis rather than a generic SaaS layout. Both cold contexts had no console or page errors; the mobile document width was 390 px.

## Findings

### F-1-5 — BLOCKING — Back navigation does not move focus to the destination heading

**Location / evidence:** Open `/`, activate **“Try it with sample data”**, then use the browser Back button. The returned URL is `/`, but `document.activeElement` is `BODY`, not `#hero-title`. The same occurred after `/privacy/` → Back. The route requirement applies to Back/Forward as well as forward navigation.

**Why this fails:** A keyboard or screen-reader visitor returning from Demo or Privacy receives no new-page focus cue. This is a half-fix of the earlier route-focus finding: direct navigation to Demo and Privacy focuses their headings, but the reverse route does not.

**Concrete fix:** On `pageshow` for a `back_forward` navigation (or with client-side routing), focus the destination `<h1>` and set the polite route announcement. Add browser tests that use `page.goBack()` from Demo, Privacy, Terms, and the not-found page and assert the relevant heading is focused.

### F-1-18 — HIGH — normal-configuration privacy promise has no matching claim entry or sandbox test

**Location / quote:** home validator introduction: **“Your configuration stays in this browser.”**

**Why this fails:** The retained `demo-isolation` claim only proves that demo does not touch a pre-seeded real key. It does not list or test the visitor-facing assertion about a normal configuration. `local-only` is expressly scoped to **“The demo check”**. This reintroduces the privacy claim previously tracked as F-1-18 without the required claim contract.

**Concrete fix:** Either remove the sentence, or add a `normal-config-local` claim and a clean-state browser test that enters normal weekly hours, intercepts all requests, verifies same-origin-only traffic, and verifies the saved configuration is only in the documented local-storage key.

### F-1-24 — HIGH — calendar-file privacy promise has no matching claim entry or exercised import flow

**Location / quotes:** home calendar-file control: **“Use a calendar export with availability entries. The file stays in this browser.”** README Privacy: **“Calendar-file contents stay in the open page and are not put in review links.”**

**Why this fails:** The only privacy request-interception test opens the weekly demo fixture. It never selects the calendar-file source, uploads a fixture, or checks storage/review-link contents. No claims.json entry says that calendar-file contents remain local. This is the earlier F-1-24 claim in new wording, not a verified replacement.

**Concrete fix:** Add `calendar-file-local` to `claims.json`. From `/demo`, select calendar-file input, upload a realistic fixture, generate a result, attempt Copy review link, and assert no cross-origin/upload request, no ICS text in local storage or copied URL, and the documented CSV outcome. Otherwise remove the promise.

### F-1-50 — HIGH — README makes a broader no-third-party promise than the listed claim proves

**Location / quote:** README Privacy: **“The app makes no third-party runtime requests.”**

**Why this fails:** `local-only` promises only **“The demo check runs in this browser without third-party requests.”** Its test visits `/demo` and does not cover the normal weekly flow or calendar import. The README asserts a property of the whole app, so it is an unlisted claim. This reopens F-1-50.

**Concrete fix:** Change the sentence to **“The sample check makes no third-party requests.”** and retain the current test, or expand the claim/test above to cover normal and calendar-file flows before keeping the app-wide statement.

### F-1-6 — MEDIUM — route-specific social metadata is incomplete and Demo keeps home social text

**Location / evidence:** Cold `/demo` loads the home HTML metadata. After JavaScript runs, its `<title>`, description, and canonical change, but `og:title` and `twitter:title` remain **“Timezone Slot Proof — Check booking hours”**, not the Demo title. `/definitely-missing` has the same home OG/Twitter fields. The static [`public/404.html`](../public/404.html) has neither OG nor Twitter metadata.

**Why this fails:** Shared previews and crawlers read the initial response, not a later DOM change. This is a partial fix of F-1-6: title/canonical/favicons are present, but every route still does not expose its own complete metadata.

**Concrete fix:** Serve route-specific HTML heads for `/demo` and `/404` (including title, description, canonical, OG and Twitter fields), and update all relevant OG/Twitter nodes during SPA navigation. Add raw-HTML metadata assertions for `/`, `/demo`, `/privacy/`, `/terms/`, and the not-found response.

### F-1-12 — MEDIUM — equivalent concepts still use conflicting names

**Location / quotes:** the form labels **“Invitee zones”** and **“Invitee zone 1”**; nearby help says **“Add up to five client time zones.”** The README also uses **“client time zones.”** The demo result says **“22 slots need a closer look”** while the landing describes **“bookable times.”**

**Why this fails:** A first-time visitor cannot tell whether an invitee zone differs from a client time zone, or whether a slot differs from a bookable time. This is the same terminology issue from F-1-12, not a completed standardisation.

**Concrete fix:** Use **“client time zone”** in every input, label, result, README sentence, and test. Change the summary to **“22 bookable times need a closer look.”** Update `.factory/copy-audit.md` and add a terminology assertion or snapshot.

### F-2-1 — MEDIUM — unknown route is a soft 404 and its raw response is successful

**Location / evidence:** `GET https://timezone-slot-proof.sociobot.in/definitely-missing` returns HTTP **200** and the application subsequently renders an in-page “Page not found” state. `GET /404.html` also returns HTTP 200 because it is a normal static file.

**Why this fails:** The visitor-visible fallback is designed, but a crawler, shared-link checker, or client without JavaScript receives a successful unknown URL. `responseOverrides.404` is never reached because the navigation fallback rewrites unknown paths first.

**Concrete fix:** Configure the deployed static host so unknown paths receive the designed 404 document with HTTP 404, while retaining explicit `/demo`, `/privacy/`, and `/terms/` routes. Add a response-status test for a random unknown path.

### F-2-2 — MINOR — result filter and print buttons do not name the action

**Location / quotes:** result buttons **“All starts”**, **“DST changes”**, **“Problems”**, and **“Print / PDF.”**

**Why this fails:** These controls are understandable after inspection, but they do not meet the required result-naming-verb rule. A screen-reader button list presents filter nouns rather than the action.

**Concrete fix:** Rename them **“Show all starts,” “Show DST changes,” “Show problems,”** and **“Print or save as PDF.”**

## Copy audit

Word counts split on spaces; hyphenated forms and identifiers count as one word. All listed landing/README sentences and prose labels are at or below the 22-word limit. The terminology and control-label flags above are the copy findings.

### Landing page

| Words | Copy |
| ---: | --- |
| 2 | Booking-time check |
| 6 | Check booking hours across time zones |
| 6 | For independent professionals with booking links. |
| 10 | Check how weekly booking hours appear before daylight saving changes. |
| 5 | Try it with sample data |
| 5 | Set up my booking-hours check |
| 7 | See a five-zone daylight-saving check right away. |
| 3 | No calendar login |
| 4 | Runs in this browser |
| 5 | Export the check as CSV |
| 3 / 3 / 2 | Five time zones. / One clock change. / Check it. |
| 3 | Add booking hours |
| 6 / 7 | Your configuration stays in this browser. / The check uses your browser’s time-zone rules. |
| 9 / 7 | Use the time zone set on your booking page. / The check covers the next 18 months. |
| 7 / 6 | Use a calendar export with availability entries. / The file stays in this browser. |
| 5 / 7 | Use names such as America/New_York. / Add up to five client time zones. |
| 9 | Compare this check with your booking page before publishing. |
| 2 / 5 | Booking-time results / Your booking-time check appears here |
| 13 | Run a check to see bookable times, clock-change flags, and a CSV export. |
| 4 / 7 | How the check works / How booking hours change across time zones |
| 8 | Add the weekly times that people can book. |
| 11 | See each bookable time in the client time zones you choose. |
| 9 | Clock-change flags show shifted, skipped, and repeated bookable times. |
| 10 | Download the full check to compare with your booking page. |
| 5 | What this check cannot verify |
| 6 / 11 | It checks the hours you enter. / It does not read your scheduler, calendar, overrides, or busy times. |
| 8 | Check booking hours across time zones before publishing. |
| 4 / 6 | Built by Param Factory. / Hero imagery generated for this product. |

The dynamic demo result is populated with realistic dates/times rather than prose-only placeholders. Its static sentence templates include **“starts tested across 5 invitee zones over 18 months,” “Download every row, not just the rows below,”** and **“Compare the CSV against your scheduler’s preview before publishing.”** They are each under 22 words, but its use of **invitee zones** is included in F-1-12.

### README

| Words | Copy |
| ---: | --- |
| 12 / 8 | Check booking hours across time zones before daylight saving surprises a client. / It is for independent professionals with booking links. |
| 6 / 7 / 8 | Try the five-zone sample at `/demo`. / The sample starts with a completed check. / It is separate from your saved booking hours. |
| 8 | Add weekly booking hours or a calendar file. |
| 10 | Check up to five client time zones for 18 months. |
| 7 | Mark shifted, skipped, and repeated bookable times. |
| 9 | Export the full check as CSV or print it. |
| 7 / 11 | This tool checks the hours you enter. / It does not read your scheduler, calendar, overrides, or busy times. |
| 5 | Requires Node.js 20 or newer. |
| 8 / 13 | `npm run build` is the factory build command. / It writes the deployable static site to `./dist`, with `dist/index.html` at its root. |
| 13 / 6 / 7 | `npm test` builds the site, runs unit tests, and runs the browser suite. / It includes every claim in `.factory/claims.json`. / The suite also checks static deployment headers. |
| 15 | For a browser smoke test, serve the build and run the factory verifier if available. |
| 6 | The check runs in the browser. |
| 7 | The app makes no third-party runtime requests. |
| 9 | Normal weekly configuration can be saved in local storage. |
| 14 | Calendar-file contents stay in the open page and are not put in review links. |
| 4 | See Privacy and Terms. |
| 1 / 2 | MIT. / See LICENSE. |

Developer terms such as Node.js, npm, and deployment headers are appropriate in the development section. **“local storage”** is technical visitor-facing privacy wording; use **“saved in this browser”** when the corresponding claim/test is added.

## Claims and sandbox evidence

Read `.factory/claims.json` and ran every declared command from a new local clone at `/tmp/timezone-slot-proof-review-tSQt3D` after `npm ci`:

| Claim | Command result |
| --- | --- |
| `demo-isolation` | PASS — seeded real configuration unchanged; sample result and Reset verified. |
| `dst-check` | PASS — five zones, 18 months, shifted/skipped/repeated labels. |
| `csv-export` | PASS — CSV download and readable header/rows. |
| `local-only` | PASS — demo used only `http://127.0.0.1:4173`. |
| `no-login` | PASS — no credential/login/OAuth control. |
| `offline-demo` | PASS — controlled service worker and offline reload retained the sample result. |

`npm test` also passed in the reviewed checkout: 14 unit/deployment tests and 7 browser tests. There were no failing listed claim tests. F-1-18, F-1-24, and F-1-50 are nevertheless unlisted claims, as required by the cross-check above.

## Structure and history retest

- The main routes load with one `<h1>`, `<main>`, `lang="en"`, canonical URL, favicon, description, and no console errors. The landing title is **“Timezone Slot Proof — Check booking hours”**; Privacy and Terms use the required `Privacy/Terms — Product` form. The demo title is **“Demo — Timezone Slot Proof.”** The metadata exceptions are F-1-6.
- `robots.txt` and `sitemap.xml` exist. Crawled internal links on `/`, `/demo`, `/privacy/`, `/terms/`, and `/404.html`; all defined destinations returned 200. The response behavior for an undefined route is F-2-1.
- `/demo` direct load, `?demo=1`, Reset, Start for real, five-zone sample, same-origin request interception, and offline reload were checked. No AI feature is called for by the brief: adding one would be decorative. ICS import, CSV export, review-link export, and print/PDF are already present; the calendar-file privacy verification is the missing leverage in F-1-24.
- Earlier P2-1 remains fixed: the live hashed JavaScript asset returns `Cache-Control: public, max-age=31536000, immutable`. Earlier P3-1 remains fixed (`#form-errors` has `tabindex="-1"`); P3-2 remains fixed (suggested added zones are unique).

| Earlier finding(s) | Retest result |
| --- | --- |
| F-1-1, F-1-2, F-1-7–F-1-11 | Fixed: first screen names the user/job/action; direct populated demo; plain copy and capped README sentences. |
| F-1-3, F-1-13–F-1-17, F-1-19–F-1-23, F-1-25–F-1-49 | Fixed for the exact retained sample/DST/export/no-login/offline claims: inventory exists and all declared clean-clone commands pass. Exceptions that reintroduce privacy scope are reopened separately as F-1-18, F-1-24, and F-1-50. |
| F-1-4 | Visually fixed: unknown route renders the designed state. Response-status portion remains incomplete as F-2-1. |
| F-1-5 | Reopened: forward focus works; Back focus fails. |
| F-1-6 | Reopened: core metadata is present; route-specific raw/OG/Twitter metadata is incomplete. |
| F-1-12 | Reopened: client/invitee zone and slot/bookable-time terms remain mixed. |
| P2-1, P3-1, P3-2 | Fixed, as noted above. |

## What would make this perfect

Make Back/Forward announce and focus the new page heading; make every privacy statement an exactly scoped, sandboxed claim; deliver correct raw metadata and an HTTP 404 for direct routes; and use one vocabulary plus action-named result controls. After those changes, rerun every claims command from a clean clone and repeat the live route checks.

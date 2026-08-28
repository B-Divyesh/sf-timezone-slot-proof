# Adversarial first-read review 1 — FAIL

**Reviewed:** 2026-08-28 UTC  
**Live URL:** <https://timezone-slot-proof.sociobot.in>  
**Viewports:** fresh Chromium contexts at 390 × 844 and 1440 × 1000  
**Verdict:** **FAIL**

The validator itself is present and loads without console errors, but the release does not meet the factory demo, claims, and route contracts. A first-time visitor cannot try a realistic proof without entering their own configuration, and the product makes no testable claim inventory available.

## Cold first screen

Before scrolling at 390 px, I understood this as: a tool to check whether booking availability shifts around clock changes in several time zones. The likely first click is **“Inspect my hours”**, which scrolls to a configuration form.

I could **not** answer *for whom* from the first screen. The closest text is **“Before clients find the broken hour”** and **“before you publish a booking link.”** Neither names the person who has the problem. That fails the mandatory first-screen test.

The visual system is distinct and matches the recorded concrete/moss thesis; this is not a generic SaaS template. Both screenshots had a 390 px document width, and the live page reported no console errors.

## Findings

### F-1-1 — BLOCKING — the first screen does not name its user

**Location / quote:** landing hero eyebrow and lede: “Before clients find the broken hour” and “See shifted, skipped, and repeated times before you publish a booking link.”

**Why this fails:** A cold visitor can infer a time-zone checker, but not whether it is for a solo consultant, a scheduler administrator, a traveller, or an engineering team. The brief’s user is “solo professionals publishing booking links”; that person is never stated on the first screen.

**Concrete fix:** Replace the lede with: “For independent professionals with booking links. Check how your weekly availability appears before daylight saving changes.” Keep the job headline at nine words or fewer, for example: “Check booking hours across time zones.”

### F-1-2 — BLOCKING — there is no one-click sample-data demo or sandbox

**Evidence:** Fresh mobile DOM counts were `0` for “Try it with sample data”, `0` for “Reset demo”, and `0` for “Start for real”. Source search found no `demo` or `sample` product implementation. `GET /demo` returns HTTP 200 but renders the ordinary landing page, with the same h1 and no banner. There is no `.factory/demo.md`.

**Why this fails:** A visitor must enter time zones, dates, days, and hours before seeing value. The required first action must immediately show a realistic proof, then make clear that sample data is isolated. There is no demo storage namespace, demo banner, Reset action, or verified path that cannot touch real data.

**Concrete fix:** Add `/demo` (and `?demo=1` if retained) with a visible **“Try it with sample data”** action in the hero. It must open an already-rendered realistic five-zone DST proof, retain a persistent “Demo — sample data, nothing is saved” banner, and provide **“Reset demo”** plus **“Start for real”**. Use only a `demo:` storage prefix while that banner is present, discard it when leaving, document the fixture/reset/storage contract in `.factory/demo.md`, and add browser tests for isolation and reset.

### F-1-3 — BLOCKING — the mandatory claims contract is absent

**Evidence:** `.factory/claims.json` does not exist. Consequently there were no listed claim tests to run from the clean clone (`0` discoverable tests), and no claim has a required `@claim:<id>` sandbox test.

**Why this fails:** The landing page and README ask a visitor to rely on offline, privacy, export, data-range, and product-behaviour statements. Without a claim entry and observable demo test for each, none is independently verifiable.

**Concrete fix:** Create `.factory/claims.json`; add one clean-state Playwright/Vitest command tagged `@claim:<id>` for every retained claim; make each test start at `/demo`. Remove a sentence if it cannot be asserted. The unlisted-claim inventory below is the required starting scope.

### F-1-4 — BLOCKING — `/demo` and unknown URLs masquerade as the home page; no designed 404 exists

**Evidence:** `https://timezone-slot-proof.sociobot.in/demo` and `https://timezone-slot-proof.sociobot.in/this-route-must-not-exist` both return HTTP 200 and render the root title **“Timezone Slot Proof — Inspect booking hours across DST”** and root h1 **“Prove your slots survive the clock change.”** `public/staticwebapp.config.json` has a blanket navigation fallback and the repository contains no 404 page or not-found UI.

**Why this fails:** A direct demo link does not open demo mode, and an invalid link falsely appears valid. This is broken routing, not merely a missing message.

**Concrete fix:** Implement a real `/demo` route and a branded not-found route/status response with a clear “Page not found” h1 and a Home link. Exclude the real static routes from fallback, or route the SPA path explicitly. Test direct load, reload, Back, and focus after each route change.

### F-1-5 — HIGH — legal routes do not follow the shared route shell or focus contract

**Evidence:** `/privacy/` and `/terms/` use a one-link header and plain-text footer instead of the landing header/footer with Privacy and Terms links. Neither page has a skip link. After clicking **Privacy** from the landing page, `document.activeElement` was `BODY#`, not the new h1, and there is no route announcement.

**Why this fails:** Keyboard and screen-reader users lose their location after navigation, and legal pages look like a separate site. This conflicts with the required consistent shell, route-change focus, and polite announcement.

**Concrete fix:** Give every route the shared wordmark/header, skip link, footer legal links, factory attribution, and build/version text. On navigation and Back/Forward, focus the destination h1 and update a polite live region. Add a browser test that proves this on `/`, `/demo`, `/privacy`, `/terms`, and 404.

### F-1-6 — MEDIUM — route metadata is incomplete

**Evidence:** The root has a title, description, canonical, OG title/description/image, and SVG favicon, but no Twitter-card metadata or `apple-touch-icon`. The supplied OG image is `1280 × 853`, not the required 1200 × 630 social image. Privacy and Terms have descriptions/titles, but no canonical link, OG metadata, Twitter metadata, or favicon link.

**Why this fails:** Shared previews and route identity are incomplete, especially when a legal URL is shared directly.

**Concrete fix:** Create a product-derived 1200 × 630 image and an original 180 px apple touch icon. Add canonical, OG title/description/image, Twitter-card tags, favicon, and route-specific plain-language titles to every route, including demo and 404. Add static metadata assertions.

### F-1-7 — MEDIUM — the hero uses unexplained jargon and a vague export promise

**Location / quote:** “Turn working hours or an **ICS availability file** into an 18-month, five-zone **inspection**.”; “See **shifted, skipped, and repeated times**…”; “Exports the **evidence**.”

**Why this fails:** “ICS”, “inspection”, and “evidence” do not tell an uninitiated booking-link owner what to provide or receive. “Slots” is also used before it is grounded as bookable times.

**Concrete fix:** Use: “Add your weekly booking hours. See every bookable time in up to five time zones for the next 18 months.” Replace “Exports the evidence” with “Export the check as CSV.” Put “Import an ICS calendar file” behind a plain explanation such as “Use this only if your calendar app gave you an .ics availability file.”

### F-1-8 — MEDIUM — specialised terms are exposed without plain-language support

**Location / quote:** “We calculate with the **IANA timezone data** built into your browser”; “**VEVENT or AVAILABLE windows; weekly RRULE supported**”; “Use **IANA names**”; “**DST seams**”; “A small test rig for **civil time**”; “Week-equivalent starts are compared.”

**Why this fails:** These terms are not needed for the first task and make the form/method hard to scan. Several headings also make no sense when heard alone by a screen-reader user.

**Concrete fix:** Use “the time-zone rules in your browser,” “calendar event or availability entries,” and “time-zone names such as America/New_York.” Rename “Proof board” to “Your booking-time results,” “A small test rig for civil time” to “How the booking-time check works,” and “Keep the claim honest” to “What this check cannot verify.” Keep the standards terminology in optional help text only.

### F-1-9 — MEDIUM — the primary hero action does not name its actual result

**Location / quote:** **“Inspect my hours ↓”** links only to the blank validator form.

**Why this fails:** “Inspect” implies that a result will appear, but the visitor first has to configure the product. It also does not meet the required result-naming demo action.

**Concrete fix:** Make the primary action **“Try it with sample data”** and place “See a five-zone DST check” beside it. Make the real secondary action **“Set up my booking-hours check”**, which truthfully scrolls to the form.

### F-1-10 — MEDIUM — README sentence exceeds the 22-word cap and packs too many ideas together

**Location / quote:** README paragraph 1, sentence 2 (31 words): “It turns weekly working hours or an availability-only ICS file into an 18-month test matrix across up to five invitee timezones, highlighting shifted, skipped, repeated, and offset-change slots around daylight-saving boundaries.”

**Why this fails:** The product input, range, audience zones, result type, and four kinds of anomaly are all compressed into one sentence.

**Concrete fix:** “Add weekly booking hours or an ICS availability file. Review up to five invitee time zones for 18 months. The matrix marks shifted, skipped, and repeated booking times.”

### F-1-11 — MEDIUM — README build explanation exceeds the 22-word cap and is needlessly dense

**Location / quote:** README “Develop and verify,” sentence 4 (31 words): “In addition to seeded 2026 US/UK DST transitions and ICS recurrence cases, it checks the emitted Static Web Apps configuration: content-hashed JS/CSS receive one-year immutable caching while documents and `sw.js` revalidate.”

**Why this fails:** This is difficult to read and combines unrelated test coverage with deployment cache policy.

**Concrete fix:** “The suite tests DST transitions and ICS recurrence. It also checks cache headers: hashed assets are immutable, while documents and `sw.js` revalidate.”

### F-1-12 — MEDIUM — terminology is inconsistent across equivalent concepts

**Location / quote:** The product alternates among “booking hours,” “working hours,” “working windows,” “availability,” “slots,” “meeting starts,” “proof,” “test matrix,” and “inspection.” It uses both “invitee zones” (UI) and “invitee timezones” (README).

**Why this fails:** The visitor has to decide whether these are different things. This is most damaging while deciding whether to use weekly hours or ICS.

**Concrete fix:** Define and use one vocabulary: “booking hours” for input, “bookable times” for results, “invitee time zones” for recipients, and “check” for the output. Reserve “ICS” for an optional import label and expand it once.

## Copy audit

Word counts treat hyphenated compounds and product/standards names as one word. This inventory covers every visible complete sentence/prose fragment on the static landing page and every README sentence/list statement; navigation labels and form labels are separately checked in the finding list above.

### Landing page

| # | Words | Copy |
| --- | ---: | --- |
| 1 | 6 | Before clients find the broken hour |
| 2 | 7 | Prove your slots survive the clock change |
| 3 | 13 | Turn working hours or an ICS availability file into an 18-month, five-zone inspection |
| 4 | 12 | See shifted, skipped, and repeated times before you publish a booking link |
| 5 | 3 | No calendar login |
| 6 | 4 | Runs in your browser |
| 7 | 3 | Exports the evidence |
| 8 | 2 | Five zones |
| 9 | 3 | One seasonal seam |
| 10 | 3 | Make it visible |
| 11 | 3 | Build the test |
| 12 | 5 | Describe what should be bookable |
| 13 | 6 | Your data stays on this device |
| 14 | 11 | We calculate with the IANA timezone data built into your browser |
| 15 | 3 | Offline, still working |
| 16 | 4 | The validator runs locally |
| 17 | 8 | Keep this tab open to export your result |
| 18 | 7 | The zone used by your booking-page configuration |
| 19 | 8 | The proof always covers the next 18 months |
| 20 | 7 | VEVENT or AVAILABLE windows; weekly RRULE supported |
| 21 | 3 | No upload occurs |
| 22 | 3 | Use IANA names |
| 23 | 9 | Add up to five places your clients book from |
| 24 | 9 | Configuration check, not a guarantee of any scheduler’s behavior |
| 25 | 2 | Proof board |
| 26 | 6 | Your test matrix will land here |
| 27 | 17 | Run the proof to trace every generated start time, isolate DST seams, and export a portable review |
| 28 | 4 | What the proof means |
| 29 | 7 | A small test rig for civil time |
| 30 | 16 | Every valid meeting start is generated from your declared wall-clock window for the next 18 months |
| 31 | 16 | Each instant is projected into every selected IANA zone using the timezone rules in this browser |
| 32 | 4 | Week-equivalent starts are compared |
| 33 | 10 | Shifts, skipped times, repeated times, and offset-only changes are marked |
| 34 | 16 | Download the complete CSV or share a link that recreates the weekly-hours configuration without an account |
| 35 | 4 | Keep the claim honest |
| 36 | 9 | This checks your intended configuration against browser timezone data |
| 37 | 15 | It cannot observe a third-party scheduler’s internal rules, overrides, busy calendars, or stale timezone database |
| 38 | 8 | A free, local-first utility from the Param Factory |
| 39 | 8 | Hero imagery generated for this product with factory-image |

### README

| # | Words | Copy |
| --- | ---: | --- |
| 1 | 15 | Timezone Slot Proof is a free, local-first validator for solo professionals who publish booking links |
| 2 | 31 | It turns weekly working hours or an availability-only ICS file into an 18-month test matrix across up to five invitee timezones, highlighting shifted, skipped, repeated, and offset-change slots around daylight-saving boundaries |
| 3 | 16 | It does not accept bookings, connect to a calendar, or claim to reproduce a third-party scheduler |
| 4 | 14 | It gives you a deterministic configuration proof to compare with the scheduler’s own preview |
| 5 | 8 | Weekly hours with one or more day/time windows |
| 6 | 11 | Local ICS parsing for VEVENT and AVAILABLE windows, including weekly RRULE |
| 7 | 9 | IANA timezone calculation using the browser’s current Intl data |
| 8 | 7 | Missing spring-forward and repeated fall-back wall-time detection |
| 9 | 6 | Cross-zone wall-time shift and offset-boundary highlighting |
| 10 | 7 | Complete CSV, print/PDF, and configuration-only review-link exports |
| 11 | 13 | Local configuration restore, offline application shell, 390 px mobile layout, and keyboard operation |
| 12 | 8 | ICS files must use one common IANA timezone |
| 13 | 13 | Daily/monthly recurrence, calendar OAuth, busy-time subtraction, and booking are intentionally out of scope |
| 14 | 5 | Requires Node.js 20 or newer |
| 15 | 8 | npm run build is the factory build command |
| 16 | 13 | It writes the deployable static site to ./dist, with dist/index.html at its root |
| 17 | 8 | npm test rebuilds dist before running the suite |
| 18 | 31 | In addition to seeded 2026 US/UK DST transitions and ICS recurrence cases, it checks the emitted Static Web Apps configuration: content-hashed JS/CSS receive one-year immutable caching while documents and sw.js revalidate |
| 19 | 15 | For a browser smoke test, serve the build and run the factory verifier if available |
| 20 | 9 | Schedule calculation and ICS parsing happen in the browser |
| 21 | 18 | Weekly configuration is stored in local storage; imported ICS contents are not persisted or added to share links |
| 22 | 11 | There are no third-party runtime scripts, fonts, trackers, or calendar credentials |
| 23 | 2 | See public/privacy/index.html |
| 24 | 1 | MIT |
| 25 | 2 | See LICENSE |

The only over-cap entries are README #2 and #18 (F-1-10 and F-1-11). Jargon, vague wording, context-free headings, and the non-result-naming primary action are covered by F-1-7 through F-1-12.

## Unlisted-claim findings

Because `claims.json` is missing, every customer-reliant statement below is an individual **unlisted claim** finding. For every row, the concrete fix is to either remove the sentence or add the specified `claims.json` entry and exactly one clean-state, `/demo`-based test tagged `@claim:<id>`.

| ID | Location / exact quote | Required observable test |
| --- | --- | --- |
| F-1-13 | Hero: “Turn working hours or an ICS availability file into an 18-month, five-zone inspection.” | Weekly and ICS demo fixtures render an 18-month, five-zone result. |
| F-1-14 | Hero: “See shifted, skipped, and repeated times before you publish a booking link.” | Seed spring/fall fixtures and assert each labelled state. |
| F-1-15 | Hero fact: “No calendar login” | Assert there is no login/calendar-auth flow or request. |
| F-1-16 | Hero fact: “Runs in your browser” | Intercept the demo flow and assert same-origin-only requests plus local calculation result. |
| F-1-17 | Hero fact: “Exports the evidence” | Assert a CSV download with the expected header and result rows. |
| F-1-18 | Validator: “Your data stays on this device.” | Intercept every demo request and assert `demo:` never reads/writes real storage. |
| F-1-19 | Validator: “We calculate with the IANA timezone data built into your browser.” | Assert a known browser-zone/DST projection. |
| F-1-20 | Offline message: “Offline, still working.” | After first demo visit, set the context offline, reload, and run a proof. |
| F-1-21 | Offline message: “The validator runs locally.” | Run the demo proof with network disabled after cache warm-up. |
| F-1-22 | Date help: “The proof always covers the next 18 months.” | Assert the first/last generated date span is 18 months. |
| F-1-23 | ICS help: “VEVENT or AVAILABLE windows; weekly RRULE supported.” | Upload fixtures for each accepted entry and a weekly recurrence; assert output. |
| F-1-24 | ICS help: “No upload occurs.” | Intercept the complete file-import demo flow; assert no upload/cross-origin request. |
| F-1-25 | Run note: “Configuration check, not a guarantee of any scheduler’s behavior.” | Assert absence of scheduler integration; otherwise reword as scope only. |
| F-1-26 | Empty result: “Run the proof to trace every generated start time, isolate DST seams, and export a portable review.” | Assert seeded expected rows, DST flags, and CSV download. |
| F-1-27 | Method: “Every valid meeting start is generated from your declared wall-clock window for the next 18 months.” | Assert expected starts for a fixed weekly fixture. |
| F-1-28 | Method: “Each instant is projected into every selected IANA zone using the timezone rules in this browser.” | Assert expected times in each selected zone. |
| F-1-29 | Method: “Week-equivalent starts are compared.” | Assert comparison/status for a controlled weekly fixture. |
| F-1-30 | Method: “Shifts, skipped times, repeated times, and offset-only changes are marked.” | Assert every stated status in fixed DST cases. |
| F-1-31 | Method: “Download the complete CSV or share a link that recreates the weekly-hours configuration without an account.” | Assert all CSV rows and decoded weekly review-link configuration; assert no account request. |
| F-1-32 | Caveat: “This checks your intended configuration against browser timezone data.” | Assert a deterministic fixture result using browser zone data. |
| F-1-33 | Caveat: “It cannot observe a third-party scheduler’s internal rules, overrides, busy calendars, or stale timezone database.” | Assert no scheduler/network integration, or shorten to an untestable scope disclaimer. |
| F-1-34 | Footer: “A free, local-first utility from the Param Factory.” | Assert no payment wall and the local-only storage/network contract. |
| F-1-35 | README opening: “Timezone Slot Proof is a free, local-first validator for solo professionals who publish booking links.” | Assert no payment/account flow and the local storage/network contract. |
| F-1-36 | README opening: “It turns weekly working hours or an availability-only ICS file into an 18-month test matrix across up to five invitee timezones, highlighting shifted, skipped, repeated, and offset-change slots around daylight-saving boundaries.” | Fixture tests for input modes, 18-month range, five zones, and each state. |
| F-1-37 | README opening: “It does not accept bookings, connect to a calendar, or claim to reproduce a third-party scheduler.” | Assert no booking/calendar-auth/integration requests. |
| F-1-38 | README opening: “It gives you a deterministic configuration proof to compare with the scheduler’s own preview.” | Repeat the same fixed demo fixture and assert identical output. |
| F-1-39 | README v1: “Weekly hours with one or more day/time windows” | Assert multiple windows generate the expected starts. |
| F-1-40 | README v1: “Local ICS parsing for `VEVENT` and `AVAILABLE` windows, including weekly `RRULE`” | Assert each accepted fixture parses and generates expected starts. |
| F-1-41 | README v1: “IANA timezone calculation using the browser’s current `Intl` data” | Assert known `Intl` zone conversion/DST behaviour. |
| F-1-42 | README v1: “Missing spring-forward and repeated fall-back wall-time detection” | Assert explicit missing and repeated rows in fixtures. |
| F-1-43 | README v1: “Cross-zone wall-time shift and offset-boundary highlighting” | Assert shifted and offset-boundary labels in a multi-zone fixture. |
| F-1-44 | README v1: “Complete CSV, print/PDF, and configuration-only review-link exports” | Assert complete CSV, print invocation, and a decoded link without ICS content. |
| F-1-45 | README v1: “Local configuration restore, offline application shell, 390 px mobile layout, and keyboard operation” | Separate tags for restore, offline reload, 390 px no overflow, and keyboard form/result operation. |
| F-1-46 | README scope: “ICS files must use one common IANA timezone.” | Assert a multi-zone fixture is rejected with the stated recovery guidance. |
| F-1-47 | README scope: “Daily/monthly recurrence, calendar OAuth, busy-time subtraction, and booking are intentionally out of scope.” | Assert unsupported recurrence guidance and no OAuth/booking integration. |
| F-1-48 | README privacy: “Schedule calculation and ICS parsing happen in the browser.” | Intercept flow and assert result creation without external computation/upload. |
| F-1-49 | README privacy: “Weekly configuration is stored in local storage; imported ICS contents are not persisted or added to share links.” | Inspect storage/link after both input modes. |
| F-1-50 | README privacy: “There are no third-party runtime scripts, fonts, trackers, or calendar credentials.” | Capture all requests over the demo flow and assert no third-party origin. |

## Demo and privacy sandbox result

The required sandbox verification could not be performed because there is no demo entry point. A non-demo fresh visit made only same-origin requests for the document, JS, CSS, and hero image, and started with empty local storage. That observation does **not** satisfy the contract: ordinary use writes `timezone-slot-proof:config`, and there is no `demo:` namespace to test against it. Offline and privacy claims therefore remain unverified in the required demo sandbox.

## Claims-test run

From a fresh local clone at `/tmp/timezone-slot-proof-clean-cPKCS8`:

```sh
npm ci
npm test
npm run build
```

All 14 existing unit/deployment tests passed and `dist/` built. No `.factory/claims.json` was present, so there were **no listed claim commands to run**. Existing tests do not use `@claim:` tags or a demo entry point, so they cannot satisfy F-1-3.

## Structure, accessibility, and link checks

- Root title, language, one h1, main landmark, description, canonical, OG basics, favicon, `robots.txt`, and sitemap are present.
- The sitemap lists `/`, `/privacy/`, and `/terms/`; all those URLs plus favicon/manifest/robots/sitemap returned 200. This does not cure the false-200 not-found route (F-1-4).
- Axe WCAG 2 A/AA scans of the fresh live 390 px landing and Privacy page returned zero violations. This does not cover the route-focus/shell defects in F-1-5.
- The root has a designed, product-specific visual identity consistent with `.factory/design.md`.
- The root lacks Twitter-card and apple-touch metadata; legal routes lack the stated route metadata (F-1-6).

## Earlier-review/history retest

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files. I read both historical verification reports and the handoff, then independently rechecked their listed defects:

| Earlier id | Live/code confirmation | Status |
| --- | --- | --- |
| `P2-1` hashed assets not immutable | Live `assets/index-BjV7PF2a.js` returns `Cache-Control: public, max-age=31536000, immutable`; config has `/assets/*` rule. | Fixed |
| `P3-1` error summary did not receive focus | Invalid `Invalid/Zone` submission focused `#form-errors`; the element has `tabindex="-1"`. | Fixed |
| `P3-2` duplicate invitee defaults | Two Add invitee zone actions produced `Australia/Sydney` then `Asia/Tokyo`; no duplicate. | Fixed |

No earlier issue was merely accepted on paper or regressed. The findings in this review are new failures against this work order’s demo, claims, copy, and structure requirements.

## What would make this perfect

Ship the exact five-zone DST sample proof as an isolated `/demo`, make every retained customer-facing promise a clean-sandbox claim test, and use that sample to show the product before asking for configuration. Then make direct routes truthful (including 404), complete route metadata and navigation focus, and reduce the visible vocabulary to booking hours, bookable times, invitee time zones, and check. Re-run this full review from a clean context; PASS requires zero findings.

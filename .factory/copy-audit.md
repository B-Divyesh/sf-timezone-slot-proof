# Copy audit — 2026-08-28, polish 4

Every customer-facing sentence on the landing page, shared check, and README is 22 words or fewer. No banned marketing words appear. Dynamic result and validation text was checked with the sample check.

## Landing page and populated demo

| Words | Copy |
| ---: | --- |
| 5 | Check booking hours across time zones |
| 6 | For independent professionals with booking links. |
| 10 | Check how weekly booking hours appear before daylight saving changes. |
| 7 | See a five-zone daylight-saving check right away. |
| 5 | Sample needs no calendar login |
| 5 | Sample runs in this browser |
| 5 | Export the check as CSV |
| 6 | Your booking hours stay in this browser. |
| 9 | The check uses your browser’s time-zone rules. |
| 9 | Use the time zone set on your booking page. |
| 7 | The check covers the next 18 months. |
| 12 | Use a calendar export with availability entries. The file stays in this browser. |
| 11 | Use names such as America/New_York. Add up to five client time zones. |
| 9 | Compare this check with your booking page before publishing. |
| 13 | Run a check to see bookable times, clock-change flags, and a CSV export. |
| 8 | Add the weekly times that people can book. |
| 11 | See each bookable time in the client time zones you choose. |
| 9 | Clock-change flags show shifted, skipped, and repeated bookable times. |
| 10 | Download the full check to compare with your booking page. |
| 17 | It checks the hours you enter. It does not read your scheduler, calendar, overrides, or busy times. |
| 7 | Demo — sample data, nothing is saved. |
| 10 | This five-zone check is separate from your own booking hours. |
| 3 | Sample booking-hours check |
| 3 | Shared booking-hours check |
| 4 | Read-only weekly booking-hours check. |
| 7 | It opens with the shared booking hours. |
| 5 | It contains no calendar file. |
| 7 | 22 bookable times need a closer look. |
| 12 | 158 bookable times tested across 5 client time zones over 18 months. |
| 9 | Download every generated bookable time, not just rows shown. |
| 7 | First flagged bookable times, in chronological order. |
| 9 | The local time moved +60 minutes after clocks changed. |
| 9 | The local time moved -60 minutes after clocks changed. |
| 9 | This local time occurs twice when clocks move back. |
| 11 | The meeting ends during a time skipped when clocks move forward. |
| 5 | 22 rows in this view |
| 3 | Projected bookable times. |
| 7 | Time-zone abbreviations appear under each local time. |
| 3 | Unavailable local time |
| 11 | How these booking hours appear using your browser’s current time-zone rules. |
| 9 | Compare the CSV with your booking page before publishing. |

## README

| Words | Copy |
| ---: | --- |
| 12 | Check booking hours across time zones before daylight saving surprises a client. |
| 8 | It is for independent professionals with booking links. |
| 6 | Try the five-zone sample at `https://timezone-slot-proof.sociobot.in/?demo=1`. |
| 7 | The sample starts with a completed check. |
| 8 | It is separate from your saved booking hours. |
| 8 | Add weekly booking hours or a calendar file. |
| 10 | Check up to five client time zones for 18 months. |
| 7 | Mark shifted, skipped, and repeated bookable times. |
| 11 | Export every generated bookable time as CSV or print it. |
| 12 | Copy a read-only weekly booking-hours check that opens with its result. |
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

## Terminology

| Concept | One term |
| --- | --- |
| Input | booking hours |
| Input range | booking-hours range |
| Output | bookable time |
| Recipient location | client time zone |
| Imported file | calendar file |
| Imported item | availability entry |
| Daylight-saving alert | clock-change flag |
| Result | check |

Visitor copy does not call booking-hours ranges “windows” or call bookable times “starts.” Internal identifiers may retain those implementation names.

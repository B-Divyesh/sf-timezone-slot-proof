# Timezone Slot Proof

Timezone Slot Proof is a free, local-first validator for solo professionals who publish booking links. It turns weekly working hours or an availability-only ICS file into an 18-month test matrix across up to five invitee timezones, highlighting shifted, skipped, repeated, and offset-change slots around daylight-saving boundaries.

It does not accept bookings, connect to a calendar, or claim to reproduce a third-party scheduler. It gives you a deterministic configuration proof to compare with the scheduler’s own preview.

Live: <https://timezone-slot-proof.sociobot.in>

## What v1 includes

- Weekly hours with one or more day/time windows
- Local ICS parsing for `VEVENT` and `AVAILABLE` windows, including weekly `RRULE`
- IANA timezone calculation using the browser’s current `Intl` data
- Missing spring-forward and repeated fall-back wall-time detection
- Cross-zone wall-time shift and offset-boundary highlighting
- Complete CSV, print/PDF, and configuration-only review-link exports
- Local configuration restore, offline application shell, 390 px mobile layout, and keyboard operation

ICS files must use one common IANA timezone. Daily/monthly recurrence, calendar OAuth, busy-time subtraction, and booking are intentionally out of scope.

## Develop and verify

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

`npm run build` is the factory build command. It writes the deployable static site to `./dist`, with `dist/index.html` at its root.

The unit suite includes seeded 2026 US/UK DST transitions and ICS recurrence cases. For a browser smoke test, serve the build and run the factory verifier if available:

```sh
/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence
```

## Privacy

Schedule calculation and ICS parsing happen in the browser. Weekly configuration is stored in local storage; imported ICS contents are not persisted or added to share links. There are no third-party runtime scripts, fonts, trackers, or calendar credentials. See [`public/privacy/index.html`](public/privacy/index.html).

## Project notes

- Product brief: [`.factory/brief.json`](.factory/brief.json)
- Visual system and generated-image provenance: [`.factory/design.md`](.factory/design.md)
- Verification and handoff: [`.factory/handoff.md`](.factory/handoff.md)

## License

MIT. See [LICENSE](LICENSE).

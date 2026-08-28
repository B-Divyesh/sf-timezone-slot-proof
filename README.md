# Timezone Slot Proof

Check booking hours across time zones before daylight saving surprises a client. It is for independent professionals with booking links.

Live: <https://timezone-slot-proof.sociobot.in>

Try the five-zone sample at <https://timezone-slot-proof.sociobot.in/?demo=1>. The sample starts with a completed check. It is separate from your saved booking hours.

## What v1 includes

- Add weekly booking hours or a calendar file.
- Check up to five client time zones for 18 months.
- Mark shifted, skipped, and repeated bookable times.
- Export the full check as CSV or print it.

This tool checks the hours you enter. It does not read your scheduler, calendar, overrides, or busy times.

## Develop and verify

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`npm run build` is the factory build command. It writes the deployable static site to `./dist`, with `dist/index.html` at its root.

`npm test` builds the site, runs unit tests, and runs the browser suite. It includes every claim in [`.factory/claims.json`](.factory/claims.json). The suite also checks static deployment headers.

For a browser smoke test, serve the build and run the factory verifier if available:

```sh
/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence
```

## Privacy

The sample check makes no third-party requests. Weekly booking hours can be saved in this browser. Calendar-file contents stay in the open page and never enter review links. See [Privacy](https://timezone-slot-proof.sociobot.in/privacy/) and [Terms](https://timezone-slot-proof.sociobot.in/terms/).

## Project notes

- Product brief: [`.factory/brief.json`](.factory/brief.json)
- Visual system and generated-image provenance: [`.factory/design.md`](.factory/design.md)
- Demo contract: [`.factory/demo.md`](.factory/demo.md)

## License

MIT. See [LICENSE](LICENSE).

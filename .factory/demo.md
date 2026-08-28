# Demo contract

Open [`/?demo=1`](https://timezone-slot-proof.sociobot.in/?demo=1) to load the sample directly. [`/demo`](https://timezone-slot-proof.sociobot.in/demo) is an equivalent shareable route. The first-screen action uses `?demo=1`. Both routes show the completed result before the explanatory sections, with the demo banner kept at the top.

The sample is a fixed Sunday `01:30–02:30` booking-hours window in `America/New_York`, starting 2026-08-01. It projects five client time zones: London, Kolkata, Sydney, Tokyo, and São Paulo. The 18-month result includes spring and autumn daylight-saving boundaries.

Demo mode is intentionally in-memory: it never reads or writes the normal `timezone-slot-proof:config` local-storage key or any `demo:` key. Reset restores this exact fixture. “Start for real” discards the sample and returns to `/`, where normal weekly configuration may be stored under that real-data key. Imported calendar-file contents remain in memory in either mode and never enter review links.

# Demo contract

Open [`/demo`](https://timezone-slot-proof.sociobot.in/demo) or `/?demo=1` to load the sample directly. The first-screen action uses the same route.

The sample is a fixed Sunday `01:30–02:30` booking-hours window in `America/New_York`, starting 2026-08-01. It projects five client time zones: London, Kolkata, Sydney, Tokyo, and São Paulo. The 18-month result includes spring and autumn daylight-saving boundaries.

Demo mode is intentionally in-memory: it never reads or writes the normal `timezone-slot-proof:config` local-storage key. Reset restores this exact fixture. “Start for real” returns to `/`, where normal weekly configuration may be stored under that real-data key. Imported calendar-file contents remain in memory in either mode.

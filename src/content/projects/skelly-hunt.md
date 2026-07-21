---
title: "Skelly Hunt"
summary: "Open-source, Cloudflare-native NFC scavenger hunt platform — physical checkpoints, a live leaderboard, and $0/month infrastructure at event scale."
pubDate: 2026-04-26
status: active
brandColor: "#E06B2D"
tags: ["cloudflare", "hardware", "iot", "halloween"]
links:
  demo: "https://www.skellyhunt.com"
stack: ["Cloudflare Workers", "Hono", "D1", "Drizzle ORM", "R2", "React", "ESP32", "FreeRTOS", "Datadog"]
featured: true
features:
  - title: "ESP32 checkpoint terminals"
    description: "Hardware that reads physical NFC cards, shows real-time feedback, and configures itself remotely over Wi-Fi — no reflashing firmware between events."
    icon: "◆"
  - title: "Live leaderboard"
    description: "A public scoreboard with pixel-art avatars, updating in real time as participants check in via NFC tap or QR scan."
    icon: "★"
  - title: "$0/month infrastructure"
    description: "Cloudflare Workers, Pages, D1, and R2, all on free tier at 500–1,000 participant scale."
    icon: "▶"
  - title: "Privacy-first by design"
    description: "PII encrypted at rest with AES-256-GCM, a 30-day account-deletion grace period, and a leaderboard that only ever shows usernames and avatars."
    icon: "⬡"
lessons:
  - title: "Remote config beats reflashing"
    description: "Location tokens, device secrets, and display themes push to checkpoint terminals over Wi-Fi — swapping a device's role never means walking it back to a laptop."
  - title: "Config-as-source-of-truth prevents drift"
    description: "Cloudflare bindings, cron triggers, and R2 buckets all live in one wrangler.toml — a fresh clone can stand the whole Worker up by reading config alone, no tribal knowledge required."
seo: {}
---

Skelly Hunt is an NFC scavenger hunt platform I built for Denton's annual Halloween event, run through TechMill Denton — physical checkpoints, a live leaderboard, and infrastructure that costs nothing to run at event scale.

Participants tap an NFC card (or scan a QR code) at locations around town — no app install. ESP32 terminals at physical checkpoints read the cards and show real-time feedback; everything else — the API, the admin dashboard, the leaderboard — runs on Cloudflare's free tier, with Datadog RUM and OpenTelemetry wired in for observability across the browser, API, and firmware.

It's fully open-source and still actively developed as the event's flagship platform each October.

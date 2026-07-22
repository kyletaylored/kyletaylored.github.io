---
title: "Datadog RUM Interceptor"
summary: "A lightweight request/response interceptor for Datadog RUM, giving payload visibility into fetch/XHR traffic for debugging and monitoring."
pubDate: 2025-02-04
status: active
tags: ["datadog", "rum", "observability", "npm"]
links:
  source: "https://github.com/kyletaylored/datadog-rum-interceptor"
stack: ["TypeScript", "Datadog RUM", "Fetch/XHR"]
featured: false
brandColor: "#5C2FA0"
stats:
  stars: "2"
  license: "MIT"
features:
  - title: "Payload visibility, redacted"
    description: "Captures request/response payloads for RUM resource events, with a hook to strip or redact sensitive data before it's attached."
    icon: "◆"
  - title: "Trace ID matching, with a fallback"
    description: "Uses the Datadog trace ID when present; falls back to fingerprinting the request so unmatched pairs still evict cleanly after 5 seconds."
    icon: "★"
lessons:
  - title: "Debugging tools need their own guardrails"
    description: "A tool built to expose payloads for debugging can't itself become a place sensitive data leaks — the redaction hook exists because the first version didn't have one."
seo: {}
---

Datadog RUM's `beforeSend` hook tells you a resource request happened — status, timing, URL — but not what was actually sent or received. This interceptor patches `fetch` and `XHR` to capture the request and response payloads and hand them back through `beforeSend`, so a RUM event in the Explorer can carry the actual body instead of just its metadata.

It's published as [`@kyletaylored/datadog-rum-interceptor`](https://www.npmjs.com/package/@kyletaylored/datadog-rum-interceptor) on npm, usable directly in the browser or via a CDN script tag, with no dependency on a bundler.

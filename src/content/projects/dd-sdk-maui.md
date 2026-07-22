---
title: "Datadog SDK for .NET MAUI"
summary: "Cross-platform Datadog Mobile SDK for .NET MAUI — logs, Real User Monitoring, and distributed tracing for iOS and Android from one API."
pubDate: 2026-03-06
status: active
tags: ["datadog", "rum", ".net maui", "mobile"]
links:
  source: "https://github.com/kyletaylored/dd-sdk-maui"
stack: [".NET MAUI", "C#", "Datadog RUM", "Datadog APM"]
featured: false
brandColor: "#5C2FA0"
stats:
  stars: "1"
  license: "Apache-2.0"
features:
  - title: "One API, both platforms"
    description: "Logs, RUM views/actions, and distributed tracing all work identically on iOS and Android through a single MAUI-native API."
    icon: "◆"
  - title: "Symbol upload tooling"
    description: "A companion MSBuild plugin (dd-symbols-maui) uploads MAUI symbol files to Datadog automatically, so mobile stack traces resolve to real source instead of addresses."
    icon: "★"
    href: "https://github.com/kyletaylored/datadog-maui-symbols"
seo: {}
---

Datadog didn't have an official .NET MAUI SDK, so mobile teams building cross-platform apps in MAUI had no first-party way to get logs, RUM, or traces into Datadog. This SDK closes that gap: install the `Datadog.MAUI.Plugin` NuGet package, initialize it once in `MauiProgram.cs`, and get RUM views/actions, structured logs, and distributed tracing spans from the same API on both iOS and Android.

The harder problem with any mobile SDK is making crash reports and traces actually readable after a release build — mangled MAUI stack traces are useless without the matching symbol files. `datadog-maui-symbols` is the MSBuild plugin that uploads those symbols to Datadog automatically as part of the build, so a crash in production resolves back to real source lines.

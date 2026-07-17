---
title: "Colima GUI"
description: "A native macOS GUI for managing Colima — start/stop, switch profiles, and monitor container runtimes without touching the terminal."
pubDate: 2025-03-20
labCategory: tools
tags: ["colima", "macos", "rust", "docker"]
status: stable
sourceUrl: "https://github.com/kyletaylored/colima-gui"
seo: {}
---

The most-starred thing I've shipped, by far. [Colima](https://github.com/abiosoft/colima) is a great way to run Docker/Kubernetes on macOS without Docker Desktop, but it's entirely CLI-driven — no menu bar, no visual profile switching, no "is this thing even running" at a glance.

Colima GUI is a small native macOS app (built in Rust) that wraps the Colima CLI: start and stop instances, switch between profiles, and see runtime status without opening a terminal.

See the [source on GitHub](https://github.com/kyletaylored/colima-gui) for installation instructions.

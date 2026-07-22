---
title: "Datadog RUM Pizza Builder"
summary: "A self-contained demo app for teaching Datadog RUM — an interactive pizza-order wizard that turns URL-fragment navigation into real RUM views and actions."
pubDate: 2026-04-17
status: active
tags: ["datadog", "rum", "enablement"]
links:
  source: "https://github.com/kyletaylored/datadog-rum-pizza-builder"
  demo: "https://kyletaylored.github.io/datadog-rum-pizza-builder/"
stack: ["JavaScript", "Datadog RUM"]
featured: false
brandColor: "#5C2FA0"
features:
  - title: "Fragment navigation as real RUM views"
    description: "Each wizard step (crust, sauce, cheese, toppings, size, results) updates the URL hash, and each hash change fires its own RUM view — even though the browser never actually navigates."
    icon: "◆"
  - title: "Custom actions with real payloads"
    description: "Submitting an order fires a pizza_order_submitted custom action carrying the full order as context, filterable and facetable in the RUM Explorer."
    icon: "★"
lessons:
  - title: "A toy example teaches better than a real one"
    description: "A pizza order has no confidential business logic to obscure — that's exactly why it works as a training tool: every RUM concept is visible without anything to redact or explain away."
seo: {}
---

Explaining how Datadog RUM tracks single-page apps is easier with something to click through than with a slide. This is a six-step pizza order wizard — crust, sauce, cheese, toppings, size, then a results screen — where every step change is a URL-fragment navigation, not a real page load.

That's the point: in the RUM Explorer, each of those steps shows up as its own view, with its own load time and action count, which is exactly the behavior people building fragment-routed SPAs need to see to understand RUM's view model. The results tab embeds a live Datadog dashboard breaking down submitted orders by crust, sauce, size, and geography, built from the custom `pizza_order_submitted` action fired on checkout.

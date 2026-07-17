# Content Backlog

A working list of every GitHub repository and gist under `kyletaylored`,
pulled via `gh repo list` / `gh api gists` on 2026-07-17, to turn into
`/articles`, `/projects`, or `/lab` entries. Each row's `Status` column is
meant to be edited in place as items move through the pipeline:

`Backlog` → `Drafting` → `Published` (or `Skip` for anything not worth writing up)

**How to use this**: pick an item, decide the content type (see below), write
the entry via Pages CMS or directly in `src/content/{articles,projects,lab}/`,
then flip its Status here. This file is a planning doc, not published content
— it isn't referenced by any page and won't render on the site.

## Suggested content-type mapping

- **Project** (`src/content/projects/`) — has a real demo and/or is a complete,
  presentable piece of work. Needs the three PRD-mandated facets: methodology
  writeup, source, live demo.
- **Article** (`src/content/articles/`) — the _how/why_ is the interesting
  part, even if the repo itself is small (a debugging story, an integration
  pattern, "lessons learned"). Several small gists in one theme can become a
  single roundup article.
- **Lab** (`src/content/lab/`) — a quick experiment, tool, or one-off that
  doesn't need a full writeup — matches the `/lab` "nothing here is perfect"
  framing.

## Flagship / highest-signal (start here)

| Item                                                                                  | Why it stands out                                                                                                                | Suggested type |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| [colima-gui](https://github.com/kyletaylored/colima-gui) ★52, Rust                    | By far the most starred repo — a real GUI for managing Colima on macOS. Clear demo potential (screen recording), clear audience. | Project        |
| [drupal-nodejs-sitemap](https://github.com/kyletaylored/drupal-nodejs-sitemap) ★3     | Small but starred; content-type analysis for Drupal sites — good "developer tool" article.                                       | Article + Lab  |
| [datadog-rum-interceptor](https://github.com/kyletaylored/datadog-rum-interceptor) ★2 | Request/response interceptor for RUM debugging — technical, narrow, very writeable as an engineering-journal post.               | Article        |
| [infra-advisor-ai](https://github.com/kyletaylored/infra-advisor-ai)                  | Most recently active; agentic AI platform on Azure + Datadog — timely, matches the site's "AI Lab" category.                     | Project        |
| [home-cms](https://github.com/kyletaylored/home-cms)                                  | Actively maintained, real personal use (family calendar/meal planning) — good "built for myself" story.                          | Project        |

## Repositories

### AI / LLM / Agents

| Repo                                                                                        | Description                                                                                       | Language   | Visibility | Last pushed | Status  |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------- | ---------- | ----------- | ------- |
| [infra-advisor-ai](https://github.com/kyletaylored/infra-advisor-ai)                        | Agentic AI platform example built on Azure and Datadog.                                           | Python     | Public     | 2026-07-16  | Backlog |
| [fake-store-api](https://github.com/kyletaylored/fake-store-api)                            | A Fake Store API with Chat bot demo.                                                              | EJS        | Public     | 2026-07-05  | Backlog |
| [datadog-llm-copilot-replay](https://github.com/kyletaylored/datadog-llm-copilot-replay) ★1 | An app that replays Copilot interactions as mock conversations through Datadog LLM Observability. | Python     | Private    | 2025-08-13  | Backlog |
| [streamlit-chatbot-demo](https://github.com/kyletaylored/streamlit-chatbot-demo)            | _no description_                                                                                  | Python     | Public     | 2025-06-24  | Backlog |
| [datadog-ai-monitor-message](https://github.com/kyletaylored/datadog-ai-monitor-message)    | A userscript that uses a the Bits AI endpoint to automate monitor messages.                       | JavaScript | Private    | 2025-06-03  | Backlog |
| [open-webui-functions](https://github.com/kyletaylored/open-webui-functions)                | A collection of Open WebUI functions.                                                             | Python     | Public     | 2025-02-12  | Backlog |
| [local-bits](https://github.com/kyletaylored/local-bits)                                    | A local AI chat instance based on Datadog docs.                                                   | Python     | Private    | 2024-06-20  | Backlog |

### Datadog / Observability demos & integrations

| Repo                                                                                               | Description                                                                                              | Language   | Visibility | Last pushed | Status  |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- | ---------- | ----------- | ------- |
| [openlineage-job-simulator](https://github.com/kyletaylored/openlineage-job-simulator) ★1          | A simple app using OpenLineage for Custom Jobs on Datadog.                                               | Python     | Public     | 2026-07-14  | Backlog |
| [datadog-windows-config-examples](https://github.com/kyletaylored/datadog-windows-config-examples) | Drop-in Datadog Agent config examples for Windows servers, organized by role (default / app / database). | —          | Public     | 2026-05-15  | Backlog |
| [datadog-sanity-vercel-demo](https://github.com/kyletaylored/datadog-sanity-vercel-demo)           | A demo Nextjs site using Vercel and Sanity.                                                              | TypeScript | Public     | 2026-04-17  | Backlog |
| [datadog-rum-pizza-builder](https://github.com/kyletaylored/datadog-rum-pizza-builder)             | Educational environment of how Datadog RUM works with fragments and actions.                             | JavaScript | Public     | 2026-04-17  | Backlog |
| [datadog-maui](https://github.com/kyletaylored/datadog-maui) ★1                                    | A sample .NET MAUI application with .NET Core and Framework APIs that integrates Datadog mobile SDKs.    | C#         | Public     | 2026-03-09  | Backlog |
| [dd-sdk-maui](https://github.com/kyletaylored/dd-sdk-maui) ★1                                      | Datadog Mobile SDK for .NET MAUI.                                                                        | C#         | Public     | 2026-03-06  | Backlog |
| [datadog-maui-symbols](https://github.com/kyletaylored/datadog-maui-symbols) ★1                    | Native .NET MSBuild plugin for uploading symbol files to Datadog from MAUI applications.                 | C#         | Public     | 2026-02-10  | Backlog |
| [datatdog-metrics-dotnet](https://github.com/kyletaylored/datatdog-metrics-dotnet)                 | A .NET library for buffered metrics reporting to Datadog HTTP API.                                       | C#         | Public     | 2026-02-08  | Backlog |
| [DatadogReactNative](https://github.com/kyletaylored/DatadogReactNative)                           | A kitchen sink app based on Infinite Red's Ignite framework.                                             | TypeScript | Public     | 2025-12-02  | Backlog |
| [datadog-events-ui](https://github.com/kyletaylored/datadog-events-ui)                             | Web based GUI for creating custom events in Datadog.                                                     | JavaScript | Public     | 2025-11-24  | Backlog |
| [dd-se-v2](https://github.com/kyletaylored/dd-se-v2)                                               | _no description_                                                                                         | JavaScript | Private    | 2025-10-27  | Backlog |
| [datadog-nodejs-init-tracer](https://github.com/kyletaylored/datadog-nodejs-init-tracer)           | Example NodeJS app for showcasing init option for dd-trace-js                                            | JavaScript | Public     | 2025-08-20  | Backlog |
| [datadog-python-apm-logs-example](https://github.com/kyletaylored/datadog-python-apm-logs-example) | A simple Python integration with Datadog to showcase APM and Log correlation.                            | Python     | Public     | 2025-05-08  | Backlog |
| [datadog-data-jobs](https://github.com/kyletaylored/datadog-data-jobs)                             | Sample app to show data job technologies.                                                                | Python     | Public     | 2025-04-17  | Backlog |
| [datadog-demo-app](https://github.com/kyletaylored/datadog-demo-app) ★1                            | A demo app for testing out Datadog.                                                                      | JavaScript | Public     | 2025-02-28  | Backlog |
| [datadog-rum-interceptor](https://github.com/kyletaylored/datadog-rum-interceptor) ★2              | A lightweight request/response interceptor to provide payload visibility for debugging and monitoring.   | JavaScript | Public     | 2025-02-04  | Backlog |
| [datadog-pokemon-graphql](https://github.com/kyletaylored/datadog-pokemon-graphql)                 | A demo repository for Next.js and GraphQL using Pokemon API.                                             | CSS        | Public     | 2024-10-22  | Backlog |
| [ddev-datadog](https://github.com/kyletaylored/ddev-datadog) ★1                                    | _no description_                                                                                         | Shell      | Public     | 2024-06-26  | Backlog |

### Home / Personal apps

| Repo                                                                                       | Description                                                                                                            | Language   | Visibility | Last pushed | Status  |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------- | ---------- | ----------- | ------- |
| [home-cms](https://github.com/kyletaylored/home-cms)                                       | Family calendar and meal planning app.                                                                                 | TypeScript | Public     | 2026-07-17  | Backlog |
| [toll-expenser](https://github.com/kyletaylored/toll-expenser)                             | A simple app for generating expense receipts for toll fees.                                                            | JavaScript | Public     | 2026-07-02  | Backlog |
| [denton-soccer-scheduler](https://github.com/kyletaylored/denton-soccer-scheduler)         | A practice field scheduler using Google Forms and Google Sheets as the database with Google Apps Script API interface. | JavaScript | Public     | 2026-02-18  | Backlog |
| [infinity-trax-print-tracker](https://github.com/kyletaylored/infinity-trax-print-tracker) | A form for creating part lists for Infinity Trax marble run pieces to track while 3D printing.                         | JavaScript | Public     | 2025-06-06  | Backlog |
| [charthaus](https://github.com/kyletaylored/charthaus)                                     | Admin dashboard for home tasks.                                                                                        | TypeScript | Private    | 2025-05-08  | Backlog |
| [chaotic-coaster](https://github.com/kyletaylored/chaotic-coaster)                         | An interactive and playful smart coaster powered by a Raspberry Pi Pico.                                               | Python     | Public     | 2024-12-16  | Published |
| [piodome](https://github.com/kyletaylored/piodome) ★1                                      | Hydroponics monitoring project to chart and display humidity, temperature, and light using a Raspberry Pi Zero.        | Python     | Public     | 2023-05-22  | Published |

### Dev tools & scripts

| Repo                                                                                       | Description                                                                                       | Language   | Visibility | Last pushed | Status  |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ---------- | ---------- | ----------- | ------- |
| [github-mcp-server-mcpb](https://github.com/kyletaylored/github-mcp-server-mcpb)           | MCPB wrapper for Github API to support desktop extensions.                                        | —          | Public     | 2026-05-18  | Backlog |
| [StickerSmash](https://github.com/kyletaylored/StickerSmash)                               | React Native demo                                                                                 | TypeScript | Public     | 2026-05-12  | Backlog |
| [WindowsProxyServices](https://github.com/kyletaylored/WindowsProxyServices)               | A simple application of bundled Windows Services that proxy other APIs.                           | C#         | Public     | 2026-04-24  | Backlog |
| [nr_debug](https://github.com/kyletaylored/nr_debug)                                       | A simple debugging tool for New Relic and Monolog.                                                | PHP        | Public     | 2026-04-03  | Backlog |
| [SimpleServiceWorker](https://github.com/kyletaylored/SimpleServiceWorker)                 | Simple .NET Framework 4.7.2 service for testing.                                                  | C#         | Public     | 2026-02-27  | Backlog |
| [podman-desktop-lima-setup](https://github.com/kyletaylored/podman-desktop-lima-setup)     | Automated setup script for scaffolding and connecting a Lima virtual machine with Podman Desktop. | Shell      | Public     | 2026-01-16  | Backlog |
| [mantine-ui-chrome-extension](https://github.com/kyletaylored/mantine-ui-chrome-extension) | chrome ext test                                                                                   | JavaScript | Public     | 2025-12-02  | Backlog |
| [n8n-docker-demo](https://github.com/kyletaylored/n8n-docker-demo)                         | A n8n demo environment based on Docker compose with default workflows.                            | Python     | Public     | 2025-10-08  | Backlog |
| [dotfiles](https://github.com/kyletaylored/dotfiles)                                       | Personal dotfiles for migrating computers.                                                        | Shell      | Private    | 2025-04-07  | Backlog |
| [maccron](https://github.com/kyletaylored/maccron)                                         | A simple GUI for managing cron tasks                                                              | Python     | Public     | 2025-03-20  | Published |
| [colima-gui](https://github.com/kyletaylored/colima-gui) ★52                               | A simple GUI for managing Colima on MacOS.                                                        | Rust       | Public     | 2025-03-20  | Published |
| [property-tax-scraper](https://github.com/kyletaylored/property-tax-scraper)               | A property tax scraper and analysis tool for Denton County residents.                             | JavaScript | Public     | 2024-05-12  | Backlog |
| [traffic-simulator](https://github.com/kyletaylored/traffic-simulator)                     | A traffic simulator using Puppeteer to generate traffic on a website for demos.                   | JavaScript | Public     | 2024-05-03  | Backlog |
| [traceroute-to-geo](https://github.com/kyletaylored/traceroute-to-geo)                     | Map a traceroute to geolocations on a map.                                                        | HTML       | Public     | 2024-05-03  | Published |
| [wadr](https://github.com/kyletaylored/wadr) ★1                                            | Wappalyzer domain report tool.                                                                    | JavaScript | Public     | 2023-06-23  | Backlog |
| [terminus-portfolio-actions](https://github.com/kyletaylored/terminus-portfolio-actions)   | Various scripts that integrate with Terminus to produce reports and run bulk tasks.               | JavaScript | Public     | 2021-03-02  | Backlog |
| [proxy-function-boiler](https://github.com/kyletaylored/proxy-function-boiler)             | _no description_                                                                                  | JavaScript | Public     | 2020-07-16  | Backlog |
| [weta-proxy-function](https://github.com/kyletaylored/weta-proxy-function)                 | Proxy server for Engaging Networks API.                                                           | JavaScript | Public     | 2020-05-06  | Backlog |

### CMS / Drupal / WordPress tooling

| Repo                                                                                           | Description                                                                                                                                                                          | Language   | Visibility | Last pushed | Status  |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------- | ----------- | ------- |
| [pantheon-secrets-manager](https://github.com/kyletaylored/pantheon-secrets-manager)           | Manage Pantheon Secrets through a WordPress interface.                                                                                                                               | PHP        | Public     | 2025-11-23  | Backlog |
| [drupal-kubernetes](https://github.com/kyletaylored/drupal-kubernetes)                         | _no description_                                                                                                                                                                     | —          | Public     | 2025-01-17  | Backlog |
| [kyletaylored-pantheon](https://github.com/kyletaylored/kyletaylored-pantheon)                 | Sync repo with kyletaylored Pantheon site.                                                                                                                                           | PHP        | Private    | 2024-09-01  | Backlog |
| [drupal-nodejs-sitemap](https://github.com/kyletaylored/drupal-nodejs-sitemap) ★3              | Small script for analyzing Drupal content types on sites.                                                                                                                            | CSS        | Public     | 2022-12-11  | Backlog |
| [md-megatron](https://github.com/kyletaylored/md-megatron)                                     | _no description_                                                                                                                                                                     | PHP        | Public     | 2022-12-10  | Backlog |
| [acquia-cert-scraper](https://github.com/kyletaylored/acquia-cert-scraper)                     | Google Cloud Function to scrape Acquia Certification Registry                                                                                                                        | Python     | Public     | 2022-12-08  | Backlog |
| [nancy](https://github.com/kyletaylored/nancy)                                                 | Site crawler and auditing for Content Management Systems like Drupal and WordPress.                                                                                                  | JavaScript | Public     | 2022-02-12  | Backlog |
| [kyletaylored.github.io-drupal](https://github.com/kyletaylored/kyletaylored.github.io-drupal) | Drupal backend for SSG                                                                                                                                                               | Shell      | Public     | 2020-10-06  | Backlog |
| [wp-site-audit](https://github.com/kyletaylored/wp-site-audit)                                 | WordPress Site Audit plugin for WP-CLI.                                                                                                                                              | PHP        | Public     | 2020-08-08  | Backlog |
| [sherlock](https://github.com/kyletaylored/sherlock)                                           | A CMS website audit tool for WordPress and Drupal sites.                                                                                                                             | JavaScript | Private    | 2019-12-08  | Backlog |
| [docksal-config-d8](https://github.com/kyletaylored/docksal-config-d8)                         | A base Docksal config for Drupal 8 sites.                                                                                                                                            | PHP        | Public     | 2019-09-27  | Backlog |
| [pantheon_log_retriever](https://github.com/kyletaylored/pantheon_log_retriever)               | BASH/Perl/Python scripts to retrieve app and DB servers logs from any of your Pantheon instances. For more information on Pantheon Logs, please visit: https://pantheon.io/docs/logs | Shell      | Public     | 2019-09-23  | Backlog |
| [docksal-advanced](https://github.com/kyletaylored/docksal-advanced)                           | _no description_                                                                                                                                                                     | PHP        | Private    | 2019-09-10  | Backlog |
| [openenterprise](https://github.com/kyletaylored/openenterprise)                               | _no description_                                                                                                                                                                     | PHP        | Private    | 2019-05-21  | Backlog |
| [docksal-config-wp](https://github.com/kyletaylored/docksal-config-wp)                         | A base Docksal config for WordPress on Pantheon                                                                                                                                      | Shell      | Public     | 2019-05-10  | Backlog |
| [docksal-config-d7](https://github.com/kyletaylored/docksal-config-d7)                         | Docksal config for Drupal 7 sites.                                                                                                                                                   | Shell      | Public     | 2019-05-01  | Backlog |
| [acquia-watchdog-analyzer](https://github.com/kyletaylored/acquia-watchdog-analyzer)           | Static analyzer of Drupal Watchdog logs.                                                                                                                                             | HTML       | Public     | 2019-04-23  | Backlog |
| [d8_audit](https://github.com/kyletaylored/d8_audit)                                           | Drush command to audit Drupal 7 site modules for Drupal 8 compatibility.                                                                                                             | PHP        | Public     | 2019-01-17  | Backlog |
| [wp-ffw](https://github.com/kyletaylored/wp-ffw)                                               | _no description_                                                                                                                                                                     | PHP        | Private    | 2019-01-16  | Backlog |
| [ffw-pantheon-wordpress](https://github.com/kyletaylored/ffw-pantheon-wordpress)               | A clone of Pantheon's WordPress repo with a web root.                                                                                                                                | —          | Public     | 2019-01-09  | Backlog |
| [drupal-python-sitemap](https://github.com/kyletaylored/drupal-python-sitemap)                 | _no description_                                                                                                                                                                     | Python     | Public     | 2018-05-25  | Backlog |

### Fun / misc side projects

| Repo                                                                               | Description                                                                      | Language   | Visibility | Last pushed | Status  |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------- | ---------- | ----------- | ------- |
| [skelly-hunt](https://github.com/kyletaylored/skelly-hunt)                         | Sample project for digital Skelly Hunt.                                          | JavaScript | Private    | 2026-07-15  | Backlog |
| [skills-merge-of-legends](https://github.com/kyletaylored/skills-merge-of-legends) | Quest: Merge of legends                                                          | —          | Private    | 2026-06-03  | Backlog |
| [tag-denton](https://github.com/kyletaylored/tag-denton)                           | Create short URLs for Instagram posts associated with landmarks in Denton, Texas | PHP        | Public     | 2024-11-21  | Backlog |
| [betweentwofilms](https://github.com/kyletaylored/betweentwofilms)                 | A site that uses your age to show what two movies you were born between.         | JavaScript | Public     | 2024-10-23  | Backlog |
| [randomross](https://github.com/kyletaylored/randomross)                           | Provides a random painting from Bob Ross.                                        | JavaScript | Public     | 2024-10-18  | Published |
| [sales-jukebox](https://github.com/kyletaylored/sales-jukebox)                     | A project for making an audio effects jukebox.                                   | —          | Public     | 2024-01-12  | Backlog |
| [suck-it-jimothy](https://github.com/kyletaylored/suck-it-jimothy)                 | _no description_                                                                 | HTML       | Public     | 2022-12-05  | Backlog |
| [fight31](https://github.com/kyletaylored/fight31)                                 | Find your fight match.                                                           | JavaScript | Public     | 2022-10-20  | Backlog |
| [carnac](https://github.com/kyletaylored/carnac) ★3                                | A magic machine that reads Reddit for trends.                                    | HTML       | Public     | 2019-05-08  | Published |
| [tab-tracker](https://github.com/kyletaylored/tab-tracker)                         | Vue.js based tab tracker.                                                        | JavaScript | Public     | 2018-06-28  | Backlog |
| [starwars](https://github.com/kyletaylored/starwars) ★1                            | Awesome site for Star Wars info!                                                 | HTML       | Public     | 2017-09-01  | Backlog |
| [isitgreenorblue](https://github.com/kyletaylored/isitgreenorblue)                 | Is the color green or blue? A helpful tool for the colordumb.                    | Ruby       | Public     | 2017-07-24  | Published |
| [javascript30](https://github.com/kyletaylored/javascript30) ★1                    | Storing files for 30 days of JavaScript                                          | CSS        | Public     | 2017-01-08  | Backlog |

### Static sites (personal/community)

| Repo                                                                                                    | Description                                               | Language   | Visibility | Last pushed | Status  |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------- | ---------- | ----------- | ------- |
| [kyletaylored.github.io](https://github.com/kyletaylored/kyletaylored.github.io)                        | Personal blog site of Kyle Taylor                         | HTML       | Public     | 2026-07-17  | Backlog |
| [olansays](https://github.com/kyletaylored/olansays)                                                    | Static site for OlanSays.com                              | HTML       | Public     | 2024-01-16  | Backlog |
| [kyletaylor.dev](https://github.com/kyletaylored/kyletaylor.dev)                                        | _no description_                                          | TypeScript | Private    | 2024-01-16  | Backlog |
| [belkirk-jekyll-demo](https://github.com/kyletaylored/belkirk-jekyll-demo)                              | _no description_                                          | HTML       | Public     | 2022-10-06  | Backlog |
| [do-you-pay-more-taxes-than-trump](https://github.com/kyletaylored/do-you-pay-more-taxes-than-trump) ★1 | _no description_                                          | HTML       | Public     | 2020-09-29  | Backlog |
| [startupdenton](https://github.com/kyletaylored/startupdenton)                                          | Static site for StartupDenton.com                         | —          | Public     | 2019-10-30  | Backlog |
| [barcampdallas](https://github.com/kyletaylored/barcampdallas)                                          | A static site for BarCamp Dallas.                         | —          | Public     | 2019-10-18  | Backlog |
| [angrybearclub](https://github.com/kyletaylored/angrybearclub)                                          | Static site for my Angry Bear Club.                       | CSS        | Public     | 2019-01-08  | Backlog |
| [opencoffeeclub](https://github.com/kyletaylored/opencoffeeclub)                                        | Static site for OpenCoffeeClub.co                         | CSS        | Public     | 2018-02-02  | Backlog |
| [sendstufftospace](https://github.com/kyletaylored/sendstufftospace)                                    | Landing page for Kubos' new shirt - Send Stuff To Space.  | —          | Public     | 2018-02-02  | Backlog |
| [hickory-rail](https://github.com/kyletaylored/hickory-rail) ★1                                         | _no description_                                          | CSS        | Public     | 2017-09-18  | Backlog |
| [wizard-of-oz](https://github.com/kyletaylored/wizard-of-oz)                                            | Static site for Bolter class.                             | HTML       | Public     | 2017-07-14  | Backlog |
| [wizard-of-oz-1](https://github.com/kyletaylored/wizard-of-oz-1)                                        | static site for Bolter class                              | HTML       | Public     | 2017-07-14  | Backlog |
| [drawattention.co](https://github.com/kyletaylored/drawattention.co)                                    | Static site for Draw Attention.co                         | —          | Public     | 2016-10-18  | Backlog |
| [ournerdwedding](https://github.com/kyletaylored/ournerdwedding)                                        | _no description_                                          | —          | Public     | 2015-02-15  | Backlog |
| [createdallas](https://github.com/kyletaylored/createdallas)                                            | Online place where Dallas freelancers and contractors can | PHP        | Public     | 2014-07-26  | Backlog |

### Misc APIs / data tools

| Repo                                                                      | Description                                                                      | Language   | Visibility | Last pushed | Status  |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------- | ---------- | ----------- | ------- |
| [kyletaylored](https://github.com/kyletaylored/kyletaylored) ★1           | _no description_                                                                 | —          | Public     | 2025-07-02  | Backlog |
| [hollow-app](https://github.com/kyletaylored/hollow-app)                  | _no description_                                                                 | TypeScript | Public     | 2025-07-01  | Backlog |
| [gadget-grove-demo](https://github.com/kyletaylored/gadget-grove-demo)    | Data stream demo using Gadget Grove.                                             | Python     | Public     | 2025-04-28  | Backlog |
| [aeronow](https://github.com/kyletaylored/aeronow)                        | On-demand graphs for TCEQ air quality monitoring sites.                          | Python     | Public     | 2022-12-08  | Backlog |
| [ua-blaster](https://github.com/kyletaylored/ua-blaster)                  | User Agent Blaster - CSV script for extracting user agent and GeoIP data.        | Python     | Public     | 2022-12-08  | Backlog |
| [monan-live](https://github.com/kyletaylored/monan-live) ★1               | _no description_                                                                 | Python     | Public     | 2021-12-20  | Backlog |
| [fastly-dashboard](https://github.com/kyletaylored/fastly-dashboard) ★2   | Create a Grafana environment using only Lando.                                   | Shell      | Public     | 2021-06-09  | Backlog |
| [appmonsta](https://github.com/kyletaylored/appmonsta)                    | Data Studio Community Connector to fetch information about mobile apps.          | JavaScript | Public     | 2019-09-19  | Backlog |
| [daxko-api](https://github.com/kyletaylored/daxko-api)                    | Generated API code from Daxko OpenAPI specification using Swagger 2.0.           | PHP        | Public     | 2019-09-11  | Backlog |
| [coraldev](https://github.com/kyletaylored/coraldev) ★1                   | Simple script for getting Coral environmental board set up.                      | Shell      | Public     | 2019-06-19  | Backlog |
| [spidermonkey](https://github.com/kyletaylored/spidermonkey)              | A Hubspot API crawler.                                                           | PHP        | Public     | 2019-03-25  | Backlog |
| [hubspot-cli](https://github.com/kyletaylored/hubspot-cli)                | A HubSpot CLI tool built on Laravel Zero.                                        | PHP        | Public     | 2019-03-07  | Backlog |
| [blockstorm-cli-php](https://github.com/kyletaylored/blockstorm-cli-php)  | An Artisan-based CLI tool for fetching data from Blockchain.info.                | PHP        | Public     | 2019-02-13  | Backlog |
| [blockstorm-cli-js](https://github.com/kyletaylored/blockstorm-cli-js) ★1 | CLI tool for generating CSVs of transaction and wallet data from Blockchain.info | JavaScript | Public     | 2019-01-29  | Backlog |
| [curlphp](https://github.com/kyletaylored/curlphp)                        | Quick web scraper in PHP.                                                        | PHP        | Public     | 2018-01-21  | Backlog |
| [Repo](https://github.com/kyletaylored/Repo) ★2                           | Postach.io theme inspired by GitHub.                                             | JavaScript | Public     | 2015-01-22  | Backlog |

## Gists

121 total gists (mostly small, single-purpose scripts/snippets — good raw material for a single roundup article per category, e.g. "Pantheon/Terminus tricks I actually use," rather than one article per gist).

### Datadog / New Relic / observability (13)

| Gist                                                                                                                         | Visibility | Last updated | Files | Status  |
| ---------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----- | ------- |
| [huntress-api-datadog-check](https://gist.github.com/kyletaylored/2d74c260e5e04fb1f4e416cc6f3636e1)                          | Secret     | 2026-05-27   | 3     | Backlog |
| [How to integrate Monolog with New Relic in Drupal 9](https://gist.github.com/kyletaylored/c133cf719bf64edc0075bb0d7133688e) | Public     | 2026-05-05   | 3     | Backlog |
| [Umbraco Datadog Header Propagation for APM Tracing](https://gist.github.com/kyletaylored/44a4a0d86cc0ec1b9634b06f7af7dbc6)  | Public     | 2025-11-13   | 3     | Backlog |
| [Azure VM on Datadog Example (Bicep)](https://gist.github.com/kyletaylored/f554a6917b98ba48b4e93b3341517675)                 | Public     | 2025-09-23   | 3     | Backlog |
| [Datadog Demo App](https://gist.github.com/kyletaylored/17a0b2dd51a667d3748abd5cb488493d)                                    | Secret     | 2024-12-17   | 3     | Backlog |
| [Datadog Install for Linux](https://gist.github.com/kyletaylored/4a53fc4b2cf626eeeca19ee819cf1770)                           | Public     | 2024-09-03   | 1     | Backlog |
| [Datadog AI Monitor Message Template Generator](https://gist.github.com/kyletaylored/9b0ceecfe507b46820eddd7ce652a848)       | Secret     | 2024-08-19   | 1     | Backlog |
| [datadog-agent-all.yaml](https://gist.github.com/kyletaylored/c8273f983e1b411d886facde4a3944f8)                              | Secret     | 2024-07-30   | 1     | Backlog |
| [datadog-docs.py](https://gist.github.com/kyletaylored/5fe224fb717248b104baa76a4f362671)                                     | Secret     | 2024-06-20   | 1     | Backlog |
| [New Relic Dashboard - Golden Signals](https://gist.github.com/kyletaylored/0858ef9c83893c4c17c1c761c6c212f5)                | Secret     | 2020-06-10   | 3     | Backlog |
| [Drupal 8 Codeclimate](https://gist.github.com/kyletaylored/4c8ae349c4a0340098efb52d6642c87e)                                | Public     | 2019-11-07   | 2     | Backlog |
| [Codeclimate base for Drupal 7](https://gist.github.com/kyletaylored/add32ab5c616c5dca34c1f5a22309f4a)                       | Public     | 2019-04-25   | 3     | Backlog |
| [Drupal 7 code_climate.yml](https://gist.github.com/kyletaylored/777f2270a5b61ed7242b3d394ba5b995)                           | Public     | 2018-02-28   | 1     | Backlog |

### Pantheon / Drupal / WordPress ops (44)

| Gist                                                                                                                                                                          | Visibility | Last updated | Files | Status  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----- | ------- |
| [Fix SQL_CALC_FOUND_ROWS performance degradation on WordPress, fix database indexes and primary keys.](https://gist.github.com/kyletaylored/dddfe46ddaf2bd14b3958017bb57165d) | Public     | 2026-02-25   | 2     | Backlog |
| [Lando WordPress Network Site / Multisite (WPMS)](https://gist.github.com/kyletaylored/79e40b0f2f39b471945286769961dfa5)                                                      | Public     | 2025-01-14   | 3     | Backlog |
| [Nginx Log Parser WordPress Plugin](https://gist.github.com/kyletaylored/e0b861333e3fe1a37c715d4571fa38ac)                                                                    | Public     | 2023-10-02   | 2     | Backlog |
| [Fix bfi_thumb.php for Pantheon directories](https://gist.github.com/kyletaylored/9ec4da1f643a295413765f560da057ad)                                                           | Public     | 2023-09-26   | 1     | Backlog |
| [Install Chrome into Pantheon Appserver using PHP and NodeJS](https://gist.github.com/kyletaylored/3d068b7ed51205ca3b198b9df8933710)                                          | Public     | 2023-06-29   | 4     | Backlog |
| [A one-liner for checking opcache information using cachetool and WP CLI or Drush.](https://gist.github.com/kyletaylored/5e3b3f5480afc5827e87a47ef61f7197)                    | Public     | 2023-05-17   | 1     | Backlog |
| [Lando example config with PHP override and multiple databases](https://gist.github.com/kyletaylored/99d509a9a87e62c84aca9db64b5c3867)                                        | Public     | 2023-03-04   | 1     | Backlog |
| [Add Node build capabilities to composer.json](https://gist.github.com/kyletaylored/754c6df93f536826524d9ff3edf6600e)                                                         | Public     | 2022-10-19   | 2     | Backlog |
| [Check is sites in an organization have a primary domain assigned.](https://gist.github.com/kyletaylored/b850e9c8c94b26b34ec54d5a564444c9)                                    | Public     | 2022-09-23   | 1     | Backlog |
| [ComposerPrivateAuth.php](https://gist.github.com/kyletaylored/e7482dd1a61f97188b647a43b6bbf531)                                                                              | Public     | 2022-08-10   | 2     | Backlog |
| [terminus-search-error.txt](https://gist.github.com/kyletaylored/b90d88c8d0ef0489a81add58d9a08a74)                                                                            | Secret     | 2022-06-02   | 1     | Backlog |
| [Get Pantheon public database credentials for external integration](https://gist.github.com/kyletaylored/0ff616db4efb646d62fa9ed436b1e797)                                    | Public     | 2022-05-19   | 1     | Backlog |
| [WordPress Multisite Search and Replace](https://gist.github.com/kyletaylored/2965d3b7025ba926435f20eb841eaa90)                                                               | Secret     | 2022-05-11   | 3     | Backlog |
| [Fetch WPML languages through WP CLI](https://gist.github.com/kyletaylored/eba2ca47ec03c981c6569762db6d54b3)                                                                  | Public     | 2022-03-23   | 1     | Backlog |
| [WDS WP-CLI 101 Complete](https://gist.github.com/kyletaylored/67109f5759ff6af2184bf6492f3be606)                                                                              | Public     | 2022-03-23   | 1     | Backlog |
| [Acquia Lift Experience Builder: Removing dual wrappers when replacing content with CSS selector](https://gist.github.com/kyletaylored/8b1b6dab46fad4488bd7bba13c1898e1)      | Public     | 2021-11-18   | 1     | Backlog |
| [Fix WordPress database indexes and primary keys](https://gist.github.com/kyletaylored/348196b6fc5212999275100445d45aee)                                                      | Public     | 2021-10-29   | 1     | Backlog |
| [Using custom bin / exe on Pantheon](https://gist.github.com/kyletaylored/154bd56c73cb0f76db95527dcbe1eb15)                                                                   | Public     | 2021-09-11   | 2     | Backlog |
| [pantheon backups via quicksilver](https://gist.github.com/kyletaylored/c72d4dffee1380f97f633882f723a901)                                                                     | Secret     | 2021-08-11   | 1     | Backlog |
| [Deploy to Pantheon from Github Actions](https://gist.github.com/kyletaylored/66ec1389a71fe3e44040bbd541213bd6)                                                               | Secret     | 2021-08-11   | 2     | Backlog |
| [quicksilver-db_clone.json](https://gist.github.com/kyletaylored/48f5edc40cdea28f67b1640f252ac459)                                                                            | Secret     | 2021-04-01   | 1     | Backlog |
| [composer.json gitlab token](https://gist.github.com/kyletaylored/c95c86c8eb371ac17a6485d51bd48ad7)                                                                           | Secret     | 2021-03-22   | 1     | Backlog |
| [Terminus Quicksilver POST variables](https://gist.github.com/kyletaylored/4ea03896d23482e3cb60688f4aa28a58)                                                                  | Secret     | 2021-03-11   | 1     | Backlog |
| [Terminus Site Inventory](https://gist.github.com/kyletaylored/b48ede133dced4b88debeab2beecbb63)                                                                              | Public     | 2020-11-20   | 7     | Backlog |
| [Example Terminus Scripts - OSU](https://gist.github.com/kyletaylored/09036f8a6d83a2c506d0242e120d68d7)                                                                       | Secret     | 2020-09-03   | 6     | Backlog |
| [wp-cfm-import-update.php](https://gist.github.com/kyletaylored/7d14db08a5ced89693901ff04b99970e)                                                                             | Public     | 2020-08-11   | 1     | Backlog |
| [drush_collections.php](https://gist.github.com/kyletaylored/50f86c76c8c4550cc635a703888fa4b2)                                                                                | Secret     | 2020-06-12   | 1     | Backlog |
| [pantheon-wow.js](https://gist.github.com/kyletaylored/308ae739d2763e59be4e4ef6e9662a96)                                                                                      | Public     | 2020-06-05   | 2     | Backlog |
| [\_pantheon.py](https://gist.github.com/kyletaylored/99f59e12aad63bf9737d775abc2c1ee1)                                                                                        | Secret     | 2020-05-22   | 8     | Backlog |
| [Pantheon Slack Notification using API](https://gist.github.com/kyletaylored/f7a3f53c63da01fa3eddd00eacd7c5ac)                                                                | Secret     | 2020-05-06   | 2     | Backlog |
| [Add MySQL link in Pantheon dashboard](https://gist.github.com/kyletaylored/b85f4792622b09b28d59679bec3a53a9)                                                                 | Public     | 2020-03-23   | 1     | Backlog |
| [Pantheon Nginx Regex](https://gist.github.com/kyletaylored/2546a0647fb5edb1310d1057d76709f4)                                                                                 | Secret     | 2020-03-10   | 1     | Backlog |
| [Pantheon environment vars](https://gist.github.com/kyletaylored/b5ca40b40aa6b47d604b8bc5351f7339)                                                                            | Secret     | 2020-02-10   | 1     | Backlog |
| [global.composer.json example](https://gist.github.com/kyletaylored/071d59aab3aaf41f06b4b0ba143eb8ef)                                                                         | Secret     | 2020-02-07   | 2     | Backlog |
| [Docksal swap file command to increase swap size for Composer issues (beta)](https://gist.github.com/kyletaylored/24d1291120f7cea4bcddf52a85c5bef6)                           | Public     | 2018-12-10   | 1     | Backlog |
| [A shell script to help set up a standard DrupalVM project](https://gist.github.com/kyletaylored/9ad838940180b8efb0b3aecfa6f54827)                                            | Public     | 2018-10-18   | 1     | Backlog |
| [Process Acquia Lift Exports for Identity purging](https://gist.github.com/kyletaylored/5e033bea08674c04422c0457db1a0983)                                                     | Secret     | 2018-10-17   | 2     | Backlog |
| [Acquia Lift API example](https://gist.github.com/kyletaylored/e65f99870e4f8bdbf8743471820115ca)                                                                              | Public     | 2018-10-02   | 1     | Backlog |
| [Python script to extract content types from a Drupal 7 sitemap.xml.](https://gist.github.com/kyletaylored/2520b81dff7e6e45346a49131f490056)                                  | Public     | 2018-04-17   | 2     | Backlog |
| [DrupalVM configuration](https://gist.github.com/kyletaylored/cc76b5820ecf6c60930efaabbe22c4ec)                                                                               | Secret     | 2018-01-17   | 1     | Backlog |
| [A one-liner to run in your console when you need to uncheck many modules on the uninstall screen.](https://gist.github.com/kyletaylored/6353009b2966519d20c38a6bd07185bb)    | Public     | 2017-01-20   | 1     | Backlog |
| [Bootstrap 2 mobile navigation hack](https://gist.github.com/kyletaylored/4842024528b3594612bd)                                                                               | Public     | 2015-08-29   | 1     | Backlog |
| [Drupal Nginx](https://gist.github.com/kyletaylored/b2156ea73162194d2169)                                                                                                     | Public     | 2015-08-29   | 1     | Backlog |
| [Adobe Kuler & Drupal: Color theme integration](https://gist.github.com/kyletaylored/a6dfbc1b2325589f3df3)                                                                    | Public     | 2015-08-29   | 3     | Backlog |

### Cloud / Git / CI tooling (8)

| Gist                                                                                                                                     | Visibility | Last updated | Files | Status  |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----- | ------- |
| [Query Azure Log Data](https://gist.github.com/kyletaylored/6a6a03d103f123cac3d1c467e624aee1)                                            | Public     | 2026-04-10   | 5     | Backlog |
| [Azure Resource Scripts](https://gist.github.com/kyletaylored/f59165f1b585a9d1fe6ab3d2c2d95afe)                                          | Secret     | 2025-05-15   | 1     | Backlog |
| [UoE Pipeline](https://gist.github.com/kyletaylored/56bf3d7e8882af05aba485646188613e)                                                    | Secret     | 2023-09-08   | 3     | Backlog |
| [Audit git diffs against upstream sites.](https://gist.github.com/kyletaylored/da5db4cb838de7daf42e697de3bb5c6c)                         | Public     | 2022-01-05   | 2     | Backlog |
| [Git SSH Config](https://gist.github.com/kyletaylored/181728663e30015aa3a0)                                                              | Public     | 2021-07-03   | 1     | Backlog |
| [github-sync-repo.yml](https://gist.github.com/kyletaylored/a6993997d7c31515177f6c1b71ae8fd7)                                            | Secret     | 2020-06-09   | 1     | Backlog |
| [Delete all git remote tags](https://gist.github.com/kyletaylored/bf0fe81300c5e12b35be0926487182f7)                                      | Public     | 2016-07-11   | 1     | Backlog |
| [A better command prompt for Mac, including git status of current directory.](https://gist.github.com/kyletaylored/3bf6089e31e8c378c99a) | Public     | 2016-01-06   | 1     | Backlog |

### Browser / JS snippets (15)

| Gist                                                                                                                            | Visibility | Last updated | Files | Status  |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----- | ------- |
| [resource-context.js](https://gist.github.com/kyletaylored/40553dfbb4cd9470ff87d646ff2200e4)                                    | Secret     | 2026-01-27   | 1     | Backlog |
| [latest](https://gist.github.com/kyletaylored/b31156349341dfaa6ebdce9e5a4e7e7b)                                                 | Secret     | 2022-02-25   | 3     | Backlog |
| [webops analytics](https://gist.github.com/kyletaylored/4816bb8cda925b05d60cd6607a62d988)                                       | Secret     | 2021-12-28   | 1     | Backlog |
| [Traffic simulator in a node script](https://gist.github.com/kyletaylored/f9bc5f0d82942687038040b1a5cdacdd)                     | Public     | 2021-07-12   | 2     | Backlog |
| [Alexa Parser](https://gist.github.com/kyletaylored/b93ca960bc9173baa125ee9125af69b5)                                           | Public     | 2021-03-15   | 2     | Backlog |
| [Codecademy export](https://gist.github.com/kyletaylored/b3f071ebf0612c3ee8b37dfa44400e24)                                      | Secret     | 2020-11-03   | 1     | Backlog |
| [Jekyll: HD images with Retina.js](https://gist.github.com/kyletaylored/9259df32a90afc3bc41286af8a49af52)                       | Public     | 2020-10-30   | 2     | Backlog |
| [default-workspace.json](https://gist.github.com/kyletaylored/92eb0ba1429397da1e2f9cc84928e5ba)                                 | Secret     | 2019-10-07   | 1     | Backlog |
| [Sample Lighthouse](https://gist.github.com/kyletaylored/e5891e64bde91858d193cc41b3929eb7)                                      | Public     | 2019-10-02   | 1     | Backlog |
| [tamperbasket.js](https://gist.github.com/kyletaylored/71c9d5538cafa05c361be78b82320628)                                        | Secret     | 2019-03-26   | 1     | Backlog |
| [Load scripts with JS](https://gist.github.com/kyletaylored/e587993a562555becc24986852e7dba5)                                   | Public     | 2019-02-14   | 1     | Backlog |
| [Get public ip location data using jQuery or Vanilla JS](https://gist.github.com/kyletaylored/2ff2b633269a3006dd75c472802d1515) | Public     | 2019-02-08   | 1     | Backlog |
| [Venom extractor](https://gist.github.com/kyletaylored/12965366f61b83180e12bfc859bda353)                                        | Public     | 2018-10-04   | 2     | Backlog |
| [onload, readyState, and DOMContentLoaded](https://gist.github.com/kyletaylored/8bc4516d598ee46e93f4a84c0ac4d575)               | Public     | 2018-09-17   | 1     | Backlog |
| [Bootstrap 2 grid options (from Bootstrap 3)](https://gist.github.com/kyletaylored/36071b7441618fe9a301dc85ad65f0d5)            | Public     | 2016-08-24   | 2     | Backlog |

### Misc scripts & one-offs (41)

| Gist                                                                                                                                            | Visibility | Last updated | Files | Status  |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----- | ------- |
| [maui android rum](https://gist.github.com/kyletaylored/c61ea87c67d969af32ea85e91d08ad95)                                                       | Secret     | 2026-01-08   | 1     | Backlog |
| [Guide for setting up Podman with Lima for better VM control.](https://gist.github.com/kyletaylored/6d807ec1f6e0e6e0376432e8da24e075)           | Public     | 2026-01-02   | 2     | Backlog |
| [.example.env](https://gist.github.com/kyletaylored/848fa8fdf266a1762628684e68ed6d62)                                                           | Public     | 2025-08-15   | 2     | Backlog |
| [Demo2Win Crimes](https://gist.github.com/kyletaylored/b72d56c4899f6217a67442e89cc1c3a3)                                                        | Secret     | 2025-05-12   | 1     | Backlog |
| [dockerfile.aspnet](https://gist.github.com/kyletaylored/a1b2087384fc8b69b825da73036777d0)                                                      | Secret     | 2025-03-21   | 1     | Backlog |
| [cli.php](https://gist.github.com/kyletaylored/5fc8d2463fb041ca808912e734a9623e)                                                                | Secret     | 2024-03-25   | 1     | Backlog |
| [Audit user agents for bots and write back to BQ](https://gist.github.com/kyletaylored/439df1fd2ea4b94d0e9e80c668694565)                        | Secret     | 2024-03-25   | 1     | Backlog |
| [redirect.php](https://gist.github.com/kyletaylored/9177c9c67c9d8eb4ffe0075311a439e2)                                                           | Secret     | 2023-11-27   | 1     | Backlog |
| [Disable cache on non-live environments.](https://gist.github.com/kyletaylored/055565d0227d852caa0b9b09144d552e)                                | Secret     | 2023-08-15   | 1     | Backlog |
| [IP analysis script](https://gist.github.com/kyletaylored/85170559392fcfe78d81afa2dce914e8)                                                     | Public     | 2023-08-09   | 5     | Backlog |
| [Blue Green deployment and synchronization script.](https://gist.github.com/kyletaylored/500169fe2fdc47036f956814db68859a)                      | Public     | 2023-05-24   | 1     | Backlog |
| [maxmind-ip-asn-geo.php](https://gist.github.com/kyletaylored/67a8564017da5f676d09cbf68c60549a)                                                 | Public     | 2022-04-12   | 1     | Backlog |
| [Auto-lock new sites and multidev environments](https://gist.github.com/kyletaylored/5b02fbb78b5917379fd082a3a32d588e)                          | Secret     | 2022-01-31   | 2     | Backlog |
| [An example usage of QuotaGuard in PHP](https://gist.github.com/kyletaylored/f3cd796312204e9ef900e61f5b774f67)                                  | Public     | 2022-01-26   | 1     | Backlog |
| [primary-domain-redirect.php](https://gist.github.com/kyletaylored/dff247a17cf668deb6916c5720be2e0f)                                            | Secret     | 2021-12-28   | 2     | Backlog |
| [wpa_supplicant.conf](https://gist.github.com/kyletaylored/e3ba974d232cb2a6c7db73adaeccf525)                                                    | Secret     | 2021-12-20   | 1     | Backlog |
| [Queerty Load Test](https://gist.github.com/kyletaylored/25721649225890b1b57618faf9cced29)                                                      | Secret     | 2021-12-16   | 1     | Backlog |
| [campuspress-2.txt](https://gist.github.com/kyletaylored/b10bf1ec90d3e17a0b2e2673e940795f)                                                      | Secret     | 2021-11-29   | 2     | Backlog |
| [Script to proxy Looker requests.](https://gist.github.com/kyletaylored/ea52e9203c6aac399d8d154434cfb063)                                       | Secret     | 2021-10-29   | 1     | Backlog |
| [Simple PHP fetch command](https://gist.github.com/kyletaylored/7a80f7a3ae8acbfe79ba707779b8c557)                                               | Public     | 2021-09-03   | 1     | Backlog |
| [get-creds.php](https://gist.github.com/kyletaylored/726fecbdd9f618ccdb5d1a5a12cfa3c7)                                                          | Public     | 2021-03-19   | 1     | Backlog |
| [tvguide-redirect.php](https://gist.github.com/kyletaylored/a21f9ceba9b848ae06d99197b3a12f06)                                                   | Secret     | 2021-01-06   | 1     | Backlog |
| [Asynchronous vs Parallel Bash Processes](https://gist.github.com/kyletaylored/f5e6d98cb88127e8b47128233f5f8923)                                | Public     | 2020-09-29   | 6     | Backlog |
| [Purina Demo](https://gist.github.com/kyletaylored/8285df11e3af23832e5c1ac176174bd0)                                                            | Secret     | 2020-09-17   | 1     | Backlog |
| [Nestle htaccess](https://gist.github.com/kyletaylored/0777a0e04ef0a70874c5f318ffa10832)                                                        | Secret     | 2020-08-28   | 1     | Backlog |
| [bi_admin_update](https://gist.github.com/kyletaylored/f0f7daac92d274c042cbddd941b936c1)                                                        | Secret     | 2020-08-17   | 2     | Backlog |
| [usc-redirects.php](https://gist.github.com/kyletaylored/1f9f6e0e649c879c880cff195146cc16)                                                      | Secret     | 2020-08-14   | 1     | Backlog |
| [IPInfo script for GeoIP detection](https://gist.github.com/kyletaylored/443f5a9b3585612e2d362dba5da305ef)                                      | Public     | 2020-05-19   | 4     | Backlog |
| [Python renaming script (specific use case)](https://gist.github.com/kyletaylored/fee41bad92eb8bdea54cf65543e9997d)                             | Public     | 2020-05-11   | 1     | Backlog |
| [.profile](https://gist.github.com/kyletaylored/a5a03782f60c05f4d5b43db1dba2be78)                                                               | Secret     | 2020-04-07   | 1     | Backlog |
| [DU Redirect VCL](https://gist.github.com/kyletaylored/28ad2e1a0d6f140c3c7d96256d548dd9)                                                        | Public     | 2020-03-05   | 2     | Backlog |
| [RPI Custom Upstream](https://gist.github.com/kyletaylored/9258ec004a6cc8189744107319fcc9be)                                                    | Secret     | 2020-01-22   | 1     | Backlog |
| [cistackprovisioning.sh](https://gist.github.com/kyletaylored/84a0805e2408840eb682a5a57ac726d1)                                                 | Secret     | 2019-10-10   | 10    | Backlog |
| [Get actual mobile app information from Adwords platform domain IDs.](https://gist.github.com/kyletaylored/405101655490f07a2b40b1d4f411ab21)    | Public     | 2019-09-13   | 1     | Backlog |
| [just scratch pad for now](https://gist.github.com/kyletaylored/60ac3b6aacf298d4f23ced1331b351e2)                                               | Public     | 2019-05-14   | 1     | Backlog |
| [Combine access.log files and run GoAccess report at the same time.](https://gist.github.com/kyletaylored/b101ac8ec57e169e7e28528ebb444275)     | Public     | 2019-04-22   | 1     | Backlog |
| [Sitemap XML De-duplicator](https://gist.github.com/kyletaylored/9aa642b5a4cb24259819ac4710876545)                                              | Public     | 2019-04-19   | 1     | Backlog |
| [d7-local.settings.php](https://gist.github.com/kyletaylored/4b0ed5baed3b8c752ca11ac9fae164e7)                                                  | Secret     | 2018-02-23   | 1     | Backlog |
| [Local dev things](https://gist.github.com/kyletaylored/c11844089c9b4ce6a147931981c561c7)                                                       | Secret     | 2018-01-23   | 2     | Backlog |
| [Script to run in a local directory to optimize all JPG and PNG images.](https://gist.github.com/kyletaylored/ae272b21fcddf87d9cf7efa07a5fcd08) | Public     | 2017-06-10   | 1     | Backlog |
| [Show all accepted Pivotal Tracker stories for specific user](https://gist.github.com/kyletaylored/e3ee4507b4a222b2fc2b)                        | Public     | 2017-03-27   | 1     | Backlog |

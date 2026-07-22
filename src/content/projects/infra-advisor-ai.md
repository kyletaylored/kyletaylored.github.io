---
title: "InfraAdvisor AI"
summary: "A reference architecture for building, training, deploying, and monitoring an AI agent end-to-end on Azure — a multi-agent advisor for bridges, disasters, energy, water, and federal procurement data."
pubDate: 2026-07-16
status: active
tags: ["ai", "agents", "azure", "datadog"]
links:
  source: "https://github.com/kyletaylored/infra-advisor-ai"
  demo: "https://infra-advisor-ai.kyletaylor.dev"
stack: ["Python", "TypeScript", "LangGraph", "Azure OpenAI", "Azure AI Search", "Datadog"]
featured: false
brandColor: "#348BFF"
features:
  - title: "Multi-agent routing"
    description: "A router LLM classifies each query and hands it to one of five domain specialists (engineering, water/energy, business development, document, general), each with only its own relevant tools."
    icon: "◆"
  - title: "11 live-data MCP tools"
    description: "Specialists call MCP tools backed by real government APIs — NBI bridge conditions, FEMA disaster history, EIA/ERCOT energy data, EPA water infrastructure, SAM.gov procurement."
    icon: "★"
  - title: "Observability across every layer"
    description: "Datadog covers APM, LLM Observability, RUM, Data Streams, Data Jobs, and CSPM across the ingestion pipeline, the agent, and the UI — not just the parts that are easy to instrument."
    icon: "▶"
lessons:
  - title: "Routing beats one giant prompt"
    description: "A single generalist agent with every tool available makes worse decisions than five narrow specialists that each see only their own domain's tools."
  - title: "Observability has to span ingestion, not just inference"
    description: "The interesting failures in an AI agent aren't always in the LLM call — a stale Airflow ingestion job or a bad embedding batch upstream can degrade answers just as badly."
seo: {}
---

InfraAdvisor AI is a reference architecture for AEC/O&M consulting — architecture, engineering, construction, and operations & maintenance firms — that answers questions about bridges, disasters, energy grids, water systems, and federal procurement using live U.S. government data instead of a static knowledge base.

Nine Airflow DAGs pull and normalize government data into Azure AI Search as a hybrid vector + keyword index. A consultant's question goes through a router LLM that picks one of five domain specialists, each of which calls a scoped set of MCP tools (11 total) against real government APIs before an LLM synthesizes a cited answer. The whole pipeline — ingestion, the agent, and the React UI — is instrumented with Datadog across APM, LLM Observability, RUM, Data Streams, Data Jobs, and CSPM, since a reference architecture that only demonstrates the AI part and skips the operational half isn't actually a complete reference.

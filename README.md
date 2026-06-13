# GAAVAT Resilience Dashboard — Version 1.0

**Village Disaster Preparedness Intelligence Platform**
State Disaster Management Authority, Government of Maharashtra

---

## Overview

GAAVAT (Village Disaster Preparedness) is a digital preparedness intelligence platform developed for SDMA Maharashtra under the NDMA-MoPR Community Based Disaster Risk Reduction (CBDRR) programme. It enables state and district officials to monitor, track and improve village-level disaster preparedness across all 36 Maharashtra districts.

This repository contains **Version 1.0 — Demonstration Build**, designed for concept validation, platform design review and stakeholder consultation with Government of Maharashtra, NDMA and MoPR.

---

## Platform Features

**State Command Centre**
Real-time overview of Maharashtra's composite District Resilience Index (DRI) across 36 districts, with alert console, forecast intelligence and district heat map.

**District Performance Dashboard**
Action-oriented view for District Collectors and DDMOs — showing DRI components, GP cluster status, event calendar and department convergence scores.

**GP Cluster Intelligence**
State → District → GP Cluster → Gram Panchayat preparedness evidence chain, including household-level HPI checklist.

**Behaviour Change Dashboard**
Measures whether GAAVAT activities result in genuine knowledge, attitude and practice change — not just event completion.

**GIS Intelligence (Forecast–Risk–Preparedness Gap)**
Integrates BharatFS weather forecast data with GAAVAT preparedness baselines to identify districts requiring pre-emptive action before a disaster strikes.

**NDMA Reporting Module**
Auto-generates MoPR-NDMA and Sendai Framework progress summaries directly from field data, aligned with NDMA-MoPR MIS reporting structure.

---

## Composite Indices

| Index | Full Name | Score Range |
|-------|-----------|-------------|
| **HPI** | Household Preparedness Index | 0–100 |
| **IPI** | Institutional Preparedness Index | 0–100 |
| **BCI** | Behaviour Change Index | 0–100 |
| **DRI** | District Resilience Index | 0–100 |
| **FPAS** | Forecast Preparedness Alert Score | 0–100 |

Score bands: ≥ 70 = Strong (green) · 50–69 = Developing (amber) · < 50 = Critical (red)

Version 1.0 uses expert-weighted illustrative methodology for demonstration, to be validated during pilot implementation.

---

## Forecast and Geospatial Systems

- **BharatFS (Bharat Forecast System):** SDMA Maharashtra–IITM Pune Forecast Layer. Provides 96-hour weather and hazard severity data.
- **GeoDSS (NDMA Geospatial Decision Support System):** NDMA spatial data layer for flood zones, seismic zones and cyclone tracks.

---

## Illustrative Pilot District Configuration

Six example districts selected to represent Maharashtra's major hazard geographies, including coastal, flood-prone, drought-prone, tribal, urban and earthquake-risk regions. This configuration illustrates how GAAVAT could be deployed under a programme aligned with NDMA and MoPR community-based DRR structures.

- Gadchiroli (Flood / Tribal)
- Chhatrapati Sambhajinagar (Drought)
- Latur (Earthquake)
- Pune (Urban Flood)
- Nashik (Flood)
- Raigad (Coastal / Landslide)

Each example pilot covers 20 Gram Panchayats (120 GPs total). The dashboard demonstrates how output formats can be structured to align with NDMA and MoPR MIS reporting frameworks. Reporting field mapping will be validated with relevant authorities prior to any production deployment.

---

## Deployment

Static site — no build step required. Deploy directly to GitHub Pages or any web server.

**Files:**
```
index.html   — Dashboard shell and all views
styles.css   — Complete stylesheet
app.js       — All data, logic and rendering
README.md    — This file
```

**Requirements:** Modern browser with JavaScript enabled. Chart.js 4.4.0 loaded from CDN (no local install needed).

---

## Data Status

**DEMONSTRATION VERSION.** All data shown in this dashboard is illustrative, used for concept validation, platform design and stakeholder consultation. Indicator definitions, weightings and calculations will be refined through pilot implementation.

Live field data integration, validated baselines and production deployment will follow pilot completion.

---

## Alignment

- NDMA National Disaster Management Plan 2019
- MoPR Gram Panchayat Development Plan (GPDP) Framework
- Sendai Framework for Disaster Risk Reduction 2015–2030 (Priority 1: Understanding disaster risk)
- Maharashtra State Disaster Management Plan

---

## Version History

| Version | Date | Status |
|---------|------|--------|
| 1.0 — Demonstration Build | June 2026 | Current |

---

**SDMA Maharashtra · State Disaster Management Authority · Government of Maharashtra**
For official use. Platform queries: Director, SDMA Maharashtra.

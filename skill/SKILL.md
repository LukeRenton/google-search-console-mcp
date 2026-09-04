---
name: seo
description: >
  Diagnose and fix how the user's own websites perform in Google Search, grounding every claim
  in their real Search Console data (the mcp__gsc__* tools) and fixing root causes in the local
  repo. Use whenever the user asks how a site is doing in search, why a site or page isn't
  ranking, indexed, or getting traffic, mentions SEO, Google visibility, impressions, clicks,
  sitemaps, robots.txt, canonicals, meta tags, structured data, rich results, or AI
  Overviews/AI-search visibility — even casually ("how's the SEO?", "why can't I find my site
  on Google?") — and when search traffic changes after a deploy. Not for developing the
  google-search-console-mcp server codebase itself.
---

# SEO diagnosis and fixing

Work like a diagnostician, not an auditor. Every real SEO question is a differential: establish
which class of problem you are looking at with the fewest discriminating tests, then go deep
only where the evidence points. Never run a fixed checklist across everything — it burns calls
and buries the finding.

Every claim about how the site is doing must trace to evidence: Search Console data via the
`mcp__gsc__*` tools (load them via ToolSearch in one call if deferred), the live site
(fetch the actual sitemap/robots.txt/page HTML), or the repo's source. No claims from vibes.

## The differential ladder

Ask in this order — each answer prunes the rest:

1. **Is the page indexed?** `inspect_url` is the source of truth. "URL is unknown to Google" /
   "Discovered – currently not crawled" / "Crawled – not indexed" / blocked (robots, noindex) /
   indexed are all different diseases with different fixes.
2. **Does it get impressions?** `query_search_analytics`. Impressions prove Google shows it for
   something; zero impressions on an indexed page means no ranking for any query with demand.
3. **Does it rank but not get clicked?** Position 11–20 is functionally invisible (CTR ≈ 0) —
   "we're on page 2" and "we don't show up" are the same complaint. Positions 4–10 with high
   impressions are the quick-win list: small ranking gains there convert to real clicks.
4. **Is there demand at all?** A site targeting zero queries people actually search is capped at
   brand traffic forever. That is a content-strategy finding, not a technical bug.

Before any on-page optimization work, check page-type fit: look at what actually ranks top-10
for the target query. If >60% of results are one page type (product page, comparison, tool,
guide...) and the user's page is a different type, the mismatch is the problem — no amount of
on-page polish fixes a blog post competing in a product-page SERP.

For a new or small site, the binding constraint is almost always authority: a handful of real
referring domains moves rankings more than any meta tweak. Say so plainly instead of inventing
technical work.

## Reading GSC data honestly

- Summed query/page rows understate totals — anonymized low-volume queries are omitted. For
  true totals run one aggregate call (`dimensions: []`). Never present summed rows as the total.
- Data lags ~2 days. Single-digit click differences are noise — never narrate a trend out of
  them; say "too little data to call" instead.
- Google confirmed impressions/CTR/position were misreported 2025-05-13 → 2026-04-27 (clicks
  unaffected, no backfill). Flag any comparison whose window crosses that boundary.
- Sitemap-listed ≠ crawled ≠ indexed. `list_sitemaps` reports what was submitted and fetched;
  only `inspect_url` tells you whether a given URL is actually in the index.
- No CrUX/field performance data for a URL means insufficient traffic, not a failing grade.

## Reality checks (verified 2026-09; your training may say otherwise)

- FAQ rich results are dead for all sites (May 2026), HowTo since Sept 2023, and the June 2025
  batch (VehicleListing, ClaimReview, EstimatedSalary, LearningVideo, Course-info carousel).
  Never recommend these for SERP benefit; their absence from results is not a markup bug.
- AI Overviews / AI Mode eligibility is exactly: indexed + eligible for a snippet. No special
  files, markup, chunking, or AI-specific rewrites exist. `llms.txt` is not consumed by Google
  Search (it only matters for developer-docs sites, where coding agents read it).
- Sitemap `priority`/`changefreq` are ignored. `lastmod` counts only if it reflects real
  content changes.
- The Indexing API is restricted to JobPosting/BroadcastEvent pages. For a normal
  un-indexed page: fix discoverability (internal links, sitemap), then tell the user to hit
  "Request indexing" in the Search Console UI — there is no API for it, so it is the one step
  they must do by hand.
- There is no crawl-rate control. Crawling is influenced only by sitemaps, internal linking,
  server health, and robots rules — and low-authority sites get very little of it, so
  "in the sitemap for weeks but never crawled" is normal, not broken.

## Repo trip-wires (check while inspecting the code)

- canonical, robots meta, title, meta description, and JSON-LD belong in the raw server HTML.
  Google may not render JS on non-200 pages, may skip rendering entirely when raw HTML says
  noindex, and treats a JS-modified canonical as a conflict it resolves unpredictably. On JS
  frameworks, confirm what the *server* returns (curl), not what the browser shows.
- Googlebot reads only the first 2MB of HTML — critical content and JSON-LD go early.
- Never lazy-load the hero/LCP image; give it `fetchpriority="high"`. A JS lazy-loader
  stripping native `loading="lazy"` (data-src patterns) is intentional, not a regression.
- Internal links must be real server-rendered `<a href>` — client-side-only navigation starves
  Google's discovery of exactly the pages the sitemap is begging it to crawl.
- robots.txt is not the only gate. CDN/edge bot management (e.g. Cloudflare) can 403 crawlers
  in ways the repo never shows — test from outside by curling the live site with bot
  user-agents (Googlebot, ClaudeBot, ChatGPT-User, PerplexityBot) and comparing status codes
  against a browser user-agent.

## Post-deploy traffic drop: triage order

Check in order of damage speed (all are days-scale killers except the last):
HTTP status regression → accidental noindex → canonical changed/removed → title/H1 removed →
structured data removed. Title/meta *text* changes are different: monitor CTR in GSC for ~2
weeks before judging; do not reflexively roll back.

When pages were removed or moved, check what they had earned before treating the removal as
free: query an earlier period filtered by page. A deleted URL that held rankings or
impressions should be 301-redirected to its nearest live equivalent before Google drops it
entirely — redirecting now is far faster than rebuilding equity later.

## The fix loop

1. Diagnose from GSC evidence (above).
2. Inspect the repo and live responses for the cause; fix with normal file tools.
3. `submit_sitemap` only when the sitemap's contents actually changed.
4. Set expectations: sitemap re-fetch can be near-immediate; indexing new URLs takes days to
   weeks on low-authority sites. Patience is part of the loop, not a failure of it.
5. Close with a verify-later plan: what number in GSC should move, by when, and the exact
   query to re-run. If the user has a todo.md, offer to log the follow-up check.

For generated/templated pages, apply the standalone-value test before shipping more of them:
"would this page be worth publishing if no similar page existed?" Below ~40% unique words
(template boilerplate included) is spam-policy risk territory.

## Going deeper

Load these only when the investigation actually enters their territory:

- `references/01-technical.md` — crawling/rendering limits, AI-crawler tokens and robots
  behavior, sitemap format rules and severity tiers, CWV thresholds and fix recipes,
  agent-friendly page mechanics.
- `references/02-content-onpage.md` — title/meta specifics, E-E-A-T signals, live vs retired
  schema types with dates, page-type/SERP classification rules, image optimization.
- `references/03-ai-search-apis-links.md` — AI citability tactics and studies, GSC/CrUX API
  quotas and gotchas, backlink quality judgment and free data sources, programmatic-content
  gates, drift-triage detail.

These were mined from a third-party repo (see `references/00-overview.md`); the core above is
primary-source verified, the chapters are leads — verify anything surprising before acting on it.

# Mined SEO knowledge — overview and usage notes

Source: [AgricIDaniel/claude-seo](https://github.com/AgricIDaniel/claude-seo) (MIT), mined 2026-09-04.
Purpose: raw material for the `seo` skill (Phase B of the SEO suite). The skill pairs with the
`google-search-console-mcp` server: server = evidence, skill = diagnostic knowledge + fixes.

## Chapters

- `01-technical.md` — crawling/rendering limits, JS-vs-raw-HTML precedence, canonicals, sitemaps,
  robots + AI crawlers, Core Web Vitals, agent-friendly pages, severity/audit method.
- `02-content-onpage.md` — titles/metas, keyword placement, content quality & E-E-A-T,
  schema types (live and retired, with dates), page-type/intent matching (SXO), images.
- `03-ai-search-apis-links.md` — AI Overviews/AI Mode citability, llms.txt evidence, GSC API facts
  (quotas, anonymized-queries trap, data incidents), Indexing API restrictions, CrUX, backlink
  judgment, programmatic/thin-content gates, post-deploy drift triage.

## How to use this material

These are CLAIMS from a third-party repo, not verified facts. Every bullet tagged `[VERIFY]`
(~60 of ~300) rests on a 2025–2026 Google/Chrome change or an SEO-industry study and MUST be
checked against a primary source (developers.google.com, Google Search Central blog, Chrome
release notes) before being encoded into the skill. Untagged bullets are stable, well-known SEO
ground truth and can be encoded after a sanity read.

Do not import the source repo's structure or tone: no scoring weights, no branded frameworks,
no orchestration. The skill should read as a diagnostic manual (symptom → causes → discriminating
test → fix), concise but complete.

## Known internal conflicts in the source

- Title/meta lengths disagree across files (title min 30 vs "never under 50"; meta 120–160 vs
  130–150). Truth: Google truncates by pixel width (~580px), so character counts are proxies.
  The skill should give one range with that caveat, not false precision.
- Keyword density: one file says 1–3%, the dedicated reference says "never optimize to a fixed
  density" — the reference is right; treat density only as a stuffing check.

## Highest-value diagnostics for OUR skill (shortlist)

1. **Page-type/intent mismatch** — a technically perfect page won't rank if >60% of the top-10
   is a different page type; classify the SERP before touching on-page. (02)
2. **Position 4–10 queries with high impressions are the quick-win targets** in GSC data. (03)
3. **Anonymized-queries trap** — summed query/page rows understate site totals; only a
   dimensionless aggregate query gives true totals. (03; also affects how our MCP tool is used)
4. **Sitemap-listed ≠ indexed** — GSC sitemap status reports submission, not indexation; URL
   Inspection is the truth (live-proven on clickt.link `/pricing`). (03)
5. **Raw-HTML vs JS precedence** — canonical/noindex/title/meta/JSON-LD must be server-rendered;
   Google may honor either version when they conflict, and won't render JS on non-200 pages. (01)
6. **Dead rich results are not bugs** — check the schema retirement list (FAQ May 2026, HowTo
   Sept 2023, June-2025 batch) before debugging markup. (02)
7. **AI visibility floor** — indexed + snippet-eligible is the only eligibility gate; llms.txt is
   a confirmed no-op for Google; freshness (<3 months) strongly correlates with AI citation. (03)
8. **Post-deploy drift triage** — traffic drop after a change: check noindex, canonical, H1/title
   removal, HTTP status regression first (days-scale impact); title/meta text changes are
   2-week-monitor items, not rollbacks. (03)
9. **Thin-content gates** — <40% unique words per page (template boilerplate included) is
   penalty-risk territory; the "would this page be worth publishing alone?" test. (01/03)
10. **Low-traffic-site honesty** — CrUX 404 = insufficient traffic (fall back to lab data);
    single-digit click deltas are noise; don't trend-read what is statistical dust. (03)

## Deliberately not mined

Local SEO/Google Business Profile, maps/geo-grid, e-commerce feeds, hreflang/i18n, image
generation, DataForSEO/paid-tool catalogs, the seo-flow prompt packs, persona/wireframe
templates. Revisit only if the suite's scope grows.

# Mined SEO domain knowledge (claude-seo skills)

## Crawling & rendering

- Googlebot fetches only the first 2MB of an HTML file and the first 64MB of a PDF (uncompressed; 15MB is the broader crawler-infrastructure default) — inline base64 images, oversized inline CSS/JS, or bloated nav can push critical content/JSON-LD past the cap and out of the index; keep key content + structured data within the first 2MB (seo-technical/SKILL.md) [VERIFY]
- Googlebot crawl rate auto-adjusts (backs off on 5xx/slow responses); there is no manual crawl-rate control — the legacy Search Console setting was removed Jan 2024; influence crawling only via sitemaps, server responsiveness, and robots controls (seo-technical/SKILL.md)
- Important pages should be within 3 clicks of the homepage; crawl-budget efficiency matters mainly for large sites (>10k pages) (seo-technical/SKILL.md)
- Redirects: no chains (max 1 hop), use 301 for permanent moves (seo-technical/SKILL.md)
- Google does NOT render JavaScript on pages returning non-200 HTTP status codes — content or meta tags injected via JS on error pages are invisible to Googlebot (Dec 2025 JS SEO doc update) (seo-technical/SKILL.md) [VERIFY]
- If a canonical tag in raw HTML differs from one injected by JavaScript, Google may use EITHER — fix by making canonicals identical between server-rendered HTML and JS-rendered output (Dec 2025 JS SEO doc update) (seo-technical/SKILL.md) [VERIFY]
- If raw HTML contains `<meta name="robots" content="noindex">` and JavaScript removes it, Google MAY still honor the noindex from the raw HTML — serve correct robots directives in the initial HTML response (Dec 2025 JS SEO doc update) (seo-technical/SKILL.md) [VERIFY]
- Structured data injected via JS may face delayed processing — include time-sensitive markup (especially e-commerce Product) in initial server-rendered HTML; general best practice: serve canonical, meta robots, structured data, title, and meta description server-side, never via JS injection (seo-technical/SKILL.md) [VERIFY]
- Google's crawling/robots reference docs moved to developers.google.com/crawling (migrated 2025-11-20); IP-range files relocated to /crawling/ipranges/ and googlebot.json was renamed common-crawlers.json (seo-technical/SKILL.md) [VERIFY]
- AMP has no separate ranking advantage; since 2026-07-01 Google Search sends users directly to publisher-hosted AMP URLs, so do not recommend AMP Cache, AMP Viewer, or signed-exchange maintenance — audit AMP pages against the same content/action-parity/quality requirements as any page (seo-technical/SKILL.md) [VERIFY]
- Reasonable polite-crawl defaults for auditing a site: max 500 pages, respect robots.txt, follow max 3 redirect hops, 30s timeout per page, 5 concurrent requests, 1s delay between requests; on 429 back off and reduce concurrency (seo-audit/SKILL.md)
- Diagnostic: page returns 401/403 → analysis impossible from crawl; ask for rendered HTML or a public URL. Empty/near-empty HTML body → content is client-side rendered; flag results as incomplete and use a browser-rendered snapshot (seo-page/SKILL.md)
- IndexNow is supported by Bing, Yandex, and Naver (not Google); recommend it for faster indexing on non-Google engines (seo-technical/SKILL.md)

## AI crawlers & robots.txt

- Known AI crawler tokens: GPTBot (OpenAI, model training), ChatGPT-User (OpenAI, real-time browsing), ClaudeBot (Anthropic, training), PerplexityBot (Perplexity, search index + training), Bytespider (ByteDance, training), Google-Extended (Google, Gemini training only — NOT search), CCBot (Common Crawl, open dataset) (seo-technical/SKILL.md)
- Blocking Google-Extended prevents Gemini training use but does NOT affect Google Search indexing or AI Overviews (those use Googlebot) (seo-technical/SKILL.md)
- Blocking GPTBot prevents OpenAI training but does NOT prevent ChatGPT from citing your content via live browsing (that is ChatGPT-User) (seo-technical/SKILL.md)
- Roughly 3–5% of websites now carry AI-specific robots.txt rules (seo-technical/SKILL.md) [VERIFY]
- User-triggered fetchers ignore robots.txt by design: Google documents Google-Agent (Project Mariner agentic browsing), Google-NotebookLM, and Google Messages as unblockable via robots.txt — use server-side access controls; by contrast Google-Extended and Google-CloudVertexBot obey robots.txt (seo-technical/SKILL.md) [VERIFY]
- Web Bot Auth (RFC 9421) lets bots authenticate cryptographically via a `Signature-Agent` header plus a key directory at agent.bot.goog (used by Google-Agent); reverse-DNS verification remains the fallback (seo-technical/SKILL.md) [VERIFY]

## Agent-friendly pages & agentic browsing

- AI agents read sites through three channels: screenshots + vision model (slow, token-expensive), raw HTML/DOM, and the accessibility tree — the accessibility tree is the cleanest signal and the single highest-leverage thing to optimize (seo-technical/references/agent-friendly-pages.md)
- Use real interactive elements: `<button>` for actions, `<a href>` for navigation, real `<input>`/`<select>`/`<textarea>` — a `<div onclick>` often appears in the accessibility tree with no role at all and agents skip it; if a real tag is impossible, add `role`, `tabindex="0"`, and Enter/Space key handlers (agent-friendly-pages.md)
- Every form input needs an associated `<label for>` (or aria-label/aria-labelledby) — without it the field is a void to accessibility-tree readers (agent-friendly-pages.md)
- Vision-analysis pipelines filter out interactive elements with less than ~8 square pixels of unobscured area; any clickable element below 24×24px is a candidate for agent invisibility (24×24 is also the WCAG AA tap-target minimum; 44×44 Apple HIG) (agent-friendly-pages.md) [VERIFY]
- Transparent overlays make vision models discard covered interactive nodes — common offenders: full-card click handlers overlaying child links, cookie-consent layers persisting past consent, modal portals with `pointer-events: auto` left on after dismiss, absolutely-positioned tracking pixels with `inset: 0` (agent-friendly-pages.md)
- Keep functionally identical actions (e.g. "Add to cart") in the same screen quadrant across templates — screenshot-based agents otherwise relearn each page; this is broader than CLS (page-to-page stability, not just within-page shift) (agent-friendly-pages.md)
- `cursor: pointer` is read by vision models as an actionability signal: never override it to `default` on truly interactive elements, and never apply it to non-interactive elements (agents will click things that do nothing) (agent-friendly-pages.md)
- DOM-parsing agents rely on semantic landmarks (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`), stable `id`s on layout containers, and purpose-describing `data-*` attributes; auto-generated class names (e.g. `__sc_a4b7d9e2`) as the only handle on a critical element are targetable but meaningless (agent-friendly-pages.md)
- Quick accessibility-tree smoke test: interactive element with `role="generic"` → broken semantics; input without an accessible name → missing label; `<div onclick>` with no role/tabindex → widget agents won't see (agent-friendly-pages.md)
- Lighthouse ships an Agentic Browsing category (id `agentic-browsing`): created in 13.2.0 (2026-05-01), on by default since 13.3.0 (2026-05-07), requires Chrome 150+; it reports a fractional pass-ratio (X of N), NOT a 0–100 weighted score — never compute a weighted agentic score from it (agent-friendly-pages.md) [VERIFY]
- The Agentic Browsing category has three buckets: agent-centric accessibility (names/labels, tree integrity, visibility), stability & discoverability (CLS + an llms.txt presence-at-domain-root check; 13.4.0 relaxed it to allow leading whitespace), and WebMCP integration (agent-friendly-pages.md) [VERIFY]
- Lighthouse 13.4.1 (July 2026) enabled the Agentic Browsing category through the PSI API (after 13.4.0 had disabled it) and requires Node.js 22.19+ for the CLI; run via `--only-categories=agentic-browsing` (agent-friendly-pages.md) [VERIFY]
- WebMCP (site declares structured tools/actions for agents) is a proposed standard, not W3C-finalized: flag-gated Early Preview opened in Chrome 146 Canary on 2026-02-10; Lighthouse 13.2+ ships three WebMCP audits — `webmcp-form-coverage` (flags `<form>` lacking toolname/tooldescription), `webmcp-registered-tools`, `webmcp-schema-validity` — which require Chrome 150+ and origin-trial registration; absence of WebMCP is an opportunity, never a defect (agent-friendly-pages.md) [VERIFY]

## Indexing & canonicals

- Canonical tags: self-referencing, and never combined/conflicting with noindex (seo-technical/SKILL.md)
- After fixing canonicalization, Google may retain the corrected pages in a duplicate cluster for up to two weeks while re-evaluating — an unchanged canonical immediately after a fix is NOT proof the fix failed (seo-technical/SKILL.md) [VERIFY]
- Mobile-first indexing is the default (rollout completed 2024) and Googlebot Smartphone is the primary crawler; a mobile version is not strictly required ("very strongly recommended") — non-mobile-friendly sites can still be indexed, the real risk is content/parity loss, not hard exclusion (cwv-thresholds.md)
- Highest-value mobile check is mobile/desktop content parity: equivalent primary content, matching robots meta tags, matching titles/descriptions, equivalent structured data, crawlable resources; avoid lazy-loading primary content that requires user interaction (seo-technical/SKILL.md)
- Index-bloat and duplicate checks: near-duplicates, parameter URLs, www vs non-www consistency (seo-technical/SKILL.md)

## Sitemaps

- Per-file limit: ≤50,000 URLs AND ≤50MB uncompressed, whichever is hit first; exceed either → Critical, fix by splitting with a sitemap index (seo-sitemap/SKILL.md)
- `<lastmod>` must be a valid W3C Datetime reflecting the last significant content change (main content, structured data, links — not copyright/boilerplate edits); Google only honors lastmod when consistently and verifiably accurate — warn when values are suspiciously uniform or newer than the page's real content (seo-sitemap/SKILL.md)
- `<priority>` and `<changefreq>` are ignored by Google — flag as Info, safe to remove (seo-sitemap/SKILL.md)
- Sitemap issue severity: >50k URLs or >50MB in one file = Critical; non-200 URLs = High; noindexed URLs included = High; redirected URLs included = Medium (update to final URLs); all-identical lastmod = Low; priority/changefreq present = Info (seo-sitemap/SKILL.md)
- Sitemap quality rules: only canonical URLs, no noindexed URLs, no redirects, HTTPS-only, split by content type (pages/posts/images/videos), referenced in robots.txt; compare crawl vs sitemap and flag missing pages (seo-sitemap/SKILL.md)
- Sitemap discovery decision rule: read every `Sitemap:` declaration in robots.txt AND probe common paths; trust only sitemaps that actually fetch and validate — report a declared-but-stale/broken robots.txt sitemap line as a separate finding, never as proof the sitemap works; report "no sitemap" only after both declared and common candidates fail (seo-sitemap/SKILL.md)
- Image sitemap extension: only `<image:image>` and `<image:loc>` remain valid, max 1,000 `<image:image>` per `<url>`; `<image:caption>`, `<image:geo_location>`, `<image:title>`, `<image:license>` were deprecated in 2022 — flag as info-level removable (seo-sitemap/SKILL.md)
- Video sitemap extension: `<video:video>` requires `<video:thumbnail_loc>`, `<video:title>`, `<video:description>`, plus `<video:content_loc>` or `<video:player_loc>` (mRSS also supported); `<video:category>`, `<video:gallery_loc>`, `<video:price>`, `<video:tvshow>`, and player autoplay/allow_embed attributes are deprecated/removed — info-level (recheck Google docs before citing a removal date) (seo-sitemap/SKILL.md)
- News sitemaps: max 1,000 `<news:news>` entries per file (the 1,000 cap overrides the generic 50k check when the news: namespace is present); include only articles from the last 2 days; required tags: `<news:publication>`, `<news:name>`, `<news:language>`, `<news:publication_date>`, `<news:title>` (seo-sitemap/SKILL.md)

## Core Web Vitals

- Thresholds (assessed at the 75th percentile of CrUX field data, page-level and origin-level): LCP good ≤2.5s / needs improvement 2.5–4.0s / poor >4.0s; INP good ≤200ms / 200–500ms / poor >500ms; CLS good ≤0.1 / 0.1–0.25 / poor >0.25 (cwv-thresholds.md)
- INP replaced FID as the interactivity metric on March 12, 2024; FID was removed from Chrome field-data tools (CrUX API, PSI) on September 9, 2024 — never reference FID (cwv-thresholds.md)
- CWV is a tiebreaker ranking signal — matters most when content quality is similar between competitors (cwv-thresholds.md)
- Thresholds are unchanged since their original definitions; there is no "Visual Stability Index", no "Core Web Vitals 2.0", no "Engagement Reliability" metric, and no LCP-lowered-to-2.0s change — these exist only in third-party SEO blogs; LCP/INP/CLS is the entire CWV set as of 2026 (cwv-thresholds.md)
- May 2026 CrUX dataset (~18.4M origins, published 2026-06-09): 55.9% of origins pass all three CWV, ~68.6% good LCP, ~87% good INP; Google reports origin-level pass rates (no desktop/mobile split); this moves monthly (cwv-thresholds.md) [VERIFY]
- LCP subparts (added to CrUX Feb 2025): Total LCP = TTFB (+target <800ms) + Resource Load Delay + Resource Load Time + Element Render Delay — use the breakdown to identify which phase drives a slow LCP (cwv-thresholds.md) [VERIFY]
- Field data (CrUX, PSI, Search Console CWV report) is what Google uses for ranking; lab data (Lighthouse, WebPageTest, DevTools) is for debugging only (cwv-thresholds.md)
- LCP bottlenecks → fixes: unoptimized hero images (compress, WebP/AVIF, preload); render-blocking CSS/JS (defer/async, inline critical CSS); TTFB >200ms (edge CDN, caching); third-party scripts (defer analytics/chat widgets); web-font delay (font-display: swap + preload) (cwv-thresholds.md)
- INP bottlenecks: long main-thread JS tasks (break into <50ms chunks); heavy event handlers (debounce, requestAnimationFrame); DOM size >1,500 elements is concerning; third-party main-thread hijacking; synchronous XHR/localStorage; layout thrashing / forced reflows (cwv-thresholds.md)
- CLS bottlenecks: images/iframes without width/height; content injected above existing content; web fonts shifting layout (font-display: swap + preload); ads/embeds without reserved space; late-loading content pushing the page down (cwv-thresholds.md)
- Optimization priority order: LCP (most impactful for perceived performance) → CLS (most common UX issue) → INP (matters most for interactive apps) (cwv-thresholds.md)
- Soft Navigations API (SPA CWV attribution) is experimental: final origin trial Chrome 147–149 (2026), targeting unflagged ship ~Chrome 151; no ranking impact yet — for SPA frameworks (React/Vue/Angular/Svelte) warn about the current CWV measurement blind spot (cwv-thresholds.md) [VERIFY]
- CrUX data unavailable is common for low-traffic sites — use Lighthouse lab data as a proxy and note the limitation, don't treat absence as failure (seo-technical/SKILL.md)

## Performance tooling

- Lighthouse 13.0 (Oct 2025) migrated performance audits to insight-based audits aligned with the DevTools Performance panel and removed legacy audits (first-meaningful-paint, font-size, third-party-facades); the performance score remains metric-based and was NOT re-weighted (cwv-thresholds.md) [VERIFY]
- The PWA category was removed in Lighthouse 12 — never parse a `pwa` category from Lighthouse/PSI JSON (cwv-thresholds.md)
- Mobile lab CPU throttling in PSI was increased on 2024-12-05, inflating mobile lab TBT since then — do not compare mobile lab TBT across that date boundary (field and desktop unaffected) (cwv-thresholds.md) [VERIFY]
- PSI / PSI API v5 run Lighthouse 13.x (updated 2025-10-20) (cwv-thresholds.md) [VERIFY]
- The CrUX Dashboard (Looker Studio) was shut down at end of November 2025 (October 2025 final dataset; CrUX Connector no longer updated) — use CrUX Vis (cruxvis.withgoogle.com) or the CrUX API directly (cwv-thresholds.md) [VERIFY]

## Google Search Console

- Hourly data in the Search Analytics API (HOUR dimension / HOURLY_ALL) shipped April 2025 (cwv-thresholds.md) [VERIFY]
- Branded vs. non-branded query filter launched Nov 2025 and expanded to all eligible sites ~Mar 2026; classification is AI-based with no manual regex control (cwv-thresholds.md) [VERIFY]
- The standalone Page Experience report was removed from Search Console — monitor via the Core Web Vitals report and HTTPS report only (cwv-thresholds.md) [VERIFY]
- AI-powered natural-language configuration tool announced Dec 2025, rolled out globally Feb 2026 (cwv-thresholds.md) [VERIFY]

## Structured data & schema

- JSON-LD is the preferred format (over Microdata and RDFa) (seo-technical/SKILL.md)
- Never recommend HowTo schema — rich result deprecated Sept 2023 (seo/SKILL.md)
- FAQ rich results were retired for ALL sites on May 7, 2026 (supersedes the Aug 2023 restriction to gov/health sites; no SERP feature remains): flag existing FAQPage markup at Info severity (not Critical), do not recommend removing it, do not recommend NEW FAQPage for Google SERP benefit, do not claim a confirmed AI/LLM citation benefit; use QAPage for genuine user Q&A instead (seo/SKILL.md) [VERIFY]

## On-page elements

- Title tag: 50–60 characters ideal (30 minimum; Google truncates around 60); primary keyword near the beginning; brand name at the end if included; unique per page; no keyword-stuffed repetition (quality-gates.md)
- Meta description: 120–160 characters (Google truncates ~155–160); include a CTA and the primary keyword naturally; unique per page (quality-gates.md)
- Exactly one H1 matching page intent; H2–H6 in logical hierarchy with no skipped levels (seo-page/SKILL.md)
- Keyword density: natural at 1–3% with semantic variations present (seo-page/SKILL.md)
- URLs: descriptive, hyphenated, no query parameters for content pages, flag >100 characters, consistent trailing slashes, logical folder hierarchy (seo-technical/SKILL.md)
- Image alt text: required on all non-decorative images, 10–125 characters, describe the image content (never a filename or "click here"); decorative images get `alt=""` or `role="presentation"` (quality-gates.md)
- Image file size: flag >200KB as warning, >500KB as critical; recommend WebP/AVIF over JPEG/PNG; always set width/height to prevent CLS (seo-page/SKILL.md)
- Lazy-loading false-positive rule: do NOT flag images as "not lazy-loaded" when a JS lazy-loader (Perfmatters, EWWW, lazysizes) is detected — these intentionally strip the native `loading="lazy"` attribute and use `data-src` placeholders (seo-page/SKILL.md)
- Internal link targets by page type: blog post (1,500+ words) 5–10; service page 3–5; product page 2–4; category page links to all child pages; no orphan pages (every page linked from at least one other); descriptive, varied anchor text — not always exact-match, never "click here" (quality-gates.md)
- Social meta: Open Graph (og:title, og:description, og:image, og:url) and Twitter Card (twitter:card, twitter:title, twitter:description) should be present (seo-page/SKILL.md)
- Content freshness cadence: news within hours/days; evergreen blog posts reviewed annually; product pages when specs change; service pages quarterly; visible publication date on articles plus last-updated date when significantly revised (quality-gates.md)

## Content quality & thin-content gates

- Minimum word counts by page type (with required uniqueness): Homepage 500 (100% unique); Service/Feature 800 (100%); Location primary 600 (60%+); Location secondary 500 (40%+); Blog post 1,500 (100%); Product 400 (80%+); Category 400 (100% unique intro, not just listings); About 400; Landing 600; FAQ page 800 (quality-gates.md)
- Location-page scale gates: WARNING at 30+ location pages — enforce 60%+ unique content each, requiring unique local info (landmarks/neighborhoods), location-specific offerings, local team info, and genuine local testimonials; HARD STOP at 50+ pages — require explicit justification of legitimate presence per location, a unique content strategy, and local signals (GBP, local reviews) (quality-gates.md)
- Doorway-page red flags (Google's doorway algorithm penalizes these): only the city/state name changes between pages, no unique local information, no local business signals, keyword-stuffed URLs (quality-gates.md)
- Programmatic pages safe at scale: integration pages (real setup docs), template/tool pages (downloadable assets), glossary pages with 200+ word unique definitions, product pages with unique specs/reviews, user-profile pages (UGC). Penalty risk at scale: city-swapped location pages, thin "Best [tool] for [industry]" pages, "[Competitor] alternative" pages without genuine comparison data, mass AI-generated content without human review/unique value (quality-gates.md)

## Mobile & page experience

- Mobile minimums: viewport meta + responsive CSS, touch targets ≥48×48px with 8px spacing, base font ≥16px, no horizontal scroll (seo-technical/SKILL.md)
- Intrusive interstitials: flag full-page interstitials, standalone consent-redirect pages, persistent blocking dialogs, and excessive/distracting ad density; acceptable: small banners and standard CMS/legal dialogs (seo-technical/SKILL.md)
- Keep key content immediately visible on load — content hidden behind tabs/accordions/"read more" expanders is less likely to qualify for deep links; don't hijack scroll on load; preserve URL hash fragments (seo-technical/SKILL.md)
- Page experience is guidance, not a single ranking system: only Core Web Vitals feeds ranking directly; HTTPS is a confirmed but lightweight signal (affects <~1% of queries); relevance can outrank sub-par page experience — don't over-weight security headers in prioritization (seo-technical/SKILL.md)

## Security

- Baseline: HTTPS enforced with valid certificate and no mixed content; check headers Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy; check HSTS preload-list inclusion for high-security sites; missing HTTPS (no redirect, mixed content, or bad cert) is Critical (seo-technical/SKILL.md)
- Back-button hijacking (defeating the Back button via history.pushState/replaceState, including scripts injected by third-party ad platforms) was added to Google's spam policies 2026-04-13 with enforcement (manual actions + automated demotions) live since 2026-06-15 — classify as Critical (seo-technical/SKILL.md) [VERIFY]

## Severity & audit method

- Priority definitions: Critical = blocks indexing or causes penalties (fix immediately); High = significantly impacts rankings (fix within 1 week); Medium = optimization opportunity (fix within 1 month); Low = nice-to-have backlog (seo/SKILL.md)
- Noindex audit rule: classify each noindex as intentional vs accidental rather than flagging all of them (seo-technical/SKILL.md)
- robots.txt missing is not fatal — note it, recommend creating one, and continue the audit on remaining categories (seo-technical/SKILL.md)
- CWV in a page-level HTML audit is inference only: flag potential LCP issues (huge hero images, render-blocking resources), potential INP issues (heavy JS, no async/defer), potential CLS issues (missing image dimensions, injected content) — actual measurement needs field/lab tooling (seo-page/SKILL.md)

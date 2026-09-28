# Mined SEO Domain Knowledge (claude-seo skills)

## Titles & meta descriptions

- Title tag: 50-60 characters — never under 50, never over 60; put the primary keyword first (near the front, not buried) and the brand name last, separated by a pipe or dash matching the site's existing pattern (seo-content-brief/SKILL.md)
- Title tags should lead with outcomes, numbers, or specifics when possible (seo-content-brief/SKILL.md)
- Meta description: 130-150 characters — never under 130, never over 150; active voice; expand on the title with USPs/specifics; end with a call to action; omit the brand name (it's already in the title) (seo-content-brief/SKILL.md)
- Never put quotation marks in a meta description — Google truncates the description at the quote character (seo-content-brief/SKILL.md)

## Keyword placement & density

- The primary keyword MUST appear in all six of: title tag (near front), H1 (near front), URL slug (lowercase, hyphenated), meta description, first paragraph / first 100 words, and at least one image alt text (seo-content-brief/keyword-density.md)
- The primary keyword does NOT need to appear in every H2/H3 (one H1 mention plus 1-2 H2 mentions is sufficient — subheadings inherit context semantically), in every paragraph, or in the anchor text of every internal link (vary anchors) (seo-content-brief/keyword-density.md)
- Do not optimize to a fixed keyword density — treat density checks only as an internal readability/stuffing heuristic, not a Google percentage rule; the first 1-2 mentions establish topic context and returns diminish after that (seo-content-brief/keyword-density.md)
- One skill states a natural-density band of 1-3% for the primary keyword as a rough sanity check (the more detailed reference overrides this with "no fixed density") (seo-content/SKILL.md)
- Secondary keywords: 5-8 closely related supporting terms distributed through body text and H2-H6 headings, plus 10-15 broader semantic terms covering related concepts/intent variations (seo-content-brief/keyword-density.md)
- Synonyms do not count toward primary-keyword density — "web design", "website design", and "site design" are different strings; only exact-match appearances count (seo-content-brief/keyword-density.md)
- Spread primary-keyword mentions evenly through the content; do not front-load them into the introduction or cluster them in one section (seo-content-brief/keyword-density.md)
- The opening paragraph (first 100 words) is the highest-value keyword placement after the title and H1 (seo-content-brief/keyword-density.md)

## Content length, structure & internal linking

- Word-count floors by page type (topical-coverage minimums, not targets): homepage 500, service page 800, blog post 1,500, product page 300+ (400+ for complex products), location page 500-600 (seo-content/SKILL.md)
- Word count is NOT a direct Google ranking factor — a 500-word page that thoroughly answers the query outranks a 2,000-word page that doesn't; treat floors as coverage-depth guidelines only (seo-content/SKILL.md)
- Readability targets: Flesch Reading Ease 60-70 for a general audience, average sentence length 15-20 words, paragraphs 2-4 sentences — but Flesch is NOT a Google ranking factor (John Mueller confirmed; Yoast deprioritized Flesch scores in v19.3), so use it as a quality indicator, not an SEO metric (seo-content/SKILL.md)
- Internal linking: 3-5 relevant internal links per 1,000 words, with descriptive (varied) anchor text and no orphan pages (seo-content/SKILL.md)
- In a content brief, suggest 3-5 specific internal-link opportunities with anchor text, and specify whether the page is a hub (links out to cluster pages) or a spoke (links up to the pillar) (seo-content-brief/SKILL.md)
- Featured-snippet target answers: answer-first paragraphs of 40-60 words (blog direct answers and each FAQ answer) (seo-content-brief/page-type-templates.md)
- FAQ sections: service/category pages 5-8 questions at 40-60 words each; a dedicated FAQ page carries 8-15 questions grouped by subtopic; landing pages answer 4-6 objections; homepages carry 4-6 broad business questions (seo-content-brief/page-type-templates.md)
- Hub/category pages MUST include every relevant sub-page that exists in the sitemap as its own section with an internal link — do not invent categories that don't exist or omit ones that do (seo-content-brief/SKILL.md)
- Relevance rule for briefs: every suggested heading/keyword/FAQ must be something the site can credibly deliver based on its actual services — do not copy competitor sections covering things the site does not offer (seo-content-brief/SKILL.md)
- When improving an existing page, distinguish keep/strengthen vs add-new sections; do not recommend a full rewrite when targeted improvements will win (seo-content-brief/SKILL.md)
- When analyzing SERP competitors, filter out non-competitors first: Wikipedia, Reddit, Pinterest, Amazon, YouTube, government sites, SEO tool pages, job boards, directories, news aggregators, social platforms (seo-content-brief/SKILL.md)
- Gap priority formula for content gaps: Impact x Competitive Advantage / Effort; classify gaps as topic gaps (subtopic missing entirely), depth gaps (covered but shallow), or quality gaps (outdated, no expert perspective, poor formatting) (seo-content-brief/SKILL.md)
- Every brief must name specific information gain no current ranking page provides (proprietary data, case studies with real outcomes, expert quotes, original synthesis) — "more detail" or "better formatting" does not qualify (seo-content-brief/SKILL.md)
- Content freshness: show a publication date, show a last-updated date when revised, and flag content older than 12 months without update for fast-changing topics (seo-content/SKILL.md)

## Content quality & E-E-A-T

- Google's Who/How/Why test (from the helpful-content guide): Who created it (visible byline, bio, credentials — non-negotiable for YMYL); How was it created (process disclosure, especially for AI-assisted content; original research/first-hand evidence); Why does it exist (to help people, not to attract clicks — watch for niche entry without expertise, churn for freshness, writing to a word-count target). When all three answers are weak the page is at risk under core helpfulness signals (seo-content/SKILL.md)
- The Helpful Content System was merged into Google's core ranking algorithm in the March 2024 core update — no standalone classifier; helpfulness signals are weighted within every core update (seo-content/SKILL.md)
- Google documents continuous, smaller unannounced core updates between major ones (changelog 2025-12-09), so content improvements can lift rankings without waiting for the next named update [VERIFY] (seo/eeat-framework.md)
- Trust is the most important E-E-A-T member (Google's own wording); Experience, Expertise, and Authoritativeness exist to support the assessment of Trust. E-E-A-T is a Quality Rater Guidelines concept, not a direct ranking score. Google publishes no numeric E-E-A-T weights — never use an equal 25/25/25/25 split since it contradicts "trust is most important" (seo/eeat-framework.md)
- YMYL topics (highest E-E-A-T bar): health/safety, financial advice, legal information, news/current events, groups of people; the Sept 2025 QRG added elections/civic trust and democratic processes [VERIFY] (seo/eeat-framework.md)
- Experience signals that AI cannot fabricate are the key differentiator against scaled/AI content: first-person narrative, original (non-stock) photos and screenshots, verifiable specific examples, documentation of actual work done (seo/eeat-framework.md)
- Trust signals to check: contact info (address/phone/email), privacy policy + ToS, HTTPS, transparency about who creates content and why, reviews/testimonials, visible corrections/update history, no hidden ads or clickbait, visible return/refund policy for e-commerce (seo/eeat-framework.md)
- Per the Sept 2025 QRG, raters assess AI content by pattern, not authorship: AI content is acceptable if it demonstrates genuine E-E-A-T, unique value, and human oversight; low-quality markers are generic phrasing, no original insight, repetitive structure across pages, no author attribution, and factual inaccuracies [VERIFY] (seo-content/SKILL.md)
- E-E-A-T requirements to specify in briefs: author credentials/bio relevant to the topic, expert quotes or citations from authoritative sources, cited studies/data with dates, visible last-updated date — especially critical for YMYL (seo-content-brief/SKILL.md)
- Do not claim Google framed any 2025/2026 core update as "extending E-E-A-T to all competitive queries" or published per-industry traffic-drop percentages — those are third-party SEO-blog interpretations, not Google statements (seo/eeat-framework.md)

## Spam policies & algorithm updates

- Google spam policies (updated 2026-05-15) cover: expired domain abuse (buying expired domains for backlinks), site reputation abuse (parasite SEO — low-quality content hosted on a reputable site), and scaled content abuse — which now explicitly names "using generative AI tools to generate many pages without adding value" and automated transformations like synonymizing/translation [VERIFY] (seo/eeat-framework.md)
- Back-button hijacking (manipulating browser history via history.pushState/replaceState, including through third-party ad/library scripts, so users can't go back) is a named malicious practice: announced 2026-04-13, enforcement (manual actions + automated demotions) live since 2026-06-15 [VERIFY] (seo/eeat-framework.md)
- RSL 1.0 (Really Simple Licensing, December 2025): machine-readable content-licensing standard for AI training that augments robots.txt with AI-specific permissions; backed by Reddit, Yahoo, Medium, Quora, Cloudflare, Akamai, Creative Commons [VERIFY] (seo/eeat-framework.md)

## AI search visibility (GEO)

- Google's official "optimizing for generative AI features" guide (2026-06-29) states you do NOT need new AI files, special markup, Markdown versions, content chunking, or AI-specific rewrites — AEO/GEO is rebranded SEO grounded in the same core ranking/quality systems [VERIFY] (seo-content/SKILL.md)
- Google's last official model naming for AI Mode / AI Overviews is a custom version of Gemini 2.5; treat third-party AI Mode usage/citation figures as methodology-dependent unless primary-sourced [VERIFY] (seo-content/SKILL.md)
- AI-citation readiness signals: clear quotable statements with statistics, answer-first formatting, strong H1→H2→H3 hierarchy, tables/lists for comparative data, clear attribution, first-party data/original research (highly cited by AI systems), entity clarity via Organization/Person schema, and topical clusters rather than isolated pages (seo-content/SKILL.md)
- Track AI citation as a standalone KPI across Google AI Overviews, AI Mode, ChatGPT, Perplexity, and Bing Copilot — not just traditional rankings (seo-content/SKILL.md)
- No third-party tool guarantees rankings or has access to Google's internal ranking data (Google docs 2026-06-05); audit scores are heuristics, and Search Console is the first-party validation source [VERIFY] (seo-content/SKILL.md)

## Structured data — format & validation

- Always use JSON-LD (`<script type="application/ld+json">`) — Google's documentation explicitly recommends it over Microdata and RDFa (seo/schema-types.md)
- Per Google's December 2025 JS SEO guidance, structured data injected via JavaScript may face delayed processing — for time-sensitive markup (especially Product/Offer), put JSON-LD in the initial server-rendered HTML [VERIFY] (seo-schema/SKILL.md)
- Validation checklist for any schema block: @context is "https://schema.org" (https, not http); @type is valid and non-deprecated; all required properties present; property values match expected data types; no placeholder text; URLs absolute (not relative); dates in ISO 8601; image URLs valid (seo/schema-types.md)
- For Review markup, reject fake reviews and undisclosed incentivized reviews — an incentive must be clearly and prominently disclosed on the page (seo-schema/SKILL.md)
- WebSite `potentialAction` (SearchAction) is machine-readable only — there is no Google sitelinks-search-box benefit anymore (seo/schema-types.md)
- Do not claim any confirmed schema-markup uplift for AI-generated answers without a cited primary source (seo/schema-types.md)
- Testing tools: Google Rich Results Test (search.google.com/test/rich-results) and the Schema.org validator (validator.schema.org) — but only for types Google still supports (seo/schema-types.md)

## Structured data — which type for which page

- Service page: Service + LocalBusiness (if location-specific). Blog post: Article/BlogPosting. Case study: Article (subject + outcome in description). Category page: Service + BreadcrumbList. Landing page: WebPage. FAQ page: WebPage (not FAQPage). Location page: Service + LocalBusiness with address, phone, geo coordinates. About page: Organization + Person per team member. Homepage: Organization + WebSite + Service (seo-content-brief/page-type-templates.md)
- Active types safe to recommend: Organization, LocalBusiness, SoftwareApplication, WebApplication, Product, ProductGroup, Offer, Service, Article, BlogPosting, NewsArticle, Review, AggregateRating, BreadcrumbList, WebSite, WebPage, Person, ProfilePage, ContactPage, VideoObject, ImageObject, Event, JobPosting, Course, DiscussionForumPosting, QAPage, plus BroadcastEvent, Clip, SeekToAction, SoftwareSourceCode (seo-schema/SKILL.md)
- QAPage is fully supported (expanded comment-thread properties added 2026-03-24) but is only for genuine user Q&A: one question with community-submitted answers — use it instead of FAQPage for that case only [VERIFY] (seo/schema-types.md)
- ProfilePage (mainEntity: Person) is the current type for author/creator profile pages and supports E-E-A-T entity clarity (seo/schema-types.md)
- Education Q&A rich result is active: Quiz with Question and `eduQuestionType=Flashcard`; carousel expanded to PT/ES/VI in 2026 [VERIFY] (seo/schema-types.md)

## Structured data — retired/deprecated types (dates & replacements)

- HowTo: rich results removed September 2023 (desktop and mobile); vocabulary remains but produces no Google rich-result effect; never recommend it for SERP benefit — if the goal is comprehension, use article structure with clear H2 step headings instead (seo-schema/deprecated-types-2024-2026.md)
- FAQPage: rich results restricted to gov/health sites August 2023, then FULLY retired for all sites on May 7, 2026; FAQ docs carried a notice 2026-05-08 and were removed 2026-06-15. Flag existing FAQPage at Info priority (not Critical), do not recommend removal solely because rich results retired, and do not recommend adding new FAQPage for SERP benefit; any AI-citation benefit is unconfirmed [VERIFY] (seo/schema-types.md)
- Retired June 12, 2025 (Google "Simplifying our Search rich results"): VehicleListing (use Product with vehicle properties), ClaimReview (no replacement — fact-check rich result dead; Google ignores the markup), EstimatedSalary (use JobPosting with baseSalary for specific roles), LearningVideo (use plain VideoObject), Course Info carousel (the single-result Course rich card is still live — check which variant the user means) [VERIFY] (seo-schema/deprecated-types-2024-2026.md)
- SpecialAnnouncement (COVID-era card): deprecated July 31, 2025, no replacement — use Event if time-bounded, otherwise Article or WebPage [VERIFY] (seo-schema/deprecated-types-2024-2026.md)
- Practice Problem: deprecation notice 2025-11-05; Rich Results Test, Search Console rich-result reporting, and appearance-filter support removed starting January 2026 [VERIFY] (seo-schema/SKILL.md)
- Book Actions: deprecated (banner added 2025-06-12); do not recommend for SERP features [VERIFY] (seo/schema-types.md)
- Tooling removal: docs for CourseInfo, EstimatedSalary, LearningVideo, SpecialAnnouncement, and VehicleListing were removed 2025-09-09, and their Rich Results Test / Search Console reporting / appearance-filter support removed starting January 2026 — audits must stop telling users to validate these there [VERIFY] (seo/schema-types.md)
- Dataset is NOT discontinued: it produces no Google Search rich result (clarified 2025-11-05) but is still consumed by Google Dataset Search — do not advise removal as if it were killed [VERIFY] (seo/schema-types.md)
- Deprecated-type audit rule: flag the deprecated type with its retirement date, then recommend the current replacement type, or advise removal only when no replacement exists (seo-schema/SKILL.md)

## Structured data — e-commerce specifics

- Product Certification markup (energy ratings, safety certifications) added April 2025, replacing EnergyConsumptionDetails [VERIFY] (seo/schema-types.md)
- `returnPolicyCountry` in MerchantReturnPolicy is REQUIRED since March 2025 [VERIFY] (seo/schema-types.md)
- `hasAdultConsideration` (added 2026-05-20) is required for adult-oriented products; Google Search supports only the value `https://schema.org/SexualContentConsideration` [VERIFY] (seo/schema-types.md)
- `Product.category` (2026-07-07) accepts Text, CategoryCode, or arrays mixing both; use Google's taxonomy URL and `codeValue` for Google Product Categories [VERIFY] (seo/schema-types.md)
- Offer sale duration (2026-07-07): express sales with `validFrom` plus `validThrough` or `priceValidUntil`, in ISO 8601 [VERIFY] (seo/schema-types.md)
- Organization-level shipping/return policies became configurable via Search Console without Merchant Center in November 2025 [VERIFY] (seo/schema-types.md)
- LoyaltyProgram structured data (member pricing, loyalty cards) added June 2025; ConferenceEvent and PerformingArtsEvent added December 2025 (Schema.org v29.4) [VERIFY] (seo/schema-types.md)
- Content API for Shopping sunsets August 18, 2026 — migrate to the Merchant API [VERIFY] (seo/schema-types.md)

## Intent & page-type matching (SXO diagnostics)

- Core diagnostic: a page can score 95/100 on technical SEO and still fail to rank because it is the wrong PAGE TYPE for the keyword — if Google shows 8 product pages and 2 comparison pages, a blog post will not break through regardless of optimization. Test: classify each top-10 organic result by page type and compare against your page (seo-sxo/SKILL.md)
- SERP consensus thresholds: >60% of top results the same page type = strong consensus (match it), 40-60% = mixed, <40% = fragmented (differentiation opportunity) (seo-sxo/SKILL.md)
- Mismatch severity rules: blog post vs SERP of product pages = CRITICAL (create a dedicated product page); blog post vs comparison SERP = HIGH (restructure with comparison matrix); product page vs informational SERP = HIGH (add educational layer); landing page vs tool/calculator SERP = HIGH (build the interactive tool); service page vs local-results SERP = MEDIUM (add location signals + local schema); type match = focus on content depth and UX instead (seo-sxo/SKILL.md)
- Additional critical mismatches: landing page targeting a how-to keyword; blog post targeting "[service] in [city]"; blog post about a topic where users want a tool (seo-sxo/page-type-taxonomy.md)
- Reading SERP signals for intent: PAA questions reveal knowledge gaps/concerns; ad copy themes reveal commercial triggers; related searches reveal the before/after search journey; featured-snippet format reveals the expected answer structure; an AI Overview reveals what Google considers the definitive answer (seo-sxo/SKILL.md)
- Intent classes: informational (learn — guides/how-tos), commercial (research before buying — comparisons, "best X"), transactional (buy/book/sign up), navigational (find a specific site); also identify which SERP format Google rewards (long-form guide, listicle, comparison table, landing page, FAQ, video, local pack) (seo-content-brief/SKILL.md)
- Keep technical-health and SERP-alignment assessments separate: a page can be technically perfect but strategically misaligned; report both (seo-sxo/SKILL.md)
- When auditing SERP schema expectations, count only currently supported SERP features — exclude FAQ and HowTo from schema-expectation analysis (seo-sxo/SKILL.md)

## Page-type classification rules

- Classify a page into exactly one of 8 types by priority when signals overlap: 1) functional interactive tool present → Tool; 2) physical address + map → Local; 3) comparison table + "vs" framing → Comparison; 4) price + buy button → Product; 5) CTA-heavy + minimal navigation → Landing Page; 6) service process + case studies → Service Page; 7) educational + CTA mix → Hybrid; 8) default → Blog Post (seo-sxo/page-type-taxonomy.md)
- Blog-post SERP indicators: featured snippets, 4+ PAA questions, diverse domains, dates visible in snippets, low ad density. Product SERP indicators: shopping carousel, price/availability/rating rich snippets, "buy"/"shop" in titles. Local SERP indicators: local pack, "near me" related searches, GBP cards, local directories. Tool SERP indicators: "calculator/generator/checker" related searches, minimal PAA (users want to DO, not read) (seo-sxo/page-type-taxonomy.md)
- Blog posts are recognized by: author byline, publish date, body >800 words, breadcrumb with /blog/, related posts; required elements are Article/BlogPosting schema, author entity, datePublished, dateModified, and at least one image with descriptive alt text (seo-sxo/page-type-taxonomy.md)
- Comparison pages require a comparison table with clear criteria, pros/cons for each option, and a clear recommendation or "best for" segmentation (seo-sxo/page-type-taxonomy.md)
- Local pages require LocalBusiness schema (correct subtype), full consistent NAP, geo coordinates, openingHoursSpecification, and an embedded map (seo-sxo/page-type-taxonomy.md)
- Tool pages must have the functional tool above the fold with no login wall for basic functionality, and WebApplication or SoftwareApplication schema (seo-sxo/page-type-taxonomy.md)

## Images — alt text, filenames & ranking factors

- Alt text: present on all `<img>` except decorative images (`role="presentation"`); 10-125 characters; describes the content (e.g. "Professional plumber repairing kitchen sink faucet"), includes keywords only where natural — never a filename, "click here", or stuffed keywords (seo-images/SKILL.md)
- Filenames: descriptive, hyphenated, lowercase, no special characters, relevant keywords — `blue-running-shoes.webp`, not `IMG_1234.jpg` (seo-images/SKILL.md)
- Google Images impact ranking: alt text = CRITICAL, filename = HIGH, surrounding page context = HIGH, file size/speed = MEDIUM (indirect via Core Web Vitals), IPTC Creator/Copyright = LOW (display only), EXIF camera data = none, IPTC Keywords = none (Google ignores them) (seo-images/SKILL.md)
- Image discovery now includes visual search fan-out across Lens / AI Mode / Circle to Search (multimodal scene/object understanding), so images surface via scene and objects, not alt text alone; no new published image-SEO lever yet — keep descriptive alt text + clean structured data [VERIFY] (seo-images/SKILL.md)

## Images — formats & file sizes

- File-size thresholds by category: thumbnails target <50KB (warn >100KB, critical >200KB); content images target <100KB (warn >200KB, critical >500KB); hero/banner images target <200KB (warn >300KB, critical >700KB) (seo-images/SKILL.md)
- Format guidance: WebP is the default recommendation (~95-97% browser support), AVIF for best compression (~92-94% support), JPEG as universal photo fallback, PNG for transparency, SVG for icons/logos/illustrations (seo-images/SKILL.md)
- Recommended `<picture>` pattern: AVIF source first, then WebP source, then `<img src=".jpg">` fallback carrying alt, width, height, loading, decoding — the browser uses the first supported format (seo-images/SKILL.md)
- JPEG XL: third-party reports place a Rust decoder in Chrome 145 stable (2026-02-10) behind a flag, not default-enabled and with no Google-owned confirmation — not practical for production delivery yet; keep AVIF/WebP + JPEG fallback [VERIFY] (seo-images/SKILL.md)
- Conversion recipes: `cwebp -q 82 -metadata all in.jpg -o out.webp` (quality 82 is the working default); AVIF via `ffmpeg -c:v libaom-av1 -crf 30 -still-picture 1`; responsive variants generated at 400w/800w/1200w (seo-images/SKILL.md)
- Responsive images: `srcset` with multiple widths (e.g. 400w/800w/1200w) plus a `sizes` attribute matching actual layout breakpoints (seo-images/SKILL.md)

## Images — loading, LCP & CLS

- `loading="lazy"` only on below-fold images; lazy-loading the above-fold/hero (LCP) image directly harms LCP — instead give the LCP image `fetchpriority="high"` (seo-images/SKILL.md)
- Add `decoding="async"` to non-LCP images so decoding doesn't block the main thread (seo-images/SKILL.md)
- CLS prevention: every `<img>` needs explicit `width` and `height` attributes (or CSS `aspect-ratio`); flag any image without dimensions (seo-images/SKILL.md)
- Audit caveat: if a site uses a JS lazy-loader (signals: `data-src`/`data-lazy-src`/`data-original`/`data-srcset` attributes or `lazyload`/`lazy` classes; WordPress plugin variants use `data-perfmatters-src` or `data-ewww-src`), the absence of native `loading="lazy"` is intentional, not a regression (seo-images/SKILL.md)

## Images — embedded metadata (IPTC/XMP)

- Google Images displays IPTC Creator, Credit Line, and Copyright in search results — a display/attribution benefit only, NOT a ranking factor (seo-images/SKILL.md)
- Google Merchant Center requires IPTC `DigitalSourceType: TrainedAlgorithmicMedia` metadata on AI-generated product images; feeds missing the label can be disapproved — an operational policy requirement, not a ranking factor (policy: support.google.com/merchants/answer/14743464) [VERIFY] (seo-images/SKILL.md)
- IPTC DigitalSourceType values Google extracts: `trainedAlgorithmicMedia` (fully AI-generated, e.g. diffusion output), `compositeSynthetic` (captured + AI mix), `algorithmicMedia` (pure algorithm, not from trained data), `compositeWithTrainedAlgorithmicMedia` (AI inpainting/outpainting over real media); `digitalCapture` is valid IPTC but not on Google's extracted list (seo-images/SKILL.md)
- Merchant Center also requires AI-generated product titles/descriptions to be separately specified and labeled in the feed (feed layer, not page layer) [VERIFY] (seo-images/SKILL.md)
- Licensable-images badge: supply EITHER ImageObject structured data with `license` + `acquireLicensePage` OR embedded IPTC metadata (Licensor URL / Web Statement of Rights) (seo-images/SKILL.md)
- WebP supports EXIF and XMP but not IPTC natively — write XMP fields instead of IPTC for WebP files (exiftool converts automatically) (seo-images/SKILL.md)

## Diagnostic mappings

- Well-optimized page not ranking → likely page-type/intent mismatch → test: classify top-10 SERP results with the 8-type taxonomy; if the dominant SERP type (>60%) differs from your page type, the mismatch (not on-page optimization) is the cause (seo-sxo/SKILL.md)
- Fewer than 100 words retrievable from a page → possible JavaScript rendering or gating → flag as potentially JS-rendered/gated and get the full text directly rather than guessing; 402/403/login wall → analyze only visible meta/headers and note the limitation (seo-content/SKILL.md)
- Meta description truncated oddly in SERP → check for quote characters (Google truncates at quotes) (seo-content-brief/SKILL.md)
- Time-sensitive rich results (price/availability) not appearing or stale → check whether JSON-LD is injected client-side via JavaScript (delayed processing) → move it into server-rendered HTML [VERIFY] (seo-schema/SKILL.md)
- Structured data present but no rich result → check the type against the retirement list (HowTo since Sept 2023; FAQPage since May 2026; VehicleListing/ClaimReview/EstimatedSalary/LearningVideo/CourseInfo carousel since June 2025; SpecialAnnouncement since July 2025; Practice Problem since Jan 2026) before debugging markup validity [VERIFY] (seo-schema/deprecated-types-2024-2026.md)
- Deprecated type absent from Search Console / Rich Results Test → not a validation bug: tooling support for the June/July 2025 retirees was removed 2025-09-09→Jan 2026 (Practice Problem 2026-01-06) [VERIFY] (seo-schema/deprecated-types-2024-2026.md)
- Native `loading="lazy"` missing on images → check for JS lazy-loader signals (`data-src`, `lazyload` classes) before flagging a regression (seo-images/SKILL.md)
- Poor LCP with image hero → check for `loading="lazy"` on the LCP image (remove it) and missing `fetchpriority="high"` (add it) (seo-images/SKILL.md)
- Layout shift (CLS) findings → check for `<img>` elements missing width/height attributes or aspect-ratio CSS (seo-images/SKILL.md)

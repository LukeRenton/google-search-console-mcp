# google-search-console-mcp

MCP server for [Google Search Console](https://search.google.com/search-console). Query search analytics, inspect URLs, and check sitemaps from any MCP client (Claude Code, Claude Desktop, Cursor, and others).

> **Status: early development.**

## Tools

| Tool | Purpose | Status |
| --- | --- | --- |
| `list_properties` | List the Search Console properties your account can access | available |
| `query_search_analytics` | Clicks, impressions, CTR, and position by query, page, date, device, or country, with optional period-over-period comparison | available |
| `inspect_url` | Index status, chosen canonical, last crawl, and rich-result issues for a single URL | available |
| `list_sitemaps` | Submitted sitemaps with processing status, URL counts, errors, and warnings | available |
| `submit_sitemap` | Submit or resubmit a sitemap to Google (the only write operation) | available |

## Setup

1. In [Google Cloud Console](https://console.cloud.google.com), create or pick a project and enable the **Google Search Console API** (APIs & Services > Library).
2. Configure the OAuth consent screen (Google Auth Platform). Pick **Internal** if your account is in a Google Workspace org; otherwise **External**, then publish the app — apps left in Testing mode get refresh tokens that expire after 7 days.
3. Create an **OAuth client ID** (APIs & Services > Credentials) with application type **Desktop app**, and download its JSON file.
4. Authorize once from a terminal:

   ```sh
   npx google-search-console-mcp auth path/to/oauth-client.json
   ```

   A browser opens for Google sign-in; the resulting credentials are stored in `~/.config/google-search-console-mcp/tokens.json` (override the location with `GSC_TOKEN_FILE`). The server requests the `webmasters` scope — full Search Console access, needed by `submit_sitemap`, and nothing beyond Search Console. The token file is plain JSON readable by your user account; treat it like a password.

## Scoping a project to one property (optional)

Set the `GSC_PROPERTY` environment variable in a server registration to pin every tool to a
single property — useful when registering the server per project:

```sh
claude mcp add gsc --env GSC_PROPERTY=sc-domain:example.com -- npx google-search-console-mcp
```

With the pin set, `siteUrl` becomes optional (the pinned property is used automatically),
requests for any other property are rejected, and `list_properties` shows only the pinned
entry. Note this is a guardrail for the model, not credential-level security: the stored
OAuth token still has account-wide access. For hard separation, authenticate different Google
accounts into different token files via `GSC_TOKEN_FILE`.

## Companion skill: `seo`

The `skill/` directory contains an agent skill that turns this server's data into diagnosis
and fixes: a differential method (indexed → impressions → position → demand), verified
reality checks (retired rich-result types, AI-search eligibility, Search Console data
incidents), repo-level trip-wires, and a fix-and-verify loop. For Claude Code, install it by
copying the folder:

```sh
cp -r skill ~/.claude/skills/seo
```

Then ask, in any project: *"how's the SEO?"* The skill's reference chapters are distilled
from [claude-seo](https://github.com/AgricIDaniel/claude-seo) (MIT) with the core claims
verified against Google's primary documentation.

## Development

```sh
pnpm install
pnpm build
pnpm inspector   # opens the MCP Inspector against the built server
```

Targets MCP specification `2026-07-28` via `@modelcontextprotocol/server` v2.

## License

MIT

# google-search-console-mcp

[![npm](https://img.shields.io/npm/v/%40lukerent%2Fgoogle-search-console-mcp)](https://www.npmjs.com/package/@lukerent/google-search-console-mcp)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

MCP server for [Google Search Console](https://search.google.com/search-console). Query search
analytics, inspect how Google sees your URLs, and manage sitemaps from any MCP client (Claude
Code, Claude Desktop, Cursor, and others) — plus a companion agent skill that turns the data
into SEO diagnosis and fixes.

Built on the stateless MCP specification `2026-07-28`: five condensed tools instead of a
mirror of API endpoints, output shaped for model context, and error messages that tell the
model what to do next.

## Quick start

Claude Code — install the `gsc` plugin, which bundles the server and the companion `seo`
skill. Add the marketplace once per machine, then enable the plugin in each website repo:

```sh
claude plugin marketplace add LukeRenton/google-search-console-mcp
claude plugin install gsc@google-search-console-mcp --scope local
```

`--scope local` enables it for the current repo only, for you only, with nothing committed.
Use `--scope project` to share it with the repo's collaborators, or `--scope user` to load it
in every project. Restart Claude Code after installing. Run `/gsc:seo`, or just ask
*"how's the SEO?"*.

Without the plugin (server only):

```sh
claude mcp add gsc -- npx -y @lukerent/google-search-console-mcp
```

Any other MCP client, in its server config:

```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["-y", "@lukerent/google-search-console-mcp"]
    }
  }
}
```

Then complete the one-time Google authorization below.

## Tools

| Tool | Purpose |
| --- | --- |
| `list_properties` | List the Search Console properties your account can access |
| `query_search_analytics` | Clicks, impressions, CTR, and position by query, page, date, device, or country, with filters and period-over-period comparison |
| `inspect_url` | Index status, chosen canonical, last crawl, sitemap membership, and rich-result issues for a single URL |
| `list_sitemaps` | Submitted sitemaps with processing status, URL counts, errors, and warnings |
| `submit_sitemap` | Submit or resubmit a sitemap to Google (the only write operation) |

## Setup

1. In [Google Cloud Console](https://console.cloud.google.com), create or pick a project and enable the **Google Search Console API** (APIs & Services > Library).
2. Configure the OAuth consent screen (Google Auth Platform). Pick **Internal** if your account is in a Google Workspace org; otherwise **External**, then publish the app — apps left in Testing mode get refresh tokens that expire after 7 days.
3. Create an **OAuth client ID** (APIs & Services > Credentials) with application type **Desktop app**, and download its JSON file.
4. Authorize once from a terminal:

   ```sh
   npx -y @lukerent/google-search-console-mcp auth path/to/oauth-client.json
   ```

   A browser opens for Google sign-in; the resulting credentials are stored in `~/.config/google-search-console-mcp/tokens.json` (override the location with `GSC_TOKEN_FILE`). The server requests the `webmasters` scope — full Search Console access, needed by `submit_sitemap`, and nothing beyond Search Console. The token file is plain JSON readable by your user account; treat it like a password.

## Scoping a project to one property (optional)

Set the `GSC_PROPERTY` environment variable in a server registration to pin every tool to a
single property — useful when registering the server per project:

```sh
claude mcp add gsc --env GSC_PROPERTY=sc-domain:example.com -- npx -y @lukerent/google-search-console-mcp
```

With the pin set, `siteUrl` becomes optional (the pinned property is used automatically),
requests for any other property are rejected, and `list_properties` shows only the pinned
entry. Note this is a guardrail for the model, not credential-level security: the stored
OAuth token still has account-wide access. For hard separation, authenticate different Google
accounts into different token files via `GSC_TOKEN_FILE`.

## Companion skill: `seo`

The `skills/seo/` directory contains an agent skill that turns this server's data into
diagnosis and fixes: a preflight (server enabled? authenticated? which property matches this
repo's domain?), a differential method (indexed → impressions → position → demand), verified
reality checks (retired rich-result types, AI-search eligibility, Search Console data
incidents), repo-level trip-wires, and a fix-and-verify loop. The `gsc` plugin installs it
alongside the server; without the plugin, copy the folder instead:

```sh
cp -r skills/seo ~/.claude/skills/seo
```

The plugin runs the server unpinned: the skill picks the property matching the repo's domain
on each run. The skill's reference chapters are distilled
from [claude-seo](https://github.com/AgricIDaniel/claude-seo) (MIT) with the core claims
verified against Google's primary documentation.

## Development

```sh
pnpm install
pnpm build
pnpm typecheck
pnpm inspector   # opens the MCP Inspector against the built server
```

Targets MCP specification `2026-07-28` via `@modelcontextprotocol/server` v2.

## License

MIT

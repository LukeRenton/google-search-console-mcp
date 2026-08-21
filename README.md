# google-search-console-mcp

MCP server for [Google Search Console](https://search.google.com/search-console). Query search analytics, inspect URLs, and check sitemaps from any MCP client (Claude Code, Claude Desktop, Cursor, and others).

> **Status: early development.**

## Tools

| Tool | Purpose | Status |
| --- | --- | --- |
| `list_properties` | List the Search Console properties your account can access | available |
| `query_search_analytics` | Clicks, impressions, CTR, and position by query, page, date, device, or country, with optional period-over-period comparison | available |
| `inspect_url` | Index status, canonical, and last crawl for a single URL | planned |
| `list_sitemaps` | Submitted sitemaps and their status | planned |

## Setup

1. In [Google Cloud Console](https://console.cloud.google.com), create or pick a project and enable the **Google Search Console API** (APIs & Services > Library).
2. Configure the OAuth consent screen (Google Auth Platform). Pick **Internal** if your account is in a Google Workspace org; otherwise **External**, then publish the app — apps left in Testing mode get refresh tokens that expire after 7 days.
3. Create an **OAuth client ID** (APIs & Services > Credentials) with application type **Desktop app**, and download its JSON file.
4. Authorize once from a terminal:

   ```sh
   npx google-search-console-mcp auth path/to/oauth-client.json
   ```

   A browser opens for Google sign-in; the resulting credentials are stored in `~/.config/google-search-console-mcp/tokens.json` (override the location with `GSC_TOKEN_FILE`). The server requests the read-only Search Console scope.

## Development

```sh
pnpm install
pnpm build
pnpm inspector   # opens the MCP Inspector against the built server
```

Targets MCP specification `2026-07-28` via `@modelcontextprotocol/server` v2.

## License

MIT

import { McpServer } from '@modelcontextprotocol/server';
import { registerInspectUrl } from './tools/inspect-url.js';
import { registerListProperties } from './tools/list-properties.js';
import { registerListSitemaps } from './tools/list-sitemaps.js';
import { registerQuerySearchAnalytics } from './tools/query-search-analytics.js';
import { registerSubmitSitemap } from './tools/submit-sitemap.js';

export function buildServer(): McpServer {
  const server = new McpServer({
    name: 'google-search-console',
    version: '0.1.0',
  });

  registerListProperties(server);
  registerQuerySearchAnalytics(server);
  registerInspectUrl(server);
  registerListSitemaps(server);
  registerSubmitSitemap(server);

  return server;
}

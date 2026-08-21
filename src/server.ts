import { McpServer } from '@modelcontextprotocol/server';
import { registerListProperties } from './tools/list-properties.js';
import { registerQuerySearchAnalytics } from './tools/query-search-analytics.js';

export function buildServer(): McpServer {
  const server = new McpServer({
    name: 'google-search-console',
    version: '0.1.0',
  });

  registerListProperties(server);
  registerQuerySearchAnalytics(server);

  return server;
}

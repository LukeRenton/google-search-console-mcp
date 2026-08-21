import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { gscClient } from '../gsc.js';

export function registerListProperties(server: McpServer): void {
  server.registerTool(
    'list_properties',
    {
      description:
        'List the Search Console properties this Google account can access. ' +
        'Call this first to discover valid siteUrl values for the other tools.',
      inputSchema: z.object({}),
    },
    async () => {
      const gsc = await gscClient();
      const response = await gsc.sites.list();
      const entries = response.data.siteEntry ?? [];
      if (entries.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'This Google account has no Search Console properties. Add one at https://search.google.com/search-console.',
            },
          ],
        };
      }
      const lines = entries.map(
        (entry) => `${entry.siteUrl ?? '(unknown)'}  permission=${entry.permissionLevel ?? 'unknown'}`,
      );
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    },
  );
}

import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { gscClient } from '../gsc.js';
import { PINNED_PROPERTY } from '../pin.js';

export function registerListProperties(server: McpServer): void {
  server.registerTool(
    'list_properties',
    {
      description:
        'List the Search Console properties this Google account can access. ' +
        'Call this first to discover valid siteUrl values for the other tools.' +
        (PINNED_PROPERTY === undefined
          ? ''
          : ` This server is pinned to "${PINNED_PROPERTY}"; only that property is available.`),
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
      if (PINNED_PROPERTY !== undefined) {
        const pinned = entries.find((entry) => entry.siteUrl === PINNED_PROPERTY);
        if (pinned === undefined) {
          throw new Error(
            `GSC_PROPERTY is set to "${PINNED_PROPERTY}" but the authenticated account has no such property. ` +
              `The account's properties are: ${entries.map((entry) => entry.siteUrl).join(', ')}. ` +
              'Fix the GSC_PROPERTY value in this server registration.',
          );
        }
        const hidden = entries.length - 1;
        return {
          content: [
            {
              type: 'text',
              text:
                `${pinned.siteUrl}  permission=${pinned.permissionLevel ?? 'unknown'}\n` +
                `(pinned via GSC_PROPERTY${hidden > 0 ? `; ${hidden} other propert${hidden === 1 ? 'y' : 'ies'} on this account hidden` : ''})`,
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

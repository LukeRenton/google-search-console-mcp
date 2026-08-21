import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { describeApiError, gscClient } from '../gsc.js';

const INPUT = z.object({
  siteUrl: z
    .string()
    .describe('Property exactly as returned by list_properties, e.g. "sc-domain:example.com" or "https://example.com/".'),
  sitemapUrl: z
    .string()
    .url()
    .describe('Full URL of the sitemap file, e.g. "https://example.com/sitemap.xml". Must be a URL on the property.'),
});

export function registerSubmitSitemap(server: McpServer): void {
  server.registerTool(
    'submit_sitemap',
    {
      description:
        'Submit or resubmit a sitemap URL to Google. Use after a new sitemap is published, or to prompt a ' +
        're-fetch after fixing errors reported by list_sitemaps. This does not force pages to be indexed or ' +
        're-crawled; Google processes sitemaps on its own schedule. Resubmitting an unchanged sitemap is ' +
        'harmless but pointless, so only call this when the sitemap is new or its content has changed. ' +
        'The only write operation in this server.',
      inputSchema: INPUT,
    },
    async (input) => {
      const gsc = await gscClient();
      try {
        await gsc.sitemaps.submit({ siteUrl: input.siteUrl, feedpath: input.sitemapUrl });
      } catch (error) {
        throw describeApiError(
          error,
          input.siteUrl,
          'Submitting also requires: (1) a token with the full webmasters scope, so if authentication was set ' +
            'up when this server was read-only, re-run "npx google-search-console-mcp auth ..." in a terminal; ' +
            '(2) siteOwner or siteFullUser permission on the property.',
        );
      }
      return {
        content: [
          {
            type: 'text',
            text:
              `Submitted ${input.sitemapUrl} for ${input.siteUrl}. Google will fetch it on its own schedule ` +
              '(minutes to days). Check processing status and any errors later with list_sitemaps.',
          },
        ],
      };
    },
  );
}

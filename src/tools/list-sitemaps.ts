import type { searchconsole_v1 } from '@googleapis/searchconsole';
import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { describeApiError, gscClient } from '../gsc.js';
import { SITE_URL, resolveSiteUrl } from '../pin.js';

const INPUT = z.object({
  siteUrl: SITE_URL,
  sitemapIndex: z
    .string()
    .optional()
    .describe(
      'URL of a sitemap index file. When set, lists the child sitemaps inside that index ' +
        'instead of the sitemaps submitted directly to the property.',
    ),
});

export function registerListSitemaps(server: McpServer): void {
  server.registerTool(
    'list_sitemaps',
    {
      description:
        'List the sitemaps Google knows about for a property: processing status, URL counts, and the number ' +
        'of errors and warnings Google found in each. Use this to check whether a sitemap was fetched ' +
        'successfully and how many URLs it declared.',
      inputSchema: INPUT,
    },
    async (input) => {
      const siteUrl = resolveSiteUrl(input.siteUrl);
      const gsc = await gscClient();
      let sitemaps: searchconsole_v1.Schema$WmxSitemap[];
      try {
        const params: searchconsole_v1.Params$Resource$Sitemaps$List = { siteUrl };
        if (input.sitemapIndex !== undefined) params.sitemapIndex = input.sitemapIndex;
        const response = await gsc.sitemaps.list(params);
        sitemaps = response.data.sitemap ?? [];
      } catch (error) {
        throw describeApiError(error, siteUrl);
      }
      if (sitemaps.length === 0) {
        const scope = input.sitemapIndex === undefined ? siteUrl : `sitemap index ${input.sitemapIndex}`;
        return {
          content: [
            {
              type: 'text',
              text: `No sitemaps found for ${scope}. A sitemap can be submitted with submit_sitemap.`,
            },
          ],
        };
      }
      const lines = sitemaps.map(describeSitemap);
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    },
  );
}

function describeSitemap(sitemap: searchconsole_v1.Schema$WmxSitemap): string {
  const parts = [sitemap.path ?? '(unknown path)'];
  if (sitemap.isPending === true) {
    parts.push('pending (submitted, not yet processed)');
  } else {
    const urls = (sitemap.contents ?? [])
      .map((content) => `${content.submitted ?? '0'} ${content.type ?? 'unknown'}`)
      .join(' + ');
    parts.push(`${urls === '' ? '0' : urls} URLs`);
    parts.push(`errors=${sitemap.errors ?? '0'}`, `warnings=${sitemap.warnings ?? '0'}`);
    if (sitemap.lastDownloaded !== undefined && sitemap.lastDownloaded !== null) {
      parts.push(`last read by Google ${sitemap.lastDownloaded.slice(0, 10)}`);
    }
  }
  if (sitemap.isSitemapsIndex === true) {
    parts.push('sitemap index (pass as sitemapIndex to list its children)');
  }
  return parts.join('  ');
}

import type { searchconsole_v1 } from '@googleapis/searchconsole';
import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { describeApiError, gscClient } from '../gsc.js';

const INPUT = z.object({
  siteUrl: z
    .string()
    .describe('Property exactly as returned by list_properties, e.g. "sc-domain:example.com" or "https://example.com/".'),
  url: z
    .string()
    .url()
    .describe('Full URL to inspect. Must belong to the property.'),
});

export function registerInspectUrl(server: McpServer): void {
  server.registerTool(
    'inspect_url',
    {
      description:
        'Inspect how Google sees one URL: whether it is indexed and why or why not (robots.txt, noindex, ' +
        'fetch failures), which canonical Google chose versus the one the page declares, when it was last ' +
        'crawled, which sitemaps list it, and rich-result issues. Reflects the state of the Google index, ' +
        'not a live fetch of the page. Inspect a few representative URLs rather than sweeping a whole site ' +
        '(quota: 2000 inspections per property per day).',
      inputSchema: INPUT,
    },
    async (input) => {
      const gsc = await gscClient();
      let result: searchconsole_v1.Schema$UrlInspectionResult;
      try {
        const response = await gsc.urlInspection.index.inspect({
          requestBody: { siteUrl: input.siteUrl, inspectionUrl: input.url },
        });
        result = response.data.inspectionResult ?? {};
      } catch (error) {
        throw describeApiError(error, input.siteUrl);
      }
      return { content: [{ type: 'text', text: formatInspection(input.url, result) }] };
    },
  );
}

function formatInspection(url: string, result: searchconsole_v1.Schema$UrlInspectionResult): string {
  const lines = [url, ''];
  const index = result.indexStatusResult;
  if (index === undefined) {
    lines.push('Google returned no index status for this URL.');
  } else {
    lines.push(`verdict: ${index.verdict ?? 'unknown'} — ${index.coverageState ?? 'no coverage state'}`);
    lines.push(
      `indexing allowed: ${index.indexingState ?? 'unknown'}  robots.txt: ${index.robotsTxtState ?? 'unknown'}  ` +
        `page fetch: ${index.pageFetchState ?? 'unknown'}`,
    );
    lines.push(
      index.lastCrawlTime === undefined || index.lastCrawlTime === null
        ? 'last crawl: never crawled successfully'
        : `last crawl: ${index.lastCrawlTime}${index.crawledAs === undefined || index.crawledAs === null ? '' : ` (as ${index.crawledAs})`}`,
    );
    lines.push(...canonicalLines(index));
    if (index.sitemap !== undefined && index.sitemap !== null && index.sitemap.length > 0) {
      lines.push(`listed in sitemaps: ${index.sitemap.join(', ')}`);
    }
    const referring = index.referringUrls ?? [];
    if (referring.length > 0) {
      const shown = referring.slice(0, 5).join(', ');
      const rest = referring.length > 5 ? ` (+${referring.length - 5} more)` : '';
      lines.push(`referring pages: ${shown}${rest}`);
    }
  }
  lines.push(...richResultsLines(result.richResultsResult));
  if (result.ampResult !== undefined) {
    lines.push(`AMP: ${result.ampResult.verdict ?? 'unknown'}`);
  }
  if (result.inspectionResultLink !== undefined && result.inspectionResultLink !== null) {
    lines.push('', `full report: ${result.inspectionResultLink}`);
  }
  return lines.join('\n');
}

function canonicalLines(index: searchconsole_v1.Schema$IndexStatusInspectionResult): string[] {
  const google = index.googleCanonical ?? undefined;
  const declared = index.userCanonical ?? undefined;
  if (google === undefined && declared === undefined) return [];
  const lines = [];
  if (declared !== undefined) lines.push(`canonical declared by page: ${declared}`);
  if (google !== undefined) lines.push(`canonical chosen by Google: ${google}`);
  if (google !== undefined && declared !== undefined && google !== declared) {
    lines.push('CANONICAL MISMATCH: Google indexes a different URL than the page declares.');
  }
  return lines;
}

function richResultsLines(rich: searchconsole_v1.Schema$RichResultsInspectionResult | undefined): string[] {
  if (rich === undefined) return [];
  const types = rich.detectedItems ?? [];
  const lines = [`rich results: ${rich.verdict ?? 'unknown'} — ${types.map((t) => t.richResultType).join(', ') || 'none detected'}`];
  for (const type of types) {
    for (const item of type.items ?? []) {
      for (const issue of item.issues ?? []) {
        lines.push(`  ${type.richResultType ?? '?'} issue (${issue.severity ?? '?'}): ${issue.issueMessage ?? '?'}`);
      }
    }
  }
  return lines;
}

import type { searchconsole_v1 } from '@googleapis/searchconsole';
import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { gscClient } from '../gsc.js';

const DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');

const DIMENSION = z.enum(['query', 'page', 'country', 'device', 'date', 'searchAppearance']);

const FILTER = z.object({
  dimension: z.enum(['query', 'page', 'country', 'device', 'searchAppearance']),
  operator: z.enum(['contains', 'equals', 'notContains', 'notEquals', 'includingRegex', 'excludingRegex']),
  expression: z
    .string()
    .describe('Value to match. Country uses ISO 3166-1 alpha-3 (e.g. "zaf"); device is DESKTOP, MOBILE, or TABLET.'),
});

const INPUT = z.object({
  siteUrl: z
    .string()
    .describe('Property exactly as returned by list_properties, e.g. "sc-domain:example.com" or "https://example.com/".'),
  startDate: DATE.describe('First day of the period, inclusive. Data lags about 2 days behind today.'),
  endDate: DATE.describe('Last day of the period, inclusive.'),
  dimensions: z
    .array(DIMENSION)
    .max(3)
    .default(['query'])
    .describe(
      'Group results by these, in order. An empty array returns one aggregate row for the whole period. ' +
        '["date"] alone returns every day in the period (rowLimit is raised automatically); when combining ' +
        '"date" with other dimensions, raise rowLimit yourself to cover all combinations.',
    ),
  searchType: z.enum(['web', 'image', 'video', 'news', 'discover', 'googleNews']).default('web'),
  filters: z.array(FILTER).max(5).optional().describe('Rows must match all filters (AND).'),
  rowLimit: z
    .number()
    .int()
    .min(1)
    .max(500)
    .default(20)
    .describe(
      'Rows are sorted by clicks, descending. For questions about a different metric (e.g. most impressions), ' +
        'request more rows and re-sort yourself.',
    ),
  compareWith: z
    .object({ startDate: DATE, endDate: DATE })
    .optional()
    .describe('Baseline period. When set, each metric also shows its change versus this period.'),
});

type QueryInput = z.infer<typeof INPUT>;
type Row = searchconsole_v1.Schema$ApiDataRow;

export function registerQuerySearchAnalytics(server: McpServer): void {
  server.registerTool(
    'query_search_analytics',
    {
      description:
        'Query Search Console performance data: clicks, impressions, click-through rate, and average ranking position. ' +
        'Call this for any question about how a site performs in Google Search: top queries or pages, trends over time, ' +
        'device or country splits, and period-over-period comparisons via compareWith.',
      inputSchema: INPUT,
    },
    async (input) => {
      const gsc = await gscClient();
      const current = await runQuery(gsc, input, { startDate: input.startDate, endDate: input.endDate });
      if (input.compareWith === undefined) {
        return { content: [{ type: 'text', text: formatPeriod(input, current) }] };
      }
      const baseline = await runQuery(gsc, input, input.compareWith);
      return { content: [{ type: 'text', text: formatComparison(input, current, baseline) }] };
    },
  );
}

interface QueryResult {
  rows: Row[];
  more: boolean;
}

function isDailyTrend(input: QueryInput): boolean {
  return input.dimensions.length === 1 && input.dimensions[0] === 'date';
}

function daysInPeriod(period: { startDate: string; endDate: string }): number {
  return Math.round((Date.parse(period.endDate) - Date.parse(period.startDate)) / 86_400_000) + 1;
}

async function runQuery(
  gsc: searchconsole_v1.Searchconsole,
  input: QueryInput,
  period: { startDate: string; endDate: string },
): Promise<QueryResult> {
  // A daily trend is only meaningful when every day is present, so the limit is
  // raised to cover the whole period regardless of what was asked for.
  const rowLimit = isDailyTrend(input)
    ? Math.max(input.rowLimit, Math.min(daysInPeriod(period), 500))
    : input.rowLimit;
  const requestBody: searchconsole_v1.Schema$SearchAnalyticsQueryRequest = {
    startDate: period.startDate,
    endDate: period.endDate,
    dimensions: input.dimensions,
    type: input.searchType,
    // One extra row is a truncation probe: if it comes back, more rows exist.
    rowLimit: rowLimit + 1,
  };
  if (input.filters !== undefined && input.filters.length > 0) {
    requestBody.dimensionFilterGroups = [{ filters: input.filters }];
  }
  try {
    const response = await gsc.searchanalytics.query({ siteUrl: input.siteUrl, requestBody });
    const rows = response.data.rows ?? [];
    return { rows: rows.slice(0, rowLimit), more: rows.length > rowLimit };
  } catch (error) {
    throw describeApiError(error, input.siteUrl);
  }
}

function describeApiError(error: unknown, siteUrl: string): Error {
  const status =
    (error as { status?: unknown }).status ?? (error as { code?: unknown }).code;
  const message = error instanceof Error ? error.message : String(error);
  if (status === 403) {
    return new Error(
      `No access to "${siteUrl}" (${message}). Call list_properties: the property must be listed there ` +
        'with a permission level other than siteUnverifiedUser.',
    );
  }
  if (status === 404) {
    return new Error(
      `"${siteUrl}" is not a Search Console property (${message}). Use a siteUrl exactly as returned by list_properties.`,
    );
  }
  return error instanceof Error ? error : new Error(message);
}

function metric(row: Row): { clicks: number; impressions: number; ctr: number; position: number } {
  return {
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  };
}

function keyOf(row: Row): string {
  return (row.keys ?? []).join(' | ') || '(total)';
}

function headerFor(input: QueryInput): string {
  if (isDailyTrend(input)) {
    return `${input.siteUrl}  ${input.searchType}  ${input.startDate}..${input.endDate}  daily`;
  }
  const grouping = input.dimensions.length > 0 ? input.dimensions.join(' / ') : 'whole-period aggregate';
  return `${input.siteUrl}  ${input.searchType}  ${input.startDate}..${input.endDate}  ${grouping}, top ${input.rowLimit} by clicks`;
}

function emptyMessage(input: QueryInput): string {
  const filterNote = input.filters !== undefined && input.filters.length > 0 ? ' with the given filters' : '';
  return (
    `No data for ${input.siteUrl} between ${input.startDate} and ${input.endDate}${filterNote}. ` +
    'Search Console data lags about 2 days behind today; also check that the property has search traffic in this period.'
  );
}

function formatPeriod(input: QueryInput, result: QueryResult): string {
  if (result.rows.length === 0) return emptyMessage(input);
  const lines = [
    headerFor(input),
    '',
    ` clicks     impr   ctr%    pos  ${input.dimensions.join(' / ')}`,
  ];
  for (const row of result.rows) {
    const m = metric(row);
    lines.push(
      `${String(m.clicks).padStart(7)} ${String(m.impressions).padStart(8)} ` +
        `${(m.ctr * 100).toFixed(1).padStart(6)} ${m.position.toFixed(1).padStart(6)}  ${keyOf(row)}`,
    );
  }
  if (result.more) {
    lines.push('', `Only the top ${result.rows.length} rows by clicks are shown; more exist. Raise rowLimit or add filters.`);
  }
  lines.push('', 'position is the average ranking; lower is better.');
  return lines.join('\n');
}

function formatComparison(input: QueryInput, current: QueryResult, baseline: QueryResult): string {
  const compareWith = input.compareWith;
  if (compareWith === undefined) throw new Error('formatComparison called without compareWith');
  if (current.rows.length === 0 && baseline.rows.length === 0) return emptyMessage(input);

  const baselineByKey = new Map(baseline.rows.map((row) => [keyOf(row), row]));
  const lines = [
    headerFor(input),
    `compared with ${compareWith.startDate}..${compareWith.endDate}  (change in parentheses; position: lower is better)`,
    '',
  ];
  for (const row of current.rows) {
    const m = metric(row);
    const key = keyOf(row);
    const base = baselineByKey.get(key);
    baselineByKey.delete(key);
    if (base === undefined) {
      lines.push(
        `${key}: clicks ${m.clicks}, impressions ${m.impressions}, ctr ${(m.ctr * 100).toFixed(1)}%, ` +
          `position ${m.position.toFixed(1)}  [no traffic in baseline period]`,
      );
      continue;
    }
    const b = metric(base);
    lines.push(
      `${key}: clicks ${m.clicks} (${delta(m.clicks - b.clicks)}), ` +
        `impressions ${m.impressions} (${delta(m.impressions - b.impressions)}), ` +
        `ctr ${(m.ctr * 100).toFixed(1)}% (${delta((m.ctr - b.ctr) * 100)}pp), ` +
        `position ${m.position.toFixed(1)} (${delta(m.position - b.position)})`,
    );
  }
  if (baselineByKey.size > 0) {
    lines.push('', `${baselineByKey.size} row(s) had traffic only in the baseline period (outside the current top ${input.rowLimit}).`);
  }
  return lines.join('\n');
}

function delta(value: number): string {
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return value > 0 ? `+${rounded}` : rounded;
}

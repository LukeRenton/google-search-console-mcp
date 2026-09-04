import * as z from 'zod/v4';

// A server registration can pin every tool to one property via the GSC_PROPERTY
// environment variable (useful in per-project MCP configs). The pin narrows what
// the model can reach; the stored credential itself still has account-wide
// access, so this is a guardrail, not credential-level security.
export const PINNED_PROPERTY = process.env['GSC_PROPERTY'];

export const SITE_URL = z
  .string()
  .optional()
  .describe(
    PINNED_PROPERTY === undefined
      ? 'Property exactly as returned by list_properties, e.g. "sc-domain:example.com" or "https://example.com/". ' +
          'Required on this server (no GSC_PROPERTY pin is configured).'
      : `Optional: this server is pinned to "${PINNED_PROPERTY}" and uses it automatically; if provided, it must match.`,
  );

export function resolveSiteUrl(siteUrl: string | undefined): string {
  if (PINNED_PROPERTY === undefined) {
    if (siteUrl === undefined) {
      throw new Error(
        'siteUrl is required: this server is not pinned to a property. Call list_properties to discover valid values.',
      );
    }
    return siteUrl;
  }
  if (siteUrl !== undefined && siteUrl !== PINNED_PROPERTY) {
    throw new Error(
      `This server is pinned to "${PINNED_PROPERTY}" (GSC_PROPERTY environment variable); "${siteUrl}" is not reachable here. ` +
        'Omit siteUrl to use the pinned property. To work with other properties, use a server registration without the pin.',
    );
  }
  return PINNED_PROPERTY;
}

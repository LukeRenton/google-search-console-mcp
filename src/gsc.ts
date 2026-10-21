import { searchconsole, type searchconsole_v1 } from '@googleapis/searchconsole';
import { loadAuthorizedClient, tokenFilePath } from './auth.js';

export async function gscClient(): Promise<searchconsole_v1.Searchconsole> {
  const auth = await loadAuthorizedClient();
  if (auth === null) {
    throw new Error(
      `Not authenticated with Google (no credentials at ${tokenFilePath()}). ` +
        'Run "npx @lukerent/google-search-console-mcp auth <path-to-oauth-client.json>" in a terminal, ' +
        'complete the sign-in, then retry this call.',
    );
  }
  return searchconsole({ version: 'v1', auth });
}

// Translates Google API errors into messages that tell the model what to do
// next, instead of leaking raw HTTP noise. siteUrl is omitted for calls that
// are not about one property (list_properties); those skip the 403/404 hints.
export function describeApiError(error: unknown, siteUrl?: string, hint403?: string): Error {
  const status = (error as { status?: unknown }).status ?? (error as { code?: unknown }).code;
  const message = error instanceof Error ? error.message : String(error);
  const oauthError = (error as { response?: { data?: { error?: unknown } } }).response?.data?.error;
  // The stored refresh token was revoked or expired. OAuth apps left in
  // "Testing" publishing status get refresh tokens that expire after 7 days.
  if (message === 'invalid_grant' || oauthError === 'invalid_grant') {
    return new Error(
      `Google rejected the stored credentials at ${tokenFilePath()}: the refresh token was revoked or expired ` +
        '(OAuth apps in "Testing" publishing status expire tokens after 7 days; set the app to "In production" ' +
        'in Google Cloud Console > OAuth consent screen to stop this). Ask the user to run ' +
        '"npx @lukerent/google-search-console-mcp auth <path-to-oauth-client.json>" in a terminal, ' +
        'complete the sign-in, then retry this call.',
    );
  }
  // Quota errors arrive as 429, or as 403 with a quota/rate-limit message, so
  // this must run before the 403 branch or it would read as "no access".
  if (status === 429 || /quota|rate ?limit/i.test(message)) {
    return new Error(
      `Search Console API quota exceeded (${message}). Wait a minute before retrying, and avoid issuing many ` +
        'calls in quick succession; narrower queries (fewer dimensions, shorter periods) use less quota.',
    );
  }
  if (siteUrl === undefined) {
    return error instanceof Error ? error : new Error(message);
  }
  if (status === 403) {
    return new Error(
      `No access to "${siteUrl}" (${message}). Call list_properties: the property must be listed there ` +
        `with a permission level other than siteUnverifiedUser.${hint403 === undefined ? '' : ` ${hint403}`}`,
    );
  }
  if (status === 404) {
    return new Error(
      `"${siteUrl}" is not a Search Console property (${message}). Use a siteUrl exactly as returned by list_properties.`,
    );
  }
  return error instanceof Error ? error : new Error(message);
}

import { searchconsole, type searchconsole_v1 } from '@googleapis/searchconsole';
import { loadAuthorizedClient, tokenFilePath } from './auth.js';

export async function gscClient(): Promise<searchconsole_v1.Searchconsole> {
  const auth = await loadAuthorizedClient();
  if (auth === null) {
    throw new Error(
      `Not authenticated with Google (no credentials at ${tokenFilePath()}). ` +
        'Run "npx google-search-console-mcp auth <path-to-oauth-client.json>" in a terminal, ' +
        'complete the sign-in, then retry this call.',
    );
  }
  return searchconsole({ version: 'v1', auth });
}

// Translates Google API errors into messages that tell the model what to do
// next, instead of leaking raw HTTP noise.
export function describeApiError(error: unknown, siteUrl: string, hint403?: string): Error {
  const status = (error as { status?: unknown }).status ?? (error as { code?: unknown }).code;
  const message = error instanceof Error ? error.message : String(error);
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

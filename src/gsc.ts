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

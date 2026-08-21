import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { promises as fs } from 'node:fs';
import { createServer } from 'node:http';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { auth as googleAuth } from '@googleapis/searchconsole';

export const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

// The OAuth2 class re-exported by the API package, so the auth client and the
// API client can never disagree about google-auth-library versions.
export type AuthorizedClient = InstanceType<typeof googleAuth.OAuth2>;

interface StoredCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

interface OAuthClientFile {
  installed?: { client_id?: string; client_secret?: string };
  web?: { client_id?: string; client_secret?: string };
}

export function tokenFilePath(): string {
  return (
    process.env['GSC_TOKEN_FILE'] ??
    join(homedir(), '.config', 'google-search-console-mcp', 'tokens.json')
  );
}

export async function loadAuthorizedClient(): Promise<AuthorizedClient | null> {
  let raw: string;
  try {
    raw = await fs.readFile(tokenFilePath(), 'utf8');
  } catch {
    return null;
  }
  const stored = JSON.parse(raw) as StoredCredentials;
  const client = new googleAuth.OAuth2({
    clientId: stored.clientId,
    clientSecret: stored.clientSecret,
  });
  client.setCredentials({ refresh_token: stored.refreshToken });
  return client;
}

export async function runAuthFlow(clientFile: string): Promise<void> {
  const parsed = JSON.parse(await fs.readFile(clientFile, 'utf8')) as OAuthClientFile;
  const keys = parsed.installed ?? parsed.web;
  const clientId = keys?.client_id;
  const clientSecret = keys?.client_secret;
  if (clientId === undefined || clientSecret === undefined) {
    throw new Error(
      `${clientFile} does not look like an OAuth client file (expected an "installed" section ` +
        'with client_id and client_secret). Download it from Google Cloud Console > ' +
        'APIs & Services > Credentials, application type "Desktop app".',
    );
  }

  // Google's desktop-app flow allows loopback redirects on any port, so bind
  // an ephemeral one and use it as the redirect target.
  const httpServer = createServer();
  httpServer.listen(0, '127.0.0.1');
  await once(httpServer, 'listening');
  const address = httpServer.address();
  if (address === null || typeof address === 'string') {
    throw new Error('Could not bind a loopback port for the OAuth redirect.');
  }
  const redirectUri = `http://127.0.0.1:${address.port}`;

  const client = new googleAuth.OAuth2({ clientId, clientSecret, redirectUri });
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });

  const code = await new Promise<string>((resolve, reject) => {
    httpServer.on('request', (req, res) => {
      const url = new URL(req.url ?? '/', redirectUri);
      const oauthError = url.searchParams.get('error');
      const oauthCode = url.searchParams.get('code');
      res.writeHead(200, { 'content-type': 'text/plain' });
      if (oauthError !== null) {
        res.end(`Authorization failed: ${oauthError}. You can close this tab.`);
        reject(new Error(`Google returned an error: ${oauthError}`));
        return;
      }
      if (oauthCode === null) {
        res.end('Waiting for Google to redirect back with a code.');
        return;
      }
      res.end('Authorized. You can close this tab and return to the terminal.');
      resolve(oauthCode);
    });

    console.log(`Opening Google sign-in in your browser. If nothing opens, visit:\n\n  ${authUrl}\n`);
    openBrowser(authUrl);
  });
  httpServer.close();

  const { tokens } = await client.getToken(code);
  const refreshToken = tokens.refresh_token;
  if (refreshToken === undefined || refreshToken === null) {
    throw new Error(
      'Google did not return a refresh token. Revoke this app at ' +
        'https://myaccount.google.com/permissions and run auth again.',
    );
  }

  const stored: StoredCredentials = { clientId, clientSecret, refreshToken };
  const file = tokenFilePath();
  await fs.mkdir(dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(stored, null, 2)}\n`, { mode: 0o600 });
  console.log(`Saved credentials to ${file}`);
}

function openBrowser(url: string): void {
  let cmd: string;
  let args: string[];
  if (process.platform === 'win32') {
    // Not "cmd /c start": cmd parses "&" as a command separator even when the
    // URL arrives as a spawn argument, truncating OAuth URLs at the first
    // query parameter. rundll32 receives the URL verbatim.
    cmd = 'rundll32';
    args = ['url.dll,FileProtocolHandler', url];
  } else if (process.platform === 'darwin') {
    cmd = 'open';
    args = [url];
  } else {
    cmd = 'xdg-open';
    args = [url];
  }
  try {
    spawn(cmd, args, { stdio: 'ignore', detached: true }).unref();
  } catch {
    // The URL is already printed to the terminal as a fallback.
  }
}

#!/usr/bin/env node
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { runAuthFlow } from './auth.js';
import { buildServer } from './server.js';

const [, , command, clientFileArg] = process.argv;

if (command === 'auth') {
  const clientFile = clientFileArg ?? process.env['GSC_OAUTH_CLIENT_FILE'];
  if (clientFile === undefined) {
    console.error(
      'Usage: google-search-console-mcp auth <path-to-oauth-client.json>\n' +
        '(or set GSC_OAUTH_CLIENT_FILE to the file path)',
    );
    process.exit(2);
  }
  await runAuthFlow(clientFile);
} else {
  // Serve mode: stdout is the MCP protocol channel. Only the auth CLI branch
  // above may write to stdout; everything else must use stderr.
  serveStdio(() => buildServer());
}

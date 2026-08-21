<!-- [ ] todo · [~] done, awaiting verification · [x] verified · [-] cancelled · [!] blocked
     Tags: BUG FEAT SEC CHORE DECISION · Sev: CRIT HIGH MED LOW
     Next ID: T-006 · Spec: /todo-add
     [x] + [-] (except DECISIONs) → DONE.md · resolved decisions stay below -->

# Todo — google-search-console-mcp

## Active
- [ ] T-001 FEAT LOW — `auth` re-run without client file: reuse clientId/clientSecret already stored in tokens.json (src/index.ts, src/auth.ts) _(src: chat 08-21)_
- [ ] T-003 BUG LOW — auth flow hangs forever if the browser consent is abandoned; add a timeout that closes the loopback server with a clear message (src/auth.ts) _(src: chat 08-14)_
- [ ] T-004 FEAT LOW — orderBy param for query_search_analytics; models currently over-fetch and re-sort client-side _(src: chat 08-14)_
- [ ] T-002 CHORE — add .gitattributes to normalize line endings and silence CRLF warnings before open-sourcing _(src: chat 08-21)_
- [ ] T-005 CHORE — server version string in src/server.ts duplicates package.json; read it from one place _(src: chat 08-14)_

## Decisions

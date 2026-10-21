# Done — google-search-console-mcp  (archive; newest first)

- [x] T-006 BUG  MED  — describeApiError only mapped 403/404; add invalid_grant + quota handling — done 2026-10-21, verified ✅
      fix: invalid_grant → re-run-auth message, 429/quota-403 → wait-and-retry (checked before 403), list_properties routed through it (src/gsc.ts) · commit 0b0f8d1

# Done — google-search-console-mcp  (archive; newest first)

- [x] T-008 CHORE      — README agentic install prompt — done 2026-10-21, verified ✅
      fix: "Or let your agent set it up" section under Quick start (README.md) · commit 4676cc9

- [x] T-007 FEAT LOW  — dataState: 'all' on query_search_analytics for fresh preliminary data — done 2026-10-21, verified ✅
      fix: dataState param (default final), header flags preliminary data, empty-result hint, seo skill lag rule updated · commit c7a9cca

- [x] T-006 BUG  MED  — describeApiError only mapped 403/404; add invalid_grant + quota handling — done 2026-10-21, verified ✅
      fix: invalid_grant → re-run-auth message, 429/quota-403 → wait-and-retry (checked before 403), list_properties routed through it (src/gsc.ts) · commit 0b0f8d1

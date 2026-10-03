# Learning-material search implementation

Implemented against main d30474b on 3 October 2026. This is a website feature and does not create academic activity or alter private records.

The shared header exposes a search control, opening a native modal with delayed live search, module filtering, optional outline/archive scopes, section links, paginated results, keyboard navigation, Escape, focus restoration and load-error recovery. The index is loaded only on the first query. Light/dark and compact mobile presentations use the existing site palette.

The normal publication build generates the index after Vite, so Pages publishes content and search together. Only public learning/programme routes enter the index. Current counts: 178 pages, including 16 available teaching pages, 103 outline/reference pages and 59 M100 archive pages. The default query excludes outlines and archive. Private pages and Firebase are not indexing sources. Feedback disclosures are ignored; worked examples, setup instructions and activity questions remain searchable.

Validation:

- All 89 Node tests passed, including a real Pagefind rebuild fixture for additions, revisions and deletions, plus private-content/feedback exclusions.
- Production build passed and generated the index. Existing large-bundle advisory remains unrelated to search.
- Local Chrome checks passed for results, pagination, module codes, outlines/archive scopes, module filtering, exact-phrase no-results, section-link destinations, arrow keys, Enter/submit, Escape, focus return and Command-K.
- Layout checks passed at 375, 768 and 1440 pixels; mobile and dark-mode screenshots were visually inspected.
- A blocked-index request produced the retry message; teaching remained readable with JavaScript disabled. No page exceptions occurred during the normal browser checks.
- Regenerated source HTML differs only by search-availability markers; original teaching and existing section IDs are preserved.

Pagefind uses partial-word matching by default. Quotation marks request an exact phrase. Search is textual, not equation-aware. PDF/notebook contents require a future extraction step; their links and descriptions are searchable now. See README for authoring markers and local build/preview instructions.

Publication is separate from this implementation review. No production deployment was performed.

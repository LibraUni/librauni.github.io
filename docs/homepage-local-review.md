# Public homepage local integration

8 October 2026 · User reviewed local design and authorised publication

The reviewed homepage concept now occupies `/`. It retains the site's native brand header, search, account menu and theme control. A compact exploration menu links to the homepage's journey, curiosity lab and learning approach. The public homepage has no sidebar.

The original student homepage is preserved at `/study/`, including its sidebar, authentication handler, personal greeting, study overview, progress bindings and notice area. Links explicitly labelled Student Home now lead to this route; brand home links still lead to `/`. The new route is a Vite build entry. Shared authentication, profile, private persistence and study scripts were not modified.

Development is isolated in `work/homepage-integration` in the project workspace, cloned locally from the latest release checkout available at the start of this work. The earlier standalone concept remains in `work/homepage-preview`. No remote push, deployment or private-record mutation was performed.

## Preview

- Public home: http://127.0.0.1:8792/
- Student desk: http://127.0.0.1:8792/study/

From this checkout, restart the preview with `python3 -m http.server 8792 --bind 127.0.0.1 --directory dist`.

Homepage code is in `index.html`, `src/homepage.css`, `src/homepage.js` and `src/homepage-models.js`. The stylesheet is scoped to `.landing-content`, keeping shared header/search and other routes outside its scope. Dark-theme overrides, responsive breakpoints, motion pause, reduced-motion handling and static fallback content are implemented.

## Checks

The production build and search indexing passed (24 available learning pages). All 109 tests passed, including new routing/desk-preservation tests and 356 numerical model assertions. Existing navigation and study tests passed. Whitespace checks passed. This is evidence for source integrity and model behaviour, not visual quality or successful authentication.

Browser access to the local URL was blocked because the browser tool could not verify its admin-enforced security policy. Desktop/mobile layout, theme rendering, real keyboard interaction, search dialog behaviour, signed-in header/desk behaviour, console errors and no-JavaScript rendering have not been verified in the integrated page. No indirect browser workaround was used. The visual review remains open.

Before any publication: review the local home and desk, verify the above browser behaviour, reconcile any subsequent changes on the shared release branch, rebuild and run affected tests. The existing guest-welcome redirect behaviour is unchanged. Local sign-in may also depend on the Firebase authorised-domain configuration; no configuration change is part of this work.

## Publication authorisation

On 8 October 2026 the user reviewed the local design and explicitly requested publication. The remote main branch still matches the integration base cda18e9. All 109 tests, production build and 24-page search index passed again. The homepage routing test was corrected to run before the build, matching CI order. Existing page changes were checked to be Student Home link changes only; shared account/authentication and study persistence scripts remain unchanged. Automated browser verification remains unavailable due to the previously reported policy-check failure. Deployment success and public-response verification will be recorded separately.

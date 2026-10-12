# Issue plans of action - kaelnomads-js

> **Audience:** a future LLM coding agent implementing the open GitHub issues of `halexs/kaelnomads-js`.
> Written 2026-10-12 from a full read of the repository. Each section below is also posted as a comment on the matching issue.
>
> **How to use:** pick an issue, read its plan and dependencies, implement on a feature branch, and open a PR that says `Closes #N`.
> Verify file paths against the current tree before editing; the code may have moved since this was written.
> Sibling repo: `website_iac`. Cookbook and fileshare issues exist in both repos; build the backend/infra in `website_iac` first.

## Suggested order

Issue numbers: 6 -> 7 -> 5 -> 3 -> 1 -> 8 -> 4 -> 9 -> 2 -> 10 -> 11

## #1 - Add personal Profiles for A and K

**Issue text:** _(none)_

**Goal:** Real profile pages for Alex and Keily.

**Current state:** `src/components/Alex.js` has a short bio + resume link; `Keily.js` is a placeholder with a GIF and commented-out media experiments. Both are rendered by `HomePage.js` for `/alex` and `/keily`.

**Plan**
1. Extract a shared `ProfilePage` component (props: `name`, `photo`, `bio`, `links[]`, `sections[]`) in `src/components/ProfilePage.js`; make `Alex.js`/`Keily.js` thin wrappers that pass data.
2. Put profile content in `src/data/profiles.js` (plain objects) so copy edits do not touch JSX.
3. Use MUI `Card`, `Avatar`, `Typography`, `Chip` (skills/interests) and `Link` for resume/email. Remove the dead commented code in `Keily.js`.
4. Replace the fixed `width: "60%"` with responsive `Container maxWidth="md"` (also helps #6).
5. Store photos in the existing S3 resources bucket / `public/`; add `alt` text.
6. Add a render test per profile (name heading visible).

**Acceptance:** `/alex` and `/keily` render photo, bio, links; no inline style duplication; tests pass.
**Dependencies:** informs #9 (expand Alex) and #2 (design inspiration). Needs content/photos from the user.
**Risks:** none technical; content is the blocker.

## #2 - List other people's websites to base design on.

**Issue text:** _(none)_

**Goal:** Collect other personal sites to base the design on.

**Plan**
1. Create `docs/DESIGN_INSPIRATION.md` with a table: URL, what to borrow (map, scroll storytelling, profile layout, palette), screenshot link.
2. Seed it with categories matching open issues: interactive scroll maps (#4), travel-blog maps (#3/#5), personal profile pages (#1/#9), cookbook UIs (#11).
3. Ask the user to add favourites as comments on this issue; an agent can then fold them into the doc and derive a palette/typography decision for `createTheme` in `src/App.js` (currently an empty theme).
4. Close the issue once the doc exists and a theme decision is recorded.

**Acceptance:** `docs/DESIGN_INSPIRATION.md` merged with >= 5 references and a chosen palette.
**Risks:** this is subjective research; an agent can structure it but the user must pick the sites.

## #3 - Change travel lines with colors

**Issue text:** Optional would be to change the points

**Goal:** Colour-code travel lines; optionally change the points.

**Current state:** `TravelMap.js` `colorPicker` already interpolates between two blues (`#6dd5ed` -> `#2193b0`) per segment, but returns un-padded hex (e.g. `a` instead of `0a`), which yields invalid colours when a channel is below 0x10 (e.g. `#6d3a5` is not a valid colour).

**Plan**
1. Move `colorPicker` to `src/utils/color.js` as `interpolateColor(start, end, i, total)`; pad each channel with `toString(16).padStart(2, "0")`.
2. Decide the gradient (start/end in `docs/DESIGN_INSPIRATION.md` from #2); the old comment suggests blue `#499ac9` -> orange `#d18238` (oldest -> most recent). Make it a constant.
3. Optionally colour by stay length (`time` + `timeUnit` -> days) instead of index; keep behind a small `colorBy` option.
4. Optional custom markers: Leaflet `L.divIcon` coloured with the same gradient, or `CircleMarker` for stops (also fixes Leaflet's default-icon bundling quirks).
5. Unit-test `interpolateColor` (endpoints, padding, two-point route).

**Acceptance:** each segment renders a valid, distinct colour; first/last match the configured endpoints; tests pass.
**Dependencies:** pairs with #4 and #5 (same file).

## #4 - Interactive Scroll Map

**Issue text:** Show full map at top, then for interactive, the user scrolls through every individual part of the journey. Living in VA, then DC, then some pictures of the travels.

**Goal:** Full map on top, then scroll through each leg of the journey (VA -> DC -> travels) with photos.

**Plan**
1. Add a `/journey` route (or extend `/travel`) with a `JourneyScroll` component: sticky map (`position: sticky; top: 0; height: 60vh`) followed by one `<section data-index={i}>` per entry of `locations.json`.
2. Use `IntersectionObserver` (a `useActiveSection` hook, threshold ~0.6) to detect the active section, then call `map.flyTo(coords, 9)`; when scrolled back to the top, `flyTo` the US overview (`[37.61, -96.322]`, zoom 4). Needs `useMap` inside a child of `MapContainer` (pattern already used in `TravelMapLegend.js`).
3. Extend the `locations.json` schema (and Lambda passthrough) with `description` (#8) and `photos: [url]`; each section shows title, duration, description, photo grid. Photos live in S3 (see #10 for storage).
4. Highlight the current leg's polyline (thicker weight) and dim the rest.
5. Extract shared fetch + `sessionStorage` cache from `TravelMap.js` into `src/hooks/useLocations.js` so both views share it.
6. Mobile: stack map (40vh sticky) above content (#6).

**Acceptance:** scrolling moves the map smoothly to each stop; works with keyboard and reduced-motion (use `setView` when `prefers-reduced-motion`).
**Dependencies:** #5, #8, #6; photo storage from #10.
**Risks:** Leaflet inside sticky containers needs `map.invalidateSize()` after layout changes.

## #5 - Zoom in while clicking on points of interest.

**Issue text:** _(none)_

**Goal:** Zoom in when clicking points of interest.

**Current state:** the legend links in `TravelMapLegend.js` already call `map.setView(coords, 9)` and open the modal, but clicking a *marker* in `TravelMap.js` does nothing, and the legend adds a `map.addEventListener("click", console.log)` on every mount (listener leak, debug noise).

**Plan**
1. Add `eventHandlers={{ click: () => { map.flyTo(coords, 9); setOpen(String(i)); } }}` to each `Marker` (get `map` via a small child component using `useMap`, or `useMapEvents`).
2. Use `flyTo` (animated) in both places for consistency; keep "Reset Map" returning to `[37.61, -96.322]` zoom 4 (extract these as constants shared with `TravelMap.js`).
3. Remove the debug `click` listener and `console.log`s; if kept for authoring coordinates, gate on `process.env.NODE_ENV === "development"` and remove it in `componentWillUnmount`.
4. Add a cleanup (`componentWillUnmount` -> `control.remove()`) to `TravelMapLegend` so remounts do not stack legends.

**Acceptance:** clicking a marker or a legend entry flies to the location and opens its modal; no console noise in production build.
**Dependencies:** shares files with #3, #4.

## #6 - Make website mobile friendly

**Issue text:** _(none)_

**Goal:** Mobile-friendly site.

**Current state:** `App.js` computes `isMobile = width <= 768` via a resize listener and passes it down, but most layout uses fixed values (`width: "60%"` in `Alex.js`/`Keily.js`, fixed 400px modal in `LocationsModal.js`, `console.log` on every render).

**Plan**
1. Replace the custom width state with MUI `useMediaQuery(theme.breakpoints.down("md"))` in a `useIsMobile` hook; drop the prop-drilling and the render-time `console.log`.
2. Replace fixed widths with responsive styles: profile pages in `Container maxWidth="md"`; modal `width: { xs: "90vw", sm: 400 }`.
3. `TravelMap`: map height `calc(100vh - appbar)` on mobile; convert the Leaflet legend (bottom-left, can cover the map) into a collapsible panel or an MUI bottom `Drawer` on small screens. Enable `scrollWheelZoom={false}` -> keep, but verify touch pinch/drag (`dragging`, `tap`) work.
4. AppBar: `Tabs variant="scrollable"` is already set; verify the welcome text does not wrap badly (hide it on `xs`).
5. Test at 360x640, 390x844, 768x1024 with Chrome devtools; add a Lighthouse mobile check to the README.

**Acceptance:** no horizontal scroll at 360px width; all tap targets >= 44px; legend and modal usable.
**Dependencies:** do early; #1, #4 build on it.

## #7 - misc tab

**Issue text:** add things that'll be helpful
- reverse hourglass
- multiple timers
- dice / randomizer

**Goal:** A "misc" tab with reverse hourglass, multiple timers and a dice/randomizer.

**Plan**
1. Add route `/misc` in `App.js` + `Tab` + a button in `HomePage.js` (this repo hard-codes route<->tab index in three places; first refactor into one `routes` array `[{path,label,element,icon}]` and derive tabs/routes/index from it - makes every future tab a one-line change).
2. `src/components/misc/MiscPage.js` with MUI `Tabs`/`Grid` hosting three widgets:
   - **Timers:** `useTimers` hook (array of `{id,label,duration,remaining,running}`), tick via one `setInterval` (1s) using timestamps (`Date.now()`) not decrement counts, to avoid drift in background tabs. Audio/`Notification` on finish (optional).
   - **Reverse hourglass:** an SVG/CSS hourglass that fills as a countdown elapses (reusing a single timer); flip button resets.
   - **Dice/randomizer:** d4-d20 + custom N, number of dice, plus "pick from list" (textarea, one option per line) using `crypto.getRandomValues`.
3. Persist timers to `localStorage` so a refresh does not lose them.
4. Unit-test the hook logic and dice roll bounds.

**Acceptance:** three widgets work independently on desktop and mobile; timers survive refresh.
**Dependencies:** none; benefits from #6.

## #8 - Add description to the locations

**Issue text:** Probably put it in the API.

**Goal:** Add a description to each location, "probably in the API".

**Current state:** `locations.json` already contains an (empty) `description` field for most entries (entry "2" lacks it); `LocationsModal.js` shows the placeholder `***Pictures Here***` and ignores description. The data path is `locations.json` -> S3 `kaelnomads-resources` -> Lambda -> API Gateway -> `TravelMap.js`.

**Plan**
1. Data: fill in `description` for every entry in `locations.json` and add the missing key to entry "2". Treat it as optional text (Markdown allowed).
2. API: no schema change needed if the Lambda returns the object verbatim (see `website_iac` #17 and #16). Confirm the deployed Lambda passes unknown fields through; if it whitelists fields, add `description`.
3. UI: render `selectedLocation.description` in `LocationsModal.js` below the title (`Typography`, fall back to nothing when empty), replacing the placeholder. Escape/sanitise: render as text, not `dangerouslySetInnerHTML`; if Markdown is wanted use `react-markdown`.
4. Publish with `npm run update_locations` (fixed in the cleanup branch to use `aws s3 cp`). Clear `sessionStorage` when testing, since responses are cached per session.
5. Test: modal shows description when present, hides section when empty.

**Acceptance:** description visible in the modal for populated entries; empty ones render cleanly.
**Dependencies:** `website_iac` #17/#16 for the API side; feeds #4.

## #9 - Expand Alex's page

**Issue text:** expand the experiences using built-in web dev

**Goal:** Expand Alex's page using built-in web dev.

**Plan**
1. Build on the shared `ProfilePage` from #1. Sections as data (`src/data/profiles.js`): About, Experience (timeline), Skills (grouped chips: DevOps/AWS/Terraform, React, Python), Projects (cards linking to this site and `website_iac`, with a short "how it's built" blurb), Resume (link + inline PDF preview via `<object>`/`iframe`), Contact.
2. Use MUI `Timeline` (`@mui/lab`) or a simple `Stepper` for experience; `Accordion` for details to keep the page short on mobile.
3. "Built-in web dev" flourishes (no extra heavy deps): CSS scroll-snap or `scroll-behavior: smooth` section nav, `IntersectionObserver` reveal animations respecting `prefers-reduced-motion`, a dark-mode toggle via MUI `createTheme` palette mode persisted in `localStorage`, and `<meta>` / Open Graph tags in `public/index.html`.
4. Move the resume to the resources bucket path already used in `Alex.js` and verify the link works.
5. Tests: sections render; links have valid hrefs.

**Acceptance:** Alex page has structured sections, works on mobile, passes a Lighthouse accessibility check >= 90.
**Dependencies:** #1, #6, #2. Needs content from the user.

## #10 - Fileshare

**Issue text:** Due to VT's storage not being unlimited, bought Google storage. However, the data is still on google, so that needs to be migrated to a cheaper solution, such as S3.

**Goal:** Migrate fileshare data from Google storage to something cheaper (S3). Tracked jointly with `website_iac` #12 - infra is built there, this repo owns the UI if any.

**Plan**
1. **Do the migration first, no website needed:** use `rclone` (`rclone config` Google Drive remote -> S3 remote) to copy: `rclone copy gdrive: s3:<bucket>/ --progress --transfers 8 --checksum`. Verify with `rclone check`. Only then cancel the Google storage plan.
2. Storage class: S3 Intelligent-Tiering, or lifecycle rule moving objects to Glacier Instant/Deep Archive after N days for rarely read files (cheapest). Estimate cost with the AWS Pricing Calculator first.
3. (Optional UI, later) a `/files` page listing objects by prefix. Do not expose the bucket publicly: use CloudFront signed URLs or presigned S3 URLs from a Lambda behind auth (see the `website_iac` plan for the API and auth design). This repo adds the route, list view (MUI `List`/`DataGrid`), upload button posting to a presigned URL.
4. Document the bucket layout and restore procedure in the README.

**Acceptance:** all Google data present in S3 and verified by checksum; Google plan cancelled; (optional) authenticated browse/download page.
**Dependencies:** `website_iac` #12 (bucket, IAM, lifecycle, auth).
**Risks:** Google-native docs/sheets must be exported (rclone `--drive-export-formats`); egress is free from Google but check API quota limits.

## #11 - Cookbook

**Issue text:** Would like to add a cooking tab to help with weekly meal prep.

Ideally I can choose a dish I want, and then the backend DB can coordinate the ingredients to see what other cuisines I can also make and what I need to buy.

**Goal:** Cookbook tab for weekly meal prep: pick dishes, backend works out ingredients, overlaps, and a shopping list. Backend is tracked in `website_iac` #13.

**Plan (frontend)**
1. Route `/cookbook` (use the route-array refactor from #7). Components: `DishPicker` (search + MUI `Autocomplete`, multi-select), `PlanSummary` (selected dishes, servings), `ShoppingList` (aggregated ingredients grouped by aisle with checkboxes, persisted to `localStorage`), `DishSuggestions` ("you could also make...").
2. API contract (to agree with the backend): `GET /dishes`, `GET /dishes/{id}`, `POST /plan {dishIds[], servings}` -> `{ shoppingList: [{ingredient, qty, unit, aisle}], alsoPossible: [{dishId, missing: [ingredient]}] }`.
3. "What else can I make" logic lives in the backend (ingredient-set overlap: a dish is suggested when missing ingredients <= N). Frontend only renders the result.
4. A shared `useApi` hook (base URL from `REACT_APP_API_URL`, auth header) replaces the hardcoded fetch in `TravelMap.js`.
5. Tests with mocked fetch; empty/error states.

**Acceptance:** select 2+ dishes, see a merged shopping list and suggestions; list state survives refresh.
**Dependencies:** `website_iac` #13 (DynamoDB + Lambda), auth decision, #7 route refactor.

## Cross-cutting findings (tech debt)

- **Hardcoded API URL and `X-API-KEY` in `src/components/TravelMap.js`.** Move to `REACT_APP_API_URL` / `REACT_APP_API_KEY` (set as CodeBuild env vars via `website_iac`). The key ships to browsers regardless, so also rely on API Gateway throttling/usage plans and CORS, and rotate the key because it is in git history.
- **Build:** `aws_codebuild/*.yaml` run `npm install react-scripts` (unneeded) - use `npm ci`. `ENV_VAR: "hwllo"` is unused. `old_buildspec.yaml` and `script.sh` (CodeCommit mirror) are obsolete; delete after confirming.
- **Tests:** only the stock CRA `App.test.js` exists. Add tests as each plan is implemented.
- **Repeated route/tab index logic** in `App.js` and `HomePage.js`; refactor into one routes array (see #7).
- **Debug leftovers:** `console.log` in `App.js`, `HomePage.js`, `TravelMapLegend.js`; large commented-out blocks in `Keily.js`, `HomePage.js`, `TravelMap.js` (including a stale hardcoded `locationList`).
- **Platform age:** CRA is deprecated and React 17 is old; consider Vite + React 18/19 as a separate effort (do not mix with feature work).
- **Leaflet CSS** loads from the unpkg CDN in `public/index.html`; import `leaflet/dist/leaflet.css` from the package to avoid version drift.

# Multi-Point Inspection Report — Simple Design System (SDS)

_Inspected: 2026-09-08 · Technician: Claude (Sonnet 5) via Claude Code · Previous inspection: first inspection_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-09-08)_

## The short version

SDS is a **well-crafted set of components and tokens with a strong design-to-code bridge, and almost no operational infrastructure around it.** The "make good ingredients" work is genuinely done well: the token system is textbook (tiered, DTCG-format, near-zero hardcoded values), component naming is clean and consistent, the `react-aria-components` foundation gives real accessibility, and 96 Code Connect files tie design to code properly. The "keep it good and keep it alive" work is largely missing: **zero automated tests**, no visual regression, no releases or versioning, an **abandoned issue/PR backlog** (including 1.5-year-old Dependabot security bumps), a restricted and unanswered feedback channel, and hand-maintained AI-context files that the community has already flagged as stale. There is also a concrete shipped bug: the `text-*-tertiary` colour tokens **fail WCAG AA contrast** (~2:1) and nothing would catch it.

The three most load-bearing findings: **(1)** no testing infrastructure — every change, especially token changes, ships unverified, and downstream products inherit that; **(2)** the repo is effectively in stasis — unmaintained tracker, no owner triaging, no releases; **(3)** a real accessibility failure in the token system with no safety net.

**The single most important thing to do next: decide whether SDS is a maintained product or an archived reference, and state it publicly.** If maintained — wire lint + `axe` + visual regression into CI, clear the backlog, cut a `v1.0.0`. If archived — mark it clearly so the 437 forks know what they're standing on.

**Overall: 48/100** — a conversation starter, not a grade. Fix the reds, schedule the yellows, re-run on a cadence.
_All 10 stations inspected; no station scored N/I._

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |
|---:|:--------------------------------|:-------------|:-----:|-----------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |       6/10 |
|  2 | Best practices                  | Sound        |  🟡   |       6/10 |
|  3 | Accessibility                   | Sound        |  🟡   |       5/10 |
|  4 | Shared language                 | Sound        |  🟢   |       7/10 |
|  5 | Testing & validation            | Sound        |  🔴   |       2/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |       6/10 |
|  7 | Governance & version control    | Extensible   |  🔴   |       2/10 |
|  8 | Feedback & adoption             | Extensible   |  🔴   |       2/10 |
|  9 | Machine-readable docs & context | AI-Ready     |  🟡   |       6/10 |
| 10 | Agent access                    | AI-Ready     |  🟡   |       6/10 |
|    | **Overall**                     |              |       | **48/100** |

**Lights:** 🟢 1 green · 🟡 6 yellow · 🔴 3 red · 0 not inspected

**Key:** 🔴 Red (0–3) — the light is ON · 🟡 Yellow (4–7) — schedule a fix · 🟢 Green (8–10) — healthy · **N/I** — not inspected

## Evidence basis

- Design library: **live** (Figma MCP against the project's Figma file)
- Code library: **live** (full repo)
- Docs: **live** (Storybook + repo)
- Benchmarking: **Claude's own knowledge** (no design-systems knowledge MCP connected) — flagged per finding
- Governance/adoption (Stations 7–8): live read of `github.com/figma/sds` (issues, PRs, tags)
- Findings are **overwhelmingly `[verified]`** — direct file/Figma/GitHub reads. Exceptions: the component-staples benchmark (Station 1) is `[benchmark: Claude's knowledge]`; the generation/live tests (Stations 9–10) are partial, using `src/examples/` as proxy evidence.

## Station records

### Station 1 — Coverage & gaps: YELLOW (6/10)

**Inventory (sampled: full component index; design via Code Connect map + live Figma spot-checks)**

| Leg | Count | Source |
|---|---|---|
| Design | ~96 Code-Connected nodes across ~17 pages | `figma.config.json` + live `get_metadata` |
| Code | 28 primitives · 6 composition families · 3 layout primitives | `src/ui/*/index.ts` |
| Docs | 33 Storybook stories: 26/28 primitives · 2/6 composition families · 3 layout · 1 hook | `src/stories/**` |

**Evidence level:** design `live`, code `live`, docs `live`.

**Findings:**

- `[verified]` **Docs lag the other two legs.** `Icon` and `Logo` primitives have no story (26/28). Only `Cards` and `Forms` of the 6 composition families are documented — `Headers`, `Footers`, `Heroes`, `Panels` exist in code + Figma but have no Storybook story.
- `[verified]` **No high-level guidance anywhere.** No getting-started, theming, accessibility, i18n, or contribution page in Storybook. `_welcome/Hello` is a marketing blurb. README (repo-only) covers setup/structure but not usage guidance.
- `[verified]` **Token system is strong.** 500 CSS custom properties in generated `theme.css`; all categories tokenised (color, type, spacing `size-space`, radii `size-radius`, elevation `effects-shadows`/`size-depth`, stroke, blur); tiered primitive → semantic (`color-background-*`, `color-text-*`, `color-border-*`, `color-icon-*`); `tokens.json` is **DTCG / W3C Design Tokens format**, generated from Figma variables. **0 of 28 primitive CSS files contain a raw hex; only 2 contain any raw px.** Token discipline is a green within a yellow station.
- `[verified]` **`Notification` is inline-only and half-finished.** `variant: "message" | "alert"` — not a positioned/stacked/auto-dismiss toast. Source carries `// TODO: notification still needs an onDismiss handler or something`; the dismiss button renders but no `onDismiss` prop is wired.
- `[verified]` **Code-only components:** `Logo` and `ListBox` have no Figma component / Code Connect entry (`ListBox` likely folded into Select/Menu in design).
- `[verified + benchmark: Claude's knowledge]` **Missing common staples** vs Material / Carbon / Polaris / Spectrum / Primer:
  - **Breadcrumb** — absent in code and design
  - **Loading / Progress / Spinner / Skeleton** — none anywhere
  - **Empty state / error state** — no component or documented pattern
  - **Toast / Snackbar** — only the inline `Notification` above
  - **Combobox / autocomplete** — `Search` + `Select` + `ListBox` exist, no true typeahead
  - **Date picker / Calendar**, **Popover** — absent (lower priority for this system's purpose)
- `[verified]` **Coverage is skewed to marketing/content-site composition** — Heroes ×5, Panels ×4, Card Grids ×6, Pricing/Testimonial/Review cards, Newsletter/Register/Contact forms. Complete for landing/marketing pages; partial for application UI (dashboards, data-dense tools). Consistent with SDS's stated purpose as a Figma reference/teaching system.
- `[verified]` **No published, consumable artifact.** `package.json`: `"private": true`, `"version": "0.0.0"`, no `main`/`module`/`types`/`exports`/`files`. Cannot be `npm install`ed — consumption model is clone/fork the repo.

**Not inspected:** exhaustive per-component state/variant depth across all 28 (spot-checked Button: Figma models `State = Default/Hover/Disabled`, code CSS has `[data-hovered]` + `[data-focus-visible]`; neither models pressed/active as a distinct visual state).

**Deviations noted:** SDS is a reference/teaching system ("alpha"), so the absent package distribution and thin guidance docs are partly deliberate scope. The docs-vs-code/design imbalance and missing staples stand regardless of framing.

**First move:** Document the four undocumented composition families (`Headers`, `Footers`, `Heroes`, `Panels`) and add a getting-started + theming guide to Storybook — closes the widest leg gap. (If the goal shifts to "product teams consume this": publish a versioned package first.)

### Station 2 — Best practices: YELLOW (6/10)

**Sampled:** code — `Button`, `Accordion`, `Tab`, `Input`, `Notification` read end to end; design — `Button`, `Input Field` variant sets via live Figma; docs — `Accordion`, `Button`, `Input` stories; house rules — `.eslintrc.cjs`, `tsconfig.json`, `package.json`.

**Evidence level:** code `live`, design `live`, docs `live`.

**Findings:**

- `[verified] [format: code]` **Code craft is strong and consistent.** Every primitive is a thin, idiomatic wrapper over `react-aria-components`: `clsx(className, "name")`, prop forwarding, RAC type re-export (`export type TabProps = RACTabProps`), `forwardRef` where a ref is needed. Right-sized APIs — they compose RAC rather than reinventing, so downstream users inherit RAC's behaviour and accessibility for free. Semantic HTML comes from RAC; raw `<div>`/`<span>` usage is minimal. TypeScript `strict: true`. CSS references the semantic token tier (`var(--sds-color-text-*)`), not raw primitives.
- `[verified] [industry + format: code]` **Physical CSS properties, not logical — RTL/vertical-writing support is weak.** ~20 `left:` / ~19 `right:` plus `padding-left|right` and `margin-left|right` across primitive stylesheets; effectively no `padding-inline-*` / `inset-inline-*`. A modern design-system foundation should default to logical properties.
- `[verified] [format: code]` **A few magic numbers.** `Image` heights hardcoded (`10rem`/`20rem`/`30rem`, not from a size scale); `Text` has `padding-left: 1rem` and `font-size: 0.6em`. Isolated, but present.
- `[verified] [format: code / a11y]` **Contradictory ARIA in `Accordion`.** `<span role="img" aria-hidden="true" aria-label="accordion item indicator">` — `aria-hidden="true"` removes the node from the a11y tree, so `role="img"` and `aria-label` are dead code. (Also a Station 3 item.)
- `[verified] [org]` **House-rules enforcement is thin.** ESLint config = `eslint:recommended` + `@typescript-eslint/recommended` + react-hooks + storybook, with exactly **one** custom rule. **No `eslint-plugin-jsx-a11y`** — a11y anti-patterns like the one above aren't caught at lint time. No stylelint / token-compliance lint. No written conventions doc (confirmed Station 1). Prettier + organize-imports handle formatting.
- `[verified] [format: design]` **Design craft is good in what was sampled.** Clean, consistent variant naming via real Figma component properties — `Variant=Primary, State=Default, Size=Medium` (Button), `State=Default, Value Type=Placeholder` (Input Field). Organised into per-page sections with `_Component Annotation` instances. No junk layer names in the sample. Not fully inspected: auto-layout coverage, detached instances, file hierarchy (needs deeper live traversal).
- `[verified] [format: docs]` **Docs craft is weak.** Storybook stories are **example-only** — `render: () => <Component/>` with hardcoded demo content and mostly empty `args: {}`. No descriptions, anatomy, do/don't, or usage guidance. A minority (`Input`, `Textarea`, `Slider`) use a `docs:` parameter lightly; `Button` has proper `argTypes` controls; `Accordion` has none. Written for code consumers only.

**Not inspected:** live auto-layout / detached-instance audit of the Figma library; full sweep of all 28 component stylesheets for magic numbers (sampled).

**Deviations noted:** thin docs craft partly follows from SDS being a reference system, but the missing a11y lint and logical-properties default are craft gaps regardless of purpose.

**First move:** Add `eslint-plugin-jsx-a11y` to the lint config (catches the `Accordion` class of bug at PR time), and write a short `CONVENTIONS.md` capturing the RAC-wrapper pattern, the semantic-token rule, and "use logical properties" — so future contributions inherit the craft that's already mostly there.

### Station 3 — Accessibility: YELLOW (5/10)

**Sampled:** interactive components `Button`, `Accordion`, `Tab`, `Input`, `Dialog`, `Menu` (via source + RAC lineage); contrast computed from `theme.css` tokens in both colour schemes; CI config; dependency list.

**Evidence level:** code `live`, tokens `live`, testing `live` (config readable).

**Findings:**

- `[verified]` **Strong accessible foundation via `react-aria-components`.** Keyboard operability, focus management, and correct ARIA roles come from RAC for the interactive primitives (Disclosure, Tabs, TextField, Dialog, Menu…). This is the hard part, and SDS gets it right by building on RAC rather than hand-rolling.
- `[verified]` **Focus-visible styling in 18 of 28 primitive stylesheets** (~64%). Reasonable — several of the other 10 are non-interactive (Text, Logo) — but not a deliberate, swept-for-completeness pattern.
- `[verified] [WCAG 1.4.3]` **The `text-*-tertiary` token tier fails AA as text.** `--sds-color-text-default-tertiary` = `gray-400` = `#b3b3b3` on `background-default-default` (white) ≈ **2.0:1** — fails AA body text (4.5:1) and large text (3:1). `--sds-color-text-default-secondary` = `gray-500` = `#757575` ≈ **4.6:1** — passes AA body text, but only just. `default` tier ≈ 16:1, fine. Nothing documents the tertiary tier as decorative-only, and it's named `text-*`.
- `[verified]` **Dark mode is a full remapping** — 136 token overrides under `@media (prefers-color-scheme: dark)`, not an afterthought. But the tertiary-tier contrast issue almost certainly repeats there (not exhaustively computed).
- `[verified]` **Zero automated a11y verification.** No `axe-core`, `jest-axe`, keyboard-interaction tests, or screen-reader test plan anywhere. CI runs build + deploy only. Contrast has clearly been *considered* (semantic tiers, full dark mode) but never *validated* — which is how the tertiary tier slipped through.
- `[verified]` **No accessibility documentation.** No per-component a11y notes (stories are example-only), no org-level a11y guidance page, "accessible" not in any definition of done (no CONTRIBUTING).
- `[verified]` **Shipped ARIA bug** — the `Accordion` chevron `<span role="img" aria-hidden="true" aria-label=…>` (see Station 2). Exactly the class of thing an a11y lint rule or axe run would catch.

**Not inspected:** live screen-reader pass; exhaustive contrast matrix across every token pair and both modes; touch-target sizing.

**Deviations noted:** none claimed.

**First move:** Wire `axe-core` into CI (via `@storybook/test-runner` — it already enumerates every component) — highest-leverage single move, every future component checked forever. Then re-tier or explicitly document `text-*-tertiary` as decorative-only.

### Station 4 — Shared language: GREEN (7/10)

**Swept:** prop names across all 28 primitives; token naming scheme in `theme.css` / `tokens.json`; design↔code↔docs name traces for `Button`, `Button Danger`, `Tag`/`TagToggle`, `Tabs`, `Dialog` via Code Connect + live Figma.

**Evidence level:** code `live`, design `live`, docs `live`.

**Findings:**

- `[verified]` **Component APIs are consistent.** `variant` (8 components) with no competing `appearance`/`kind`; `size` (6) with no `scale`/`sz` drift; consistent field vocabulary (`label`, `description`, `placeholder`, `errorMessage`) formalised in shared prop types (`SharedFieldProps`, `SharedTagProps`); boolean props follow RAC's `isX` convention (`isDisabled`, `isExpanded`, `isDismissible`). SDS does **not** have the naming-drift problem that's the single most common design-system issue.
- `[verified]` **Token naming is textbook.** One coherent scheme — `--sds-{category}-{role}-{variant}-{state}` (`color-background-brand-default`, `color-text-danger-secondary`, `size-space-*`, `size-radius-*`). **Role-named at the semantic tier** (`color-text-brand-default`), value-named only at the primitive tier (`color-brand-800`). No competing legacy scheme.
- `[verified]` **Names trace cleanly across assets.** Figma `Variant=Primary` → code `variant="primary"` → Button story, mapped explicitly in the `.figma.ts` Code Connect file. `Tag`/`Tag Toggle`/`Tag Toggle Group` ↔ `Tag`/`TagToggle`/`TagToggleGroup` 1:1. Minor style differences only (Figma "Button Danger" ↔ code `ButtonDanger`).
- `[verified]` **Design decomposes `Text` into ~20 named components** (`Text Heading`, `Text Small`, `Text Price`, `Text Code`…) vs one `Text` family with sub-exports in code. Names align (`Text Heading` ↔ `TextHeading`) but the design-side count is a maintenance surface and a mild cross-asset asymmetry.
- `[verified]` **No guardrails.** No documented naming algorithm, no naming validator, no lint rule for prop or token names. Consistency currently rests on a small team's discipline + inherited RAC conventions — good today, nothing catches drift at PR time.

**Not inspected:** exhaustive within-Figma layer-naming audit.

**Deviations noted:** none.

**First move:** Write the naming algorithm down (token pattern + prop conventions: `variant` not `kind`, `size` not `scale`, `isX` booleans) into the `CONVENTIONS.md` from Station 2, and add a lightweight test asserting prop-name consistency across the barrel export. That's the gap between this green-quality *practice* and a green *score*.

### Station 5 — Testing & validation: RED (2/10)

**Inspected:** `.github/workflows/main.yml`; `package.json` scripts + dependencies; full repo search for test/spec files and test tooling.

**Evidence level:** `live` (all config and source readable).

**Findings:**

- `[verified]` **Zero test files.** No `.test.*` / `.spec.*` anywhere. No `vitest`, `jest`, `@testing-library/*`, or `playwright` in dependencies. Nothing asserts any component behaviour.
- `[verified]` **CI is build + deploy only.** `main.yml`: `npm ci` → `npm run build` (`tsc && vite build` + Storybook build) → deploy to GitHub Pages. TypeScript `strict` type-checking and build-breakage detection are the *entire* validation floor.
- `[verified]` **Lint exists but isn't enforced.** `npm run app:lint` (`eslint … --max-warnings 0`) is defined but **not run in CI** — local-only, optional.
- `[verified]` **No visual regression.** No Chromatic / Percy / Playwright screenshots. On a system where every visual is token-driven, each token change ships unverified — the skill's exact warning.
- `[verified]` **No design-side validation** (no FigmaLint-style checks) and **no evals** for AI-assisted output despite Code Connect + AI tooling being a core selling point of SDS.

**Not inspected:** nothing withheld — the absence is comprehensive.

**Deviations noted:** SDS is a reference system, but "the thing every downstream product inherits ships with no component tests, no visual regression, and no a11y checks" is the check-engine light fully on regardless of purpose. The `tsc`-in-CI floor is why this is 2/10, not 0.

**First move:** Wire the existing `app:lint` into CI today (zero new dependencies). Then add `@storybook/test-runner` with `axe-core` — it reuses the stories that already enumerate every component to get behaviour + a11y + (with a screenshot step) visual-regression coverage in one move.

### Station 6 — Orchestration: YELLOW (6/10)

**Diffed / traced:** token pipeline (`scripts/tokens/` → `theme.css` → `index.css`); Code Connect setup (`@figma/code-connect`, `figma.config.json`, 96 `.figma.ts` files); Storybook stories vs component APIs; git history of the last ~15 changes; CI config.

**Evidence level:** code `live`, design `live` (Code Connect + Figma), docs `live`.

**Findings:**

- `[verified]` **Tokens have a single source of truth, but sync is manual.** `scripts/tokens/app.mjs` pulls from Figma Variables (REST API or plugin JSON) and generates `src/theme.css` (+ DTCG `tokens.json`), imported via `src/index.css`. One source → one generated artifact. **But regeneration is a hand-run `npm run script:tokens` and `theme.css` is committed — it is not in CI.** Change a Figma variable and nothing updates the CSS until a human remembers.
- `[verified]` **The design↔code bridge is thorough but unenforced.** 96 Code Connect files map Figma nodes to components with explicit prop mapping (`getEnum("Variant", {Primary: "primary"})`). `@figma/code-connect` is a dependency and git history shows active maintenance ("Migrate Code Connect to template files", "fix cc files not using react helper"). **But there is no `figma connect publish` script and no CI step to publish or validate the mappings** — publishing to Dev Mode is a manual `npx figma connect publish`, and nothing checks that the `.figma.ts` files still match the code.
- `[verified]` **Docs are hand-maintained and unchecked.** Storybook stories manually compose examples (`Select.stories.tsx` etc.) — not generated from types or props. Add or rename a prop and the story silently goes stale; nothing verifies story-vs-API parity.
- `[verified]` **Design and code do trace cleanly** where checked (Station 4): Figma variant names → code props via Code Connect, 1:1 component naming. The *connective architecture* is a genuine strength.
- `[verified]` **No drift detection anywhere.** Nothing notices when Figma and code diverge, when `theme.css` is stale vs Figma, or when a story no longer matches its component.
- `[verified]` **Change flow is PR-to-`main`** (git history), but with no PR template and no definition of done spanning design + code + docs (Station 1), lockstep updates rely on discipline, not process.
- `[verified]` **`scripts/dev-resources`** pushes code/docs links back into Figma — a nice reverse-direction connector that exists but, like the rest, runs manually.

**Not inspected:** pixel-level visual diff of rendered components vs Figma frames; whether the last few real changes actually updated all three legs (would need PR-level detail / interview).

**Deviations noted:** manual pipelines are more defensible for a small reference system than for a platform org — but "nothing tells you when it's out of sync" is the yellow condition regardless.

**First move:** Add a CI job that runs `script:tokens` and fails if `theme.css` changes (Figma edited, CSS not regenerated) plus `figma connect publish --dry-run` to validate the mappings parse. Turns "someone remembers" into "the build tells you."

### Station 7 — Governance & version control: RED (2/10)

**Inspected:** repo artifacts; `github.com/figma/sds` — open/closed issues, open PRs, tags/releases, tracker settings. (User is not the maintainer and will not action these; assessed for completeness.)

**Evidence level:** repo `live`; upstream GitHub `live` (read-only fetch).

**Findings:**

- `[verified]` **No governance artifacts.** MIT `LICENSE` only. No CONTRIBUTING, CHANGELOG, PR template, issue template, CODE_OF_CONDUCT, SECURITY, release-process doc, or ecosystem guidelines. The only "how to work here" file is `.github/copilot-instructions.md` — written for agents, not humans.
- `[verified]` **No releases, no version tags.** `github.com/figma/sds/tags` → "There aren't any releases here." `package.json` sits at `0.0.0`. No changelog — history is git-only. No semantic versioning, migration guidance, or deprecation process.
- `[verified]` **Abandoned backlog.** 5 open issues spanning **Oct 2024 – Apr 2026**, none visibly triaged or answered by a maintainer (#18 and #20 open ~2 years; #23, #26 are unanswered user questions). **6 open PRs, all 1–1.8 years old**, apparently unreviewed — including **two Dependabot security bumps** ("Bump cookie and express") open ~1.5 years.
- `[verified]` **Issue creation is restricted** on the repo — the public feedback path is closed, on top of the lack of triage.
- `[verified]` **No labels, no templates, no visible active owner.** 37 closed PRs show the repo *was* actively developed (through the Code Connect template migration), then went quiet.

**Not inspected:** branch-protection rules (not externally visible); Figma-internal process, if any.

**Deviations noted:** SDS is a teaching reference and Figma may treat it as low-maintenance by design — but a restricted, untriaged tracker and 1.5-year-old unmerged security PRs are "unmaintained," not "deliberate scope." The clean git history and PR-based flow (when changes happen) are why this is 2/10, not lower.

**First move (for the maintainer, not the user):** Either formally mark the repo "reference only — not actively maintained" to set expectations, **or** assign an owner, clear the stale PRs (Dependabot first), add CONTRIBUTING + CHANGELOG, and cut a `v1.0.0`.

### Station 8 — Feedback & adoption: RED (2/10)

**Measured:** `github.com/figma/sds` stars/forks; npm publication status; issue-tracker activity; open external PRs; presence of analytics / roadmap / support channels.

**Evidence level:** upstream GitHub `live`; distribution `live` (package.json).

**Findings:**

- `[verified]` **Adoption cannot be measured, and isn't.** `private: true`, not on npm → no download stats. "Adoption" here means *forked and adapted* (437 forks, 840 stars) — real reach for a reference system, but a vanity metric with no story behind it. No usage analytics, no consumer-repo dependency scanning, no design-library analytics.
- `[verified]` **The feedback loop is nominal but non-functional.** Issue creation is **restricted**; the handful of existing issues (e.g. #23 "More information on how to copy layout and styles", #26 "sample repo of code-connect for SwiftUI?") are **unanswered**. No support channel, office hours, or intake form linked.
- `[verified]` **Unmet contribution energy.** External PRs (an appointment-booking page, config updates) sit unmerged for a year+ — people tried to give back and got no response.
- `[verified]` **No roadmap connection.** No public roadmap, no backlog reflecting product needs, no visible link between SDS and Figma's own product work.
- `[verified]` **No cadence.** The repo's build-then-quiet activity pattern is the signature of one-and-done, not scheduled review. (This inspection is itself the first "review" on record.)

**Not inspected:** Figma Community file duplicate/usage metrics (not visible to us); any Figma-internal adoption signal.

**Deviations noted:** "adoption" is inherently fuzzy for a reference system — but a *closed, unanswered* tracker actively prevents the feedback loop rather than neutrally scoping it out. The fork/star count and the Community file (a real design-side distribution path) are why this is 2/10, not lower.

**First move (for the maintainer):** Re-open issues with a template, triage the backlog, and add a one-line "how this is maintained" statement so forkers know what to expect. For a reference system, an honest "here's the support model" beats silence.

### Station 9 — Machine-readable docs & context: YELLOW (6/10)

**Inventoried:** `theme.css` / `tokens.json`; TypeScript component types; `scripts/component-metadata/components.json`; `.github/copilot-instructions.md` (408 lines); `.cursor/rules/usage-guidelines.mdc`; searched for `llms.txt` / `CLAUDE.md` / `AGENTS.md`. **Generation test:** partial (see below).

**Evidence level:** `live` (all files readable).

**Findings:**

- `[verified]` **Machine-consumable raw materials are strong.** Tokens as CSS custom properties **and** W3C DTCG `tokens.json`; fully typed component APIs; 96 Code Connect files mapping design→code with prop translation.
- `[verified]` **A real, deliberate AI-facing context layer exists.** `.github/copilot-instructions.md` is 408 substantive lines: import aliases, token rules, component hierarchy, translation patterns, and a **"Common Pitfalls" section with ❌ code examples** (hardcoding values, custom layout CSS, `active` vs `isSelected`). Rules are phrased as rules, not vibes. This is better than most systems have.
- `[verified]` **But the layer is hand-maintained, duplicated, and already rotting.** `.github/copilot-instructions.md` and `.cursor/rules/usage-guidelines.mdc` are near-duplicate hand-written files (same opening paragraph) — two things to keep in sync. Upstream **issue #43 is literally "Outdated/incorrect Figma MCP tool names and field names in AI instruction files"** — the community has already reported these instructions as stale.
- `[verified]` **Component-level metadata is thin.** `components.json` is ~411 entries but **287 are icons** with keyword strings; for actual components it carries only `{id, page, name, constant}` — a node-ID/naming index, **not** purpose, anti-patterns, composition rules, or a11y contracts.
- `[verified]` **No `llms.txt`, no `CLAUDE.md`, no `AGENTS.md`.** Copilot and Cursor are covered; agent-agnostic and index surfaces are not.
- `[verified]` **Storybook stories have no machine-legible structure** (Station 2) — an agent can't reliably find "props / usage / don'ts" in a consistent place per component.
- `[verified]` **Freshness is mixed.** Tokens + `components.json` are generated from Figma; TS types are source-of-truth; the instruction files are hand-written and demonstrably drift (#43).

**Generation test:** not run cold this pass, but `src/examples/` (WelcomeHero, PricingGrid, ProductDetails, FAQs) are team-built assembled compositions that render correctly in the dev server — evidence the context is sufficient to produce on-system output for SDS's marketing-page domain. A fresh cold test on an unseen composition remains the proper proof.

**Not inspected:** a controlled generation test with a fresh agent and a novel composition.

**Deviations noted:** none.

**First move:** Consolidate the two instruction files into one source; generate an `llms.txt` index and per-component metadata (purpose, props, anti-patterns, a11y) from types + stories so it can't drift; resolve issue #43.

### Station 10 — Agent access: YELLOW (6/10)

**Surfaces mapped:** Code Connect (`@figma/code-connect`, 96 `.figma.ts`, `figma.config.json`); Figma MCP (tested live this session); `.github/copilot-instructions.md`; `.cursor/rules/`; searched for `mcp.json` / SDS query API. **Live test:** partial (see below).

**Evidence level:** `live` (repo + Figma MCP verified).

**Findings:**

- `[verified]` **The design→code bridge is genuinely strong.** 96 Code Connect files with real prop mapping (`getEnum("Variant", {Primary: "primary"})`). An agent working from a Figma selection with Code Connect gets real SDS components, not lookalikes. `get_code_connect_map` is callable. On its own this leg is green.
- `[verified]` **Figma MCP access works** — confirmed this session against the user's file (`get_metadata` returned real component variant sets).
- `[verified]` **No SDS-specific query surface.** No MCP server, knowledge graph, or API to ask "what SDS components exist" / "what's the Button token contract." No `mcp.json` in the repo to auto-configure anything. Agents rely on reading files.
- `[verified]` **IDE integration is partial.** Copilot (`copilot-instructions.md`) and Cursor (`.cursor/rules/`) auto-load their context. **Claude Code and other agents get nothing** — no `CLAUDE.md`/`AGENTS.md`. (This inspection only ran because the user installed a separate skill — SDS contributed no agent context to Claude Code.)
- `[verified]` **The bridge isn't guaranteed live.** Code Connect is never published or validated in CI (Station 6) — Dev Mode mappings depend on someone running `npx figma connect publish`.
- `[verified]` **Stale tool references.** The instruction files tell agents to use `#get_image` / `#get_code` — issue #43 reports these names are now wrong.
- `[verified]` **Not discoverable.** README mentions Storybook and the Figma file but has **no "AI tooling" section**; the Copilot/Cursor files aren't announced.
- `[verified]` **One repeatable workflow exists** — the documented 5-step "Figma Translation Process" (extract → identify SDS components → check APIs → semantic imports → apply tokens). No other workflows, no shared "where agents can/can't be trusted" statement.

**Live test:** not run cold; `src/examples/` + the rendering dev server demonstrate the access surface produces working on-system results for the marketing-page domain. Off-system output is expected where SDS has coverage gaps (breadcrumb, toast, loading — Station 1).

**Not inspected:** a controlled build-a-page test through each access surface with output grading.

**Deviations noted:** none.

**First move:** Add a generated agent-agnostic `CLAUDE.md`/`AGENTS.md`; wire `figma connect publish` into CI so the bridge is always live; fix the stale MCP tool names (#43); add an "AI tooling" section to the README.

## What changed since last inspection

First inspection — no delta.

## Next service

- Work order: `ds-inspection/work-orders/2026-09-08-work-order.md`
- Recommended cadence: deep inspection quarterly; wire Stations 3 & 5 checks (axe + lint + a smoke test) into CI now so they run every change.
- Re-inspect by: 2026-12-08 (or sooner if the "maintained vs archived" decision below is made).

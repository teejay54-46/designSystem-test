# Work Order — Simple Design System (SDS)

_From inspection: `reports/2026-09-08-inspection.md` · Written: 2026-09-08_

Reds get fixed now. Yellows get scheduled. The green (Station 4, shared language) gets left alone and kept that way. Every item cites its station and evidence.

**Context:** this inspection was run as a learning exercise on Figma's public `figma/sds` via a fork. The person who ran it is **not the SDS maintainer** and will not action these items — the work order is written for whoever owns SDS at Figma, or for anyone forking SDS as a foundation.

---

## 🔴 Fix now (reds)

### 1. Make the "maintained vs archived" call — and say it out loud
- **Station:** 7 (Governance) + 8 (Feedback) · **Evidence:** `[verified]` no releases; 5 stale untriaged issues (some ~2 yrs); 6 unmerged PRs 1–1.8 yrs old incl. 2 Dependabot security bumps; issue creation restricted; no CONTRIBUTING/CHANGELOG.
- **Why it's first:** every other governance and adoption fix depends on this answer, and 437 forks are currently building on a repo with no stated support model.
- **First move:** One sentence in the README — either *"Actively maintained, contributions welcome, see CONTRIBUTING"* or *"Reference implementation — not actively maintained; fork and adapt."*
- **AI assist:** draft the CONTRIBUTING / CHANGELOG / support-model statement; triage + dedupe the backlog with priority suggestions. Human makes the maintained/archived decision.
- **Done when:** README states the support model; the Dependabot PRs are merged or explicitly closed with a reason.
- **Effort:** S (decision) / M (if "maintained")

### 2. Stand up a testing floor in CI
- **Station:** 5 (Testing) · **Evidence:** `[verified]` zero `.test`/`.spec` files; no test tooling installed; CI = build + deploy only; `app:lint` defined but not run in CI; no visual regression.
- **Why it's first:** it's the leg every downstream product inherits, and it's completely absent. It also unblocks Station 3 (a11y checks ride on it).
- **First move:** (a) add `npm run app:lint` as a CI step today — zero new deps. (b) add `@storybook/test-runner` + `axe-core` — reuses the 33 existing stories to get render + behaviour + a11y coverage in one move. (c) add a screenshot step (Playwright or Chromatic) for token-change visual regression.
- **AI assist:** generate the test-runner config, the CI job, and a coverage report of unasserted behaviours. Human reviews what "passing" should mean.
- **Done when:** lint + a11y + a render smoke test run on every PR and block merge on failure.
- **Effort:** M

### 3. Fix the `text-*-tertiary` contrast failure
- **Station:** 3 (Accessibility) · **Evidence:** `[verified]` `--sds-color-text-default-tertiary` = `#b3b3b3` on white ≈ **2.0:1**, fails WCAG AA (needs 4.5:1 text / 3:1 large). `text-*-secondary` ≈ 4.6:1 — passes but marginal.
- **Why it's here:** it's a shipped, concrete a11y bug in the foundation, inherited by every consumer, and it's named `text-*` with nothing saying "decorative only."
- **First move:** either darken the tertiary tier to clear 4.5:1 in both colour modes, or rename it (`text-*-disabled` / `text-*-decorative`) and document that it must not carry meaningful text. Retune at the token level so it fixes everywhere.
- **AI assist:** compute the full contrast matrix across every text/background token pair in both modes; propose compliant values.
- **Done when:** every `text-*` token used for body or label text clears AA in light and dark; the contrast matrix is a CI check (rides on item 2).
- **Effort:** S

---

## 🟡 Schedule (yellows)

### 4. Close the docs gap (Station 1)
- **Evidence:** `[verified]` 4 of 6 composition families (Headers, Footers, Heroes, Panels) + `Icon`/`Logo` primitives undocumented; no getting-started / theming / a11y / contribution guidance anywhere.
- **First move:** add stories for the 4 undocumented composition families; add a "Getting Started" + "Theming" MDX page to Storybook. · **Done when:** every exported component has a story; Storybook has a guidance section. · **Effort:** M · **Timing:** this quarter.

### 5. Write `CONVENTIONS.md` and add lint enforcement (Stations 2 + 4)
- **Evidence:** `[verified]` one custom ESLint rule; no `eslint-plugin-jsx-a11y`; no written naming algorithm despite consistent practice; shipped ARIA bug in `Accordion`.
- **First move:** add `eslint-plugin-jsx-a11y`; write `CONVENTIONS.md` (RAC-wrapper pattern, semantic-token rule, `variant` not `kind` / `size` not `scale` / `isX` booleans, "use logical properties"). · **Done when:** a11y lint runs in CI; conventions doc exists and is linked from CONTRIBUTING. · **Effort:** S · **Timing:** with item 2.

### 6. Convert physical CSS properties to logical (Station 2)
- **Evidence:** `[verified]` ~40 `left:`/`right:`/`padding-left|right`/`margin-left|right` across primitive stylesheets; no `*-inline-*`. RTL and vertical writing modes will break.
- **First move:** codemod `padding-left/right` → `padding-inline-start/end` etc.; add a stylelint rule banning physical properties. · **Done when:** no physical inline-axis properties in `src/ui`; stylelint enforces it. · **Effort:** M · **Timing:** this quarter.

### 7. Automate the sync pipelines (Station 6)
- **Evidence:** `[verified]` token regen (`script:tokens`) is manual and not in CI; Code Connect never published/validated in CI; stories hand-maintained with no parity check.
- **First move:** CI job that runs `script:tokens` and fails if `theme.css` changes; `figma connect publish --dry-run` on every PR; publish Code Connect on merge to `main`. · **Done when:** the build fails when Figma and code are out of sync. · **Effort:** M · **Timing:** this quarter.

### 8. Consolidate + generate the AI-context layer (Stations 9 + 10)
- **Evidence:** `[verified]` `.github/copilot-instructions.md` and `.cursor/rules/*.mdc` are near-duplicate hand-written files; upstream issue #43 reports them stale; no `llms.txt` / `CLAUDE.md` / `AGENTS.md`; per-component metadata is icon-keyword-heavy, no purpose/anti-patterns/a11y contracts.
- **First move:** single source for agent instructions → generate `copilot-instructions.md`, `.cursor/rules`, `CLAUDE.md`, `AGENTS.md`, `llms.txt` from it; generate per-component metadata from types + stories; resolve #43. · **Done when:** one edit updates every agent surface; metadata is generated, not hand-written. · **Effort:** M · **Timing:** this quarter.

### 9. Fill the component staples (Station 1)
- **Evidence:** `[verified + benchmark]` missing Breadcrumb, Loading/Spinner/Skeleton, Empty state, real Toast, Combobox; `Notification` has an unwired `onDismiss` (`// TODO` in source).
- **First move:** decide per-component against real need (SDS is marketing-oriented — some gaps may be fine); wire `Notification.onDismiss` regardless. · **Done when:** the gap list is triaged with a build/skip decision each. · **Effort:** L · **Timing:** next quarter / as needed.

---

## 🔧 Access upgrades (sharper next inspection)

- **Connect the Southleft `design-systems-mcp`** (`https://design-systems-mcp.southleft.com/mcp`) and re-run Stations 1–3 — moves industry/coverage/WCAG benchmarking from "Claude's own knowledge" to cited sources.
- **Run a cold generation test** (fresh agent, novel composition) for Stations 9 & 10 — currently "provisional" evidence from `src/examples/`; the test is the real proof.
- **Publish Code Connect** so the design→code bridge is verifiably live in Dev Mode (also item 7).

## 🟢 Keeping the green green

- **Station 4 (Shared language):** the practice is green-quality — the risk is drift. Add the naming validator from item 5 so consistency survives contributors who don't know the unwritten rules.

## Cadence

- Re-inspect (deep, all 10 stations): **2026-12-08**, or immediately after the "maintained vs archived" decision (item 1).
- Everyday checks to wire into CI now (item 2): ESLint, `axe-core`, render smoke test, token/Code-Connect sync check.
- Owner of this work order: _unassigned — SDS has no visible maintainer (Station 7)._

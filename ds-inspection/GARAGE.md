# GARAGE.md — Simple Design System (SDS)
_Checked in: 2026-09-08 · Re-confirm at next inspection_

## Vehicle
- **System:** Simple Design System (SDS) — Figma's open reference design system
  ([github.com/figma/sds](https://github.com/figma/sds)), inspected via a personal
  learning fork.
- **Team:** built by Figma; for scoring, framed as a **small-team system (1–3 people)**.
- **Consumers:** none tracked — SDS is a public reference/teaching system, not deployed
  to product teams.
- **Age & mileage:** repo ~50 commits; SDS self-describes as **"alpha"** in its README.
- **Reason for service:** learning exercise — first run of the `ds-inspection` skill,
  deliberately on a real, reasonably mature system to see what the 10-station lens reveals.

## Assets
- **Design library:** a personal duplicate of the SDS Community Figma file.
  Components organised by page (Buttons, Inputs, …);
  variants expressed as Figma component properties (`Variant` / `State` / `Size`).
- **Code library:** React 18 + TypeScript + Vite. Package `sds@0.0.0`, `"private": true`
  — **not published, not distributed as a consumable artifact**. 28 primitives, 5
  composition categories, built on `react-aria-components`. Token pipeline:
  `scripts/tokens/app.mjs` generates `src/theme.css` from Figma (REST API or plugin JSON).
- **Documentation:** Storybook (33 stories), custom-themed; README with a structure
  section. No standalone docs site (Zeroheight / Supernova / custom).
- **Process ephemera:** `LICENSE` (MIT) only. **No** CONTRIBUTING, CHANGELOG, PR/issue
  templates, CODE_OF_CONDUCT, or SECURITY. One GitHub Actions workflow: build + deploy
  Storybook to GitHub Pages (no test / lint / a11y steps).
- **AI surface:** 96 Code Connect files (`src/figma/**/*.figma.ts`) + `figma.config.json`
  URL map; `.github/copilot-instructions.md`; `.cursor/rules/usage-guidelines.mdc`;
  generated `theme.css` (CSS custom properties); TypeScript component types.
  **No** `llms.txt`, `CLAUDE.md`, or `AGENTS.md`.

## Evidence access map
| Asset | Access | Verified how |
|---|---|---|
| Design library | **live** | Figma MCP `get_metadata` on the project's Figma file returned the Buttons page with every component variant |
| Code library | **live** | Full repo is the working directory — all source readable |
| Documentation | **live** | Storybook running at `localhost:6006`; README + 33 story files readable |
| Process ephemera | **live (repo) / interview** | Repo artifacts readable; issue/PR tracker not sampled — the fork has no real consumer activity |

## Known symptoms
- None reported. Exploratory inspection, not incident-driven.

## Probable greens (to verify)
- Code Connect coverage (96 files) → Station 10
- `react-aria-components` foundation → Station 3 (accessibility)
- Generated token pipeline → Stations 6 and 9

## Intentional deviations
- SDS is explicitly a **reference/teaching system ("alpha")**, not a production platform
  system. Missing governance artifacts and package distribution may be deliberate scope
  choices — findings will note this where the context supports it, rather than scoring
  them as outright failures.

## Scope & frame
- **Stations this pass:** all 10.
- **Scoring frame:** small-team system (1–3 people).
- **Out of scope:** nothing explicitly. Adoption / tracker-history evidence (Station 8)
  is thin — it's a fork with no real consumers — so that station will lean `[reported]`
  or N/I where evidence can't be gathered.

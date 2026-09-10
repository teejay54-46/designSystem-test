# Button — Component Configuration

> An action trigger. Renders a native `<button>`, or an `<a>` when given `href`.
> Built on `react-aria-components`: keyboard-operable, `onPress` for every input
> type, visible focus ring. Every colour is a semantic token.

- **Component:** `Button` (`src/ui/primitives/Button/Button.tsx`)
- **Related:** `ButtonDanger` (destructive actions), `IconButton` (icon-only),
  `ButtonGroup` (layout of multiple buttons)
- **Status:** stable

---

## Anatomy

| # | Part | Required | Notes |
|---|------|----------|-------|
| 1 | Leading icon (`Icon Start`) | optional | one icon max; toggled by `Has Icon Start` |
| 2 | Label | **required** | names the action — "Save changes", not "OK" |
| 3 | Trailing icon (`Icon End`) | optional | one icon max; toggled by `Has Icon End` |

Container: `display: inline-flex`, gap `Size/Space/200`, corner radius
`Size/Radius/200`, `Size/Stroke/Border` inset border.

---

## Properties

### `Variant` — visual emphasis

| Value | Code | Use for |
|-------|------|---------|
| `Primary` | `variant="primary"` | the single main action of a view or section |
| `Neutral` | `variant="neutral"` | secondary actions alongside a Primary |
| `Subtle` | `variant="subtle"` | low-emphasis / inline actions; no fill until hover |

Destructive actions do **not** use a `Variant` here — use the separate
`ButtonDanger` component.

### `State`

| Value | Driven by | Behaviour |
|-------|-----------|-----------|
| `Default` | — | resting |
| `Hover` | runtime (`[data-hovered]`) | background steps one shade darker |
| `Pressed` | runtime (`[data-pressed]`) | background steps darker again + inner shadow (`Effects/Shadows/Inner Shadow 100`) + 1px downward offset (`Size/Depth/025`) |
| `Disabled` | **`isDisabled` prop** | greyed, `pointer-events: none`, removed from tab order, announced as disabled |

`Hover` and `Pressed` are **visual states only** — react-aria sets them at
runtime. They are not props and not mapped in Code Connect.
Keyboard focus shows a separate focus ring (`[data-focus-visible]`), not a
`State` value.

### `Size`

| Value | Code | Font | Padding |
|-------|------|------|---------|
| `Medium` (default) | `size="medium"` | `Font/Body/Base` | `Size/Space/300` |
| `Small` | `size="small"` | `Font/Body/Small` | `Size/Space/200` |

### `Has Icon Start` / `Has Icon End`

Booleans that reveal the leading / trailing icon slot. Label remains required.

### `Label`

String. Must describe the action performed.

---

## Props (code API)

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `"primary" \| "neutral" \| "subtle"` | `"primary"` | |
| `size` | `"small" \| "medium"` | `"medium"` | |
| `children` | `ReactNode` | — | label plus optional icon elements |
| `isDisabled` | `boolean` | `false` | react-aria prop |
| `onPress` | `(e) => void` | — | use instead of `onClick` — fires for mouse, touch, and keyboard |
| `href` | `string` | — | when set, renders `<a>` (a styled link) instead of `<button>` |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | native button type; ignored when `href` is set |

---

## Token bindings

All values are semantic tokens — **no hardcoded colours, spacing, or radii**.

| Variant | Background · Default → Hover → Pressed | Border | Text |
|---------|----------------------------------------|--------|------|
| Primary | `Background/Brand/Default` → `Background/Brand/Hover` → `Background/Brand/Pressed` | `Border/Brand/Default` | `Text/Brand/On Brand` |
| Neutral | `Background/Neutral/Tertiary` → `Background/Neutral/Tertiary Hover` → `Background/Neutral/Tertiary Pressed` | `Border/Default/Default` | `Text/Default/Default` |
| Subtle | `transparent` → `Background/Default/Default Hover` → `Background/Default/Tertiary` | `transparent` | `Text/Default/Default` |
| **Disabled** (any variant) | `Background/Disabled/Default` | `Border/Disabled/Default` | `Text/Disabled/Default` |

Shared: radius `Size/Radius/200` · border `Size/Stroke/Border` · gap `Size/Space/200`
· pressed inner shadow `Effects/Shadows/Inner Shadow 100` · pressed offset `Size/Depth/025`.

`Background/Brand/Pressed` and `Background/Neutral/Tertiary Pressed` are aliases
of `Brand/1000`→`Brand/500` and `Slate/400`→`Slate/1000` (SDS Light → SDS Dark).

---

## Usage rules

- **Do** use exactly one `Primary` button per view or discrete section.
- **Do** wire actions to `onPress`, not `onClick`.
- **Do** set `href` when the button navigates — it then renders a real `<a>`.
- **Do** route destructive actions (delete, remove, discard) to `ButtonDanger`.
- **Don't** use `Subtle` for a page's main action.
- **Don't** nest a Button inside a link, or inside another button.
- **Don't** ship an icon-only Button — use `IconButton` (it requires `aria-label`).
- **Don't** hardcode a colour, padding, or radius — bind a token.

---

## Accessibility

- Renders a native `<button>` (or `<a>` with `href`); no extra ARIA needed for
  the standard case.
- Fully keyboard operable: `Space` / `Enter` activate; `Space` held shows the
  pressed state.
- Visible focus indicator on keyboard focus only (`:focus-visible`), never on
  pointer click.
- `Disabled` buttons leave the tab order and are announced as disabled.
- Every text-on-background token pair meets **WCAG 2.1 AA** contrast in both
  SDS Light and SDS Dark. (Button does not use the `Text/*/Tertiary` tokens,
  which fail AA and are flagged separately in the design-system inspection.)
- Label must convey the action out of context.

---

## Code Connect

`src/figma/primitives/button/Button.figma.ts`

| Figma | Code |
|-------|------|
| `Variant` (Primary / Neutral / Subtle) | `variant` |
| `Size = Small` | `size="small"` (Medium is the default, omitted) |
| `State = Disabled` | `isDisabled` |
| `State = Hover` / `Pressed` | *not mapped — runtime visual states* |
| `Has Icon Start` + `Icon Start` | leading child |
| `Has Icon End` + `Icon End` | trailing child |
| `Label` | text child |

```tsx
import { Button } from "primitives";

<Button onPress={() => {}} variant="primary" size="small">
  <IconArrowLeft />
  Label
</Button>
```

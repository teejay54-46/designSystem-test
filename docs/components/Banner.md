# Banner — Component Configuration

> A full-width banner with a heading, an optional subheading and one or two
> actions. Built from `Section`, `TextContentTitle` and `ButtonGroup`, with
> `Button` for each action. Every colour and space is a semantic token.

- **Component:** `Banner` (`src/ui/compositions/Sections/Banners.tsx`)
- **Related:** `Button`, `Section`, `TextContentTitle`, `Hero` (layout wrapper)
- **Status:** pilot (Contentful composite component)

---

## Properties

| Figma property | Code prop | Contentful field | Notes |
|----------------|-----------|------------------|-------|
| `Variant` (Neutral, Subtle, Stroke, Brand) | `variant` | `variant` | matches the `Section` variants; default Neutral |
| `Heading` | `heading` (string) | `heading` | required, max 60 characters; wraps cleanly on two lines |
| `Subheading` + `Has Subheading` | `subheading` | `subheading` | optional, max 140 characters; blank = hidden |
| `Primary Action` (instance swap, Button) | `primaryAction` (node) | `primaryAction` (reference to a `button` entry) | required |
| `Secondary Action` + `Has Secondary Action` | `secondaryAction` (node) | `secondaryAction` (reference to a `button` entry) | optional |

Actions are nodes (normally `Button`s), so the Banner stays presentational. The
Contentful mapper builds the Buttons from the linked entries.

## Variants and token bindings

| Variant | Background | Border | Text |
|---------|------------|--------|------|
| Neutral | `Background/Default/Tertiary` | none | `Text/Default/Default` |
| Subtle | transparent | none | `Text/Default/Default` |
| Stroke | transparent | top and bottom `Border/Default/Default`, `Stroke/Border` | `Text/Default/Default` |
| Brand | `Background/Brand/Default` | none | `Text/Brand/On Brand` |

Spacing: padding `Space/1200` top and bottom, `Space/600` left and right; gap
`Space/600` between text and actions; `Space/300` between actions.

## Contentful

- **Mapping:** `contentfulBannerToProps(entry)` in
  `src/ui/compositions/Sections/banners.contentful.tsx`, which reuses
  `contentfulButtonToProps`. Import it directly, not through the `compositions`
  barrel. The linked Button entries must be resolved (Delivery API `include: 1`, the
  default).
- **Content model:** the `banner` content type is versioned as a migration in
  `scripts/contentful/migrations/002-create-banner.cjs`.
- **Nesting:** Banner to Button is one level; Button references nothing.
- **Story:** "Banner from Contentful (shaped data)" shows typical and edge-case
  entries.

## Usage rules

- **Do** make the main action a `Primary` Button and any second action `Neutral` or
  `Subtle`.
- **Do** use `Neutral` Buttons on the `Brand` variant. A `Primary` Button disappears
  into the brand background, and a `Subtle` Button's text is not readable on it.
- **Don't** exceed the character limits; they protect the layout. Long headings wrap,
  but keep them short.
- **Don't** put more than two actions in a Banner.

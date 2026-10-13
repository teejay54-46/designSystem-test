import type { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, userEvent, within } from "@storybook/test";
import { IconActivity, IconArrowLeft } from "icons";
import { Button, ButtonDanger, ButtonGroup } from "primitives";
import {
  contentfulButtonToProps,
  type ContentfulButtonEntry,
} from "../../ui/primitives/Button/contentful";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "SDS Primitives/Buttons",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryButton: StoryObj<typeof Button> = {
  name: "Button",
  args: {
    children: "Hello world",
    variant: "primary",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "neutral", "subtle"],
    },
  },
  render: ({ children, ...props }) => (
    <Button {...props}>
      <IconArrowLeft />
      {children}
      <IconActivity />
    </Button>
  ),
};

export const StoryButtonPressed: StoryObj<typeof Button> = {
  name: "Button Pressed (state)",
  args: {
    children: "Hello world",
  },
  argTypes: {
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pressed is a **state**, not a variant — there is no `variant=\"pressed\"`. " +
          "Every Button shows an inner shadow and a 1px nudge via `[data-pressed]` " +
          "while it is held (mouse, touch, or Space/Enter), matching the Figma " +
          "`State=Pressed` component. Press and hold any button below.",
      },
    },
  },
  render: ({ children, ...props }) => (
    <ButtonGroup>
      <Button {...props} variant="primary">
        {children}
      </Button>
      <Button {...props} variant="neutral">
        {children}
      </Button>
      <Button {...props} variant="subtle">
        {children}
      </Button>
    </ButtonGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [primaryBtn] = canvas.getAllByRole("button");

    // The live [data-pressed] state toggles while a button is held. react-aria
    // ignores synthetic pointer events, so drive it with a held Space key.
    primaryBtn.focus();
    fireEvent.keyDown(primaryBtn, { key: " ", code: "Space" });
    await expect(primaryBtn).toHaveAttribute("data-pressed", "true");
    fireEvent.keyUp(primaryBtn, { key: " ", code: "Space" });
    await expect(primaryBtn).not.toHaveAttribute("data-pressed");
  },
};

export const StoryButtonFocused: StoryObj<typeof Button> = {
  name: "Button Focused (state)",
  args: {
    children: "Hello world",
  },
  argTypes: {
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Focused is a **state**, not a variant — there is no `variant=\"focused\"`. " +
          "Every Button shows a 2px focus ring (`Border/Focus/Default`), set 2px " +
          "outside the button, via `[data-focus-visible]` when it receives keyboard " +
          "focus, matching the Figma `State=Focused` components (Primary, Medium and " +
          "Small). Press Tab to move focus between the buttons below.",
      },
    },
  },
  render: ({ children, ...props }) => (
    <ButtonGroup>
      <Button {...props} variant="primary" size="medium">
        {children}
      </Button>
      <Button {...props} variant="primary" size="small">
        {children}
      </Button>
    </ButtonGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [mediumBtn, smallBtn] = canvas.getAllByRole("button");

    // react-aria only sets [data-focus-visible] for keyboard focus, so tab in
    // rather than calling .focus() (which would count as pointer focus).
    await userEvent.tab();
    await expect(mediumBtn).toHaveAttribute("data-focus-visible", "true");
    await userEvent.tab();
    await expect(smallBtn).toHaveAttribute("data-focus-visible", "true");
    await expect(mediumBtn).not.toHaveAttribute("data-focus-visible");
    await userEvent.tab({ shift: true });
    await expect(mediumBtn).toHaveAttribute("data-focus-visible", "true");
  },
};

const contentfulButtonExamples: { note: string; entry: ContentfulButtonEntry }[] =
  [
    {
      note: "Typical: primary, medium, icon at the start",
      entry: {
        sys: { id: "button-typical" },
        fields: {
          label: "Add to basket",
          href: "/basket",
          variant: "primary",
          size: "medium",
          iconStart: "plus",
        },
      },
    },
    {
      note: "Edge case: label at the 30 character limit",
      entry: {
        sys: { id: "button-max-length" },
        fields: {
          label: "Subscribe to our wine club now",
          href: "/wine-club",
          variant: "primary",
          size: "medium",
        },
      },
    },
    {
      note: "Neutral, small, icon at the end",
      entry: {
        sys: { id: "button-neutral-small" },
        fields: {
          label: "Delivery information",
          href: "/delivery",
          variant: "neutral",
          size: "small",
          iconEnd: "chevron-right",
        },
      },
    },
    {
      note: "Subtle, external link icon",
      entry: {
        sys: { id: "button-subtle-external" },
        fields: {
          label: "Read our full story",
          href: "https://www.example.com/about",
          variant: "subtle",
          size: "medium",
          iconEnd: "external-link",
        },
      },
    },
    {
      note: "Edge case: no icons, mailto link",
      entry: {
        sys: { id: "button-mailto" },
        fields: {
          label: "Email us",
          href: "mailto:hello@example.com",
          variant: "neutral",
          size: "medium",
        },
      },
    },
    {
      note: "Edge case: over-limit label that slipped past validation (truncates)",
      entry: {
        sys: { id: "button-over-limit" },
        fields: {
          label:
            "A label that slipped past the 30 character validation and keeps going",
          href: "/oops",
          variant: "primary",
          size: "medium",
          iconStart: "arrow-left",
        },
      },
    },
  ];

export const StoryButtonContentful: StoryObj<typeof Button> = {
  name: "Button from Contentful (shaped data)",
  parameters: {
    docs: {
      description: {
        story:
          "Buttons built from entries shaped like the Contentful `button` content " +
          "type (`label`, `href`, `variant`, `size`, `iconStart`, `iconEnd`) via " +
          "`contentfulButtonToProps`. Includes edge cases: a label at the 30 " +
          "character limit, no icons, and an over-limit label that truncates at " +
          "the 275px max width.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "flex-start",
      }}
    >
      {contentfulButtonExamples.map(({ note, entry }) => (
        <div
          key={entry.sys.id}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "flex-start",
          }}
        >
          <small>{note}</small>
          <Button {...contentfulButtonToProps(entry)} />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");
    const labelOf = (link: HTMLElement) =>
      link.querySelector<HTMLElement>(".button-label")!;

    const typical = labelOf(links[0]);
    await expect(typical.scrollWidth).toBeLessThanOrEqual(typical.clientWidth);

    const overLimit = labelOf(links[links.length - 1]);
    await expect(overLimit.scrollWidth).toBeGreaterThan(overLimit.clientWidth);

    for (const link of links) {
      await expect(link.getBoundingClientRect().width).toBeLessThanOrEqual(275);
    }
  },
};

export const StoryButtonDanger: StoryObj<typeof ButtonDanger> = {
  name: "Button Danger",
  args: {
    children: "Hello world",
    variant: "danger-primary",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["danger-primary", "danger-subtle"],
    },
  },
  render: ({ children, ...props }) => (
    <ButtonDanger {...props}>
      <IconArrowLeft />
      {children}
      <IconActivity />
    </ButtonDanger>
  ),
};

export const StoryButtonGroup: StoryObj<typeof ButtonGroup> = {
  name: "Button Group",
  args: {
    align: "center",
  },
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["center", "start", "end", "justify", "stack"],
    },
  },
  render: ({ ...props }) => (
    <ButtonGroup {...props} style={{ width: 300 }}>
      <Button variant="neutral">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </ButtonGroup>
  ),
};

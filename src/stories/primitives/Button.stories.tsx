import type { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, within } from "@storybook/test";
import { IconActivity, IconArrowLeft } from "icons";
import { Button, ButtonDanger, ButtonGroup } from "primitives";

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

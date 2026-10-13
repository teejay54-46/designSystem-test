import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Banner } from "compositions";
import { Button } from "primitives";
import {
  contentfulBannerToProps,
  type ContentfulBannerEntry,
} from "../../ui/compositions/Sections/banners.contentful";
import type { ContentfulButtonEntry } from "../../ui/primitives/Button/contentful";

const meta: Meta<typeof Banner> = {
  component: Banner,
  title: "SDS Compositions/Banners",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const StoryBanner: StoryObj<typeof Banner> = {
  name: "Banner",
  args: {
    heading: "Join the wine club",
    subheading: "Hand-picked bottles, delivered every month.",
    variant: "neutral",
  },
  argTypes: {
    heading: { control: { type: "text" } },
    subheading: { control: { type: "text" } },
    variant: {
      control: { type: "select" },
      options: ["neutral", "subtle", "stroke", "brand"],
    },
  },
  render: (args) => (
    <Banner
      {...args}
      primaryAction={<Button href="/wine-club">Join now</Button>}
      secondaryAction={
        <Button href="/about" variant="neutral">
          Learn more
        </Button>
      }
    />
  ),
};

const buttons: Record<string, ContentfulButtonEntry> = {
  subscribe: {
    sys: { id: "button-max-length" },
    fields: {
      label: "Subscribe to our wine club now",
      href: "/wine-club",
      variant: "primary",
      size: "medium",
    },
  },
  readStory: {
    sys: { id: "button-subtle-external" },
    fields: {
      label: "Read our full story",
      href: "https://www.example.com/about",
      variant: "subtle",
      size: "medium",
      iconEnd: "external-link",
    },
  },
  addToBasket: {
    sys: { id: "button-typical" },
    fields: {
      label: "Add to basket",
      href: "/basket",
      variant: "primary",
      size: "medium",
      iconStart: "plus",
    },
  },
  emailUs: {
    sys: { id: "button-mailto" },
    fields: {
      label: "Email us",
      href: "mailto:hello@example.com",
      variant: "neutral",
      size: "medium",
    },
  },
  browseWines: {
    sys: { id: "button-browse-wines" },
    fields: {
      label: "Browse all wines",
      href: "/wines",
      variant: "neutral",
      size: "medium",
      iconEnd: "arrow-right",
    },
  },
  giftIdeas: {
    sys: { id: "button-gift-ideas" },
    fields: {
      label: "Gift ideas",
      href: "/gifts",
      variant: "neutral",
      size: "medium",
    },
  },
};

const contentfulBannerExamples: {
  note: string;
  entry: ContentfulBannerEntry;
}[] = [
  {
    note: "Neutral: heading, subheading, primary and secondary action",
    entry: {
      sys: { id: "banner-neutral" },
      fields: {
        heading: "Join the wine club",
        subheading: "Hand-picked bottles, delivered every month.",
        primaryAction: buttons.subscribe,
        secondaryAction: buttons.readStory,
        variant: "neutral",
      },
    },
  },
  {
    note: "Edge case: subtle, no subheading, no secondary action",
    entry: {
      sys: { id: "banner-subtle-minimal" },
      fields: {
        heading: "Your basket is waiting",
        primaryAction: buttons.addToBasket,
        variant: "subtle",
      },
    },
  },
  {
    note: "Stroke: top and bottom borders",
    entry: {
      sys: { id: "banner-stroke" },
      fields: {
        heading: "Ready when you are",
        subheading: "Questions? We are happy to help.",
        primaryAction: buttons.addToBasket,
        secondaryAction: buttons.emailUs,
        variant: "stroke",
      },
    },
  },
  {
    note: "Brand: use Neutral buttons (Primary and Subtle disappear on brand)",
    entry: {
      sys: { id: "banner-brand" },
      fields: {
        heading: "New season arrivals",
        subheading: "Fresh from this year's harvest.",
        primaryAction: buttons.browseWines,
        secondaryAction: buttons.giftIdeas,
        variant: "brand",
      },
    },
  },
  {
    note: "Edge case: heading at the 60 character limit wraps cleanly",
    entry: {
      sys: { id: "banner-long-heading" },
      fields: {
        heading: "A heading at the sixty character limit that wraps nicely ok.",
        subheading: "Supporting sentence.",
        primaryAction: buttons.subscribe,
        variant: "neutral",
      },
    },
  },
];

export const StoryBannerContentful: StoryObj<typeof Banner> = {
  name: "Banner from Contentful (shaped data)",
  parameters: {
    docs: {
      description: {
        story:
          "Banners built from entries shaped like the Contentful `banner` content " +
          "type (`heading`, `subheading`, `primaryAction`, `secondaryAction`, " +
          "`variant`) with the linked `button` entries resolved, via " +
          "`contentfulBannerToProps`. Includes edge cases: no subheading or " +
          "secondary action, and a heading at the 60 character limit.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {contentfulBannerExamples.map(({ note, entry }) => (
        <div key={entry.sys.id}>
          <small style={{ display: "block", padding: "0 1.5rem 0.5rem" }}>
            {note}
          </small>
          <Banner {...contentfulBannerToProps(entry)} />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const banners = Array.from(
      canvasElement.querySelectorAll<HTMLElement>("section.section"),
    );
    await expect(banners).toHaveLength(contentfulBannerExamples.length);

    const linkCounts = banners.map(
      (banner) => within(banner).getAllByRole("link").length,
    );
    await expect(linkCounts).toEqual([2, 1, 2, 2, 1]);

    await expect(banners[3]).toHaveClass("section-variant-brand");
    await expect(
      within(banners[1]).queryByText("Your basket is waiting"),
    ).toBeInTheDocument();
  },
};

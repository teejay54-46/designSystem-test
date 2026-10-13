import { Button } from "primitives";
import {
  contentfulButtonToProps,
  type ContentfulButtonEntry,
} from "../../primitives/Button/contentful";
import type { BannerProps } from "./Banners";

/** Fields of the Contentful `banner` content type, with linked Button entries resolved (include: 1). */
export type ContentfulBannerFields = {
  heading: string;
  subheading?: string;
  primaryAction: ContentfulButtonEntry;
  secondaryAction?: ContentfulButtonEntry;
  variant: "neutral" | "subtle" | "stroke" | "brand";
};

export type ContentfulBannerEntry = {
  sys: { id: string };
  fields: ContentfulBannerFields;
};

export function contentfulBannerToProps({
  fields: { heading, subheading, primaryAction, secondaryAction, variant },
}: ContentfulBannerEntry): BannerProps {
  return {
    variant,
    heading,
    subheading,
    primaryAction: <Button {...contentfulButtonToProps(primaryAction)} />,
    secondaryAction: secondaryAction ? (
      <Button {...contentfulButtonToProps(secondaryAction)} />
    ) : undefined,
  };
}

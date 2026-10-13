import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconExternalLink,
  IconPlus,
} from "icons";
import type { ButtonProps } from "./Button";

const buttonIcons = {
  "arrow-left": IconArrowLeft,
  "arrow-right": IconArrowRight,
  "chevron-left": IconChevronLeft,
  "chevron-right": IconChevronRight,
  check: IconCheck,
  plus: IconPlus,
  "external-link": IconExternalLink,
  download: IconDownload,
} as const;

export type ContentfulButtonIconName = keyof typeof buttonIcons;

/** Fields of the Contentful `button` content type, as returned for a single locale. */
export type ContentfulButtonFields = {
  label: string;
  href: string;
  variant: "primary" | "neutral" | "subtle";
  size: "medium" | "small";
  iconStart?: ContentfulButtonIconName;
  iconEnd?: ContentfulButtonIconName;
};

export type ContentfulButtonEntry = {
  sys: { id: string };
  fields: ContentfulButtonFields;
};

export function contentfulButtonToProps({
  fields: { label, href, variant, size, iconStart, iconEnd },
}: ContentfulButtonEntry): ButtonProps {
  const IconStart = iconStart ? buttonIcons[iconStart] : undefined;
  const IconEnd = iconEnd ? buttonIcons[iconEnd] : undefined;
  return {
    href,
    variant,
    size,
    children: [
      IconStart ? <IconStart key="icon-start" /> : null,
      label,
      IconEnd ? <IconEnd key="icon-end" /> : null,
    ],
  };
}

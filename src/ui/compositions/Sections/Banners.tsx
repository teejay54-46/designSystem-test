import { Flex, Section } from "layout";
import { ButtonGroup, TextContentTitle } from "primitives";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type BannerProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children" | "title"
> & {
  variant?: "neutral" | "subtle" | "stroke" | "brand";
  heading: string;
  subheading?: ReactNode;
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
};

export function Banner({
  variant = "neutral",
  heading,
  subheading,
  primaryAction,
  secondaryAction,
  ...sectionProps
}: BannerProps) {
  return (
    <Section padding="1200" variant={variant} {...sectionProps}>
      <Flex
        container
        alignPrimary="center"
        alignSecondary="center"
        direction="column"
        gap="600"
      >
        <TextContentTitle
          align="center"
          title={heading}
          subtitle={subheading}
        />
        <ButtonGroup align="center">
          {primaryAction}
          {secondaryAction}
        </ButtonGroup>
      </Flex>
    </Section>
  );
}

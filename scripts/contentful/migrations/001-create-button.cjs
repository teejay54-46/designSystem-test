// Backfill: the `button` content type already exists in the sandbox (created
// through the Contentful MCP). Do NOT run this against the sandbox. It is the
// versioned record, for creating the type in a fresh environment.
const icons = [
  "arrow-left",
  "arrow-right",
  "chevron-left",
  "chevron-right",
  "check",
  "plus",
  "external-link",
  "download",
];

module.exports = function (migration) {
  const button = migration.createContentType("button", {
    name: "Button",
    description:
      "A call-to-action button. Content (label, link, optional icons) is controlled by editors; design choices (variant, size) are restricted to the values the design system supports. Mirrors the SDS Button component.",
    displayField: "label",
  });

  button
    .createField("label")
    .name("Label")
    .type("Symbol")
    .required(true)
    .localized(true)
    .validations([
      {
        size: { max: 30 },
        message: "Keep labels to 30 characters or fewer.",
      },
    ]);

  button
    .createField("href")
    .name("Link")
    .type("Symbol")
    .required(true)
    .validations([
      {
        regexp: {
          pattern: "^(https:\\/\\/\\S+|\\/|\\/[^\\/\\s]\\S*|mailto:\\S+|tel:\\S+)$",
          flags: null,
        },
        message:
          "Use a full https:// address, a path starting with / , or a mailto: / tel: link.",
      },
    ]);

  button
    .createField("variant")
    .name("Variant")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["primary", "neutral", "subtle"] }])
    .defaultValue({ "en-US": "primary" });

  button
    .createField("size")
    .name("Size")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["medium", "small"] }])
    .defaultValue({ "en-US": "medium" });

  button
    .createField("iconStart")
    .name("Icon Start")
    .type("Symbol")
    .validations([{ in: icons }]);

  button
    .createField("iconEnd")
    .name("Icon End")
    .type("Symbol")
    .validations([{ in: icons }]);

  button.changeFieldControl("label", "builtin", "singleLine", {
    helpText:
      "The text on the button. Describe the action, e.g. 'Add to basket', not 'Click here'. Maximum 30 characters.",
  });
  button.changeFieldControl("href", "builtin", "singleLine", {
    helpText:
      "Where the button goes. Use a full https:// address, or a path starting with / for pages on this site. mailto: and tel: links also work.",
  });
  button.changeFieldControl("variant", "builtin", "radio", {
    helpText:
      "Primary = the main action on the page (one per section). Neutral = a secondary action beside it. Subtle = a low-emphasis, inline action.",
  });
  button.changeFieldControl("size", "builtin", "radio", {
    helpText: "Medium is the default. Use Small in tight spaces.",
  });
  button.changeFieldControl("iconStart", "builtin", "dropdown", {
    helpText: "Optional. An icon before the label. Leave blank for no icon.",
  });
  button.changeFieldControl("iconEnd", "builtin", "dropdown", {
    helpText: "Optional. An icon after the label. Leave blank for no icon.",
  });
};

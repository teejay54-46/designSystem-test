module.exports = function (migration) {
  const banner = migration.createContentType("banner", {
    name: "Banner",
    description:
      "A banner with a heading, optional subheading and one or two actions. Each action is a reference to a Button entry. Mirrors the SDS Banner component.",
    displayField: "heading",
  });

  banner
    .createField("heading")
    .name("Heading")
    .type("Symbol")
    .required(true)
    .localized(true)
    .validations([
      {
        size: { max: 60 },
        message: "Keep headings to 60 characters or fewer.",
      },
    ]);

  banner
    .createField("subheading")
    .name("Subheading")
    .type("Symbol")
    .localized(true)
    .validations([
      {
        size: { max: 140 },
        message: "Keep subheadings to 140 characters or fewer.",
      },
    ]);

  banner
    .createField("primaryAction")
    .name("Primary Action")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["button"] }]);

  banner
    .createField("secondaryAction")
    .name("Secondary Action")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["button"] }]);

  banner
    .createField("variant")
    .name("Variant")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["neutral", "subtle", "stroke", "brand"] }])
    .defaultValue({ "en-US": "neutral" });

  banner.changeFieldControl("heading", "builtin", "singleLine", {
    helpText:
      "The main message. Keep it short and specific. Maximum 60 characters.",
  });
  banner.changeFieldControl("subheading", "builtin", "singleLine", {
    helpText:
      "Optional. One short supporting sentence. Maximum 140 characters. Leave blank to hide it.",
  });
  banner.changeFieldControl("primaryAction", "builtin", "entryLinkEditor", {
    helpText:
      "The main button. Choose an existing Button entry, or create a new one.",
  });
  banner.changeFieldControl("secondaryAction", "builtin", "entryLinkEditor", {
    helpText:
      "Optional. A second, less prominent button. Leave blank for none.",
  });
  banner.changeFieldControl("variant", "builtin", "radio", {
    helpText:
      "The colour treatment. Neutral is the default; Brand draws the most attention, so use it sparingly.",
  });
};

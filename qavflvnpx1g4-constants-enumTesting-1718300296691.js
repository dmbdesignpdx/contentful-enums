module.exports = function (migration) {
  const enumTesting = migration
    .createContentType("enumTesting")
    .name("Enum Testing")
    .description("To gather information.");

  enumTesting
    .createField("paths")
    .name("Paths")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Symbol",
      validations: [],
    });

  enumTesting.changeFieldControl("paths", "builtin", "tagEditor", {
    helpText: "A list of paths",
  });
};

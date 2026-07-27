import { defineMigration, at, setIfMissing, unset } from "sanity/migrate";

const from = "treatmentGroup";
const to = "treatmentCategory";

export default defineMigration({
  title: "rename-treatment-reference-field",
  documentTypes: ["treatment", "post"],

  migrate: {
    document(doc, context) {
      if (!(from in doc)) return;

      return [at(to, setIfMissing(doc[from])), at(from, unset())];
    },
  },
});

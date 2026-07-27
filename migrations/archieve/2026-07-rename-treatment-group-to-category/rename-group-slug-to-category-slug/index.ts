import { defineMigration, at, setIfMissing, unset } from "sanity/migrate";

const from = "groupSlug";
const to = "categorySlug";

export default defineMigration({
  title: "rename-group-slug-to-category-slug",
  documentTypes: ["treatmentCategory"],

  migrate: {
    document(doc, context) {
      if (!(from in doc)) return;

      return [at(to, setIfMissing(doc[from])), at(from, unset())];
    },
  },
});

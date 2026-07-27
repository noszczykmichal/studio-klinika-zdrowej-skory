import { defineMigration } from "sanity/migrate";

const oldType = "treatmentGroup";
const newType = "treatmentCategory";

export default defineMigration({
  title: "rename-treatment-group-to-category",
  documentTypes: [oldType],

  migrate: {
    document(doc) {
      return [
        { delete: { id: doc._id } },
        { create: { ...doc, _type: newType } },
      ];
    },
  },
});

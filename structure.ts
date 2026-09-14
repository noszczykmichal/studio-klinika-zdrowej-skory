import type { StructureResolver } from "sanity/structure";

export const SINGLETON_TYPES = new Set(["privacyPolicy"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Polityka prywatności").id("privacyPolicy").child(
        S.document().schemaType("privacyPolicy").documentId("privacyPolicy"), // <-- fixed ID, always the same doc
      ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() as string),
      ),
    ]);

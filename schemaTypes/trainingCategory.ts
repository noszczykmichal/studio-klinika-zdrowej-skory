import { defineField, defineType } from "sanity";
import "@/schemaTypes/blockContent";

export default defineType({
  name: "trainingCategory",
  title: "Kategoria szkoleniowa",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa kategorii",
      type: "string",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
    defineField({
      name: "categorySlug",
      title: "Slug dla kategorii",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Proszę wygenerować pole!"),
    }),
  ],
});

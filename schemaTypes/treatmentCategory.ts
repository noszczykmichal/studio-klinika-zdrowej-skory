import { defineField, defineType } from "sanity";
import "@/schemaTypes/blockContent";

export default defineType({
  name: "treatmentCategory",
  title: "Kategoria zabiegowa",
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
    defineField({
      name: "summary",
      title: "Podsumowanie",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value.trim() === "") {
            return "Proszę uzupełnić pole.";
          }

          if (value.length > 290) {
            return `Maksymalna długość tekstu to 290 znaków. Aktualna długość to ${value.length} znaków.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "mainImage",
      title: "Główny obraz",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Proszę wybrać plik."),
    }),
    defineField({
      name: "altForMainImage",
      title: "Opis głównej grafiki",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value.trim() === "") {
            return "Proszę uzupełnić pole.";
          }

          if (!/\.\s*$/.test(value)) {
            return "Opis powinien kończyć się kropką.";
          }

          return true;
        }),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "blockContent",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
  ],
});

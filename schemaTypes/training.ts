import { defineField, defineType } from "sanity";
import "@/schemaTypes/blockContent";

export default defineType({
  name: "training",
  title: "Szkolenie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa szkolenia",
      type: "string",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
    defineField({
      name: "trainingSlug",
      title: "Slug dla szkolenia",
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

          if (value.length > 550) {
            return `Maksymalna długość tekstu to 550 znaków. Aktualna długość to ${value.length} znaków.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "trainingCategory",
      title: "Kategoria szkoleniowa",
      type: "reference",
      to: { type: "trainingCategory" },
      validation: (Rule) => Rule.required().error("Proszę wybrać jedną opcję."),
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
    }),
  ],
});

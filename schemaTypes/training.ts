import { defineField, defineType } from "sanity";
import "@/schemaTypes/blockContent";

import { altValidator, lengthValidatorWithLength } from "@/utils/validators";

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
      validation: (Rule) => Rule.custom(lengthValidatorWithLength(550)),
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
      validation: (Rule) => Rule.custom(altValidator),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "blockContent",
    }),
  ],
});

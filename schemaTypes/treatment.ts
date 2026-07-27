import { defineField, defineType } from "sanity";
import "@/schemaTypes/blockContent";

import { altValidator, lengthValidatorWithLength } from "@/utils/validators";

export default defineType({
  name: "treatment",
  title: "Zabieg",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa zabiegu",
      type: "string",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
    defineField({
      name: "treatmentSlug",
      title: "Slug dla zabiegu",
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
      validation: (Rule) => Rule.custom(lengthValidatorWithLength(290)),
    }),
    defineField({
      name: "treatmentCategory",
      title: "Kategoria zabiegowa",
      type: "reference",
      to: { type: "treatmentCategory" },
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

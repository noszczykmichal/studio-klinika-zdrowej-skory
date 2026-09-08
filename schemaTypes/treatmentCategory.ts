import { defineField, defineType } from "sanity";

import "@/schemaTypes/blockContent";
import {
  altValidator,
  lengthValidatorWithLength,
  orderAvailabilityValidator,
} from "@/utils/validators";

export default defineType({
  name: "treatmentCategory",
  title: "Kategoria zabiegowa",
  type: "document",
  orderings: [
    {
      title: "Kolejność w nawigacji",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
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
      name: "order",
      title: "Kolejność w nawigacji",
      type: "number",
      validation: (Rule) =>
        Rule.custom(orderAvailabilityValidator("treatmentCategory")),
    }),
    defineField({
      name: "summary",
      title: "Podsumowanie",
      type: "string",
      validation: (Rule) => Rule.custom(lengthValidatorWithLength(290)),
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
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
  ],
});

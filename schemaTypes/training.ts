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
      name: "metaDescription",
      title: "Meta opis (SEO)",
      type: "text",
      rows: 3,
      description:
        "Opis wyświetlany w wynikach wyszukiwania Google pod tytułem strony. Zalecana długość: 120–160 znaków.",
      validation: (Rule) => [
        Rule.required().error("Proszę uzupełnić pole."),
        Rule.max(160).warning(
          "Meta opis przekracza 160 znaków — Google może obciąć dodatkowy tekst w wynikach wyszukiwania.",
        ),
        Rule.min(50).warning(
          "Meta opis jest bardzo krótki — warto rozwinąć go do co najmniej 50 znaków, aby lepiej wykorzystać przestrzeń w wynikach wyszukiwania.",
        ),
      ],
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

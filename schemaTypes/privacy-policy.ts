import { defineType, defineField } from "sanity";
import { altValidator } from "@/utils/validators";

export default defineType({
  name: "privacyPolicy",
  title: "Polityka prywatności",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł (widoczny tylko w Studio)",
      type: "string",
      initialValue: "Polityka prywatności",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Główny obraz",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error("Proszę wybrać plik."),
    }),
    defineField({
      name: "altForMainImage",
      title: "Opis głównej grafiki",
      type: "string",
      validation: (Rule) => Rule.custom(altValidator),
    }),
    defineField({
      name: "policyContent",
      title: "Treść polityki",
      type: "blockContent",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});

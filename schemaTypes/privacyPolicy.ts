import { defineType, defineField } from "sanity";

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

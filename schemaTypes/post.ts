import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
    defineField({
      name: "slug",
      title: "Slug dla posta",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Proszę wygenerować pole."),
    }),

    defineField({
      name: "treatmentGroup",
      title: "Grupa zabiegowa",
      type: "reference",
      to: { type: "treatmentGroup" },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const other = context.document?.treatment;
          if (value && other) {
            return 'Proszę wypełnić tylko jedno pole - "Grupa zabiegowa" lub "Zabieg", nie oba jednocześnie.';
          } else if (!value && !other) {
            return 'Proszę wypełnić jedno z pól - "Grupa zabiegowa" lub "Zabieg"';
          }

          return true;
        }),
    }),
    defineField({
      name: "treatment",
      title: "Zabieg",
      type: "reference",
      to: { type: "treatment" },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const other = context.document?.treatmentGroup;
          if (value && other) {
            return 'Proszę wypełnić tylko jedno pole - "Grupa zabiegowa" lub "Zabieg", nie oba jednocześnie.';
          } else if (!value && !other) {
            return 'Proszę wypełnić jedno z pól - "Grupa zabiegowa" lub "Zabieg"';
          }

          return true;
        }),
    }),
    defineField({
      name: "summary",
      title: "Podsumowanie",
      type: "string",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: { type: "author" },
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
      name: "category",
      title: "Kategoria",
      type: "reference",
      to: { type: "category" },
      validation: (Rule) => Rule.required().error("Proszę wybrać jedną opcję."),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().error("Proszę wybrać poprawną datę."),
    }),
    defineField({
      name: "postContent",
      title: "Treść posta",
      type: "blockContent",
      validation: (Rule) => Rule.required().error("Proszę uzupełnić pole."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});

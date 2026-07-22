import { defineType, defineField } from "sanity";

export default defineType({
  type: "image",
  name: "blockContentImage",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Opis dla grafiki",
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
      name: "size",
      type: "string",
      title: "Rozmiar zdjęcia",
      options: {
        list: [
          { title: "Małe (50%)", value: "small" },
          { title: "Średnie (75%)", value: "medium" },
          { title: "Pełna szerokość", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "full",
    }),
  ],
});

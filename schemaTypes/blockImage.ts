import { defineType, defineField } from "sanity";

export default defineType({
  type: "image",
  name: "blockImage",
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
  ],
});

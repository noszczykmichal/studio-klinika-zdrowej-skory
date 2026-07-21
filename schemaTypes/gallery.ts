import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "gallery",
  title: "Galeria zdjęć",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Zdjęcia",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Tekst alternatywny",
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
          ],
        }),
      ],
      validation: (Rule) => Rule.min(2),
    }),
  ],
  preview: {
    select: {
      images: "images",
      media: "images.0",
    },
    prepare({ images, media }) {
      return {
        title: `Galeria (${images?.length ?? 0} zdjęć)`,
        media,
      };
    },
  },
});

import { defineType, defineField, defineArrayMember } from "sanity";

import { altValidator } from "@/utils/validators";

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
              validation: (Rule) => Rule.custom(altValidator),
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

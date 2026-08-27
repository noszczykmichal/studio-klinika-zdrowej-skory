import { defineType, defineField } from "sanity";

import { altValidator } from "@/utils/validators";
import { ImageIcon } from "@sanity/icons/Image";

export default defineType({
  type: "image",
  name: "blockContentImage",
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Opis dla grafiki",
      validation: (Rule) => Rule.custom(altValidator),
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

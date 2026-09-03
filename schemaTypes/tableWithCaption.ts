import { defineType, defineField } from "sanity";
import { ThListIcon } from "@sanity/icons/ThList";

export default defineType({
  name: "tableWithCaption",
  title: "Tabela",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "caption",
      title: "Opis",
      type: "string",
    }),
    defineField({
      name: "table",
      title: "Tabela",
      type: "table",
    }),
  ],
  preview: {
    select: { title: "caption" },
    prepare({ title }) {
      return { title: title || "Tabela bez opisu" };
    },
  },
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { colorInput } from "@sanity/color-input";
import { table } from "@sanity/table";
import { structure, SINGLETON_TYPES } from "./structure";

export default defineConfig({
  name: "default",
  title: "Klinika zdrowej skóry",
  projectId: "ddh0mvo4",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool(), colorInput(), table()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) => !["duplicate", "delete"].includes(action ?? ""),
          )
        : input,
  },
});

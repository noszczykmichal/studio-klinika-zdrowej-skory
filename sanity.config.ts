import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { colorInput } from "@sanity/color-input";
import { table } from "@sanity/table";

export default defineConfig({
  name: "default",
  title: "Klinika zdrowej skóry",

  projectId: "ddh0mvo4",
  dataset: "production",

  plugins: [structureTool(), visionTool(), colorInput(), table()],

  schema: {
    types: schemaTypes,
  },
});

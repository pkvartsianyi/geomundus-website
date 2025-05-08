import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schema } from "../schemaTypes"

export const config = defineConfig({
  name: "default",
  title: "GeoMundus CMS",
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema,
  basePath: "/studio",
})

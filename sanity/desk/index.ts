import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schema } from "../schema"

export const config = defineConfig({
  name: "default",
  title: "GeoMundus CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [deskTool(), visionTool()],
  schema,
  basePath: "/studio",
})

import type { SchemaTypeDefinition } from "sanity"

import speaker from "./schemas/speaker"
import sponsor from "./schemas/sponsor"
import partner from "./schemas/partner"
import siteSettings from "./schemas/siteSettings"
import aboutSection from "./schemas/aboutSection"
import focusTopic from "./schemas/focusTopic"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, aboutSection, focusTopic, speaker, sponsor, partner],
}

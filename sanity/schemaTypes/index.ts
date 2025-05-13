import type { SchemaTypeDefinition } from "sanity";

import sponsor from "../schemas/sponsor";
import partner from "../schemas/partner";
import siteSettings from "../schemas/siteSettings";
import aboutSection from "../schemas/aboutSection";
import focusTopic from "../schemas/focusTopic";
import conference from "../schemas/conference";
import schedule from "../schemas/schedule";
import faq from "../schemas/faq";
import registration from "../schemas/registration";
import submission from "../schemas/submission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    aboutSection,
    focusTopic,
    sponsor,
    partner,
    conference,
    schedule,
    faq,
    registration,
    submission,
  ],
};

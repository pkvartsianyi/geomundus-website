import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schemaTypes";
import { dataset, projectId } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  name: "default",
  title: "GeoMundus",

  projectId,
  dataset,

  plugins: [structureTool()],
  schema,
  document: {
    // custom action to publish and deploy
    actions: (prev, context) => {
      // Only show the "Publish & Deploy" action for document types that affect the website
      const relevantTypes = [
        "siteSettings",
        "aboutSection",
        "focusTopic",
        "speaker",
        "sponsor",
        "partner",
        "conference",
        "schedule",
        "faq",
        // "submission",
      ];

      // If this is a relevant document type, add our custom publish action
      if (relevantTypes.includes(context.schemaType)) {
        return [
          ...prev,
          {
            name: "publishAndDeploy",
            label: "Publish & Deploy",
            icon: () => "🚀",
            onHandle: async (props) => {
              // First publish the document
              const publishResult = await props.publish();

              // Then trigger a revalidation
              if (publishResult && publishResult.document) {
                try {
                  const doc = publishResult.document;
                  const revalidateUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`;

                  // Send the webhook to trigger revalidation
                  const response = await fetch(revalidateUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-webhook-secret":
                        process.env.SANITY_STUDIO_REVALIDATE_SECRET || "",
                    },
                    body: JSON.stringify(doc),
                  });

                  const result = await response.json();

                  if (response.ok) {
                    props.onComplete({
                      type: "success",
                      message: `Published and deployed changes! ${result.message || ""}`,
                    });
                  } else {
                    props.onComplete({
                      type: "error",
                      message: `Published, but failed to deploy: ${result.message || response.statusText}`,
                    });
                  }
                } catch (error) {
                  props.onComplete({
                    type: "error",
                    message: `Published, but failed to deploy: ${error instanceof Error ? error.message : String(error)}`,
                  });
                }
              } else {
                props.onComplete({
                  type: "error",
                  message: "Failed to publish document",
                });
              }
            },
          },
        ];
      }
      return prev;
    },
  },
});

import { createClient } from "next-sanity";
import { cache } from "react";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

// Create a cached version of the Sanity client for use with React Server Components
export const cachedClient = cache(client.fetch.bind(client));

// Helper function to add tags to queries for revalidation
export function tagQuery(query: string, type: string, id?: string) {
  // If an ID is provided, tag with both the type and the specific document
  if (id) {
    return `${query} [#${type} #${type}:${id}]`;
  }
  // Otherwise just tag with the document type
  return `${query} [#${type}]`;
}

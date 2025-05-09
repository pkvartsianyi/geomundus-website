import { createClient } from "next-sanity";
import { cache } from "react";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  stega: { studioUrl: process.env.NEXT_PUBLIC_SITE_URL + "/studio" },
});

// Create a cached version of the Sanity client for use with React Server Components
export const cachedClient = cache(client.fetch.bind(client));

// Helper function to add tags to queries for revalidation
export function tagQuery(query: string, tag: string, id?: string) {
  const fullTag = id ? [`${tag}`, `${tag}:${id}`] : [tag];

  return {
    query,
    tag: fullTag,
    token: fullTag,
  };
}

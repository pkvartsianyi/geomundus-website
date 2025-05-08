import { createClient } from "next-sanity"
import { cache } from "react"

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"
const token = process.env.SANITY_AUTH_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: process.env.NODE_ENV === "production",
})

export const cachedClient = cache(client.fetch.bind(client))

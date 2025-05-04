import type React from "react"
import Navbar from "@/components/navbar"
import { cachedClient } from "@/lib/sanity.client"
import { siteSettingsQuery } from "@/lib/sanity.queries"



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const siteSettings = (await cachedClient(siteSettingsQuery))

  return (
    <>
      <Navbar siteSettings={siteSettings} />
      {children}
    </>
  )
}

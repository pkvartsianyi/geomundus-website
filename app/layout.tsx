import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { cachedClient } from "@/lib/sanity.client"
import { siteSettingsQuery } from "@/lib/sanity.queries"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GeoMundus",
  description: "A Conference on Geospatial Technologies, Geoinformatics & GI Applications",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const siteSettings = (await cachedClient(siteSettingsQuery))

  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar siteSettings={siteSettings}/>
          {children}
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PostHogProvider } from "../components/PostHogProvider"

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

  return (
    <html lang="en">
      <body className={inter.className}>
          <PostHogProvider>
              {children}
          </PostHogProvider>
      </body>
    </html>
  )
}
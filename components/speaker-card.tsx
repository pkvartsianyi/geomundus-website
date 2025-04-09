"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SpeakerCardProps {
  name: string
  title: string
  organization: string
  imageUrl: string
  websiteUrl?: string
  keynoteTitle: string
}

export default function SpeakerCard({
  name,
  title,
  organization,
  imageUrl,
  websiteUrl,
  keynoteTitle,
}: SpeakerCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <Minus className="h-4 w-4 text-emerald-700" />
              ) : (
                <Plus className="h-4 w-4 text-emerald-700" />
              )}
            </Button>
          </div>

          <div className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
              <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg flex items-center justify-center gap-1">
                {name}
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Website</span>
                  </a>
                )}
              </h3>
              <p className="text-sm text-gray-600">{title}</p>
              <p className="text-sm text-gray-500">{organization}</p>
            </div>
          </div>

          {expanded && (
            <div className="p-6 bg-gray-50 border-t">
              <h4 className="font-semibold mb-2">KEYNOTE:</h4>
              <p className="text-sm text-gray-700">{keynoteTitle}</p>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" asChild>
                  <a href="#" className="text-emerald-700">
                    Read details
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

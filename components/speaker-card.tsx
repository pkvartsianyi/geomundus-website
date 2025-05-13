import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface SpeakerCardProps {
  name: string;
  title?: string;
  organization?: string;
  imageUrl?: string;
  websiteUrl?: string;
  keynoteTitle?: string;
  keynoteDescription?: string;
}

export default function SpeakerCard({
  name,
  title,
  organization,
  imageUrl,
  websiteUrl,
  keynoteTitle,
  keynoteDescription,
}: SpeakerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder.svg?height=300&width=300"}
            alt={`Photo of ${name}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">{name}</h3>
          {title && <p className="text-sm text-gray-600">{title}</p>}
          {organization && (
            <p className="text-sm text-gray-600">{organization}</p>
          )}

          {keynoteTitle && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm font-semibold text-emerald-700">
                {keynoteTitle}
              </p>
              {keynoteDescription && (
                <p className="text-xs mt-1 text-gray-600">
                  {keynoteDescription}
                </p>
              )}
            </div>
          )}

          {websiteUrl && (
            <div className="mt-3">
              <Link
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:underline"
              >
                Visit Website
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

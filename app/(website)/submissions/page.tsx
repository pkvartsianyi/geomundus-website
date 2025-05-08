import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileTextIcon,
  ImageIcon,
  AwardIcon,
  ExternalLinkIcon,
  CalendarIcon,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { cachedClient } from "@/lib/sanity.client";
import { submissionInfoQuery } from "@/lib/sanity.queries";
import { format } from "date-fns";

export async function generateMetadata(): Promise<Metadata> {
  const submissionInfo = await cachedClient(submissionInfoQuery);

  return {
    title: `GeoMundus - ${submissionInfo?.title || "Submissions"}`,
    description:
      submissionInfo?.description ||
      "Submit your papers and posters to the GeoMundus Conference",
  };
}

export default async function SubmissionsPage() {
  const submissionInfo = await cachedClient(submissionInfoQuery);

  // Format submission deadline if available
  const formattedDeadline = submissionInfo?.submissionDeadline
    ? format(new Date(submissionInfo.submissionDeadline), "MMMM do, yyyy")
    : null;

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-16 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {submissionInfo?.title || "Submissions"}
          </h1>
          <p className="text-lg md:text-xl mb-4">
            {submissionInfo?.description ||
              "Submit your papers and posters to the GeoMundus Conference"}
          </p>

          {formattedDeadline && (
            <p className="flex items-center justify-center gap-2 text-lg mt-4">
              <CalendarIcon className="h-5 w-5" />
              Submission deadline: {formattedDeadline}
            </p>
          )}
        </div>
      </section>

      {/* Call for Papers Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {submissionInfo?.callForPapersTitle ||
                "Call for Short Paper and Poster"}
            </h2>

            {submissionInfo?.callForPapersContent ? (
              <div className="prose max-w-none text-gray-700">
                <PortableText value={submissionInfo.callForPapersContent} />
              </div>
            ) : (
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  The Geomundus Conference is opening its forum to young
                  professionals looking to present their work in the field of
                  Geospatial Technologies, Geoinformatics & GI Applications.
                </p>
                <p>
                  Our unique approach as a student organized congress gives the
                  opportunity to young academics to receive feedback to their
                  work from experienced actors of the scientific community and
                  interact with other likeminded professionals working with
                  geographic applications.
                </p>
              </div>
            )}

            {submissionInfo?.footnote && (
              <p className="text-sm text-gray-500 italic mt-6">
                {submissionInfo.footnote}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Submission</h2>

            <p className="text-center mb-10">
              You can find the guidelines for writing the short paper and
              poster, as well as the template for the short paper in the links
              below:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-emerald-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Short Paper Guidelines
                  </CardTitle>
                  <FileTextIcon className="h-5 w-5 text-emerald-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={submissionInfo?.shortPaperGuidelineUrl || "#"}
                      className="flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-emerald-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Short Paper Template
                  </CardTitle>
                  <FileTextIcon className="h-5 w-5 text-emerald-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={submissionInfo?.shortPaperTemplateUrl || "#"}
                      className="flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-emerald-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Poster Guideline</CardTitle>
                  <ImageIcon className="h-5 w-5 text-emerald-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={submissionInfo?.posterGuidelineUrl || "#"}
                      className="flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-amber-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Mobility Grant Guideline
                  </CardTitle>
                  <AwardIcon className="h-5 w-5 text-amber-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={submissionInfo?.mobilityGrantGuidelineUrl || "#"}
                      className="flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {submissionInfo?.posterPrintingNote && (
              <p className="text-center mb-6 text-sm text-gray-600">
                {submissionInfo.posterPrintingNote}
              </p>
            )}

            <div className="space-y-4">
              <Button
                asChild
                size="lg"
                className="w-full bg-emerald-700 hover:bg-emerald-800"
                disabled={!submissionInfo?.submissionFormUrl}
              >
                <Link
                  href={submissionInfo?.submissionFormUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SUBMIT YOUR SHORT PAPER AND POSTER ABSTRACT
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full"
                disabled={!submissionInfo?.mobilityGrantFormUrl}
              >
                <Link
                  href={submissionInfo?.mobilityGrantFormUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  APPLY FOR MOBILITY GRANT
                </Link>
              </Button>
            </div>

            <div className="mt-10 text-center p-6 bg-gray-100 rounded-lg">
              <p>
                {submissionInfo?.contactNote ||
                  "If you have further queries about the short paper and abstract submission, please contact the conference organizing committee."}{" "}
                {submissionInfo?.contactEmail && (
                  <Link
                    href={`mailto:${submissionInfo.contactEmail}`}
                    className="text-emerald-700 font-medium hover:underline"
                  >
                    {submissionInfo.contactEmail}
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

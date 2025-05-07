import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, ImageIcon, AwardIcon, ExternalLinkIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "GeoMundus - Submissions",
  description: "Submit your papers and posters to the GeoMundus Conference",
}

export default function SubmissionsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-16 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Submissions</h1>
          <p className="text-lg md:text-xl mb-4">Submit your papers and posters to the GeoMundus Conference</p>
        </div>
      </section>

      {/* Call for Papers Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Call for Short Paper and Poster</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                The Geomundus Conference is opening its forum to young professionals looking to present their work in
                the field of Geospatial Technologies, Geoinformatics & GI Applications during our 16th edition on
                October 25th and 26th of 2024.
              </p>

              <p>
                Our unique approach as a student organized congress gives the opportunity to young academics to receive
                feedback to their work from experienced actors of the scientific community and interact with other
                likeminded professionals working with geographic applications.
              </p>

              <p>
                To be considered please apply before the <strong>4th of August</strong> by submitting your extended
                abstract* in accordance with the guidelines. Our jury will select the papers that most prominently use
                GI applications, Geoinformatics and Geospatial Technologies.
              </p>

              <p>
                Papers addressing Environmental challenges through the GI lens are encouraged to participate and submit
                your work.
              </p>

              <p>
                In the application don't forget to mention your motivation to participate in GeoMundus and describe your
                work.
              </p>

              <p>
                Please find our submission guidelines at the links below to view our submission guidelines and
                requirements. All selected papers will be published at the conference website.
              </p>

              <p className="font-medium">We'll be happy to hear from you!</p>

              <p className="text-sm text-gray-500 italic">
                * This process does not exclude the author to submit the paper to other papers, journals, or conferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Submission</h2>

            <p className="text-center mb-10">
              You can find the guidelines for writing the short paper and poster, as well as the template for the short
              paper in the links below:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-emerald-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Short Paper Guidelines</CardTitle>
                  <FileTextIcon className="h-5 w-5 text-emerald-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#" className="flex items-center justify-center gap-2">
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-emerald-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Short Paper Template</CardTitle>
                  <FileTextIcon className="h-5 w-5 text-emerald-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#" className="flex items-center justify-center gap-2">
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
                    <Link href="#" className="flex items-center justify-center gap-2">
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-amber-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Mobility Grant Guideline</CardTitle>
                  <AwardIcon className="h-5 w-5 text-amber-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#" className="flex items-center justify-center gap-2">
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="text-center mb-6 text-sm text-gray-600">
              Note: The presenter will pay the cost of printing the poster. The cost of printing a poster and the way of
              sending the cost of printing will be published soon.
            </p>

            <div className="space-y-4">
              <Button asChild size="lg" className="w-full bg-emerald-700 hover:bg-emerald-800">
                <Link href="#">SUBMIT YOUR SHORT PAPER AND POSTER ABSTRACT</Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="#">APPLY FOR MOBILITY GRANT</Link>
              </Button>
            </div>

            <div className="mt-10 text-center p-6 bg-gray-100 rounded-lg">
              <p>
                If you have further queries about the short paper and abstract submission, please contact the conference
                organizing committee at{" "}
                <Link href="mailto:program@geomundus.org" className="text-emerald-700 font-medium hover:underline">
                  program@geomundus.org
                </Link>
                . You are requested to keep an eye on our website and social networks regularly to get the latest
                updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

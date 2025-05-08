import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Mail, Users, Globe, Award, Zap, BarChart } from "lucide-react";
import { cachedClient } from "@/lib/sanity.client";
import {
  siteSettingsQuery,
  sponsorsQuery,
  partnersQuery,
} from "@/lib/sanity.queries";

export const metadata: Metadata = {
  title: "GeoMundus - Become a Sponsor",
  description:
    "Support the GeoMundus Conference and connect with the geospatial community",
};

export default async function SponsorsPage() {
  const siteSettings = await cachedClient(siteSettingsQuery);
  const sponsors = await cachedClient(sponsorsQuery);
  const partners = await cachedClient(partnersQuery);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-16 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Sponsor
          </h1>
          <p className="text-lg md:text-xl mb-4">
            Support the GeoMundus Conference and connect with the geospatial
            community
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Sponsor GeoMundus?
            </h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                GeoMundus is seeking partners from public and private entities
                including, but not limited to, spatial, technological,
                scientific, governmental, and academic fields. We will be
                thrilled to have your support and participation in this
                international event.
              </p>

              <p>
                By sponsoring GeoMundus, you'll gain visibility among a diverse
                audience of students, researchers, and professionals in the
                geospatial field. Our conference provides a unique platform to
                showcase your organization's commitment to innovation and
                education in geospatial technologies.
              </p>

              <p>
                There are endless ways to contribute to enhancing both GeoMundus
                and your business. Whether you want to place your logo on our
                website or sponsor a specific event at the conference, we can
                tailor a sponsorship package that meets your needs and
                objectives.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>Network with Experts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Connect with students, researchers, and professionals in the
                    geospatial community.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <Globe className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>Global Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gain exposure to an international audience interested in
                    geospatial technologies.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <Zap className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>Support Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Contribute to the advancement of geospatial education and
                    research.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Sponsorship Tiers
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              We offer various sponsorship levels to accommodate different
              budgets and objectives. Each tier provides unique benefits and
              opportunities for visibility at the conference.
            </p>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Benefits</TableHead>
                    <TableHead className="text-center">Bronze</TableHead>
                    <TableHead className="text-center">Silver</TableHead>
                    <TableHead className="text-center">Gold</TableHead>
                    <TableHead className="text-center">Platinum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Logo on Website
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Logo on Conference Materials
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Social Media Recognition
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Promotional Materials in Conference Bags
                    </TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Exhibition Space
                    </TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Speaking Opportunity
                    </TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Workshop Opportunity
                    </TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Complimentary Registrations
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                * Custom sponsorship packages are also available. Contact us to
                discuss your specific needs and objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Sponsorship Opportunities */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Special Sponsorship Opportunities
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              In addition to our standard sponsorship tiers, we offer special
              opportunities to sponsor specific elements of the conference.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-emerald-600" />
                    Conference Dinner Sponsor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sponsor the conference dinner and gain exclusive recognition
                    during this networking event. Your logo will be prominently
                    displayed during the dinner, and you'll have the opportunity
                    to give a short welcome speech.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-emerald-600" />
                    Workshop Sponsor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sponsor a workshop session and showcase your organization's
                    expertise. This includes the opportunity to lead a workshop
                    on a relevant topic and distribute materials to
                    participants.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    Student Grant Sponsor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Support student participation by sponsoring travel grants or
                    registration fees. Your organization will be recognized for
                    its commitment to education and student development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-emerald-600" />
                    Coffee Break Sponsor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sponsor coffee breaks during the conference. Your logo will
                    be displayed during these networking opportunities, and you
                    can provide branded cups or napkins.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Current Sponsors Section */}
      {(sponsors?.length > 0 || partners?.length > 0) && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Current Sponsors & Partners
              </h2>

              {sponsors?.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-center mb-8">
                    Sponsors
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {sponsors.map((sponsor) => (
                      <div
                        key={sponsor._id}
                        className="flex items-center justify-center"
                      >
                        {sponsor.logoUrl ? (
                          <Link
                            href={sponsor.websiteUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <Image
                              src={sponsor.logoUrl || "/placeholder.svg"}
                              alt={sponsor.name}
                              width={150}
                              height={80}
                              className="max-h-20 w-auto object-contain"
                            />
                          </Link>
                        ) : (
                          <div className="bg-gray-200 p-4 rounded-md">
                            <p className="text-gray-700 font-medium">
                              {sponsor.name}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {partners?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-center mb-8">
                    Partners
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {partners.map((partner) => (
                      <div
                        key={partner._id}
                        className="flex items-center justify-center"
                      >
                        {partner.logoUrl ? (
                          <Link
                            href={partner.websiteUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <Image
                              src={partner.logoUrl || "/placeholder.svg"}
                              alt={partner.name}
                              width={150}
                              height={80}
                              className="max-h-20 w-auto object-contain"
                            />
                          </Link>
                        ) : (
                          <div className="bg-gray-200 p-4 rounded-md">
                            <p className="text-gray-700 font-medium">
                              {partner.name}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Become a Sponsor Today</h2>
            <p className="text-gray-700 mb-8">
              Start the conversation by contacting us for more information on
              how to be a part of this unique conference! We will be glad to
              discuss your ideas to sponsor the GeoMundus Conference.
            </p>

            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Mail className="h-12 w-12 text-emerald-600" />
                  <h3 className="text-xl font-bold">
                    Contact Our Sponsorship Team
                  </h3>
                  <p className="text-gray-700">
                    Email us at{" "}
                    <Link
                      href={`mailto:${siteSettings?.contactEmail || "budget@geomundus.org"}`}
                      className="text-emerald-700 font-medium hover:underline"
                    >
                      {siteSettings?.contactEmail || "budget@geomundus.org"}
                    </Link>{" "}
                    to discuss sponsorship opportunities.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-4 bg-emerald-700 hover:bg-emerald-800"
                  >
                    <Link
                      href={`mailto:${siteSettings?.contactEmail || "budget@geomundus.org"}`}
                    >
                      Contact Us About Sponsorship
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

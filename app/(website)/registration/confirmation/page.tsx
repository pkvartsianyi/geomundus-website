import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Instagram, Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function RegistrationConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Thank you for your submission!
            </CardTitle>
            <CardDescription className="text-lg">
              We look forward to welcoming you to GeoMundus 2025 in Lisbon,
              Portugal.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              Please check your email for further updates and important
              information regarding the conference.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Stay updated by following us:
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://instagram.com/geomundus_conference"
                  target="_blank"
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>geomundus_conference</span>
                </Link>

                <Link
                  href="https://www.geomundus.org"
                  target="_blank"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>www.geomundus.org</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Have questions? Contact us at{" "}
                <Link
                  href="mailto:program@geomundus.org"
                  className="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  program@geomundus.org
                </Link>
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Return to Homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

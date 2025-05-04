import type { Metadata } from "next"
import { cachedClient } from "@/lib/sanity.client"
import { siteSettingsQuery } from "@/lib/sanity.queries"
import RegistrationForm from "@/components/registration-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarIcon, InfoIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "GeoMundus - Registration",
  description: "Register for the GeoMundus Conference",
}

export default async function RegistrationPage() {
  const siteSettings = await cachedClient(siteSettingsQuery)

  // Format registration deadline
  const formattedDeadline = siteSettings?.registrationDeadline
    ? new Date(siteSettings.registrationDeadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  // Check if registration is open
  const isRegistrationOpen = siteSettings?.registrationOpen || false

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-16 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Registration</h1>
          <p className="text-lg md:text-xl mb-4">Register for the GeoMundus Conference</p>
          {formattedDeadline && (
            <p className="flex items-center justify-center gap-2 text-lg">
              <CalendarIcon className="h-5 w-5" />
              Registration deadline: {formattedDeadline}
            </p>
          )}
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {!isRegistrationOpen ? (
            <div className="max-w-3xl mx-auto">
              <Alert className="bg-amber-50 border-amber-200">
                <InfoIcon className="h-5 w-5 text-amber-600" />
                <AlertTitle className="text-amber-800">Registration is currently closed</AlertTitle>
                <AlertDescription className="text-amber-700">
                  Registration for the GeoMundus Conference is not open at this time. Please check back later or contact
                  us at {siteSettings?.contactEmail} for more information.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <RegistrationForm />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

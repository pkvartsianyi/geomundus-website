"use server"

import { revalidatePath } from "next/cache"
import { client } from "@/lib/sanity.client"
import QRCode from "qrcode"

export async function submitRegistration(formData: {
  firstName: string
  lastName: string
  email: string
  affiliation?: string
  role: string
  dietaryRequirements?: string
  attendingDinner: boolean
  abstract?: string
}) {
  try {
    // Generate QR code that points to the guest page
    const guestUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://geomundus.org"}/guests/${encodeURIComponent(formData.email)}`
    const qrCode = await QRCode.toDataURL(guestUrl)

    // Create a new registration document in Sanity
    const result = await client.create({
      _type: "registration",
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      affiliation: formData.affiliation || "",
      role: formData.role,
      dietaryRequirements: formData.dietaryRequirements || "",
      attendingDinner: formData.attendingDinner,
      abstract: formData.abstract || "",
      status: "pending",
      qrCode: qrCode,
    })

    // Revalidate the registrations page in the admin
    revalidatePath("/admin/registrations")

    return { success: true, data: result }
  } catch (error) {
    console.error("Error submitting registration:", error)
    return { success: false, error: "Failed to submit registration" }
  }
}

// Function to verify admin token
export async function verifyAdminToken(token: string) {
  const adminToken = process.env.ADMIN_TOKEN
  return token === adminToken
}

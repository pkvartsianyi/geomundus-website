"use server"

import { revalidatePath } from "next/cache"
import { client } from "@/lib/sanity.client"
import QRCode from "qrcode"
import { Readable } from "stream"

// Helper to convert buffer to a readable stream
function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)
  return stream
}

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
    const guestUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://geomundus.org"}/guests/${encodeURIComponent(formData.email)}`
    const qrBuffer = await QRCode.toBuffer(guestUrl)
    const qrImageAsset = await client.assets.upload("image", qrBuffer, {
      filename: `qr-${formData.email}.png`,
      contentType: "image/png",
    })

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
      qrCode: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: qrImageAsset._id,
        },
      },
    })

    revalidatePath("/admin/registrations")
    return { success: true, data: result }
}

export async function verifyAdminToken(token: string) {
  const result = token === process.env.ADMIN_TOKEN

  if (!result) {
    throw new Error("Invalid token")
  }

  return result
}

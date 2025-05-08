"use server";

import { revalidatePath } from "next/cache";
import { client } from "@/lib/sanity.client";
import QRCode from "qrcode";

export async function submitRegistration(formData: {
  firstName: string;
  lastName: string;
  email: string;
  affiliation?: string;
  role: string;
  dietaryRequirements?: string;
  attendingDinner: boolean;
  abstract?: string;
}) {
  const guestUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://geomundus.org"}/guests/${encodeURIComponent(formData.email)}`;
  const qrBuffer = await QRCode.toBuffer(guestUrl);
  const qrImageAsset = await client.assets.upload("image", qrBuffer, {
    filename: `qr-${formData.email}.png`,
    contentType: "image/png",
  });

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
  });

  // Send notification to Teams/Discord
  await sendWebhookNotification({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    affiliation: formData.affiliation || "Not specified",
    role: formData.role,
  });

  revalidatePath("/admin/registrations");
  return { success: true, data: result };
}

export async function verifyAdminToken(token: string) {
  const result = token === process.env.ADMIN_TOKEN;

  if (!result) {
    throw new Error("Invalid token");
  }

  return result;
}

// Function to send webhook notification to Teams/Discord
async function sendWebhookNotification(registrationData: {
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string;
  role: string;
}) {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "Notification webhook URL not configured. Skipping notification.",
    );
    return;
  }

  try {
    if (
      webhookUrl.includes("office.com") ||
      webhookUrl.includes("outlook.com")
    ) {
      const teamsPayload = {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        themeColor: "0076D7",
        summary: "New GeoMundus Registration",
        sections: [
          {
            activityTitle: "🎉 New Conference Registration",
            activitySubtitle: `${registrationData.firstName} ${registrationData.lastName} has registered for GeoMundus`,
            facts: [
              {
                name: "Name",
                value: `${registrationData.firstName} ${registrationData.lastName}`,
              },
              {
                name: "Email",
                value: registrationData.email,
              },
              {
                name: "Affiliation",
                value: registrationData.affiliation,
              },
              {
                name: "Role",
                value: registrationData.role,
              },
            ],
            markdown: true,
          },
        ],
        potentialAction: [
          {
            "@type": "OpenUri",
            name: "View in Admin",
            targets: [
              {
                os: "default",
                uri: `${process.env.NEXT_PUBLIC_SITE_URL || "https://geomundus.org"}/studio`,
              },
            ],
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamsPayload),
      });
    }
    // Format for Discord
    else {
      const discordPayload = {
        embeds: [
          {
            title: "🎉 New Conference Registration",
            description: `**${registrationData.firstName} ${registrationData.lastName}** has registered for GeoMundus`,
            color: 3447003, // Blue color
            fields: [
              {
                name: "Email",
                value: registrationData.email,
                inline: true,
              },
              {
                name: "Affiliation",
                value: registrationData.affiliation,
                inline: true,
              },
              {
                name: "Role",
                value: registrationData.role,
                inline: true,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "GeoMundus Registration System",
            },
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordPayload),
      });
    }

    console.log("Registration notification sent successfully");
  } catch (error) {
    console.error("Error sending registration notification:", error);
    // Don't throw the error - we don't want to fail the registration if notification fails
  }
}

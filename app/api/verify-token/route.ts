import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    const adminToken = process.env.ADMIN_TOKEN

    if (!adminToken) {
      return NextResponse.json({ success: false, message: "Admin token not configured" }, { status: 500 })
    }

    const isValid = token === adminToken

    return NextResponse.json({ success: isValid })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ success: false, message: "Error verifying token" }, { status: 500 })
  }
}

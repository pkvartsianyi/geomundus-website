import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { path, token } = await request.json()

    if (token !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    if (!path) {
      return NextResponse.json({ message: "Path is required" }, { status: 400 })
    }

    revalidatePath(path)

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error("Error revalidating:", err)
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}

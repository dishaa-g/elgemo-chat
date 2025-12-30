import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { comparePassword, generateToken } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, password } = await req.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const token = generateToken(user._id.toString())

    return NextResponse.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

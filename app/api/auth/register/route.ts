import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { hashPassword, generateToken } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    await connectDB()
    const { username, email, password } = await req.json()

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    const token = generateToken(user._id.toString())

    return NextResponse.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

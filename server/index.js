import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "../lib/mongodb.js"
import Message from "../models/Message.js"

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
})

app.use(cors())
app.use(express.json())

connectDB()

io.on("connection", (socket) => {
  console.log("[elgemo] User connected:", socket.id)

  socket.on("join_room", (roomId) => {
    socket.join(roomId)
    console.log(`[elgemo] User ${socket.id} joined room: ${roomId}`)
  })

  socket.on("send_message", async (data) => {
    try {
      const { content, sender, room, conversationId, messageType, mediaUrl } = data

      if (!content && !mediaUrl) {
        return
      }

      const newMessage = new Message({
        content,
        sender,
        room,
        conversationId,
        messageType: messageType || "text",
        mediaUrl,
      })

      await newMessage.save()

      const populatedMessage = await Message.findById(newMessage._id).populate("sender", "username avatar")

      if (room) {
        io.to(room).emit("receive_message", populatedMessage)
      } else if (conversationId) {
        io.to(conversationId).emit("receive_message", populatedMessage)
      }
    } catch (error) {
      console.error("[elgemo] Error sending message:", error.message)
    }
  })

  socket.on("disconnect", () => {
    console.log("[elgemo] User disconnected:", socket.id)
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`[elgemo] Socket.io server running on port ${PORT}`)
})

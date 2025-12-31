import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import connectDB from "../lib/mongodb.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["polling", "websocket"],
});

app.use(cors());
app.use(express.json());

await connectDB();

io.on("connection", (socket) => {
  console.log("[elgemo] User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log(`[elgemo] User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", async (data) => {
    try {
      const { content, sender, room, conversationId, messageType, mediaUrl } =
        data || {};

      if ((!content || !content.trim()) && !mediaUrl) return;
      if (!sender) return;
      if (!room && !conversationId) return;

      const msg = await Message.create({
        content: content || "",
        sender,
        room,
        conversationId,
        messageType: messageType || "text",
        mediaUrl,
      });

      const populatedMessage = await Message.findById(msg._id).populate(
        "sender",
        "username avatar"
      );

      const target = room || conversationId;
      io.to(target).emit("receive_message", populatedMessage);
    } catch (error) {
      console.error("[elgemo] Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("[elgemo] User disconnected:", socket.id);
  });
});

const PORT = Number(process.env.PORT) || 3001;
httpServer.listen(PORT, () => {
  console.log(`[elgemo] Socket.io server running on port ${PORT}`);
});

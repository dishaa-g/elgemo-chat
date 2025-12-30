import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: String,
    },
    conversationId: {
      type: String,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    mediaUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

MessageSchema.index({ room: 1, createdAt: -1 })
MessageSchema.index({ conversationId: 1, createdAt: -1 })

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)

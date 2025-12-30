import mongoose from "mongoose"

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Room || mongoose.model("Room", RoomSchema)

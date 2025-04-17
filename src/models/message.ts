import mongoose from "mongoose";

const messageSchame = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchame);

export default Message;

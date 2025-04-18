import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    sex: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    addressUserId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    orderId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    commentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    chatId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    storeFollowId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

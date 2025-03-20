import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
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

    addressUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    followTheStore: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    chat: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

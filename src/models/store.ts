import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    nameStore: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    addressStoreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    userFollowId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chatId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;

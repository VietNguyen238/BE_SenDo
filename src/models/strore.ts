import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    nameStore: {
      type: String,
      required: true,
      unique: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    evaluate: {
      type: Number,
    },
    addressStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    userFollow: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

const Store = mongoose.model("Store", storeSchema);
export default Store;

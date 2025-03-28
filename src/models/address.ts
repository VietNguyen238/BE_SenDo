import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    commune: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;

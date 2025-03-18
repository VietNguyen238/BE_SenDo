import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "waitForConfirmation",
        "confirmed",
        "shipping",
        "delivered",
        "canceled",
      ],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

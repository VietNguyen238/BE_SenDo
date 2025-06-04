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
    status: {
      type: String,
      enum: [
        "waitForConfirmation",
        "confirmed",
        "shipping",
        "delivered",
        "received",
        "canceled",
      ],
    },
    quantity: {
      type: Number,
      require: true,
    },
    paymentMethob: {
      type: String,
    },
    shippingMethod: {
      type: String,
    },
    shippingFee: {
      type: Number,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

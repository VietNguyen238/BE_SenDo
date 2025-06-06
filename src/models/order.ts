import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orders: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    ward: {
      type: String,
    },
    address: {
      type: String,
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
    paymentMethod: {
      type: String,
    },
    shippingMethod: {
      type: String,
    },
    shippingFee: {
      type: Number,
    },
    total: {
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

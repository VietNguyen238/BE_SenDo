import mongoose from "mongoose";



const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    productId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity:{
      type: Number,
      require: true,
    },
    paymentMethob:{
      type: String,
      enum: [
        "cod",
        "online",
        "momo",
      ]
    },
    note:{
      type: String,
    },
    total:{
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

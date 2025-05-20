import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
    },
    color: [
      {
        type: String,
      },
    ],
    originalPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in_stock", "out_of_stock"],
      default: "in_stock",
    },
    orderId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    description: {
      type: String,
    },
    basicInformation: {
      type: String,
    },
    commentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    productDetails: {
      type: String,
    },
    imageUrl: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
      unique: true,
    },
    color: [
      {
        type: String,
      },
    ],
    price: {
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
    description: {
      type: String,
    },
    basicInformation: {
      type: String,
    },
    reviewId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    imageUrl: [
      {
        type: String,
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

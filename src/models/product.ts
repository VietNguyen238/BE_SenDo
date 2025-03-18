import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    evaluate: {
      type: Number,
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
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    basicInformation: {
      type: String,
    },
    productDetails: [
      {
        type: String,
      },
    ],
    imageUrl: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

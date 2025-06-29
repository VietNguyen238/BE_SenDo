import { Request, Response } from "express";
import Product from "../models/product";
import cloudinary from "../utils/cloudinary";
import Review from "../models/review";

const productControllers = {
  getAllProduct: async (req: Request, res: Response) => {
    try {
      const products = await Product.find()
        .populate("categoryId")
        .populate("reviewId");

      if (!products) {
        return res.status(404).json({ message: "No products found!" });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  getAProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate("reviewId")
        .populate("categoryId");

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  addProduct: async (req: Request, res: Response) => {
    try {
      const data = req.body;

      // Validate categoryId
      if (!data.categoryId) {
        return res.status(400).json({
          message: "Category ID is required",
          error: "Missing categoryId",
        });
      }

      let imageUrl: string[] = [];

      if (Array.isArray(req.files)) {
        for (const file of req.files as Express.Multer.File[]) {
          const cloud = await cloudinary.v2.uploader.upload(file.path);
          imageUrl.push(cloud.secure_url);
        }
      }

      const newProduct = new Product({ ...data, imageUrl: imageUrl });
      console.log("Product data before save:", newProduct);
      try {
        const savedProduct = await newProduct.save();
        console.log("Product saved successfully:", savedProduct);
        res.status(201).json(savedProduct);
      } catch (saveError: any) {
        console.error("Error saving product:", saveError);
        if (saveError.code === 11000) {
          return res.status(400).json({
            message: "A product with this name already exists",
            error: "Duplicate product name",
          });
        }
        if (saveError.name === "ValidationError") {
          return res.status(400).json({
            message: "Validation error",
            error: Object.values(saveError.errors).map(
              (err: any) => err.message
            ),
          });
        }
        res.status(500).json({
          message: "Error saving product",
          error: (saveError as Error).message,
        });
      }
    } catch (error) {
      console.error("General error:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      let imageUrl: string[] = [];

      if (Array.isArray(req.files)) {
        for (const file of req.files as Express.Multer.File[]) {
          const cloud = await cloudinary.v2.uploader.upload(file.path);
          imageUrl.push(cloud.secure_url);
        }
      }

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        { ...data, ...(imageUrl.length ? { imageUrl: imageUrl } : {}) },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;

      await Review.deleteMany({ productId });
      const deleted = await Product.findByIdAndDelete(productId);

      if (!deleted) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};

export default productControllers;

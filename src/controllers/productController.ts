import { Request, Response } from "express";
import Product from "../models/product";
import Store from "../models/store";
import cloudinary from "../utils/cloudinary";
import Comment from "../models/comment";
import BaseController from "./baseController";

class ProductController extends BaseController<any> {
  constructor() {
    super(Product);
  }

  async getAllProduct(req: Request, res: Response) {
    try {
      const products = await Product.find();
      if (!products.length) {
        return res.status(404).json({ message: "No products found!" });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getAProduct(req: Request, res: Response) {
    try {
      const product = await Product.findById(req.params.id).populate("commentId");
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async addProduct(req: Request, res: Response) {
    try {
      const data = req.body;
      let imageUrl: string[] = [];

      if (Array.isArray(req.files)) {
        for (const file of req.files as Express.Multer.File[]) {
          const cloud = await cloudinary.v2.uploader.upload(file.path);
          imageUrl.push(cloud.secure_url);
        }
      }

      const newProduct = new Product({ ...data, imageUrl });
      const savedProduct = await newProduct.save();

      if (savedProduct.storeId) {
        await Store.findByIdAndUpdate(savedProduct.storeId, {
          $push: { productId: savedProduct._id },
        });
      }

      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async updateProduct(req: Request, res: Response) {
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
        { ...data, ...(imageUrl.length ? { imageUrl } : {}) },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;

      await Store.updateMany(
        { productId },
        { $pull: { productId } }
      );

      await Comment.deleteMany({ productId });
      const deleted = await Product.findByIdAndDelete(productId);

      if (!deleted) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default new ProductController();

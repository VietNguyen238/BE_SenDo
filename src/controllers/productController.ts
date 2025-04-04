import { Request, Response } from "express";
import Product from "../models/product";
import Store from "../models/store";
import cloudinary from "../utils/cloudinary";

const productController = {
  getAllProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.find();
      if (!product) {
        throw new Error("Product not found!");
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getAProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        throw new Error("Product not found!");
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addProduct: async (req: Request, res: Response) => {
    try {
      let imageUrl = [];
      const data = req.body;

      if (Array.isArray(req.files)) {
        for (let index = 0; index < req.files.length; index++) {
          const cloud = await cloudinary.v2.uploader.upload(
            req.files[index].path
          );
          imageUrl.push(cloud.url);
        }
      }

      const newProduct = new Product({ ...data, imageUrl: imageUrl });
      const saveProduct = await newProduct.save();
      if (saveProduct.storeId) {
        await Store.updateOne(
          { _id: saveProduct.storeId },
          { $push: { productId: saveProduct.id } }
        );
      }
      res.status(201).json(saveProduct);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      let imageUrl = [];
      const data = req.body;

      if (Array.isArray(req.files)) {
        for (let index = 0; index < req.files.length; index++) {
          const cloud = await cloudinary.v2.uploader.upload(
            req.files[index].path
          );
          imageUrl.push(cloud.url);
        }
      }

      await Product.findByIdAndUpdate(req.params.id, {
        ...data,
        imageUrl: imageUrl,
      });
      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      await Store.updateMany(
        { productId: req.params.id },
        { $pull: { productId: req.params.id } }
      );
      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default productController;

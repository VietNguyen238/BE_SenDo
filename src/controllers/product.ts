import { Request, Response } from "express";
import Product from "../models/product";
import Store from "../models/store";

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
      const newProduct = new Product(req.body);
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
      await Product.findByIdAndUpdate(req.params.id, req.body);
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

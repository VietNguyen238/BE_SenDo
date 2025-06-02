import { Request, Response } from "express";
import Cart from "../models/cart";
import User from "../models/user";

const cartController = {
  getAllCart: async (req: Request, res: Response) => {
    try {
      const cart = await Cart.find();
      if (!cart) {
        return res.status(404).json({ message: "Cart not found!" });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getCart: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id;
      const cart = await Cart.find({ userId: userId }).populate("productId");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addCart: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const newcart = new Cart(req.body);
      const savecart = await newcart.save();

      if (savecart.userId) {
        await User.updateMany(
          { _id: req.body.userId },
          { $push: { cartUserId: savecart.id } }
        );
      }

      res.status(201).json(savecart);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateCart: async (req: Request, res: Response) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteCart: async (req: Request, res: Response) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default cartController;

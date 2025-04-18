import { Request, Response } from "express";
import Order from "../models/order";
import User from "../models/user";
import Product from "../models/product";

const orderController = {
  getOrder: async (req: Request, res: Response) => {
    try {
      const order = await Order.find({ userId: req.params.userId });

      if (!order) {
        throw new Error("Order not found!");
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addOrder: async (req: Request, res: Response) => {
    try {
      const newOrder = new Order(req.body);
      const saveOrder = await newOrder.save();
      const product = await Product.findById(saveOrder.productId);

      if (saveOrder.userId) {
        await User.updateMany(
          { _id: saveOrder.userId },
          { $push: { orderId: saveOrder._id } }
        );
      }

      if (saveOrder.productId) {
        await Product.updateMany(
          { _id: saveOrder.productId },
          { $push: { orderId: saveOrder._id } }
        );
      }

      if (saveOrder.quantity && product) {
        await Product.updateMany(
          { _id: saveOrder.productId },
          { $set: { quantity: product.quantity - saveOrder.quantity } }
        );
      }

      res.status(200).json(saveOrder);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateOrder: async (req: Request, res: Response) => {
    try {
      await Order.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteOrder: async (req: Request, res: Response) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      await User.updateMany(
        { orderId: req.params.id },
        { $pull: { orderId: req.params.id } }
      );
      await Product.updateMany(
        { orderId: req.params.id },
        { $pull: { orderId: req.params.id } }
      );

      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default orderController;

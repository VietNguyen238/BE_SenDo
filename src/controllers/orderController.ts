import { Request, Response, NextFunction } from "express";
import Order from "../models/order";
import User from "../models/user";
import Product from "../models/product";

const orderController = {
  getOrder: async (req: Request, res: Response) => {
    try {
      const order = await Order.find({ userId: req.params.id })
        .populate("userId")
        .populate("productId");

      if (!order || order.length === 0) {
        throw new Error("Order not found!");
        // return res.status(404).json({ message:" Chưa có sản phẩm trong giỏ hàng! "})
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addOrder: async (req: Request, res: Response) => {
    try {
      const newOrder = new Order({...req.body,
        userId: (req as any).user._id,
      });
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

      if (
        product &&
        saveOrder.quantity &&
        saveOrder.quantity <= product.quantity
      ) {
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

      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  // phương thức dùng để fake data cho recommend
  addManyOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = req.body; // [{ productId, quantity, userId, ... }, {...}]
      const currentUser = (req as any).user;
      const savedOrders = [];
  
      for (const orderData of orders) {
        // Kiểm tra nếu là admin thì cho phép tạo order cho user khác
        const userId = currentUser.role === 'admin' && orderData.userId ? orderData.userId : currentUser._id;
        
        const newOrder = new Order({
          ...orderData,
          userId,
        });
  
        const savedOrder = await newOrder.save();
        savedOrders.push(savedOrder);
  
        const product = await Product.findById(savedOrder.productId);
  
        if (savedOrder.productId && product) {
          if (savedOrder.quantity && savedOrder.quantity <= product.quantity) {
            await Product.updateOne(
              { _id: savedOrder.productId },
              {
                $inc: { quantity: -savedOrder.quantity },
                $push: { orderId: savedOrder._id },
              }
            );
          } else {
            res.status(400).json({
              message: `Sản phẩm với ID ${savedOrder.productId} không đủ hàng`,
            });
            return;
          }
        }
  
        if (savedOrder.userId) {
          await User.updateOne(
            { _id: savedOrder.userId },
            { $push: { orderId: savedOrder._id } }
          );
        }
      }
  
      res.status(200).json(savedOrders);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

};

export default orderController;

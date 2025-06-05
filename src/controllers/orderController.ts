import { Request, Response, NextFunction } from "express";
import Order from "../models/order";
import User from "../models/user";
import Product from "../models/product";
import Cart from "../models/cart";

const orderController = {
  getOrder: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id;
      const order = await Order.find({ userId: userId })
        .populate("userId")
        .populate("orders.productId");

      if (!order || order.length === 0) {
        return res.status(404).json({ message: "Order not found!" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getIdOrder: async (req: Request, res: Response) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("userId")
        .populate("orders.productId");

      if (!order) {
        return res.status(404).json({ message: "Order not found!" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addOrder: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const newOrder = new Order({
        ...req.body,
        userId: (req as any).user._id,
      });
      const saveOrder = await newOrder.save();

      if (saveOrder.userId) {
        await User.updateMany(
          { _id: saveOrder.userId },
          { $push: { orderId: saveOrder._id } }
        );
      }

      await Cart.deleteMany({ userId: saveOrder.userId });

      for (const orderItem of saveOrder.orders) {
        if (orderItem.productId) {
          const product = await Product.findById(orderItem.productId);

          if (!product) {
            return res.status(404).json({
              message: `Product not found with ID ${orderItem.productId}`,
            });
          }

          if (!orderItem.quantity || orderItem.quantity > product.quantity) {
            return res.status(400).json({
              message: `Insufficient stock for product ID ${orderItem.productId}`,
            });
          }

          await Product.updateOne(
            { _id: orderItem.productId },
            {
              $inc: { quantity: -orderItem.quantity },
              $push: { orderId: saveOrder._id },
            }
          );
        }
      }

      res.status(200).json(saveOrder);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateOrder: async (req: Request, res: Response) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found!" });
      }

      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteOrder: async (req: Request, res: Response) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found!" });
      }

      await User.updateMany(
        { orderId: req.params.id },
        { $pull: { orderId: req.params.id } }
      );

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addManyOrders: async (req: Request, res: Response) => {
    try {
      const orders = req.body;
      const currentUser = (req as any).user;
      const savedOrders = [];

      for (const orderData of orders) {
        const userId =
          currentUser.role === "admin" && orderData.userId
            ? orderData.userId
            : currentUser._id;

        const newOrder = new Order({
          ...orderData,
          userId,
        });

        const savedOrder = await newOrder.save();
        savedOrders.push(savedOrder);

        for (const orderItem of savedOrder.orders) {
          if (orderItem.productId) {
            const product = await Product.findById(orderItem.productId);

            if (!product) {
              return res.status(404).json({
                message: `Product not found with ID ${orderItem.productId}`,
              });
            }

            if (!orderItem.quantity || orderItem.quantity > product.quantity) {
              return res.status(400).json({
                message: `Insufficient stock for product ID ${orderItem.productId}`,
              });
            }

            await Product.updateOne(
              { _id: orderItem.productId },
              {
                $inc: { quantity: -orderItem.quantity },
                $push: { orderId: savedOrder._id },
              }
            );
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
  },
};

export default orderController;

import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import Address from "../models/address";
import cloudinary from "../utils/cloudinary";
import Order from "../models/order";
import Chat from "../models/chat";
import Review from "../models/review";

const userControllers = {
  getAllUser: async (req: Request, res: Response) => {
    try {
      const user = await User.find()
        .populate("addressUserId")
        .populate("orderId");

      if (!user) {
        throw new Error("User not found!");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getAUser: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id;

      const user = await User.findById(userId)
        .populate("addressUserId")
        .populate("orderId");

      if (!user) {
        throw new Error("User not found!");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      let imageUrl;

      const userId = (req as any).user._id;
      const updateData = req.body;

      if (req.file) {
        const cloud = await cloudinary.v2.uploader.upload(req.file.path);
        imageUrl = cloud.url;
      }

      if (!req.body.password) {
        await User.findByIdAndUpdate(userId, {
          ...updateData,
          imageUrl: imageUrl,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(userId, {
          ...updateData,
          password: hashed,
          imageUrl: imageUrl,
        });
      }

      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id;

      await User.findByIdAndDelete(userId);
      await Address.deleteMany({ userId: userId });
      await Order.deleteMany({ userId: userId });
      await Review.deleteMany({ userId: userId });
      await Chat.deleteMany({ members: { $in: [userId] } });

      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default userControllers;

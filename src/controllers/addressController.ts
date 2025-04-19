import { Request, Response } from "express";
import Address from "../models/address";
import User from "../models/user";
import Store from "../models/store";

const addressController = {
  getAllAddress: async (req: Request, res: Response) => {
    try {
      const address = await Address.find();
      if (!address) {
        throw new Error("Address not fount!");
      }

      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getUserAddress: async (req: Request, res: Response) => {
    try {
      const address = await Address.find({ userId: req.params.userId });
      if (!address) {
        throw new Error("Address not found");
      }

      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getStoreAddress: async (req: Request, res: Response) => {
    try {
      const address = await Address.findOne({ storeId: req.params.storeId });
      if (!address) {
        throw new Error("Address not found");
      }

      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addAddress: async (req: Request, res: Response) => {
    try {
      const newAddress = new Address(req.body);
      const saveAddress = await newAddress.save();

      if (saveAddress.userId) {
        await User.updateMany(
          { _id: req.body.userId },
          { $push: { addressUserId: saveAddress.id } }
        );
      }

      if (saveAddress.storeId) {
        await Store.updateMany(
          { _id: req.body.storeId },
          { $set: { addressStoreId: saveAddress.id } }
        );
      }

      res.status(201).json(saveAddress);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateAddress: async (req: Request, res: Response) => {
    try {
      await Address.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteAddress: async (req: Request, res: Response) => {
    try {
      await Store.updateMany(
        { addressStoreId: req.params.id },
        { $set: { addressStoreId: null } }
      );
      await User.updateMany(
        { addressUserId: req.params.id },
        { $pull: { addressUserId: req.params.id } }
      );
      await Address.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default addressController;

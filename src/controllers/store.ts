import { Request, Response } from "express";
import Store from "../models/store";
import User from "../models/user";
import Address from "../models/address";
import cloudinary from "../utils/cloudinary";

const storeController = {
  getAStore: async (req: Request, res: Response) => {
    try {
      const store = await Store.findById(req.params.id);
      if (!store) {
        res.status(404).json("Store not found!");
      }

      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getAllStore: async (req: Request, res: Response) => {
    try {
      const store = await Store.find();
      if (!store) {
        throw new Error("Store not found!");
      }

      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  addStore: async (req: Request, res: Response) => {
    try {
      let imageUrl;
      const data = req.body;

      if (req.file) {
        const cloud = await cloudinary.v2.uploader.upload(req.file.path);
        imageUrl = cloud.url;
      }

      const newStore = new Store({ ...data, imageUrl: imageUrl });

      const saveStore = await newStore.save();

      if (saveStore.userId) {
        await User.updateOne(
          { _id: saveStore.userId },
          { $push: { storeId: saveStore.id } }
        );
      }

      res.status(201).json(saveStore);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateStore: async (req: Request, res: Response) => {
    try {
      let imageUrl;
      const data = req.body;

      if (req.file) {
        const cloud = await cloudinary.v2.uploader.upload(req.file.path);
        imageUrl = cloud.url;
      }

      await Store.findByIdAndUpdate(req.params.id, {
        ...data,
        imageUrl: imageUrl,
      });

      res.status(200).json("Updated Store!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteStore: async (req: Request, res: Response) => {
    try {
      await User.updateMany(
        { storeId: req.params.id },
        { $pull: { storeId: req.params.id } }
      );

      await Address.deleteMany({ storeId: req.params.id });
      await Store.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted Store!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default storeController;

import { Request, Response } from "express";
import Store from "../models/store";
import User from "../models/user";

const storeController = {
  getAStore: async (req: Request, res: Response) => {
    try {
      const storeId = req.params.id;
      const store = await Store.findById(storeId);
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

      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  postStore: async (req: Request, res: Response) => {
    try {
      const newStore = new Store({
        nameStore: req.body.nameStore,
        userId: req.body.userId,
      });

      const saveStore = await newStore.save();

      if (saveStore.userId) {
        await User.updateOne({ $push: { storeId: saveStore.id } });
      }

      res.status(201).json(saveStore);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateStore: async (req: Request, res: Response) => {
    try {
      await Store.findByIdAndUpdate(req.params.id, {
        nameStore: req.body.nameStore,
        imageUrl: req.body.imageUrl,
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

      await Store.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted Store!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default storeController;

import { Request, Response } from "express";
import Chat from "../models/chat";

const chatController = {
  addChat: async (req: Request, res: Response) => {
    try {
      const newChat = new Chat({
        members: [req.body.senderId, req.body.receiverId],
      });

      const saveChat = await newChat.save();

      res.status(201).json(saveChat);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getAChat: async (req: Request, res: Response) => {
    try {
      const chat = await Chat.find({ members: { $in: [req.params.id] } });

      if (!chat) {
        throw new Error("Chat not found!");
      }

      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  findChat: async (req: Request, res: Response) => {
    try {
      const chat = await Chat.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });

      if (!chat) {
        throw new Error("Chat not found!");
      }

      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteChat: async (req: Request, res: Response) => {
    try {
      await Chat.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Deleted sucessfully!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default chatController;

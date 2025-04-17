import { Request, Response } from "express";
import Message from "../models/message";

const messageController = {
  addMessage: async (req: Request, res: Response) => {
    try {
      const newMessage = new Message(req.body);
      const saveMessage = await newMessage.save();

      res.status(201).json(saveMessage);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getMessage: async (req: Request, res: Response) => {
    try {
      const message = await Message.find({ chatId: req.params.chatId });

      if (!message) {
        throw new Error("Message not found!");
      }

      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateMessage: async (req: Request, res: Response) => {
    try {
      await Message.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json("Update successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteMessage: async (req: Request, res: Response) => {
    try {
      await Message.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default messageController;

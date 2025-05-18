import { Request, Response } from "express";
import Chat from "../models/chat";
import BaseController from "./baseController";

class ChatController extends BaseController<any> {
    constructor() {
        super(Chat);
    }

    // Custom method for finding chat between two users
    findChat = async (req: Request, res: Response) => {
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
    };
}

export default new ChatController();

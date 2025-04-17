import express from "express";
import messageController from "../controllers/messageController";

const router = express.Router();

router.get("/:chatId", messageController.getMessage);
router.post("/", messageController.addMessage);
router.post("/update/:id", messageController.updateMessage);
router.delete("/delete/:id", messageController.deleteMessage);

export default router;

import express from "express";
import messageController from "../../../messageController";

const router = express.Router();

router.get("/", messageController.getMessage);
router.post("/", messageController.addMessage);
router.post("/", messageController.updateMessage);
router.delete("/", messageController.deleteMessage);

export default router;

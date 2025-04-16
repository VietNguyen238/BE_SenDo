import express from "express";
import userMiddleware from "../middlewares/userMiddleware";
import chatController from "../controllers/chatController";

const router = express.Router();

router.post("/", chatController.addChat);
router.get("/:id", chatController.getAChat);
router.get("/find/:firstId/:secondId/:id/:ids", chatController.findChat);
router.delete("/delete/:id", chatController.deleteChat);

export default router;

import express from "express";
import userMiddleware from "../middlewares/userMiddleware";
import chatController from "../controllers/chatController";

const router = express.Router();

router.post("/add", userMiddleware.verifyToken, chatController.addChat);
router.get("/:id", userMiddleware.verifyToken, chatController.getAChat);
router.get(
  "/find/:firstId/:secondId/",
  userMiddleware.verifyToken,
  chatController.findChat
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  chatController.deleteChat
);

export default router;

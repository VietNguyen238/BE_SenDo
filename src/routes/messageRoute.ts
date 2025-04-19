import express from "express";
import messageController from "../controllers/messageController";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get(
  "/:chatId",
  userMiddleware.verifyToken,
  messageController.getMessage
);
router.post("/add", userMiddleware.verifyToken, messageController.addMessage);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  messageController.updateMessage
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  messageController.deleteMessage
);

export default router;

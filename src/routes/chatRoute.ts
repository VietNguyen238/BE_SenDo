import express from "express";
import userMiddleware from "../middlewares/userMiddleware";
import chatController from "../controllers/chatController";

const router = express.Router();

router.post("/add", userMiddleware.verifyToken, chatController.create);
router.get(
  "/find/:firstId/:secondId/",
  userMiddleware.verifyToken,
  chatController.findChat
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  chatController.delete
);

export default router;

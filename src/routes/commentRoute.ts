import commentController from "../controllers/commentController";
import express from "express";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/:productId", commentController.getAllComment);
router.post("/add", userMiddleware.verifyToken, commentController.addComment);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  commentController.updateComment
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyUserAndAdmin,
  commentController.deleteComment
);

export default router;

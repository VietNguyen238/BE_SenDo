import commentController from "../controllers/commentController";
import express from "express";

const router = express.Router();

router.get("/", commentController.getAllComment);
router.get("/:id", commentController.getAComment);
router.post("/add", commentController.addComment);
router.post("/update/:id", commentController.updateComment);
router.delete("/delete/:id", commentController.deleteComment);

export default router;

import express, { RequestHandler } from "express";
import blogController from "../controllers/blogController";

const router = express.Router();

router.get("/:id", blogController.getABlog as RequestHandler);
router.get("/", blogController.getAllBlog as RequestHandler);
router.post("/add", blogController.addBlog as RequestHandler);
router.post("/add/:id", blogController.updateBlog as RequestHandler);
router.delete("/delete/:id", blogController.deleteBlog as RequestHandler);

export default router;

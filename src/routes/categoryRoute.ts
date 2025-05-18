import express from "express";
import userMiddleware from "../middlewares/userMiddleware";
import categoryController from "../controllers/categoryController";

const router = express.Router();

router.post("/add", userMiddleware.verifyToken, categoryController.create);
router.get(
  "/:id",
  userMiddleware.verifyToken,
  categoryController.getById
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  categoryController.delete
);

export default router;

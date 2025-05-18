import express from "express";
import userMiddleware from "../middlewares/userMiddleware";
import subCategoryController from "../controllers/subCategoryController";

const router = express.Router();

router.post("/add", userMiddleware.verifyToken, subCategoryController.create);
router.get(
  "/:id",
  userMiddleware.verifyToken,
  subCategoryController.getById
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  subCategoryController.delete
);

export default router;

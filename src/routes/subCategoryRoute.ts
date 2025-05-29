import express from "express";
import userMiddleware from "../middlewares/userMiddleware";
import subCategoryController from "../controllers/subCategoryController";

const router = express.Router();

router.post("/add", userMiddleware.verifyToken, subCategoryController.create);
router.post("/add-many", userMiddleware.verifyToken, subCategoryController.createMany);
router.get(
  "/:id",
  userMiddleware.verifyToken,
  subCategoryController.getById
);
router.get("/", userMiddleware.verifyToken, subCategoryController.getAll);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  subCategoryController.delete
);

export default router;

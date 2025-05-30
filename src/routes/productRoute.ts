import express from "express";
import productController from "../controllers/productController";
import upload from "../middlewares/multer";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/", productController.getAll);

router.get("/:id", productController.getById);

router.post(
  "/",
  userMiddleware.verifyToken,
  upload.array("products", 8),
  productController.addProduct
);

router.post(
  "/add-Many",
  userMiddleware.verifyToken,
  productController.createMany
);

router.put(
  "/:id",
  userMiddleware.verifyToken,
  upload.array("products", 8),
  productController.update
);

router.delete(
  "/:id",
  userMiddleware.verifyUserAndAdmin,
  productController.delete
);

export default router;

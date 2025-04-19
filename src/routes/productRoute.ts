import productController from "../controllers/productController";
import express from "express";
import upload from "../middlewares/multer";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getAProduct);
router.post(
  "/add",
  userMiddleware.verifyToken,
  upload.array("products", 8),
  productController.addProduct
);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  upload.array("products", 8),
  productController.updateProduct
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyUserAndAdmin,
  productController.deleteProduct
);

export default router;

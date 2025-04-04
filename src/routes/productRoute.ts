import productController from "../controllers/productController";
import express from "express";
import upload from "../middlewares/multer";

const router = express.Router();

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getAProduct);
router.post("/add", upload.array("products"), productController.addProduct);
router.post(
  "/update/:id",
  upload.array("products", 8),
  productController.updateProduct
);
router.delete("/delete/:id", productController.deleteProduct);

export default router;

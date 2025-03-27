import productController from "../controllers/product";
import express from "express";

const router = express.Router();

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getAProduct);
router.post("/add", productController.addProduct);
router.post("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

export default router;

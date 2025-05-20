import express from "express";
import productController from "../controllers/productController";
import subCategoryController from "../controllers/subCategoryController";
import upload from "../middlewares/multer";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

// GET all products
router.get("/", productController.getAll);

// GET one product by ID
router.get("/:id", productController.getById);

// CREATE one product (with image upload, auth required)
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

router.post(
  "/subcategories/create-many",
  userMiddleware.verifyToken,
  subCategoryController.createMany
);

// UPDATE a product by ID (auth + upload)
router.put(
  "/:id",
  userMiddleware.verifyToken,
  upload.array("products", 8),
    productController.update
);

// DELETE a product by ID (admin required)
router.delete(
  "/:id",
  userMiddleware.verifyUserAndAdmin,
  productController.delete
);

export default router;

import express, { RequestHandler } from "express";
import productControllers from "../controllers/productController";
import upload from "../middlewares/multer";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/", productControllers.getAllProduct as RequestHandler);

router.get("/:id", productControllers.getAProduct as RequestHandler);

router.post(
  "/add",
  userMiddleware.verifyToken,
  upload.array("products", 8),
  productControllers.addProduct as RequestHandler
);

router.post(
  "/add-Many",
  userMiddleware.verifyToken,
  productControllers.addProduct as RequestHandler
);

router.post(
  "/:id",
  userMiddleware.verifyToken,
  upload.array("products", 8),
  productControllers.updateProduct as RequestHandler
);

router.delete(
  "/:id",
  userMiddleware.verifyUserAndAdmin,
  productControllers.deleteProduct as RequestHandler
);

export default router;

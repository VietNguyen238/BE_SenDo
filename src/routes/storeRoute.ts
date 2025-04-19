import storeController from "../controllers/storeController";
import express from "express";
import upload from "../middlewares/multer";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/", storeController.getAllStore);
router.get("/:id", storeController.getAStore);
router.post(
  "/add",
  userMiddleware.verifyToken,
  upload.single("store"),
  storeController.addStore
);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  upload.single("store"),
  storeController.updateStore
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyUserAndAdmin,
  storeController.deleteStore
);

export default router;

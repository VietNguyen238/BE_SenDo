import addressController from "../controllers/addressController";
import express from "express";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get(
  "/",
  userMiddleware.verifyUserAndAdmin,
  addressController.getAllAddress
);
router.get(
  "/:id",
  userMiddleware.verifyToken,
  addressController.getUserAddress
);
router.get(
  "/store/:id",
  userMiddleware.verifyToken,
  addressController.getStoreAddress
);
router.post("/add", userMiddleware.verifyToken, addressController.addAddress);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  addressController.updateAddress
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  addressController.deleteAddress
);

export default router;

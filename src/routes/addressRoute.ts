import addressController from "../controllers/addressController";
import express from "express";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get(
  "/",
  userMiddleware.verifyUserAndAdmin,
  addressController.getAllAddress
);
router.get("/me", userMiddleware.verifyToken, addressController.getUserAddress);
router.post("/add", userMiddleware.verifyToken, addressController.addAddress);
router.post(
  "/update/me",
  userMiddleware.verifyToken,
  addressController.updateAddress
);
router.delete(
  "/delete/me",
  userMiddleware.verifyToken,
  addressController.deleteAddress
);

export default router;

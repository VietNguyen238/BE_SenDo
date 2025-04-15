import addressController from "../controllers/addressController";
import express from "express";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/", userMiddleware.verifyToken, addressController.getAllAddress);
router.get("/:id", userMiddleware.verifyToken, addressController.getAAddress);
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

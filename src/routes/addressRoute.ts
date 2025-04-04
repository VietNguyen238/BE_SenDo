import addressController from "../controllers/addressController";
import express from "express";

const router = express.Router();

router.get("/", addressController.getAllAddress);
router.get("/:id", addressController.getAAddress);
router.post("/add", addressController.addAddress);
router.post("/update/:id", addressController.updateAddress);
router.delete("/delete/:id", addressController.deleteAddress);

export default router;

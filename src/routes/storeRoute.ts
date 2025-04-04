import storeController from "../controllers/storeController";
import express from "express";
import upload from "../middlewares/multer";

const router = express.Router();

router.get("/", storeController.getAllStore);
router.get("/:id", storeController.getAStore);
router.post("/add", upload.single("store"), storeController.addStore);
router.post("/update/:id", upload.single("store"), storeController.updateStore);
router.delete("/delete/:id", storeController.deleteStore);

export default router;

import storeController from "../controllers/store";
import express from "express";

const router = express.Router();

router.get("/", storeController.getAllStore);
router.get("/:id", storeController.getAStore);
router.post("/add", storeController.addStore);
router.post("/update/:id", storeController.updateStore);
router.delete("/delete/:id", storeController.deleteStore);

export default router;
